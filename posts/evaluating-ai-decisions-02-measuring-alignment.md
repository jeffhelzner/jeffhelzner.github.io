---
title: "Part 2 — What a measurement of decision quality has to look like"
date: 2026-05-01
author: "Jeff Helzner"
slug: "evaluating-ai-decisions-part-2-measuring-alignment"
description: "A useful measurement of AI decision quality has to be graded, uncertainty-aware, comparable, and tied to a stated account of good decision-making."
summary: "If you're going to measure how well an AI agent decides, the measurement has to do specific work. Four requirements — and one that quietly rules out most of what's on offer."
image: "https://jeffhelzner.github.io/assets/social-card.png"
tags: ["ai","decision-making","insurance","evaluation","series:evaluating-ai-decisions"]
series: "Evaluating AI Decision-Makers Under Uncertainty"
part: 2
draft: true
---

::: {.series-nav}
**Evaluating AI Decision-Makers Under Uncertainty** · Part 2 of 3  
[Part 1](evaluating-ai-decisions-01-why-measure.html) · Part 2 · [Part 3](evaluating-ai-decisions-03-checking-meaningfulness.html)
:::

TL;DR: A measurement of decision quality that can support intervention, comparison, and monitoring has to have a particular shape. It has to be graded, not pass/fail. It has to come with a sense of how much to trust it. It has to mean the same thing across agents and over time. And — the requirement that does the most work — it has to be tied to a *stated* account of what good decision-making looks like in this setting. The first three are obvious once you say them. The fourth is the one most evaluation approaches quietly skip.

*Quick recap:* if you've put an AI agent in a decision-making seat, you'll need to do at least three things repeatedly — adjust the agent and check whether the change helped, choose between candidate agents, and monitor for drift. None of those are doable by eye. Each requires a measurement of decision quality. The obvious shortcuts ("looks reasonable to a senior reviewer," "score it with a classifier trained on past decisions") fail in specific ways. This post is about what kind of measurement actually does the job.

## Back to the triage scenario, with a comparison vignette

You've narrowed your shortlist to two candidate agents for claims triage. Both are LLM-based. One is a frontier model from a major vendor with a carefully engineered system prompt; the other is a smaller, cheaper model with a longer prompt and some retrieval-augmented context from your internal guidelines. You've run both through the same five hundred files. The outputs, on inspection, look broadly similar.

You have to pick one. Procurement wants a defensible reason. Risk wants something they can put in a memo. Your own intuition is "the frontier one feels a little better, but I'm not sure," which is exactly the kind of intuition that doesn't survive contact with a board.

What would a measurement that *did* survive contact with a board have to look like?

## Four requirements

**It has to be graded.**

Real agents aren't decision-quality-good or decision-quality-bad. They're partially good. They handle the routine cases well, get sloppy under specific kinds of ambiguity, miss certain corner cases, perform differently when the file is unusually long. A pass/fail verdict throws away exactly the information you need: the difference between "this agent is 0.3 better than that one on this workload" and "they're indistinguishable" is the difference between a defensible procurement decision and a coin flip in a memo. Every one of the three jobs from the previous post — intervention, comparison, monitoring — depends on being able to detect *gradations* of decision quality. A binary score can't do that work.

**It has to come with a sense of how much to trust it.**

You ran both candidate agents on five hundred files. Suppose the measurement comes back: 0.62 for the frontier model, 0.59 for the smaller one. Is the frontier model better? Maybe. Or maybe the difference is well within what you'd expect from running the same agent on a different five hundred files drawn from the same workload. Without a sense of the noise, the number is a number, not a signal. This matters most in exactly the situations where insurance teams will be using it: smaller pilot samples, monitoring windows that are too short to wait out, comparisons between similar candidates where the right answer is sometimes "we can't tell yet, run more files." A measurement that doesn't tell you when it can't tell you something is worse than no measurement at all, because it produces false confidence on a schedule.

**It has to mean the same thing across agents and over time.**

When you compute the measurement on Vendor A's agent and on Vendor B's, the numbers have to be on the same scale, in the same units, with the same interpretation. When you compute it on the deployed agent in March and again in October, a change in the number has to mean a change in the agent's decision quality and not a change in the workload, the prompt, or what the underlying model happened to do that week. This sounds obvious, but it's the requirement most easily violated by ad-hoc evaluation pipelines. A score that only makes sense relative to the specific batch of files it was computed on, or relative to a particular reviewer's preferences that month, isn't really a measurement; it's a momentary impression with a number on it.

