---
title: "Part 1 - Evaluating decisions, not just outcomes"
date: 2026-05-01
author: "Jeff Helzner"
slug: "evaluating-ai-decisions-part-1-why-measure"
description: "Why accuracy against a labeled test set is not enough to evaluate decision makers under uncertainty."
summary: "A decision can be good even when the outcome is bad, and bad even when the outcome is good. That distinction matters when evaluating AI-assisted decisions under uncertainty."
image: "https://jeffhelzner.github.io/assets/social-card.png"
tags: ["ai","decision-making","insurance","evaluation","series:evaluating-ai-decisions"]
series: "Evaluating AI Decision-Makers Under Uncertainty"
part: 1
draft: true
---

::: {.series-nav}
**Evaluating AI Decision-Makers Under Uncertainty** · Part 1 of 3  
Part 1 · [Part 2](evaluating-ai-decisions-02-measuring-alignment.html) · [Part 3](evaluating-ai-decisions-03-checking-meaningfulness.html)
:::

Suppose a decision maker must choose among several alternatives whose consequences are uncertain. We may have a view about how such a decision ought to be made: the decision maker should represent the possible consequences of each alternative, assign beliefs or probabilities to those consequences, evaluate them according to its preferences, and choose in a way that is appropriately responsive to both its beliefs and its preferences.

If we have such a view, then we have a corresponding evaluation problem. We can ask whether an observed decision maker is choosing in a way that is consistent with that view.

That question is not the same as asking whether the decision maker was accurate on a labeled test set.

This distinction is the starting point for the series. The motivating application is AI-assisted decision making, especially in insurance settings such as underwriting or claims triage. But the point is more general. The decision maker might be a person, a model, an AI agent, or a human-machine process. In each case, if the decision is made under uncertainty, then evaluating the decision maker requires care about what exactly is being evaluated.

## Decisions and outcomes

In many practical settings, the quality of a decision cannot be read directly from the outcome that happens to follow it.

Consider a claims triage example. A system is asked to decide whether a claim should be routed to ordinary handling or escalated for more specialized review. At the time of the decision, the system does not know the full severity of the claim, whether litigation will occur, whether the claimant's condition will develop unexpectedly, whether documentation is complete, or whether early signals of complexity are meaningful. It has evidence bearing on these questions, but not the answers themselves.

Later, an outcome is observed. The claim may settle uneventfully, or it may become expensive and complex. That outcome matters. It is evidence. But it is not identical to the quality of the original triage decision.

A good decision can lead to a bad outcome. A claim may look routine on the available evidence and nevertheless deteriorate for reasons no reasonable decision procedure could have anticipated. A bad decision can also lead to a good outcome. A claim may be mishandled at the triage stage and nevertheless resolve favorably because later events happen to break in the insurer's favor.

This is not a subtle distinction in decision analysis. It is one of the basic reasons decision theory is needed at all. Decisions are made before uncertainty is resolved. Outcomes are observed after uncertainty is resolved. A serious evaluation of decision making has to respect that difference.

## What labeled accuracy can and cannot tell us

The natural response is to evaluate the system on a labeled test set. If a collection of historical claims has labels indicating the correct triage decision, then we can ask how often the system agrees with the labels. This is a useful exercise when the labels are available, when their provenance is understood, and when agreement with those labels is the evaluative target.

But labeled accuracy does not by itself settle the question of decision quality.

First, a labeled test set may not exist. In many decision problems, the relevant outcomes arrive slowly, incompletely, or in forms that are difficult to connect cleanly to the original decision. Insurance examples are common in this respect. A triage decision may be made today, while the information needed to assess its consequences unfolds over months or years.

Second, labels can be costly. If the labels require review by senior underwriters, claim adjusters, physicians, attorneys, or other domain experts, then producing a large labeled set is not merely a technical step. It is an operational project. The cost matters, especially if the evaluation is meant to be repeated as systems, workloads, and business conditions change.

