import { THEME } from "../styles/theme";

export default function Header({ tab, setTab }) {
  return (
    <div style={{padding:'20px 28px 14px',borderBottom:'1px solid #0e2535',display:'flex',alignItems:'baseline',gap:20}}>
      <div>
        <div style={{fontSize:17,color:THEME.ACCENT,letterSpacing:4,fontWeight:'bold'}}>qPCR EXPRESSION ATLAS</div>
        <div style={{fontSize:9.5,color:THEME.DIM,letterSpacing:2.5,marginTop:4}}>
          7 PLATES · 13 TARGETS · GAPDH-NORMALIZED · CTRL n=9 · VDS n=9 · ★ = CORRECTED CURVE
        </div>
      </div>
      <div style={{marginLeft:'auto',display:'flex',gap:8}}>
        {[['heatmap','HEATMAP'],['dist','DISTRIBUTIONS'],['qc','QC FLAGS \u26a0']].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)}
            style={{padding:'7px 16px',background:tab===k?'#0a1d2e':'transparent',
              color:tab===k?THEME.ACCENT:THEME.DIM,border:`1px solid ${tab===k?'#1a4060':'#0e2535'}`,
              borderRadius:3,fontSize:9,letterSpacing:1.5,cursor:'pointer',outline:'none'}}>
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}
