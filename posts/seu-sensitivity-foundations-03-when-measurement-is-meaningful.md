---
title: "When Is an SEU Sensitivity Estimate Meaningful?"
date: 2026-07-01
author: "Jeff Helzner"
slug: "seu-sensitivity-foundations-part-3-when-measurement-is-meaningful"
description: "Why prior checks, parameter recovery, and model adequacy matter before interpreting an SEU sensitivity estimate as evidence about decision quality."
summary: "A model can always produce a number. Before treating a sensitivity estimate as evidence, we need checks showing that the model is adequate for the decision maker, task, and study design."
image: "https://jeffhelzner.github.io/assets/social-card.png"
tags: ["ai","decision-making","subjective-expected-utility","model-adequacy","series:seu-sensitivity-foundations"]
series: "Foundations of SEU Sensitivity"
part: 3
draft: true
format:
  html:
    include-in-header:
      text: |
        <link rel="canonical" href="https://jeffhelzner.github.io/posts/seu-sensitivity-foundations-03-when-measurement-is-meaningful.html">
        <meta name="robots" content="noindex, nofollow">
        <meta property="og:type" content="article">
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "When Is an SEU Sensitivity Estimate Meaningful?",
          "description": "Why prior checks, parameter recovery, and model adequacy matter before interpreting an SEU sensitivity estimate as evidence about decision quality.",
          "author": {"@type": "Person", "name": "Jeff Helzner", "url": "https://jeffhelzner.github.io/"},
          "datePublished": "2026-07-01",
          "dateModified": "2026-05-02",
          "image": "https://jeffhelzner.github.io/assets/social-card.png",
          "mainEntityOfPage": "https://jeffhelzner.github.io/posts/seu-sensitivity-foundations-03-when-measurement-is-meaningful.html",
          "isPartOf": {"@type": "Blog", "name": "Jeff Helzner", "url": "https://jeffhelzner.github.io/posts/"},
          "keywords": ["SEU sensitivity", "parameter recovery", "model adequacy", "AI decision evaluation", "Bayesian validation"]
        }
        </script>
---

::: {.series-nav}
**Foundations of SEU Sensitivity** · Part 3 of 3  
[Part 1](seu-sensitivity-foundations-01-decision-quality-to-sensitivity.html) · [Part 2](seu-sensitivity-foundations-02-estimating-sensitivity-from-choices.html) · Part 3
:::

The first post in this series explained the sensitivity idea. If subjective expected utility is the reference standard, then we can ask how strongly a decision maker's choices track expected-utility differences. The second post explained how observed choices become evidence about sensitivity through a Bayesian model.

But there is a final question before the framework can support empirical claims:

> When is the estimate meaningful?

This question is easy to underestimate. Once a model is implemented, it will usually produce output. There will be posterior means, intervals, diagnostics, plots, and tables. But a number produced by a model is not automatically evidence about the decision maker.

The number is meaningful only if the model is adequate for the task we are asking it to perform.

That is why the first four foundational reports include not only an abstract model and a concrete implementation, but also prior predictive analysis and parameter recovery. These checks are not decorative. They are part of the argument that a sensitivity estimate can be interpreted at all.

## A model can produce a number even when it should not be trusted

Suppose we present an AI system with a set of decision problems and fit the SEU Sensitivity model to its choices. The model returns an estimate of `alpha`. The estimate is moderate, and the interval is not too wide. It would be tempting to say: this system has moderate sensitivity to SEU.

That conclusion may be warranted. But it is not warranted merely because the model produced an estimate.

Several things could go wrong.

The choice data might not contain enough information to distinguish weak sensitivity from moderate sensitivity. The model's feature representation might not capture the quantities the decision maker is actually using. The prior might make some behaviors seem more plausible than they should in this domain. The observed choices might fall outside the range of behavior the model was designed to describe. The model might recover the main sensitivity parameter while failing to identify the belief and utility components needed for a more detailed interpretation.

These are not edge cases. They are ordinary risks in statistical evaluation.

So the interpretive question is not just "What is the estimate?" It is also "What checks support treating this estimate as evidence?"

## Prior predictive checks ask what the model permits

Prior predictive analysis asks what kinds of behavior the model expects before observing the data.

This matters because every Bayesian model carries assumptions into the analysis. The priors over sensitivity, feature effects, and utility spacing imply a prior distribution over choices. If that prior predictive distribution is implausible, the model needs attention before it is used to evaluate real decision makers.