Third, labels may reflect judgment rather than fact. In a claims triage setting, a label may record what one expert reviewer thought should have been done. Another expert might have labeled the same case differently. A committee might have reached a compromise. A historical label may encode local practice at a particular time, not a stable standard of good decision making.

Fourth, labels may reflect outcomes in a way that conflates decision quality with luck. If a claim did not escalate, the associated triage decision may be labeled correct. But perhaps it was a poor decision that happened not to be punished. If a claim did escalate, the triage decision may be labeled incorrect. But perhaps it was a reasonable decision given the information available at the time.

These are not objections to test sets. They are objections to treating test-set accuracy as if it exhausted the evaluation problem.

## Two different questions

It is helpful to separate two questions that are often run together.

The first question is external:

> Did the decision maker's choices agree with the labels or outcomes we are using as our benchmark?

The second question is procedural:

> Did the decision maker combine information about alternatives, uncertain consequences, and preferences in a way that is consistent with a stated standard of choice?

Both questions can matter. The first is often indispensable. If a system performs poorly against carefully constructed labels, that is important evidence. No evaluation framework should pretend otherwise.

But the second question is different. It asks whether the decision maker's choices have a certain kind of internal structure. Are the choices responsive to changes in probabilities in the way the standard says they should be? Are they responsive to changes in consequences or utilities? Do they treat materially similar tradeoffs similarly? Do they choose as if beliefs and preferences are being combined according to a principled rule?

These questions can be asked even when a definitive labeled test set is unavailable. They can also be asked when labels are available but incomplete, costly, judgment-dependent, or tied too closely to realized outcomes.

## Why this matters for AI-assisted decisions

AI systems make the distinction more pressing, but they do not create it.

In a human-only process, decision makers often carry implicit standards with them. A senior adjuster may not write down a formal decision rule, but years of experience, institutional training, and professional norms constrain how evidence is interpreted and how tradeoffs are made. Those constraints may be imperfect, variable, and difficult to audit, but they are part of the practice.

When an AI system is added to the process, especially one that produces recommendations or triage decisions at scale, the need for an explicit evaluative standard becomes harder to avoid. It is no longer enough to say that the outputs look plausible, or that they usually match historical labels. We need to know something about the basis on which the system is making distinctions among alternatives.

This does not mean that every AI-assisted decision process must be reduced to a formal decision-theoretic model. It means that if we have a view about how a decision maker should combine beliefs and preferences under uncertainty, then we should be able to ask whether the observed decision maker is behaving consistently with that view.

That is the question this series is concerned with.

## The role of a stated standard

To ask whether a decision maker is deciding well in this procedural sense, we need to state the standard relative to which the assessment is being made.

For example, one possible standard is subjective expected utility theory. On that view, a decision maker represents uncertainty probabilistically, assigns utilities to possible consequences, and chooses alternatives according to expected utility. There are well-known debates about the scope and interpretation of this standard. The point here is not to settle those debates. The point is that SEU gives us a clear example of a stated procedure for combining beliefs and preferences under uncertainty.

Once a standard is stated, a new kind of evaluation becomes possible. We can ask not only whether the decision maker matched labels, but whether its choices are consistent with that standard. We can ask how close the choices are to the standard. We can ask how consequential departures from the standard are. We can ask whether the observed choices are even the kind of choices for which the standard provides a useful model.

Those are different questions from accuracy. They do not replace accuracy. They supplement it by addressing a dimension of decision quality that accuracy alone can miss.

## Where this goes next

The next post makes the role of the stated standard more explicit. If we want to assess a decision maker procedurally, we need to say what ingredients the decision maker is supposed to combine and what rule or standard governs the combination.

That leads naturally to beliefs, preferences, alternatives, and uncertain consequences. It also explains why SEU is a useful reference point for this series: not because it is the only possible account of rational choice, but because it gives a precise and well-studied account of how a decision maker might be expected to choose under uncertainty.
