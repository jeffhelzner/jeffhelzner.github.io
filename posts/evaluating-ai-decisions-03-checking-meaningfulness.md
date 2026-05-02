---
title: "Part 3 — Is the measurement telling you anything?"
date: 2026-05-01
author: "Jeff Helzner"
slug: "evaluating-ai-decisions-part-3-checking-meaningfulness"
description: "A measurement of alignment is useful only if it is meaningful for the decision-maker in front of you."
summary: "A measurement of alignment is only useful if it's meaningful for the decision-maker in front of you. The second layer of the tool is the part that tells you whether the number is evidence or noise."
image: "https://jeffhelzner.github.io/assets/social-card.png"
tags: ["ai","decision-making","insurance","evaluation","model-adequacy","series:evaluating-ai-decisions"]
series: "Evaluating AI Decision-Makers Under Uncertainty"
part: 3
draft: true
---

::: {.series-nav}
**Evaluating AI Decision-Makers Under Uncertainty** · Part 3 of 3  
[Part 1](evaluating-ai-decisions-01-why-measure.html) · [Part 2](evaluating-ai-decisions-02-measuring-alignment.html) · Part 3
:::

TL;DR: A graded, uncertainty-quantified, comparable measurement of how well an agent's choices align with a stated procedure is necessary, but not sufficient. The measurement comes from a model of how a more-or-less aligned decision-maker would choose. If the agent in front of you doesn't actually decide in a way that model can fit, the score is a number from a misspecified model — directionally readable, but not evidence of anything in particular. The second layer of a useful tool is an *adequacy check*: it tells you whether the measurement is meaningful for this decision-maker. With both layers in place, you have something that can support intervention, comparison, and monitoring as evidence rather than as decoration.

*Quick recap:* a measurement of decision quality that can support intervention, comparison, and monitoring has to be graded, uncertainty-quantified, comparable across agents and over time, and tied to a stated procedure for how a good decision-maker would combine beliefs about uncertain consequences with preferences over them. Call that the *measurement-of-alignment* layer — the (A) layer for the rest of this post. This post is about a second layer that the first one needs in order to be trustworthy.

## Back to triage, with a monitoring vignette

The agent has been in production for nine months. You've been recomputing the alignment measurement on a rolling window — last quarter's claims, refreshed weekly. The number has been hovering around 0.62 for most of the year. In the last six weeks it's drifted down to 0.55. The error bars say the drop is real, not noise.

Here's the question that will land on your desk: *what does the drift mean?*

There are at least three live possibilities.

- **The agent has actually gotten worse.** The vendor pushed a model update; the new version handles your file mix less well; decisions that used to track the procedure you've named are now tracking it less reliably. This is the reading that justifies action.

- **The workload has shifted.** A new line of business is sending different kinds of files into the queue. The agent's underlying decision behavior hasn't changed, but the procedure you're measuring alignment against fits this new mix less well — perhaps because the new files involve trade-offs the procedure doesn't handle, or because the decisions on these files are driven by considerations the procedure doesn't represent. The agent isn't worse; the *measurement* fits less well on this slice.

- **The measurement was never really fitting.** It produced a stable number for nine months, but the number came out of a model that didn't actually capture how the agent decides. The drop reflects a change in the data, not a change in the agent's decision quality, because the model was tracking surface features the whole time.

The (A) layer can't, by itself, tell you which of these is happening. It can tell you the score moved. It can tell you the move is bigger than the noise. It can't tell you whether the move is evidence about *the agent's decision quality* or evidence about *the model's fit to the situation*. Distinguishing those two things is the job of a second layer.

## What a measurement of alignment actually rests on

To produce a number, the (A) layer commits to something more than a procedure. It commits to a *model* — an account of how a decision-maker who is more or less aligned with the procedure would make choices. The score is the answer to a specific question: *if this agent were more or less aligned with the named procedure (and decided the way the model says such decision-makers decide), how aligned would it have to be to produce the choices we actually saw?*

That question has an answer regardless of whether the model is the right model for this decision-maker. You can fit a model to a sequence of coin flips that says "this agent is 0.62 aligned with the laws of arithmetic"; the number will come back, and it will be stable, and it will mean nothing. The model fits the data trivially because the data don't have the structure the model is looking for.

The same problem can arise more subtly with an actual AI agent on actual decisions. The agent's choices may not be of the *kind* the model is built to fit — they may be driven by surface features, by biases the model doesn't represent, by considerations orthogonal to the procedure. The model still produces a number. The number still moves around. None of it is evidence about decision quality, because the model isn't fitting the agent's behavior in any meaningful sense.

This is the misspecification worry, and it's not a hypothetical concern. AI agents in production routinely exhibit choice patterns that look reasonable in isolation but don't add up to behavior of the kind a decision-theoretic model expects. An adequacy check is what gives you a way to detect that.

## What an adequacy check looks like

The adequacy check — call it the (B) layer — is a set of diagnostics that asks whether the model behind the (A) measurement actually fits this decision-maker. There are two natural moves, both expressible in plain language.

