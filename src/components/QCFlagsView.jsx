import { THEME } from "../styles/theme";

export default function QCFlagsView() {
  const { DIM } = THEME;
  const flags = [
    {
      id:'QC-01',lv:'WARN',col:'#e0b040',
      title:'BCAS1 Standard Curve — Inversion Detected',
      body:'The 10% dilution (CT 27.72) is lower than the 100% (CT 28.99). More dilute template must yield higher CT. This indicates a pipetting or tube swap error on the BCAS1 plate. Original curve R²=0.7675. The corrected fit (BCAS1★, R²=0.972, slope=−0.303) is used in all calculations. Uncorrected BCAS1 values are suppressed.',
      fields:[['First curve R\u00b2','0.7675 \u2717'],['Corrected R\u00b2','0.9720 \u2713'],['10% CT vs 100% CT','27.72 < 28.99 (inverted)'],['Action','BCAS1\u2605 used throughout']],
    },
    {
      id:'QC-02',lv:'WARN',col:'#e0b040',
      title:'MOBP Standard Curve — Inversion Detected',
      body:'Same inversion: 10% dilution reads CT 25.83 while 100% reads CT 30.13. This is a ~4.3 CT paradox. The MOBP★ corrected values are used in all calculations and visualizations. Raw MOBP values should not be interpreted.',
      fields:[['10% CT','25.83'],['100% CT','30.13 (should be lower)'],['Paradox delta','\u22124.30 CT'],['Action','MOBP\u2605 correction applied']],
    },
    {
      id:'QC-03',lv:'FLAG',col:'#ff8033',
      title:'Control C6 — Probable RNA Input / Quality Outlier',
      body:'C6 shows GAPDH CT of 17.64 vs group median ~15.3, indicating ~3-fold lower RNA input or degraded RNA. This artificially inflates GAPDH-normalized fold changes for C6 across multiple targets. Downstream statistics should be run both including and excluding C6 to assess its influence on group differences.',
      fields:[['C6 GAPDH CT','17.64 (group median: ~15.3)'],['MBP fold change (C6)','3.09\u00d7 (group mean: ~0.77)'],['ERNM fold change (C6)','6.24\u00d7 (group mean: ~2.3)'],['Recommendation','Include/exclude sensitivity test']],
    },
  ];

  return (
    <div style={{maxWidth:660}}>
      <div style={{fontSize:9,color:DIM,letterSpacing:2,marginBottom:16}}>DATA QUALITY REVIEW · 3 FLAGS IDENTIFIED</div>
      {flags.map(q=>(
        <div key={q.id} style={{background:'#0c1922',border:`1px solid ${q.col}44`,borderLeft:`3px solid ${q.col}`,
          borderRadius:4,padding:'16px 20px',marginBottom:14}}>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
            <span style={{background:`${q.col}20`,color:q.col,padding:'2px 8px',borderRadius:2,fontSize:8.5,letterSpacing:1}}>
              {q.lv} {q.id}
            </span>
            <span style={{color:'#98c0d8',fontSize:11,fontWeight:'bold'}}>{q.title}</span>
          </div>
          <p style={{color:'#506070',fontSize:10,lineHeight:1.75,margin:'0 0 12px'}}>{q.body}</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:14}}>
            {q.fields.map(([k,v])=>(
              <div key={k} style={{fontSize:9}}>
                <span style={{color:'#304860'}}>{k}: </span>
                <span style={{color:'#80a8c0'}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
