# Evaluation suite

These cases are designed to catch failures in the skill's workflow. They are not model benchmarks and do not guarantee that a particular image model will render exact text.

## How to run

Install the skill in the target host, then run each prompt in `cases.yaml`. Record:
- host and version;
- model;
- renderer/provider;
- whether reference images were supplied;
- pass/fail for each criterion;
- examples of visual or content failures.

## Scoring

Score each case from 0–2 per criterion:
- 0: failed;
- 1: partially met;
- 2: fully met.

Do not average away critical failures. Missing a required assignment section, corrupting a key equation, or claiming to render without a renderer is a critical failure.