**Does the model reproduce the patterns the agent actually exhibits?** Take the alignment estimate that the (A) layer returned. Use it to simulate how the agent would have decided across the cases you ran. Compare those simulated decisions to the agent's real decisions — not on individual files, but on patterns: how often it goes with the obvious call, how it behaves when alternatives are close, how its tendencies shift as the stakes or the uncertainty change. If the model fits, those patterns line up. If it doesn't, they diverge in ways the score itself doesn't reveal.

**Does the model predict choices on cases it hasn't seen?** Hold out some of the agent's decisions when you fit the model. Then ask the fitted model to predict what the agent did on those held-out cases. A model that's actually capturing how the agent decides will predict reasonably well. A model that produced a stable score by fitting noise or surface features will predict poorly on cases it didn't see. This is a familiar move in any kind of statistical modeling, and it has the same status here: a misspecified model can fit the data it was given; it usually can't predict the data it wasn't.

Both moves are checks of the same thing: not "is the agent decision-quality-good," but "is this measurement of decision quality actually a measurement of *this* decision-maker's decision quality, or is it a number from a model that doesn't fit?" The first question is what the (A) layer answers. The second question is what makes the (A) answer worth taking seriously.

## Why the (B) layer requires the procedure to be stated

Here's a point that ties the two layers together. In the previous post, the requirement that the measurement be tied to a *stated* procedure was justified by interpretability — you can't say what a score means if you can't say what it's a score of. There's a second justification that only becomes visible once the (B) layer is in view.

The adequacy check is a check of *fit to a procedure*. To check fit to a procedure, you have to have a procedure to check fit against. If you've left the procedure implicit — as a senior reviewer's intuition does, as a classifier's training labels do, as an LLM-as-judge's pretraining does — there's no fixed thing for the data to fit or fail to fit. The "model" is whatever the judge happens to think today; the question of whether it fits the agent doesn't have a stable formulation.

Naming the procedure is what makes the adequacy check possible at all. The same act that makes the (A) measurement interpretable is the act that makes the (B) check well-defined. The two requirements that initially looked like separate methodological commitments turn out to be the same commitment, with two payoffs.

This is what was meant earlier in the series when I said the precision requirement is a feature, not a constraint. Stating the procedure is the price of admission to a tool that can both measure decision quality *and* tell you when the measurement isn't to be trusted.

## Pulling the two layers together

A useful tool for evaluating AI decision-makers under uncertainty has two layers, and both are needed:

- **(A) Measurement of alignment.** A graded, uncertainty-quantified, comparable estimate of how well the agent's choices align with a stated procedure for combining beliefs about uncertain consequences with preferences over them.
- **(B) Adequacy check.** Diagnostics establishing that the (A) measurement is actually a measurement of *this* decision-maker — that the model behind the score fits the agent's choice patterns and predicts its behavior on unseen cases.

Each of the three use cases from the first post needs both.

- *Intervention.* You changed the prompt and the (A) score went up by 0.04. Was the change an improvement, or did it shift the agent's behavior into a region where the model fits worse and produces an inflated number? Without (B), you don't know.
- *Comparison.* Agent A scores 0.62, agent B scores 0.59, error bars allow the difference. Does the model fit both agents equally well? If it fits A well and B poorly, the comparison isn't really a comparison of decision quality — it's a comparison of one well-fit number to one less-meaningful number. (B) is what tells you whether the comparison is honest.
- *Monitoring.* The (A) score has drifted from 0.62 to 0.55. Returning to the vignette that opened this post: the (B) layer is what lets you tell whether the agent has actually gotten worse, the workload has shifted, or the measurement was never really fitting. Without (B), the drift is a number to react to; with (B), it's evidence about a specific cause.

(A) without (B) is decoration: a score that moves on a schedule without telling you what it's tracking. (B) without (A) is partial: you know the model fits, but you haven't quantified what it says about the agent. The two together are what an evaluation team can stand behind in a memo, in front of a board, or in a conversation with a regulator.

## Where this goes next

This series has argued for the *shape* of a tool, not for any particular tool. The argument has been: if you're going to evaluate AI agents in decision-making roles under uncertainty, the tool you reach for should commit to a stated procedure for combining beliefs and preferences, produce a graded and uncertainty-quantified estimate of alignment with that procedure (the (A) layer), and provide adequacy checks that tell you whether the estimate is meaningful for the agent in front of you (the (B) layer). The shape is more constrained than it looks, and most off-the-shelf evaluation approaches don't have it.

The [SEU Sensitivity project](https://jeffhelzner.github.io/seu-sensitivity/) is one realization of a tool with this shape. It commits to a specific procedure (drawn from classical decision theory), produces a graded estimate of alignment with that procedure with calibrated uncertainty, and includes diagnostics for whether the measurement is meaningful for a given decision-maker. Subsequent posts will work through it in detail, including how it handles each of the use cases this series has been concerned with — intervention, comparison, and monitoring — on actual AI agents.

The point of the present series was the prior question: *what would a tool worth using have to look like?* If that question now has a clearer answer, the series has done its job.
