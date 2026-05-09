# qPCR Expression Atlas Dashboard

An interactive React-based visualization platform for analyzing gene expression changes in human and rat brains following nicotine exposure. This tool serves as the visual companion to the research published in *Frontiers in Psychiatry* (2023).

## Features
- **Interactive Heatmap:** Real-time fold-change visualization with GAPDH-normalized standard colors.
- **Statistical Distributions:** Comparative dot plots with Mean/SD error bars and automated ratio calculations.
- **Quality Control Suite:** Transparent reporting of technical anomalies (e.g., standard curve inversions) and outlier management.
- **Cross-Platform Design:** Optimized for high-resolution displays used in laboratory environments.

## Scientific Context
The data visualized here explores the sex and diet-dependent effects of nicotine on neuroplasticity markers. It specifically highlights the dysregulation of sphingolipid metabolism-related genes (`CERKL`, `FA2H`) and oligodendrocyte function.

## Architecture
This project follows a modular React architecture:
- **/src/components**: Reusable UI modules for different data views.
- **/src/data**: Immutable experimental datasets.
- **/src/utils**: Statistical engine for real-time qPCR transformations.

## Publication Link
[Vargas-Medrano J, et al. (2023). Sex and diet-dependent gene alterations... Front. Psychiatry](https://doi.org/10.3389/fpsyt.2023.1104563)
