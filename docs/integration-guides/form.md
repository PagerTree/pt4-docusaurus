---
description: >-
  Create a PagerTree hosted form using our Form Integration. Great for allowing
  customers to enter alerts on a public page.
---

# Form

| Company                                 | Estimated Time | Vendor Docs     | Open Source                                                                                                             |
| --------------------------------------- | -------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [PagerTree LLC.](https://pagertree.com) | 1 minute       | [view](form.md) | [v3.rb](https://github.com/PagerTree/pager\_tree-integrations/blob/main/app/models/pager\_tree/integrations/form/v3.rb) |

## How It Works

* When a form is submitted, an alert is created in PagerTree automatically.

## Integration Walkthrough

In this integration tutorial we will show you how to create a form integration in PagerTree. The estimated time for this integration is 1 minute. We assume that you already have a PagerTree account setup.

### In PagerTree

1. [Create the integration](introduction.md#create-an-integration) by clicking the **Form logo**.
2. Configure options for your form (see [form options section below](form.md#form-options)).
3. **Copy** the **CNAME URL**.

You have successfully completed the Form Integration. You can now test the integration.

**Test the Integration**

:::info
To view the form, you must be logged out of PagerTree. An easy method is to use an **Incognito Window in Chrome or Firefox.**
:::

1. In **Chrome or Firefox**, paste the **CNAME URL** in the **location bar** and click **Enter**. (Please note: the first rendering of this page might be slow, this is because PagerTree is self signing certificates to make this a secure connection. Subsequent renders will be faster).
2. In the form, enter the details requested.
3. **Click Submit**.

If everything was configured correctly, you should now see a new alert in PagerTree.

### Form Options

The form integration has the ability to require (or not require) specific fields. Below is the list of options described in detail.

| Figure | Option               | Description                                                                                                             |
| ------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| 1      | Form Title           | The HTML title attribute. This is what is displayed in the top of a users browser tab. Also used for names of bookmarks |
| 2      | Form Header          | The H1 title of the form. This is the bold text at the top of the form                                                  |
| 3      | Form Instructions    | The instructions for the form. This is the text below the header                                                        |
| 4      | Footer Text          | The text displayed at the bottom of the form. Can be used in combination with Footer Link. (ex: “mycompany.com”)        |
| 5      | Footer Link          | A url that the Footer Text links to (ex: “https://mycompany.com”). Footer Text is required for this option to work      |
|        | Email Required       | Should the submitters email be required?                                                                                |
|        | Phone Required       | Should the submitters phone be required?                                                                                |
|        | Description Required | Should the description of the alert be required?                                                                        |
|        | Urgency Required     | Should the urgency be required? (If the urgency is not required it will be hidden)                                      |
| 6      | CNAMES               | See [section below](form.md#configure-a-cname)                                                                          |

<figure>![PagerTree Form (with annotations)](<../.gitbook/assets/image (1) (3) (3).png>)<figcaption><p>PagerTree Form (with annotations)</p></figcaption></figure>

### **Configure a CNAME**

You can configure a CNAME for your form so it can be hosted under your own domain (https://support.example.com).

:::info
Please create the CNAME in your DNS first. Self signed certificates depend on the CNAME existing before its configured in PagerTree.
:::

#### **In your DNS provider**

1. Create a **CNAME record** of your choice pointing to **forms.pagertree.com** (ex: support.example.com -> forms.pagertree.com). Consult your DNS provider’s documentation for specific instructions on creating CNAME records.

| Record | Name    | Target              |
| ------ | ------- | ------------------- |
| CNAME  | support | forms.pagertree.com |

#### **In PagerTree**

1. Navigate to the edit integration page.
2.  In the **CNAMEs section, add your CNAME** (ex: support.example.com)

    <figure>![PagerTree CNAME](<../.gitbook/assets/image (20).png>)<figcaption><p>Add the CNAME.</p></figcaption></figure>
3. **Click Update.**
4.  From the integration page, **copy the CNAME URL**.

    <figure>![PagerTree CNAME URL](<../.gitbook/assets/image (16).png>)<figcaption><p>Copy the CNAME URL.</p></figcaption></figure>
5. **Paste** the **URL** in the **location bar** of a browser you are not signed into (ex: you can use incognito mode).

***