In the foundational prior predictive analysis, the default model permits a broad range of behavior. Some simulated decision makers are near-random. Some show moderate sensitivity. Some are strongly concentrated on SEU-maximizing alternatives. This is what we want from a default prior in an exploratory setting: it should not decide the substantive question before the data arrive.

The prior predictive analysis also checks for pathological behavior. Expected utilities stay within the standardized range. Choice probabilities remain valid. The model does not build in a systematic preference for arbitrary alternatives. The simulated behavior aligns with the theoretical properties established in the abstract formulation: higher sensitivity leads to more frequent selection of SEU-maximizing alternatives.

These checks do not prove that the model is correct. They show that the model is at least coherent enough to use as a starting point.

They also create a baseline for detecting prior-data conflict. If observed choices fall far outside the behaviors the prior predictive distribution regarded as plausible, that is a warning. It may mean the priors are poorly calibrated for the application. It may mean the decision maker is not well described by the model. Either way, the warning should be investigated before the estimate is interpreted.

## Parameter recovery asks whether the model can learn what it says it is learning

Prior predictive checks ask what the model can generate. Parameter recovery asks whether the model can recover known parameters from simulated data.

The logic is straightforward.

First, simulate choices from the model using known parameter values. Second, fit the model to those simulated choices. Third, compare the posterior estimates to the known values. If the model cannot recover parameters when the data were generated by the model itself, then it is not ready to support strong claims in messier real applications.

The fourth foundational report performs this kind of recovery analysis for `m_0`. It uses the same moderate study design as the prior predictive analysis: 25 decision problems, 3 consequences, 5 feature dimensions, 15 distinct alternatives, and variable choice-set sizes. Across repeated simulations, the sampler diagnostics are reliable, so the recovery results reflect the model's inferential behavior rather than computational failure.

The main finding is asymmetric.

The sensitivity parameter `alpha` is recovered well. Credible interval coverage is close to the nominal target, and posterior estimates track true values. This is encouraging because `alpha` is the primary parameter for the sensitivity question.

The parameters that decompose expected utility into beliefs and utilities are harder to recover. The feature-to-probability mapping `beta` and the utility increments show wider uncertainty and slower learning. They are not completely uninformed by the data, but they are less precisely identified than `alpha`.

