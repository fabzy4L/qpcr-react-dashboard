import { THEME } from "../styles/theme";

const PIXEL = "'Silkscreen', ui-monospace, monospace";

export default function Header({ tab, setTab }) {
  return (
    <div style={{padding:'28px 28px 16px',borderBottom:'1px solid rgba(200,196,188,0.1)',display:'flex',alignItems:'flex-end',gap:20,flexWrap:'wrap'}}>
      <div>
        <a href="../work/" style={{fontFamily:PIXEL,fontSize:11,letterSpacing:'0.24em',color:THEME.ACCENT,textDecoration:'none'}}>&larr; WORK</a>
        <div style={{fontFamily:"Georgia,'Times New Roman',serif",fontSize:30,color:'#f0ede8',margin:'18px 0 8px'}}>qPCR expression atlas</div>
        <div style={{fontFamily:PIXEL,fontSize:10,color:THEME.DIM,letterSpacing:'0.16em'}}>
          7 PLATES · 13 TARGETS · GAPDH-NORMALIZED · CTRL n=9 · VDS n=9 · ★ = CORRECTED CURVE
        </div>
      </div>
      <div style={{marginLeft:'auto',display:'flex',gap:8}}>
        {[['heatmap','HEATMAP'],['dist','DISTRIBUTIONS'],['qc','QC FLAGS ⚠']].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)}
            style={{padding:'7px 16px',background:tab===k?'#1c1b18':'transparent',
              color:tab===k?THEME.ACCENT:THEME.DIM,border:`1px solid ${tab===k?'#4a4842':'#2a2925'}`,
              borderRadius:2,fontFamily:PIXEL,fontSize:9,letterSpacing:1.5,cursor:'pointer',outline:'none'}}>
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}
