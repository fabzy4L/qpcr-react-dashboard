# Repository Professionalization Plan — qPCR Expression Atlas

## Current State Assessment
The project is currently a monolithic `App.jsx` containing:
- Hardcoded experimental datasets (CTRL and VDS).
- Statistical utility functions (`gmean`, `gsd`, `foldColor`).
- Integrated UI logic for three distinct views (Heatmap, Distributions, QC).

## Proposed Architecture
We will transition to a modular, "loose-item-free" structure:

### 1. Data Decoupling
- **`src/data/atlas_data.js`**: Move the `CTRL`, `VDS`, and `GENES` constants here. This makes it easier to update the dataset without touching UI code.

### 2. Logic Isolation
- **`src/utils/stats_engine.js`**: Move `foldColor`, `txtCol`, `gmean`, and `gsd` to a dedicated math utility file.

### 3. Component Modularization
- **`src/components/Header.jsx`**: Global atlas navigation and metadata.
- **`src/components/HeatmapView.jsx`**: The SVG-based expression matrix.
- **`src/components/DistributionView.jsx`**: Dot plots and statistical summaries.
- **`src/components/QCFlagsView.jsx`**: Technical documentation and anomaly reports.
- **`src/components/Tooltip.jsx`**: Shared hover state component.

### 4. Style Standardization
- **`src/styles/theme.js`**: Define the high-contrast bio-dark theme colors (`ACCENT`, `VCORAL`, `CBLUE`) as a shared object or CSS variables.

## Execution Steps
1. Create directory structure: `mkdir src/components src/data src/utils src/styles`.
2. Write the documentation: `README.md`, `SETUP_GUIDE.md`.
3. Refactor code into the new modules.
4. Update `App.jsx` to serve as a clean entry-point/orchestrator.
5. Verify path alignment and process execution (`npm run dev`).