![Parameter recovery for the sensitivity parameter alpha, comparing true values to posterior estimates and showing credible interval coverage across recovery iterations.](https://jeffhelzner.github.io/seu-sensitivity/foundations/04_parameter_recovery_files/figure-html/fig-alpha-recovery-output-1.svg){#fig-alpha-recovery-foundations fig-alt="Parameter recovery visualization for alpha. The left panel compares true alpha values to estimated values with an identity line. The right panel shows 90 percent credible intervals across recovery iterations, colored by whether they contain the true value."}

This distinction is central to interpreting the framework.

## Why sensitivity can be easier to recover than its ingredients

The reason for the asymmetry is structural.

Choices under uncertainty depend on expected utilities. Expected utilities combine subjective probabilities and utilities. If we only observe choices, then we see the result of that combination indirectly. We do not separately observe the decision maker's beliefs or utilities.

Different combinations of beliefs and utilities can produce similar expected-utility patterns. That creates a coupling between the parameters that determine beliefs and the parameters that determine utilities. Uncertainty in one can be offset by uncertainty in the other.

![Posterior correlation between beta and delta parameters, showing compensatory coupling between the feature-to-belief mapping and utility increments.](https://jeffhelzner.github.io/seu-sensitivity/foundations/04_parameter_recovery_files/figure-html/fig-beta-delta-correlation-output-1.svg){#fig-beta-delta-coupling fig-alt="Posterior correlation visualization for beta and delta parameters. The left panel shows the distribution of posterior correlations, emphasizing negative compensatory coupling. The right panel relates true alpha to the strength of beta-delta posterior correlation."}

The sensitivity parameter has a different role. For a given expected-utility structure, `alpha` governs how strongly choices respond to expected-utility differences. It is therefore more directly tied to the stochastic pattern of choices.

This is good news if the primary research question is about sensitivity: how strongly choices track the SEU ranking. It is more cautionary if the research question requires a precise decomposition of the decision maker's beliefs and utilities.

That distinction should shape how empirical results are reported. An application may justify claims about comparative sensitivity while being much more cautious about claims concerning the exact utility function or subjective probability mapping.

## More data helps, but not always in the same way

The parameter recovery report also examines whether increasing the number of decision problems improves recovery.

Doubling the number of problems improves `alpha` recovery substantially. The model has more observations from which to learn how choice probabilities respond to expected-utility differences.

The improvement for utility-related parameters is more modest. Adding more problems over the same alternatives gives the model more choice data, but it does not necessarily provide qualitatively new information about how features map to consequences or how utilities are spaced. Adding new alternatives can help by expanding the feature space, but even then the belief-utility coupling remains.

This matters for empirical design. If the goal is to estimate sensitivity, a moderate number of well-designed choice problems may be enough. If the goal is to recover utilities and subjective probabilities separately, the design may need additional structure.

The foundational report points toward one such structure: risky choices with known probabilities. When probabilities are fixed by the experimenter, choices can provide more direct information about utilities. That extension appears in later foundational work, but the lesson is already visible here. The type of data matters, not just the amount of data.

## Adequacy is part of the evaluation

For AI decision evaluation, these checks are not merely technical housekeeping. They determine what kind of claim the framework can support.

A sensitivity estimate is meaningful when several conditions are met.

The reference standard must be stated clearly. In this framework, the standard is SEU maximization over the represented alternatives, consequences, beliefs, and utilities.

The model must connect observed choices to that standard in an interpretable way. The softmax choice rule supplies that connection, with `alpha` governing sensitivity to expected-utility differences.

The priors must imply plausible behavior for the application. Prior predictive checks help establish this before the data are interpreted.

The study design must contain enough information for the parameters of interest. Parameter recovery helps show what can and cannot be learned under a design like the one being used.

The posterior uncertainty must be reported and respected. A wide interval is not a failed analysis. It is information about what the data do not yet settle.

Finally, the model's limitations must be kept in view. The framework is not a cognitive process model. It does not prove that an AI system literally represents probabilities and utilities. It asks whether observed choices can be usefully described as sensitive to the expected-utility structure supplied by the analysis.

## What would make a sensitivity score misleading

A sensitivity score can mislead if it is interpreted without these adequacy checks.

It would be misleading to treat a point estimate of `alpha` as a general measure of intelligence, rationality, safety, or trustworthiness. It is narrower than that. It measures sensitivity to a specified SEU representation in a specified decision design.

It would be misleading to compare two systems if the uncertainty around their estimates is too large to support the comparison.

It would be misleading to treat low sensitivity as a universal defect without asking whether SEU is the right standard for the task, whether the represented consequences are adequate, and whether the decision maker may be following a different legitimate constraint.

It would also be misleading to treat high sensitivity as sufficient assurance. A system can be highly sensitive to a badly specified expected-utility model. It can choose consistently according to the represented tradeoffs while the representation omits legally, ethically, or operationally important considerations.

Sensitivity is therefore a disciplined measurement of one aspect of decision behavior. It is not a substitute for the rest of evaluation.

## The bridge to empirical applications

These foundations matter because the next stage of the project applies the framework to actual LLM decision behavior.

At that point, the questions become empirical. Does model temperature affect estimated sensitivity? Does an observed pattern travel across models, prompts, tasks, or domains? Does the framework behave similarly in an abstract choice setting and an insurance-like triage setting? When a result fails to replicate, should we treat that as a failure of the framework, a change in the decision maker, a task difference, a prompt effect, a model adequacy issue, or some combination of these?

The first four foundational reports do not answer those application questions. They make those questions interpretable.

They tell us what `alpha` is supposed to mean. They show how observed choices become evidence about sensitivity. They check what the priors imply before data arrive. They test whether the model can recover known parameters in simulated settings. And they identify a key limitation: sensitivity can be recovered more readily than the full decomposition of expected utility into beliefs and utilities.

With that in place, an empirical result is no longer just a pattern in outputs. It is a claim about a decision maker's estimated sensitivity to a stated decision standard, with uncertainty and adequacy conditions attached.

That is the right frame for the application story. A first study may suggest a pattern. A later study may show that the pattern does not travel. The methodological value of the framework is not that every initial result generalizes. It is that the framework gives us a disciplined way to ask what changed, how much the evidence supports, and whether the measurement was meaningful in the setting where it was applied.

## Sources

This post draws primarily on [Prior Predictive Analysis](https://jeffhelzner.github.io/seu-sensitivity/foundations/03_prior_analysis.html) and [Parameter Recovery Analysis](https://jeffhelzner.github.io/seu-sensitivity/foundations/04_parameter_recovery.html), with background from [Abstract Formulation of the SEU Sensitivity Model](https://jeffhelzner.github.io/seu-sensitivity/foundations/01_abstract_formulation.html) and [Concrete Implementation: The m_0 Stan Model](https://jeffhelzner.github.io/seu-sensitivity/foundations/02_concrete_implementation.html).