# qPCR Expression Atlas Dashboard

An interactive React viewer for an exploratory qPCR panel from a vicarious defeat stress (VDS) study: 13 targets, nine VDS samples and nine controls, GAPDH-normalized fold change. The data are unpublished and shown with the lab's agreement. Live at https://fabzy4l.github.io/qpcr/.

## Features
- **Interactive Heatmap:** Real-time fold-change visualization with GAPDH-normalized standard colors.
- **Statistical Distributions:** Comparative dot plots with Mean/SD error bars and automated ratio calculations.
- **Quality Control Suite:** Transparent reporting of technical anomalies (e.g., standard curve inversions) and outlier management.
- **Cross-Platform Design:** Optimized for high-resolution displays used in laboratory environments.

## Scientific Context
Vicarious defeat stress is a rodent model in which an animal witnesses another being socially defeated. This panel is exploratory: the page shows per-sample values, group means and SD, and three QC flags (inverted BCAS1 and MOBP standard curves, refit and marked ★; control C6 low RNA input). No statistical tests are run.

Not to be confused with the nicotine study from the same lab (Vargas-Medrano *et al.*, *Front. Psychiatry* 2023, [doi:10.3389/fpsyt.2023.1104563](https://doi.org/10.3389/fpsyt.2023.1104563)), which measured CHRNA10, CERKL, SMYD1 and FA2H; that data lives in `DATA_ANALYTICS/bioinformatics/nicotine_gene_expression`.

## Architecture
This project follows a modular React architecture:
- **/src/components**: Reusable UI modules for different data views.
- **/src/data**: Immutable experimental datasets.
- **/src/utils**: Statistical engine for real-time qPCR transformations.
