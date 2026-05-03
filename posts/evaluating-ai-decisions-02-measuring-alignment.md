---
title: "Measuring AI Decision Quality: Beliefs, Preferences, and Standards of Choice"
date: 2026-05-01
author: "Jeff Helzner"
slug: "evaluating-ai-decisions-part-2-measuring-alignment"
description: "How beliefs, preferences, alternatives, and consequences define a procedural standard for measuring AI decision quality under uncertainty."
summary: "Accuracy asks whether choices match labels. A procedural assessment asks whether choices are consistent with a stated standard for combining beliefs and preferences under uncertainty."
image: "https://jeffhelzner.github.io/assets/social-card.png"
tags: ["ai","decision-making","insurance","evaluation","series:evaluating-ai-decisions"]
series: "Evaluating AI Decision-Makers Under Uncertainty"
part: 2
draft: false
format:
  html:
    include-in-header:
      text: |
        <link rel="canonical" href="https://jeffhelzner.github.io/posts/evaluating-ai-decisions-02-measuring-alignment.html">
        <meta name="robots" content="index, follow">
        <meta property="og:type" content="article">
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "Measuring AI Decision Quality: Beliefs, Preferences, and Standards of Choice",
          "description": "How beliefs, preferences, alternatives, and consequences define a procedural standard for measuring AI decision quality under uncertainty.",
          "author": {"@type": "Person", "name": "Jeff Helzner", "url": "https://jeffhelzner.github.io/"},
          "datePublished": "2026-05-01",
          "dateModified": "2026-05-02",
          "image": "https://jeffhelzner.github.io/assets/social-card.png",
          "mainEntityOfPage": "https://jeffhelzner.github.io/posts/evaluating-ai-decisions-02-measuring-alignment.html",
          "isPartOf": {"@type": "Blog", "name": "Jeff Helzner", "url": "https://jeffhelzner.github.io/posts/"},
          "keywords": ["AI decision quality", "beliefs and preferences", "subjective expected utility", "decision standards", "uncertainty"]
        }
        </script>
---

::: {.series-nav}
**Evaluating AI Decision-Makers Under Uncertainty** · Part 2 of 3  
[Part 1](evaluating-ai-decisions-01-why-measure.html) · Part 2 · [Part 3](evaluating-ai-decisions-03-checking-meaningfulness.html)
:::

The first post separated two evaluation questions. One question asks whether a decision maker's choices agree with labels, outcomes, or other external benchmarks. The other asks whether the choices are consistent with a stated standard for making decisions under uncertainty.

This second question requires more structure. We cannot assess whether a decision maker is combining information appropriately until we say what information is supposed to be combined, and what counts as combining it appropriately.

For the kinds of decisions considered here, four ingredients are central: alternatives, consequences, beliefs, and preferences.

An alternative is something the decision maker can choose. In a claims triage example, the alternatives might be ordinary handling, escalation to a senior adjuster, referral to a specialized unit, or some other routing decision.

A consequence is a possible result of choosing an alternative. The consequences may include claim severity, litigation risk, cost, handling expense, customer experience, operational burden, or other outcomes relevant to the organization.

Beliefs represent the decision maker's uncertainty about which consequences would follow from each alternative. The decision maker may not know whether a claim will become complex, but it may have evidence that bears on the probability of that happening.

Preferences represent how the decision maker evaluates the possible consequences. Some consequences are better than others. Some errors are more costly than others. Some forms of delay, escalation, or unnecessary review may be acceptable in one context and unacceptable in another.

The general problem is to combine beliefs about uncertain consequences with preferences over those consequences in order to choose among alternatives.

## Why the standard has to be stated

Once the problem is described this way, an evaluative question becomes visible.

Suppose we observe a decision maker choosing among alternatives across many cases. We know, or can specify, the consequences associated with those alternatives. We have some representation of uncertainty over those consequences. We have some representation of the preferences or utilities that matter. We can then ask whether the observed choices are consistent with a particular account of how beliefs and preferences should guide choice.

But the phrase "consistent with good decision making" is not yet precise enough. Different standards can give different answers. A rule that minimizes worst-case loss is not the same as a rule that maximizes expected utility. A rule that treats some constraints as inviolable is not the same as a rule that represents every consideration in a single utility scale. A heuristic that prioritizes speed may disagree with a more comprehensive expected-value calculation.

For this reason, the standard must be stated. Without a stated standard, we do not know what the assessment is an assessment of.