**It has to be tied to a stated account of what good decision-making looks like.**

This is the requirement that does the real work, and the one most easily glossed over. When the measurement says the frontier agent scores 0.62 and the smaller one 0.59, *what is being measured?* What does a higher number actually mean about how the agent is deciding? "More aligned with good decision-making" is only a meaningful answer if you've said what *aligned with what* — what account of good decision-making the measurement is tracking.

This is what the classifier shortcut from the previous post quietly skips. A classifier trained on labelled examples produces a graded score, can be made uncertainty-aware with a bit of work, and reads consistently across agents and over time. It satisfies the first three requirements. What it doesn't satisfy is the fourth: the score measures conformity to whatever pattern the labels happened to encode, and you usually can't say what that pattern is. It's a number whose direction you can read but whose content you can't.

The same problem affects "let a senior reviewer rate the outputs." The reviewer is applying *some* account of good decision-making — but it's implicit, sits in their head, varies across reviewers, drifts over time, and can't be held still for the comparison and monitoring use cases. The measurement isn't tied to a stated account of good decision-making; it's tied to a private one.

The requirement, stated positively, is this: the tool should commit to a specific procedure for how a good decision-maker would combine what they believe about the uncertain consequences of an alternative with what they prefer among those consequences, and the measurement should report how well the agent's choices align with *that* procedure. Higher score = closer alignment to a procedure you've named.

## Why naming the procedure matters

Two reasons, both of which will return in the next post.

First: it's the only way to make the measurement *interpretable*. If you can't say what procedure the score is tracking, you can't say what it means when the score goes up or down. You can't tell a board what an improvement actually consists in. You can't argue with a vendor whose agent scored lower. You can't tell a regulator what your evaluation methodology is. Every downstream use of the measurement depends on being able to say what it's a measurement *of*.

Second: it's the only way to ask whether the measurement is *appropriate for this decision-maker*. If you've named the procedure you're measuring alignment with, you can ask whether the agent's choices actually behave as if they came from a decision-maker more or less aligned with that procedure — or whether they don't, in which case the measurement isn't telling you anything about this agent and you need to know that. If you haven't named the procedure, you can't even ask the question.

That second point is the subject of the next post. It's the part of the picture that the (A) layer — the measurement of alignment described here — doesn't supply on its own.

## What this rules out, and what it leaves on the table

The four requirements together rule out most of the off-the-shelf evaluation approaches that an insurance team is likely to be offered.

Pure human review fails the graded, comparable, and stated-procedure requirements. Classifier-based scoring fails the stated-procedure requirement, which silently undermines the others. "LLM-as-judge" approaches — asking another model to rate the agent's decisions — combine the worst features of both: an opaque procedure (whatever the judge model has internalized about good decisions) plus the noise of model-to-model variation, plus a circularity problem when the judge and the agent share architectural quirks.

What they leave on the table is a class of approaches that *do* commit to a stated procedure for combining beliefs about uncertain consequences with preferences over them, and *do* produce a graded, uncertainty-quantified, comparable estimate of how well the agent's choices align with it. The series isn't picking among such approaches; it's pointing out that the requirements pin down the *shape* of what a useful tool has to deliver, and that the shape is more constrained than it first appears.

## What's missing

Even with all four requirements satisfied, the picture is incomplete.

You've named a procedure. You've measured alignment. The score comes back: 0.62 for one agent, 0.59 for the other, both with reasonable error bars, both on the same scale, both interpretable as alignment-with-the-named-procedure.

But what if the agents aren't actually deciding in a way that's *of the kind* the procedure describes? What if their choice patterns simply aren't the kind of thing that a "more or less aligned" model can fit? Then the score is still a number, but a number from a model that doesn't fit the data. A higher score means the model fit the data slightly better in one place, not that the agent is decisively a better decision-maker.

This is the gap the next post fills. Once you've committed to measuring alignment with a stated procedure, you've taken on a second obligation: to check that the measurement is meaningful for this decision-maker. The two layers — *measuring alignment* and *checking that the measurement is meaningful* — together describe the shape of the tool the series is arguing you need.

## Where this goes next

The next (and final) post in the series takes up the second layer: how to tell whether a measurement of alignment is actually saying something about the decision-maker in front of you, or whether it's a number from a misspecified model. It's the part of the picture that turns the measurement from a score into evidence.
