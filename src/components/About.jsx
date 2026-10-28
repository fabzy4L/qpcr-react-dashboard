import { THEME } from "../styles/theme";

const PIXEL = "'Silkscreen', ui-monospace, monospace";
const SERIF = "Georgia,'Times New Roman',serif";

const h = { fontFamily: PIXEL, fontSize: 10, letterSpacing: '0.18em', color: THEME.ACCENT, margin: '22px 0 8px' };
const p = { fontFamily: SERIF, fontSize: 15.5, lineHeight: 1.7, color: '#c8c4bc', margin: '0 0 10px' };
const em = { color: '#f0ede8' };

export default function About() {
  return (
    <div style={{padding:'6px 28px 18px',maxWidth:780,borderBottom:'1px solid rgba(200,196,188,0.1)'}}>
      <div style={h}>WHAT THIS IS</div>
      <p style={p}>
        An exploratory qPCR panel from a <span style={em}>vicarious defeat stress (VDS)</span> study,
        a rodent model in which an animal witnesses another being socially defeated. Thirteen targets
        were measured in nine VDS samples and nine controls. The data are unpublished and shown with
        the lab's agreement; qPCR design, runs and analysis by Fabian Alvarez-Primo. No statistical
        tests are run on this page, so group differences here are descriptive.
      </p>

      <div style={h}>HOW TO READ IT</div>
      <p style={p}>
        <span style={em}>Heatmap.</span> Each cell is one sample's expression of one target, as fold
        change relative to a GAPDH-normalized standard: 1.0 means no change, steel is below 1, orange
        above. Controls are on the left, VDS on the right. The V/C column is the VDS mean divided by
        the control mean.
      </p>
      <p style={p}>
        <span style={em}>Distributions.</span> Pick a target to see every sample as a dot, with each
        group's mean and ±1 SD.
      </p>
      <p style={p}>
        <span style={em}>QC flags.</span> Three issues found while checking the data. BCAS1 and MOBP
        had inverted standard curves; both were refit, and the corrected curves (★) are used
        throughout. Control C6 has low RNA input that inflates its fold changes; it is outlined in
        the heatmap and still included in the means.
      </p>
    </div>
  );
}
