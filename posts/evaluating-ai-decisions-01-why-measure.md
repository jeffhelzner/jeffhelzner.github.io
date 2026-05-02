---
title: "Part 1 — Why measure how an AI agent decides?"
date: 2026-05-01
slug: "evaluating-ai-decisions-part-1-why-measure"
summary: "If you've put an AI agent in a decision-making seat, you need a way to tell whether it's actually deciding well. Three jobs you can't do without one — and why the obvious shortcuts don't get you there."
tags: ["ai","decision-making","insurance","evaluation","series:evaluating-ai-decisions"]
series: "Evaluating AI Decision-Makers Under Uncertainty"
part: 1
draft: true
---

TL;DR: Suppose you've deployed an LLM-based agent to assist with insurance claims triage. There's a natural sense in which you want it to make *better* decisions, not just plausible-looking ones. Acting on that preference — adjusting the agent, choosing between candidate agents, watching for drift — requires a way to *measure* how well the agent decides. This post is about why that measurement problem is unavoidable, and why the obvious shortcuts ("it looks reasonable," "we trained a classifier on past decisions") don't actually solve it.

## A scenario that probably sounds familiar

You're piloting an LLM-based agent that assists with claims triage. On any given claim it has to weigh things it can't be sure about: how severe the loss really is, whether the documentation hangs together, whether there are signals of fraud, whether this is the kind of file that tends to escalate, what the downstream cost of a misroute looks like. None of these are observable in the moment of the decision. The agent reads the file, weighs what it can, and makes a call.

Most of the time, the calls look reasonable. A senior adjuster, glancing at a sample, would mostly nod. Some of the time, they wouldn't — and that's exactly the point of running a pilot.

The question that pilot is supposed to answer is not "does this agent produce plausible-looking outputs?" It's "is this agent making *good decisions* on these files, and how do we know?"

That second question turns out to be much harder than the first. And it doesn't go away once you decide to use the agent. It becomes a question you'll need an answer to, repeatedly, for as long as the agent is in production.

## Three jobs you can't do without measurement

Three things any team in this position will eventually want to do — and none of them can be done by eye.

**Intervention.** You suspect the agent could decide better. You change the system prompt, swap to a different base model, tighten the temperature, fine-tune on internal examples. You want to know whether the change actually helped. Not whether the outputs *look* better; whether the decisions *are* better. To answer that, you need a number — or something that behaves like one — that you can compute before and after.

**Comparison.** You're choosing between candidate agents. Maybe two LLM vendors with different strengths. Maybe two configurations of the same model. Maybe an off-the-shelf agent against an internally tuned one. Comparing them on a sample of claims and forming an impression won't scale, won't be reproducible, and won't survive a pushback from procurement or risk. You need a measurement that reads the same way across candidates, on the same workload.

**Monitoring.** The agent has been in production for some time. The model behind it gets updated on the vendor's schedule. The mix of claims drifts seasonally. New fraud patterns emerge. You want to know whether the agent's decision quality is holding up, drifting, or quietly degrading. Monitoring requires a measurement you can compute repeatedly, on fresh data, without having to convene a panel of senior adjusters every time.

Each of these — intervention, comparison, monitoring — is blocked without measurement. Each of them is something an insurance team will, in fact, want to do. The measurement problem is not optional; it's the problem you've taken on the moment you put an AI agent in a decision-making seat.

A note on what *rationality* means in this series, since the word is going to come up: I'm using it pragmatically, as a shorthand for "operating expectations for a decision process." I'm not making a philosophical claim about what rationality really is. The question this series is concerned with is not whether good decision-making matters — stipulated: it does — but how to tell whether you're getting it.

## Why the obvious shortcuts don't work

Two shortcuts will occur to anyone reading this. Both are tempting; neither delivers what intervention, comparison, and monitoring actually require.

**Shortcut 1: "Have a senior adjuster look at the outputs."** Useful as a sanity check, and there's no substitute for it as a ground-truth anchor on individual files. But as a measurement, it has known problems. Different judges disagree. The same judge disagrees with herself on a Tuesday vs. a Friday. Most importantly, you can't say what's being measured. "Looks reasonable to Maria" is not a number you can compute before and after a prompt change, or compare across candidate agents on the same workload, or recompute weekly to monitor drift. It also doesn't scale: the volume that makes the agent worth deploying is exactly the volume that breaks human review as a measurement strategy.

**Shortcut 2: "Train a classifier on past decisions."** Tempting, especially for an analytics team comfortable with supervised learning. Label some past triage decisions as good or bad, train a model to predict the labels, run new decisions through it, get a score. The score is graded, scales nicely, and updates on a schedule. Why isn't this the answer?

Because the score doesn't tell you what it's measuring. It tells you how closely the agent's decisions resemble whatever was labelled "good" in the training data. If the labels reflect a particular adjuster's judgment, the score measures conformity to that adjuster. If they reflect outcomes (claims that didn't escalate, didn't get litigated), the score measures conformity to a particular slice of outcomes from a particular period — which conflates good decisions with lucky ones, and silently bakes in whatever distribution shift has happened since. A higher score from such a classifier means *something*, but you can't say what. That's a serious problem when the score is supposed to support a decision about which agent to deploy, or whether a prompt change was an improvement.

The measurement that intervention, comparison, and monitoring actually need has a different shape. It has to give you a graded answer (real agents are partially good at this, not perfectly good or hopeless). It has to come with some sense of how much to trust it (when you're comparing two agents on a hundred files, you need to know whether the difference you're seeing could just be noise). It has to mean the same thing across agents, configurations, and time. And — this is the part the classifier shortcut hides — it has to be tied to a *stated* account of what good decision-making looks like in this setting, so that when the score moves, you can say what moved.

That fourth requirement is the one that does the most work in the rest of the series. It's also the one that turns out to be a feature rather than a constraint, for reasons I'll get to.

## Where this goes next

The next post takes up the question of what a measurement of decision quality has to look like, in the setting where the consequences of a decision are uncertain at the moment it's made — which is most decisions worth measuring, and certainly the situation in claims triage. The post after that takes up a question that the second post leaves open: how do you know your measurement is telling you anything meaningful about *this* decision-maker, as opposed to producing a number from a model that doesn't actually fit how this agent decides?

Together, those two layers — *measuring alignment* and *checking that the measurement is meaningful* — describe the shape of the tool the rest of the series argues you need.
