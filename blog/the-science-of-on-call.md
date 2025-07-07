---
date: 2022-12-15
authors: ycheng
description: >-
  Over the past decade, multiple scientific studies have confirmed what we in
  DevOps have known for ages, being on-call is a pain! But just how bad is it?
---

# 🧠 The Science of On-Call

Over the past decade, multiple scientific studies have confirmed what we in DevOps have known for ages: Being on-call is a pain! But just how bad is it?

<!-- truncate -->

## How bad is it? <a href="#increased-cortisol-stress" id="increased-cortisol-stress"></a>

### Increased Stress <a href="#increased-cortisol-stress" id="increased-cortisol-stress"></a>

![Symptoms of high cortisol levels infographic](https://pagertree.com/assets/img/posts/2018/03/26/symptoms-of-high-cortisol-levels-infographic.png)

After a long night on-call, we’re bound to be just a little bit on edge. A bit snappier with the kids, a little bit snarkier with our colleagues. Some people think we’re just grumpy and ornery, but as it turns out, there’s a pretty legitimate reason for it. [Studies](https://www.apa.org/pubs/journals/features/ocp-ocpa0039602.pdf) show that when we’re on call, we tend to start the day with increased cortisol levels. That’s right. Cortisol. Our favorite stress hormone.

Now to be fair, Cortisol can be a good thing. It’s the hormone that drives our fight or flight response and gets us off our butts and moving throughout the day. But too much cortisol, and it puts us in a fightin’ mood. [Studies](https://issuu.com/dartmouth\_science/docs/dujs\_10f) have even shown that heightened cortisol levels over extended periods of time can contribute to some pretty unpleasant health issues!

### Decreased Mood and Energy <a href="#decreased-mood-and-energy" id="decreased-mood-and-energy"></a>

![On-call burnout](https://pagertree.com/assets/img/posts/2018/03/26/oncall-burnout.png)

As if waking up stressed wasn’t bad enough, being on-call also affects our mood. Participants in the study were more likely to feel unpleasant, restless, and without energy after a night on-call. It’s a bit of a paradox; that feeling of being restless AND without energy at the same time. But we’ve all been there, haven’t we? We’re too exhausted to collaborate, but when we actually sit down at our desks we’re too restless to focus. Wired but tired, we bounce back and forth all day trying to figure out what the issue is, and we finally just chalk it up to an off day at work.

### Disrupted Sleep <a href="#disrupted-sleep" id="disrupted-sleep"></a>

![On-call lost sleep](https://pagertree.com/assets/img/posts/2018/03/26/oncall-lost-sleep.png)

Of course getting an alert at three in the morning is going to disrupt your sleep. But what you probably didn’t know is that getting that call might actually be the preferred scenario. Sure it’s going to ruin your night, but at least your manager (and your team) knows you were up late resolving an incident. And hopefully you’re getting appropriate compensation, kudos for saving the day, and a bit of a pass for being a bit on edge the following day.

But the painfully unappreciated scenario is actually what happens every other night when your rest gets ruined by the mere anticipation of getting a call. [Studies](https://onlinelibrary.wiley.com/doi/pdf/10.1111/jsr.12519) repeatedly show that on-call employees experience disrupted sleep and poor quality rest regardless of whether or not a call is actually received. But alas, no one says _“thanks for anticipating a call last night”..._

### What’s the Verdict? <a href="#whats-the-verdict" id="whats-the-verdict"></a>

When you put it all together, on-call is even worse than we thought! If it was just the actual incident that was disruptive, at least those don’t happen too often. But the science is conclusively telling us that the mere possibility that you might get a call, regardless of whether or not it happens, is painful! Just the anticipation of an incident is enough to keep us on our toes, in work-mode, and unable to rest and refresh. The lingering effects of on-call spill over to the next day, and the next, and the next, leaving us stressed out, restless, and exhausted.

Chances are, either you or your team is currently suffering through the effects of on-call scheduling. But systems don’t wait until the morning shift to crash, and they certainly don’t fix themselves! _So what can we do?_

## The On-Call Solution <a href="#detachment-dont-worry-so-much" id="detachment-dont-worry-so-much"></a>

### Detachment: Don’t Worry So Much! <a href="#detachment-dont-worry-so-much" id="detachment-dont-worry-so-much"></a>

![On-call detachment](https://pagertree.com/assets/img/posts/2018/03/26/oncall-detachment.png)

_The studies indicate that employees who were able to detach themselves from work demonstrated the ability to rest and refresh even while on-call._ Since the mere anticipation of a call is enough to increase stress, decrease energy, and disrupt sleep, empowering employees to truly disconnect until they’re needed frees them from the dreaded anticipation. It’s common sense, really. When employees are free to take their eyes off the phone and actually be present with family and friends, they’re more likely to feel refreshed even after a night on-call.

This ability to detach affects sleep quality too. For example, how well do you sleep when you’re anxious about missing an alarm? Chances are, you’re subconsciously hesitant to enter into deep sleep, and instead, you drift in and out constantly glancing at the clock. But what happens if you set a backup alarm, or better yet stagger three alarms? The redundancy allows for peace of mind, which allows you to detach: worry less, sleep more.

It’s the same idea with on-call scheduling. When you’re the only guy on-call and you’re one missed email away from a SEV-1 production outage, of course you’re going to be anxiously tethered to your phone. But add in multi-channel notifications and smart escalation rules, and all of a sudden you’re not feeling so alone. You’ve got [redundancy](on-call-schedule-rotations.md), and you’ve got backup. As it turns out, multi-channel notifications and smart escalation rules not only improve [mean time to resolution (MTTR)](https://pagertree.com/learn/incident-management/how-to-calculate-mttr-and-other-common-incident-recovery-metrics#what-is-mttr), but can also help your teams get a better night’s rest.

<figure>![](<.gitbook/assets/image (12).png>)<figcaption><p>On-Call schedule with L1 and L2 (redudancy), rotating every week.</p></figcaption></figure>

### Control: Confidence You’ll Be Okay <a href="#control-confidence-youll-be-okay" id="control-confidence-youll-be-okay"></a>

![On-call confidence](https://pagertree.com/assets/img/posts/2018/03/26/oncall-confidence.png)

The second mitigating factor to offset the anxiety of being on-call was that of control. When on-call employees are confident they’ll be able to resolve an incident, they’re less likely to expend energy dreading the call. If it comes, it comes - they’ve got it handled. Similar to detachment, the feeling of control allows on-call employees to spend more time enjoying their evenings and less time worrying.

Short of constantly assigning your most senior developers, how do you empower your employees to be in control? Intelligent call routing with configurable teaming allows you to send the right incidents to the right teams at the right time. No need to have a one-developer-fix-all model any longer. Getting the right incidents to the right teams not only ensures higher quality work, but as studies show, on-call employees recover more quickly from a night on-call when they’re confident they’ll be operating within their area of expertise.

### Know Your Schedule <a href="#know-your-schedule" id="know-your-schedule"></a>

Lastly, it’s important to know who’s on call and how often they’re being asked to jump in and help. Maintaining clear lines of communication with your team and evenly distributing on-call shifts not only promote transparency and a sense of shared camaraderie, but also helps to reduce developer burnout over time.

<figure>![](<.gitbook/assets/image (7).png>)<figcaption><p>Know who is on-call!</p></figcaption></figure>

## Summary <a href="#summary" id="summary"></a>

Recent studies have clearly demonstrated the negative effects of being on-call, and the results aren’t pretty. Studies show that the mere anticipation of receiving a call is enough to increase stress, decrease energy, and disrupt sleep. When you’re on-call, your inability to rest and refresh can have severe consequences when sustained over time.

Dev managers can help their employees better recover from a night on-call by empowering them to detach and be confident during their on-call shifts. On-call scheduling done well can provide the necessary infrastructure to help mitigate the negative effects of on-call.

When you’re operating within your realm of expertise with added layers of redundancy and backup, you can finally put down that phone, enjoy dinner with family, and get some much needed rest.

### **References**

* [Extended Work Availability and Its Relation With Start-of-Day Mood and Cortisol](https://www.apa.org/pubs/journals/features/ocp-ocpa0039602.pdf)
* [The Physiology of Stress: Cortisol and the Hypothalamic-Pituitary-Adrenal Axis](https://issuu.com/dartmouth\_science/docs/dujs\_10f)
* [The effect on sleep of being on-call: an experimental field study](https://onlinelibrary.wiley.com/doi/pdf/10.1111/jsr.12519)
