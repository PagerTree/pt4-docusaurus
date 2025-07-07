---
date: 2022-12-15
authors: amiller
description: >-
  GitHub Actions are a great way to automate the build and deploy process for
  your repos.
---

# ✨ Jekyll site to AWS S3 using GitHub Actions

In this tutorial, I will show you how to build and deploy a Jekyll static site to AWS S3 + Cloudfront using GitHub Actions. At PagerTree we use GitHub Actions to automate the building and deploying of our marketing site [pagertree.com](https://pagertree.com/).

<!-- truncate -->

## What are GitHub Actions? <a href="#what-are-github-actions" id="what-are-github-actions"></a>

These days, if you have to do anything manually more than a couple of times, you should probably be automating it. [GitHub Actions](https://github.com/features/actions) make it easy to automate software workflows. At PagerTree, we use GitHub Actions to deploy our marketing site in a continuous and reliable way.

## Tutorial <a href="#tutorial" id="tutorial"></a>

For this tutorial, I’ll make the assumption that you are fairly familiar with git and [Jekyll](https://jekyllrb.com/) and already have a [static website hosted on AWS S3 + Cloudfront website](https://youtu.be/X9cdkqBgLbs?si=zuxbZjNAy6o6ITiK) setup.

### What You’ll Need <a href="#what-youll-need" id="what-youll-need"></a>

Below I’ve listed what you’ll need for this tutorial. I’ll assume you are dangerous enough to create the following on your own and won’t cover how to create these, as it’s out of the scope of this post.

* Jekyll static site
* GitHub Account and Repo
* AWS
  * Account
  * S3 Bucket with static hosting enabled
    * Bucket Permissions - Block all public access - **Off** - [(2:54)](https://youtu.be/X9cdkqBgLbs?si=xoC1rdt0EfcQn3lD\&t=174)
    * Bucket Policy - **Public Access Policy** - [(3:42)](https://youtu.be/X9cdkqBgLbs?si=m\_YDVgtZO1dhU01n\&t=222)
    * Static Website Hosting - **Enabled** - [(5:02)](https://youtu.be/X9cdkqBgLbs?si=zuxbZjNAy6o6ITiK\&t=302)
  * Cloudfront distribution - [(9:58)](https://youtu.be/X9cdkqBgLbs?si=rp0hNsU0gTM6ct9K\&t=598)
  * Access to create IAM User and Policy

### Desired Workflow <a href="#desired-workflow" id="desired-workflow"></a>

Our desired workflow should look something like the following:

On _**push**_ to our repo’s main branch or when manually clicked in GitHub:

1. Build the main branch.
2. Deploy the generated static site files to AWS S3.
3. Create an AWS Cloudfront invalidation.

This is pretty minimal, and you can get _waaay_ fancier, but for the purpose of this tutorial it should help us understand how to use GitHub Actions.

### Add a GitHub Action Workflow <a href="#add-a-github-action-workflow" id="add-a-github-action-workflow"></a>

Your GitHub Actions definitions live in a special directory in your repo (`<repo>/.github/workflows/`). Inside this directory, you’ll have all your workflow files (yml format).

Workflows will trigger off events (aka specific activities) that happen in GitHub. There’s [quite a few](https://docs.github.com/en/actions/reference/events-that-trigger-workflows), but for this tutorial we will focus on the `push` and `workflow_dispatch` events.

### Build and Deploy on Push into Main <a href="#build-and-deploy-on-push-into-main" id="build-and-deploy-on-push-into-main"></a>

In your `<repo>/.github/workflows/` directory, create a new file called `build_and_deploy.yml`. Copy and paste the following into your newly created GitHub Action workflow:

```yaml
name: CI / CD

# Controls when the action will run. 
on:
  # Triggers the workflow on push for the main branch
  push:
    branches: [ main ]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:
  
env:
  AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
  AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
  AWS_DEFAULT_REGION: 'us-west-2'

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Set up Ruby
      uses: ruby/setup-ruby@v1
      with:
        ruby-version: "3.0" # Not needed with a .ruby-version file
        bundler-cache: true
    - name: "Build Site"
      run: bundle exec jekyll build
      env:
        JEKYLL_ENV: production
    - name: "Deploy to AWS S3"
      run: aws s3 sync ./_site/ s3://${{ secrets.AWS_S3_BUCKET_NAME }} --acl public-read --delete --cache-control max-age=604800
    - name: "Create AWS Cloudfront Invalidation"
      run: aws cloudfront create-invalidation --distribution-id ${{ secrets.AWS_CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"
```

This workflow file is responsible for building and deploying the site. We’ve named it “CI / CD”. It’s pretty self explanatory, but I’ll explain the process:

1. When a push is made into the main branch (or manual button click in GitHub), run this workflow.
2. The job - Use the Ubuntu latest virtual environment (see [all environment options here](https://github.com/actions/virtual-environments#github-actions-virtual-environments))
   1. Checkout our main branch.
   2. Setup our Ruby environment ([see docs](https://github.com/ruby/setup-ruby)) - Installs Ruby (with specified Ruby version if you have a .ruby-version file) and runs ‘bundle install’.
   3. Build the site (with the production environment).
   4. Uploads output files from our `_site` directory to our S3 bucket.
   5. Creates a Cloudfront invalidation (so we can see our new site immediately).

Pretty straight forward, but we still need to create a few resources in AWS and configure secrets in our GitHub repository.

### Create necessary AWS resources <a href="#create-necessary-aws-resources" id="create-necessary-aws-resources"></a>

We’ll need to create 2 AWS resources, namely an IAM Policy and User.

* **IAM Policy** - will grant restricted access to deploy to our S3 bucket and create an invalidation on our Cloudfront distribution. You’ll attach this policy to the IAM User.
* **IAM User** - will be the credentials the GitHub Action uses to run its aws-cli commands.

Below is the AWS IAM Policy you’ll need to create. You must modify it by replacing a couple of the items below (make sure to replace the `<` and `>` too).

* `<your-bucket-name>` - Your S3 bucket name (ex: www.acme.com)
* `<your-aws-account-number>` - The 12 numeric characters of your AWS account.
* `<your-distribution-id>` - The alpha numeric 14 characters of your associated Cloudfront distribution

1. In AWS, [create a new IAM Policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/access\_policies\_create-console.html#access\_policies\_create-json-editor)

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Resource": [
                "arn:aws:s3:::<your-bucket-name>",
                "arn:aws:s3:::<your-bucket-name>/*"
            ],
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": [
                "s3:*"
            ]
        },
        {
            "Sid": "VisualEditor2",
            "Effect": "Allow",
            "Action": "cloudfront:*",
            "Resource": "arn:aws:cloudfront::<your-aws-account-number>:distribution/<your-distribution-id>"
        }
    ]
}
    
```

1. [Create a new IAM User with programmatic access](https://serverless-stack.com/chapters/create-an-iam-user.html) and attach the IAM Policy you just created above.
2. Copy the `AWS access key ID` and `Secret access key` to somewhere safe, as we will need these in our next step

### Configure The GitHub Action Secrets <a href="#configure-the-github-action-secrets" id="configure-the-github-action-secrets"></a>

In order to use the special variables like `${{ secrets.AWS_ACCESS_KEY_ID }}` we’ll need to configure them in the GitHub Actions Secrets. To do this:

1. In GitHub, navigate to **Your Repo > Settings > Secrets > Actions**
2. For each secret below, click the **New repository secret** button, fill out the form, and click **Add Secret**
   * `AWS_ACCESS_KEY_ID` - What you copied in the previous step as `AWS access key ID`.
   * `AWS_SECRET_ACCESS_KEY` - What you copied in the previous step as `Secret access key`.
   * `AWS_S3_BUCKET_NAME` - The bucket name you set previously in your IAM Policy (ex: www.acme.com).
   * `AWS_CLOUDFRONT_DISTRIBUTION_ID` - The Cloudfront distribution id you set previously in your IAM Policy.

<figure>![Github Actions](<https://pagertree.com/assets/img/posts/2021/04/20/github-actions-repo-settings-secrets.png>)<figcaption><p>GitHub Actions Repo Settings Secrets</p></figcaption></figure>

### Testing your new GitHub Action <a href="#testing-your-new-github-action" id="testing-your-new-github-action"></a>

The easiest way to test your new GitHub action, is to:

1. Make a small change to your Jekyll site
2. Commit the change, and push to main.
3. Navigate to your website (https://www.acme.com), do a hard refresh (Ctrl + F5) and then you should see the changes you just made.

What you should see in the GitHub Actions panel, is a workflow that was created, and the output of the commands that were run.

<figure>![Github Action Run Details](<https://pagertree.com/assets/img/posts/2021/04/20/github-action-run-details.png>)<figcaption><p>GitHub Action Run Details</p></figcaption></figure>

**Note: The first time this runs it could take \~5 minutes.** The ‘bundle install’ command for our project took a while, but don’t worry, subsequent builds should use the bundle cache.

## Conclusion

That’s it, you’ve now successfully created a GitHub Action to build and deploy your Jekyll static site to S3 and Cloudfront. I hope you found some value in this tutorial, it’s pretty basic, but if your new to GitHub Actions it should provide a valuable launching pad. Make sure to follow me on [twitter](https://twitter.com/armiiller), and if you haven’t yet, make sure to checkout PagerTree :)

* [GitHub Actions Documentation](https://docs.github.com/en/actions)
