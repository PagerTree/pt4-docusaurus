---
description: >-
  An effective on-call schedule is key to minimizing downtime and sustaining a
  healthy on-call culture.
---

# On-Call

## What is on-call?

* **On-call** - is the practice of designating specific people to be available during specific times to be able to respond to an [incident](../) (even if outside of normal working hours).
* **On-call schedule** - is a schedule that ensures the right person is always available to quickly respond to incidents and outages.

On-call is a critical responsibility for many IT, [DevOps](../devops/what-is-devops.md), and  Support Operations teams that maintain services demanding 24/7 [availability](https://pagertree.com/learn/devops/what-is-devops/top-25-devops-interview-questions#id-24.-what-is-high-availability-ha).&#x20;

Team members take turns "being on-call", to provide coverage around the clock or outside of business hours. The person on-call is empowered to [identify, respond, and resolve](../#steps-of-the-incident-management-process) any interruptions to service availability.

## The importance of effective on-call schedules

An effective on-call schedule ensures customers are confident they they'll get a quick and consistent support for any potential incidents. It minimizes risk for missed issues, and keeps employees from burnout.

Benefits of a sustainable on-call schedule:

* Well-rested individuals who perform better
* Improved team culture
* Higher employee retention and satisfaction
* Better customer support
* Increased bottom line
* Faster response times
* Better work-life balance
* Less burnout

## Building an effective on-call plan

When creating an on-call schedule there is no one size fits all model. Each organization and team are different, and your on-call schedules should reflect that. Companies with locations around the world will operate very differently than teams in a single location. For on-call schedules to be effective, they need to be tailored to your organization, team, and responsibilities.

### Talk to your team

Every team is different and so will be their priorities. Talk to your team members to understand individual needs and situations. Understand how your team works. There might be a consensus on what on-call should look like. For example, a team might agree to weekly rotation schedule where individuals are on-call seven days in a row, maybe it's just one. Work with your team, to figure out what works best for everyone.

For management, ensure on-call duties are being balanced among team members and make sure to provide individuals plenty of training. Make sure to [clearly defined on-call responsibilities](on-call.md#clearly-define-on-call-responsibility) and get buy in from your the teams themselves. Lastly, always be listening to your team, [iterating and improving](on-call.md#iterate-and-improve) your on-call schedule and processes based on their feedback.

### Clearly define on-call responsibility

Responsibilities during on-call should be clearly defined and documented.&#x20;

A couple of questions to consider:

1. How will the team assign on-call shifts (daily, weekly, follow-the-sun, ...)?
2. What is the maximum amount of time a user can be on-call during any given period?
3. Will individuals be on-call overnight?
4. If on-call overnight, is there flexibility to work from home the next day? Can the engineer start work later if they need to catch up on sleep?
5. Are there differences between working hours and non-working hours responsibilities and response times? What is considered urgent?
6. What are an individual's [SLAs/SLOs](https://pagertree.com/learn/incident-management/sla-vs-slo-vs-sli) when being on-call?
7. How will the team address dynamic schedules such as vacations and personal time?
8. What is the compensation model for individuals that go on-call?
9. Can individuals do "regular" work while on-call? If so, how are their deliverable dates affected?

A well documented on-call plan that spreads responsibilities out fairly across a competent team can go a long way to prevent burnout, confusion, and frustration. It can also reassure new recruits that your organization has its on-call management under control. With a documented plan you can be completely transparent during the interview process and make sure candidates are ready for the commitment to on-call work.

### Have primary and secondary responders

Life doesn't stop just because a person is on-call. To prevent an incident from going unsolved and possibly causing damages, it's a good idea to have a secondary (or "back-up") on-call responder.&#x20;

Secondary on-call takes a lot of the stress off the primary on-call, knowing they have a backup they can contact and are not the single point of failure. For the business, this adds a layer of redundancy in the on-call process.

### Iterate and Improve

Teams are not static things, and your on-call schedule shouldn't be either. Your organization and team should be continually reviewing, refining, and improving your on-call schedules and processes.

Focusing on [incident metrics](how-to-calculate-mttr-and-other-common-incident-recovery-metrics.md) is a good place to start, but you'll also want to improve what directly influences the well-being of on-call engineers:

* Total number of alerts - Is the current number of alerts manageable for your team size? Should your team refine the definition of an alert? Or maybe add more team members?
* Reducing false positives - How many alerts were not actionable or even an issue? How can the false positives be prevented? (automation, changing alert conditions, ...)
* De-duplicating related alerts - Can duplicated alerts be grouped? Are engineers already aware of the issue?

In general, the fewer alerts a person on-call receives, the less likely they are to develop alert fatigue.

## Common Mistakes

### Forcing a one-size-fits-all approach

Each organization and team is different. Large companies with locations around the world will operate very differently from small companies with a single location. There's not a one-size-fits-all approach to on-call. Use best practices as a starting point, then [talk to your teams](on-call.md#talk-to-your-team) to tailor your own[ on-call schedules](https://pagertree.com/features/oncall-scheduler/) and processes.

### Inflexible schedules

There are times when schedule changes will need to be made (personal emergencies, change of plans, vacations). People may need to swap shifts. Maybe the current rotation just isn't working for the team. Don't be afraid to [revisit the schedule and modify](on-call.md#iterate-and-improve). Letting a team have the flexibility to make changes will improve the overall team spirit and empower team members to support each other.

### Alert everyone all the time

Alerting rules need to be designed properly and then continuously refined to avoid overloading on-call teams. Knowing whether an alert is worth waking up a developer in the middle of the night or can wait until morning can make the difference between happy engineers with fast response times and alert-frustrated teams who dread the on-call responsibility.

### Relying solely on operational engineers or subject matter experts

Relying on any one small group or person to handle your full on-call needs is a recipe for burnout. From a business perspective, it is also risky to have a single point of failure.

People need time off. Teams should share the responsibility of being on-call. Consider the "you build it, you support it" setup. This way, the engineers building the service are incentivized to ship stable, supportable code.

### Ignoring work-life balance

A healthy work-life balance increases loyalty and commitment to employers. An unhealthy work-life will do the opposite. As you work with your team to tailor your on-call schedules, make sure to set realistic expectations of what it means to be on-call.