This is one limitation of expert review. Expert review is often valuable, and in many domains it is indispensable. But when an expert says that a triage recommendation looks right, the standard being applied may remain implicit. It may depend on professional judgment, local practice, recent experience, or tacit knowledge that is difficult to separate from the individual reviewer.

The same limitation appears in classifier-based evaluation. A model trained to predict labels may produce a useful score, but the score measures conformity to whatever pattern the labels encode. If the labels encode expert judgment, then the score measures conformity to that judgment. If the labels encode historical outcomes, then the score measures conformity to those outcomes. If the labels encode institutional habits, then the score measures conformity to those habits. None of this is necessarily bad, but it is different from measuring consistency with an explicitly stated standard of choice.

## SEU as a reference point

Subjective expected utility theory provides one such standard.

On the SEU account, the decision maker has subjective probabilities over possible consequences and utilities representing preferences over those consequences. The decision maker evaluates each alternative by its expected utility and chooses accordingly.

That is a strong and idealized account of choice under uncertainty. It is also a useful reference point. It makes explicit how beliefs and preferences are to be combined. It gives a precise meaning to the claim that one alternative is preferred to another given the decision maker's probabilities and utilities. It also gives us a way to ask whether observed choices behave as if they were generated by a decision maker following, approximating, or departing from that standard.

The point is not that SEU must be accepted as the final theory of rational choice. There are familiar reasons to be cautious about that claim. Real decision makers may have incomplete preferences, ambiguity-sensitive attitudes, constraints that are not naturally represented as utilities, or institutional objectives that are not well captured by a single expected-utility calculation.

The more modest point is enough for present purposes. If SEU is taken as a stated standard, then we can formulate an evaluation question with more precision:

> To what extent are the observed choices consistent with the choices that would be made by a decision maker combining beliefs and preferences according to SEU?

This is not the same as asking whether the choices are accurate. It is also not the same as asking whether the choices are morally, legally, or operationally acceptable in every respect. It is a narrower question about consistency with a particular decision-theoretic standard.

## What this kind of assessment can show

A procedural assessment of this kind can be useful in several ways.

First, it can identify whether a system is responsive to the quantities that are supposed to matter. If the probability of a severe consequence increases, does the system's choice change in the expected direction? If the cost of a false negative increases, does the system become more willing to escalate? If two alternatives have nearly identical expected value, does the system treat the choice as close rather than sharply determined?

Second, it can distinguish between agreement with labels and agreement with a standard. A system may match historical labels while using features or patterns that are not part of the stated decision problem. Conversely, a system may depart from historical labels in cases where the labels reflect noise, outdated practice, or judgments that are inconsistent with the stated standard.

Third, it can make disagreement more interpretable. If the system departs from the standard, we can ask where and how. Are the departures concentrated in cases with high uncertainty? Are they associated with low-probability high-severity outcomes? Do they reflect underweighting of particular consequences? These are more informative questions than simply asking whether the system was right or wrong.

Fourth, it can support comparison across decision makers, including human, algorithmic, and hybrid decision processes. If the same standard is used, then differences in observed choices can be interpreted relative to that standard rather than relative to shifting reviewer impressions.

These advantages depend on the standard being explicit. A hidden standard cannot do this work.

## What this kind of assessment cannot show

It is equally important to say what a procedural assessment does not show.

It does not show that the stated standard is the only reasonable one. SEU can be used as a reference point without claiming that every departure from SEU is irrational in every context.

It does not show that labels and outcomes are irrelevant. External validation remains important. If a system behaves in a way that is formally consistent with a stated standard but performs poorly in practice, that matters. The point is not to replace empirical validation with decision theory. The point is to add a dimension of assessment that empirical accuracy alone does not provide.

It does not show that a decision maker should be trusted. A system can be consistent with a stated standard and still be wrong about probabilities, wrong about utilities, incomplete in its representation of consequences, or inappropriate for the institutional setting in which it is being used.

Finally, it does not show that real decision makers must satisfy the standard exactly. That expectation would be too strong for most practical purposes. In applications, the more useful question is often not whether a decision maker perfectly satisfies the standard, but how its choices change as it departs from the standard.

That is the question of sensitivity.

## Where this goes next

The next post turns from consistency to sensitivity.

If SEU is used as a reference point, then one possible evaluation asks whether observed choices satisfy the SEU standard. But a binary result is usually not the most useful result. Real decision makers may approximate a standard, satisfy it in some regions of a decision problem and not others, or depart from it in ways that matter more or less depending on the stakes.

The practical question is therefore graded: how consequential are departures from the stated standard? That question motivates the SEU Sensitivity project.
