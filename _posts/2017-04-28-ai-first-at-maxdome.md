---
layout: "post"
title: "AI first @ maxdome"
---

Google ushered a new era with AI first last year. So we started preparing us for this future with a lot of PoC's (= proof of concepts). I will describe a few of them to give you an overview about AI in general, Alexa and Google Assistent in particular.

<!--more-->

## What's AI?

Because AI is a very wide topic let's specify first a bit. AI here means **the way an user interact with a service**: Not with a mobile app or a website, but **with its own natural written or spoken language**. Understanding natural language is an own and very complex topic, so it's good Alexa and Google Assistent do this for us and we focus on linking our business logic to that platforms.

## General Workflow

![General Workflow](/assets/2017-04-28-ai-first-at-maxdome/images/general-workflow.png)

1. An user write/say something
2. The platform (Alexa or Google Assistent) interpret it with the help of some sample utterances to an intent
3. Our business service gets a request with the intent and response with an answer

So what's our part in this workflow? a) Providing the names of the intents together with sample utterances we want to support and b) an API for the request response.

## Build an action

### a) Prepare the platform

I don't give this part to much focus in this post, because its already well documented for both platforms [Alexa (ignore Step#2)](https://developer.amazon.com/blogs/post/TxDJWS16KUPVKO/New-Alexa-Skills-Kit-Template:-Build-a-Trivia-Skill-in-under-an-Hour) and [Google Assistent](https://console.api.ai/api-client/#/getStarted).

### b) API for the business service

#### Step 1: PoC for Alexa

The first thoughts was "keep it simple, just start with a PoC for Alexa". So we prepared the alexa platform and built a RestAPI with our business logic understanding and responding in the [Alexa JSON format](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/alexa-skills-kit-interface-reference). We made a few skills (see [dalexa-maxdome](https://github.com/dragonprojects/dalexa-maxdome)) to try out the different topics: a very basic one, a skill with slots, sessions, pagination and at the end account linking with OAuth 2.0.    

Our learnings:

* It worked!
* It's really easy and streight forward because its just getting and responding JSON
* OAuth 2.0 is cool
* A "Show a comedy" and the TV starts would be nice, but need a lot more effort than we wanted to spend for a PoC
* All of the things worked without changing existing services, new microservice(s) for new features rocks
* The most difficult part was "what's the minimum information does an user need for an asset to know if its interesting". Only the title is not enough, if it's not a well known blockbuster and the description is most times to long. Later in the week, this becomes an own NPM package (see [ai-renderer-maxdome](https://github.com/dragonprojects/ai-renderer-maxdome))

#### Step 2: Think about abstraction

A bit later a Google Home stand on our desktop and of course we wanted to play with it and try out our PoC on that device too.
We thought about support it streight forward by bulding a new microservice with our business logic from scratch understanding and responding in the [Google Assistant JSON format](https://developers.google.com/actions/reference/webhook-format).
But we decided to spend a bit more time and build an abstraction layer to make the business logic independ of the supported platform.

![Abstracted Workflow](/assets/2017-04-28-ai-first-at-maxdome/images/abstracted-workflow.png)

Like you can see in the diagram, we built "connectors" (see [ai-connector-alexa](https://github.com/dragonprojects/ai-connector-alexa) and [ai-connector-apiai](https://github.com/dragonprojects/ai-connector-apiai)) which transforms the platform specific JSON formats to an internal used format for the business logic named "webhook" (see [ai-webhook-maxdome](https://github.com/dragonprojects/ai-webhook-maxdome)). And also the OAuth 2.0 integration got an own service named "oauth" (see [ai-oauth-maxdome](https://github.com/dragonprojects/ai-oauth-maxdome)), luckily both platforms supporting the same account linking concept.

Our learnings:

* It worked!
* New features can independently built in the "webhook" and later supported by the "connectors"
* New "connectors" allow to adopt new platforms very fast and easy
* All the services are very small and easy to test

## Our next steps?

* Let us care about our core business: Streaming, start playing movies on a TV by our voice
* Adopt other platforms with new connectors like Cortana, Siri and bixby. But also non voice platforms like Facebook Messenger and Skype

## Bonus: Alexa's "Tägliche Zusammenfassung" - Flash Briefing Skill API

In Alexa it's possible to choose services which you think are interesting for a daily summary. Then you can just say "Alexa, was gibt es neues" and get for all choosen services the news.
This feature is not like a custom skill where we get a JSON request, it's simply a RSS or JSON feed.
Also for this we made a PoC for maxdome (see [ai-flashbriefing-maxdome](https://github.com/dragonprojects/ai-flashbriefing-maxdome)).

Later in the week: The PoC grew up and ["maxdome - Tipp des Tages"](https://www.amazon.de/maxdome-GmbH-Tipp-des-Tages/dp/B06ZYMH963/) is the first published skill in the "Film & Fernsehen" section with the "Tägliche Zusammenfassung" feature, yeah. :)

Also [ai-flashbriefing-maxdome](https://github.com/maxdome/ai-flashbriefing-maxdome) and the [deployed service](http://ai-flashbriefing-maxdome-prod.a4z2vg6thb.eu-central-1.elasticbeanstalk.com/) moved to the company.

## Summary

AI first is a very wide topic. But with a small managable effort we got a lot of insights to decide if, when and with which scope we want to jump deeper. And in addition the first AI product of us can go live: The "Tägliche Zusammenfassung" for Alexa.

## FAQ

### Why an abstraction layer, API.ai already have Alexa integration?
Yes, but the Alexa integration is only an export of the intent schema and the sample utterances. The webhook which gets the request must still works for both JSON formats and responding in the platform specific format.

### Why spend time into this topic, it doesn't have business value?
Yes, currently we wouldn't sell something over this platforms or generate many new subs. But if Google's vision become true, AI first will be as important as todays "Mobile first" and for our product a must have part. So it's worth to start getting familiar with it.

Later in the week, Amazon and Google push this topic very hard:

* [The new FireTV Stick gets Alexa](https://www.heise.de/newsticker/meldung/Amazons-neuer-Fire-TV-Stick-in-Deutschland-Quadcore-Prozessor-und-Sprachassistentin-Alexa-3631507.html)
* [Many Android smartphones gets Google Assistant](https://www.heise.de/newsticker/meldung/Google-liefert-seinen-Assistenten-fuer-die-Allgemeinheit-aus-3635423.html)

So maybe this topic becomes faster as assumed important for all companies.
