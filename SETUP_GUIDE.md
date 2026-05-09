# Setup and Deployment Guide

## Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)

## Local Development
1. **Clone the repository:**
   ```bash
   git clone https://github.com/fabzy4L/qpcr-react-dashboard.git
   cd qpcr-react-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The dashboard will be available at `http://localhost:5173`.

## Production Build
To generate a highly optimized static build for deployment:
```bash
npm run build
```
The output will be located in the `dist/` directory, ready to be hosted on GitHub Pages, Vercel, or Netlify.

## Adding New Data
To update the atlas with new qPCR plates:
1. Open `src/data/atlas_data.js`.
2. Append new samples to the `CTRL` or `VDS` arrays following the existing schema.
3. The dashboard will automatically recalculate means and re-render the heatmap.
