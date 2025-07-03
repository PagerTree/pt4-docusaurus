---
description: >-
  Learn how Prometheus handles counter resets with rate, irate, and increase
  functions.
---

# Counter Rates & Increases

## Counter Resets

Counter metrics can reset to zero when a scraped process restarts (e.g., the server is restarted). Counter functions automatically handle counter resets by assuming that any decrease in a counter value was a reset. Internally, these functions compensate for the reset by adding the last sample value before the reset to all sample values after the reset.

<figure>![Prometheus Counter Resets Explained Visually](<../../.gitbook/assets/prometheus-counter-reset.gif>)<figcaption><p>Prometheus Counter Resets Explained Visually</p></figcaption></figure>

## Counter Functions

### Rate

[`rate()`](https://prometheus.io/docs/prometheus/latest/querying/functions/#rate) - **"rate of increase"** - calculates a per-second increase of a counter as averaged over a specified window.

<figure>![PromQL: rate() function](<../../.gitbook/assets/promql-rate-function.svg>)<figcaption><p>PromQL: rate() function</p></figcaption></figure>

### iRate

[`irate()`](https://prometheus.io/docs/prometheus/latest/querying/functions/#irate) - **"instantaneous rate of increase"** - calculates a per-second increase over the time window, only considering the last 2 points.

:::hint
`irate()` is much more responsive than `rate()`. It is good for high-resolution metrics. It should not be used for alerting conditions.
:::

<figure>![PromQL: irate() function](<../../.gitbook/assets/promql-irate-function.svg>)<figcaption><p>PromQL: irate() function</p></figcaption></figure>

### Increase

`increase()` - **"absolute increase"** - calculates the absolute increase over a given time value, including extrapolation.

:::hint
Logically, only the `increase()` function includes extrapolation because it measures an absolute increase. `rate()` and `irate()` functions calculate a slope (derivative), which will not change even if extrapolation is included.
:::

<figure>![PromQL: increase() function](<../../.gitbook/assets/promql-increase-function.svg>)<figcaption><p>PromQL: increase() function</p></figcaption></figure>
