import { THEME } from "../styles/theme";

export default function Tooltip({ tt, mx, my }) {
  if (!tt) return null;
  return (
    <div style={{position:'fixed',left:mx+14,top:my-58,background:'#141412',
      border:`1px solid ${tt.type==='VDS'?THEME.VCORAL:THEME.CBLUE}`,
      padding:'8px 13px',borderRadius:4,pointerEvents:'none',
      fontSize:11,zIndex:1000,boxShadow:'0 6px 24px rgba(0,0,0,0.7)'}}>
      <div style={{color:THEME.ACCENT,letterSpacing:1.5,fontSize:9.5}}>{tt.gene}</div>
      <div style={{marginTop:4,color:'#f0ede8'}}>
        {tt.sample}&nbsp;&nbsp;<span style={{color:'#f0ede8',fontWeight:'bold'}}>{tt.val.toFixed(4)}</span>
      </div>
      <div style={{color:tt.type==='VDS'?THEME.VCORAL:THEME.CBLUE,fontSize:8.5,letterSpacing:1,marginTop:2}}>
        {tt.type}{tt.out?' ⚠ OUTLIER':''}
      </div>
    </div>
  );
}
