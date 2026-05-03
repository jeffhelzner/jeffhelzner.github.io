---
title: "Part 3 - Measuring departures from a decision standard"
date: 2026-05-01
author: "Jeff Helzner"
slug: "evaluating-ai-decisions-part-3-checking-meaningfulness"
description: "Why sensitivity to departures from a stated decision standard matters for evaluating decision makers under uncertainty."
summary: "Real decision makers rarely satisfy an idealized standard exactly. The practical question is how consequential their departures from that standard are."
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

The first post argued that accuracy against labels does not exhaust the evaluation of decisions under uncertainty. The second argued that a procedural assessment requires a stated standard for combining beliefs and preferences. Subjective expected utility theory is one possible standard: precise, familiar, and strong enough to make the assessment question well defined.

But even after a standard has been stated, a further question remains. Real decision makers will rarely satisfy an idealized standard exactly. This is true of human decision makers, algorithmic systems, and human-machine processes. Exact conformity is usually too much to expect and, in many applications, too crude an evaluative target.

The practical question is not only whether a decision maker departs from the standard. It is how much the departure matters.

That is the motivation for a sensitivity framework.

## From violation to sensitivity

Suppose we use SEU as the stated standard. One possible evaluation would ask whether the decision maker's choices satisfy the standard. In a formal setting, this might be treated as a yes-or-no question. Are the choices representable as maximizing expected utility relative to some probability and utility assignments, subject to whatever constraints the model imposes?

For practical evaluation, that binary question is often too blunt.

A decision maker may depart from SEU in ways that have little effect on the choices that matter. Another decision maker may depart from SEU in a small number of cases, but those cases may involve high-stakes tradeoffs. A third decision maker may satisfy the standard across routine cases while failing badly in cases involving low-probability severe consequences. Treating all of these as simple failures misses the point.

Sensitivity asks a more graded question:

> How much do the relevant choices, values, or outcomes change as the decision maker departs from the stated standard?

This question is especially important when the standard is idealized. The value of an idealized standard is not only that it allows us to classify behavior as conforming or nonconforming. Its value is that it provides a reference point from which departures can be measured.

## Why departures are not all alike

Consider again the claims triage example.

One system may be slightly inconsistent in how it handles close cases. When the expected values of ordinary handling and escalation are nearly equal, it sometimes chooses one and sometimes the other in a way that does not fully track the SEU calculation. This is a departure from the standard. But if the alternatives are genuinely close, the practical effect may be limited.

Another system may be well behaved in ordinary cases but insensitive to low-probability, high-severity outcomes. It may under-escalate claims where severe downstream consequences are unlikely but very costly. This may also appear as a departure from SEU, but it is a more consequential one.

A third system may match historical labels at a high rate while systematically using a different tradeoff than the one the organization endorses. It may agree with labels because the test set contains many routine cases, while its departures from the stated standard become important only in unusual or high-stakes cases.

These differences matter. They are not captured by a single accuracy score. They are also not captured by a binary test of conformity to a decision standard.

What we want to know is where the decision maker is sensitive to the standard, where it is insensitive, and how much the departures affect the choices we care about.

## Sensitivity and assurance

This gives procedural evaluation a role that is different from ordinary validation against labels.

A labeled test set can provide evidence about how often a system agrees with a benchmark. A sensitivity analysis can provide evidence about the structure of the system's decision behavior. It can tell us whether the system's choices are stable under changes in probabilities or utilities. It can tell us whether departures from a standard are concentrated in parts of the decision problem that matter. It can tell us whether two systems with similar accuracy scores differ in their responsiveness to the decision-theoretic quantities we care about.

This is a different dimension of assurance.

It is not a substitute for outcome analysis, expert review, operational monitoring, or legal and ethical assessment. But it addresses a question those forms of evaluation may leave open: whether the decision maker is behaving in a way that is meaningfully connected to a principled account of choice under uncertainty.

For AI-assisted decisions, this is especially useful because apparent performance can be misleading. A system may do well on a test set for reasons that do not generalize. It may reproduce historical labels without representing the underlying tradeoffs appropriately. It may appear plausible to reviewers while being unstable in regions of the decision problem that were not heavily sampled. Sensitivity analysis gives us a way to probe these possibilities.

## What a sensitivity framework needs

A useful sensitivity framework for this purpose needs several features.

First, it needs a stated reference standard. Without a standard, there is no well-defined notion of departure. In the SEU case, the reference standard is the expected-utility rule for combining subjective probabilities and utilities.

Second, it needs a graded measure. The question is not merely whether the decision maker violates the standard, but how far it departs and how much the departure matters for choice.

Third, it needs uncertainty quantification. Observed choices are finite and noisy. If we estimate sensitivity from a sample of decisions, we need to know how much confidence to place in the estimate.

Fourth, it needs diagnostics of fit. A model can produce a number even when it is not a good model of the decision maker's behavior. If the observed choices are not meaningfully related to the structure assumed by the framework, then the resulting measure should not be treated as evidence of decision quality. The assessment must include checks on whether the model is adequate for the decision maker and decision problem at hand.

These requirements are methodological rather than cosmetic. They are what make the difference between a score that is merely assigned to a system and an analysis that says something interpretable about how the system decides.

## The SEU Sensitivity project

The [SEU Sensitivity project](https://jeffhelzner.github.io/seu-sensitivity/) is one attempt to make this kind of assessment operational.

The project uses SEU as a reference point. It does not require the stronger claim that SEU is the only possible standard for rational choice. Rather, it asks what can be learned by treating SEU as an explicit standard and examining how sensitive decisions are to departures from it.

In that sense, the project is motivated by the argument of this series:

- If decisions are made under uncertainty, outcome accuracy alone does not settle the question of decision quality.
- If we have a view about how beliefs and preferences should be combined, we can assess choices relative to that view.
- If the stated view is SEU, then departures from SEU can be studied not only as violations, but as quantities whose practical significance can vary.
- If those departures can be estimated with uncertainty and checked for adequacy, they provide a useful complement to labeled accuracy, expert review, and outcome-based validation.

The broader point is not limited to SEU. Any serious procedural assessment needs to say what standard it is using and what kind of departure from that standard matters. SEU is a natural starting point because it is precise, well studied, and directly concerned with the combination of beliefs and preferences under uncertainty.

## What follows

The initial series has been concerned with the prior question: why evaluate decision makers in this way at all?

The answer is that some important evaluation questions are not answered by labeled accuracy. We may want to know whether a decision maker is using information in a way that is consistent with a stated account of good decision making. We may want to know how consequential its departures from that account are. We may want to compare systems not only by whether they match historical labels, but by how their choices respond to probabilities, utilities, and tradeoffs.

Those questions arise naturally in AI-assisted decision making, but they are not specific to AI. They belong to the more general problem of evaluating decisions under uncertainty.

Subsequent posts can therefore be more concrete. They can examine the SEU Sensitivity framework directly, work through examples, and ask how this kind of analysis behaves in realistic decision problems. The role of the present series is to make clear why such a framework is worth considering in the first place.
