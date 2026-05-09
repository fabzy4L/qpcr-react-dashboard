import { useState } from "react";
import { THEME } from "../styles/theme";
import { GENES, CTRL, VDS, JITTER } from "../data/atlas_data";
import { gmean, gsd } from "../utils/stats_engine";

export default function DistributionView({ setTt }) {
  const [selG, setSelG] = useState('ERNM');
  const { ACCENT, DIM, BG, CBLUE, VCORAL } = THEME;

  const cVals=CTRL.map(r=>r[selG]||0);
  const vVals=VDS.map(r=>r[selG]||0);
  const maxV=Math.max(...cVals,...vVals)*1.2;
  const PH=300,PW=600,PL=52,PB=36,PT=28;
  const plotH=PH-PB-PT;
  const toY=v=>PT+plotH-(v/maxV)*plotH;
  const cMean=cVals.reduce((a,c)=>a+c,0)/cVals.length;
  const vMean=vVals.reduce((a,c)=>a+c,0)/vVals.length;
  const cSD=Math.sqrt(cVals.reduce((a,c)=>a+(c-cMean)**2,0)/(cVals.length-1));
  const vSD=Math.sqrt(vVals.reduce((a,c)=>a+(c-vMean)**2,0)/(vVals.length-1));
  const ratio=vMean/cMean;
  const CX=PL+110, VX=PL+370;

  return (
    <div>
      {/* Gene selector */}
      <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:20}}>
        {GENES.map(g=>(
          <button key={g} onClick={()=>setSelG(g)}
            style={{padding:'5px 11px',background:selG===g?ACCENT:'#0c1922',
              color:selG===g?BG:DIM,border:`1px solid ${selG===g?ACCENT:'#182f44'}`,
              borderRadius:3,fontSize:9,letterSpacing:0.5,cursor:'pointer',outline:'none',
              fontFamily:"'Courier New',Courier,monospace"}}>
            {g}
          </button>
        ))}
      </div>

      <div>
        <svg width={PW} height={PH} onMouseLeave={()=>setTt(null)}>
          {/* Title */}
          <text x={PW/2} y={16} textAnchor="middle" fill={ACCENT} fontSize={12} letterSpacing={2} fontWeight="bold">{selG}</text>

          {/* Y axis */}
          <line x1={PL} y1={PT} x2={PL} y2={PH-PB} stroke="#1a3550" strokeWidth={1}/>
          {[...Array(6)].map((_,i)=>{
            const v=(maxV/5)*i, y=toY(v);
            return (
              <g key={i}>
                <line x1={PL-4} y1={y} x2={PL} y2={y} stroke="#1a3550"/>
                <text x={PL-6} y={y+3} textAnchor="end" fill={DIM} fontSize={8}>{v.toFixed(1)}</text>
                <line x1={PL} y1={y} x2={PW-20} y2={y} stroke="#0c2030" strokeWidth={0.5}/>
              </g>
            );
          })}
          <line x1={PL} y1={toY(1)} x2={PW-20} y2={toY(1)} stroke="#1e4565" strokeWidth={1} strokeDasharray="5,3"/>
          <text x={PW-18} y={toY(1)+3} fill="#1e4565" fontSize={7.5} textAnchor="middle">1.0</text>

          {/* Y axis label */}
          <text x={12} y={PT+plotH/2} textAnchor="middle" fill={DIM} fontSize={8.5} letterSpacing={1}
            transform={`rotate(-90,12,${PT+plotH/2})`}>FOLD CHANGE</text>

          {/* Control dots */}
          <text x={CX} y={PH-10} textAnchor="middle" fill={CBLUE} fontSize={9} letterSpacing={1.5}>CONTROLS</text>
          {/* SD bar */}
          <line x1={CX} y1={toY(cMean+cSD)} x2={CX} y2={toY(cMean-cSD)} stroke={CBLUE} strokeWidth={1} opacity={0.35}/>
          <line x1={CX-14} y1={toY(cMean+cSD)} x2={CX+14} y2={toY(cMean+cSD)} stroke={CBLUE} strokeWidth={0.8} opacity={0.35}/>
          <line x1={CX-14} y1={toY(cMean-cSD)} x2={CX+14} y2={toY(cMean-cSD)} stroke={CBLUE} strokeWidth={0.8} opacity={0.35}/>
          {/* Mean line */}
          <line x1={CX-36} y1={toY(cMean)} x2={CX+36} y2={toY(cMean)} stroke={CBLUE} strokeWidth={2.5}/>
          <text x={CX+44} y={toY(cMean)+3} fill={CBLUE} fontSize={9}>{cMean.toFixed(3)}</text>
          {cVals.map((v,i)=>(
            <g key={CTRL[i].id} style={{cursor:'crosshair'}}
              onMouseEnter={()=>setTt({sample:CTRL[i].id,gene:selG,val:v,type:'CTRL',out:CTRL[i].out})}
              onMouseLeave={()=>setTt(null)}>
              <circle cx={CX+JITTER[i]} cy={toY(v)} r={5.5} fill={CTRL[i].out?'#ffaa44':CBLUE} opacity={0.85}/>
              {CTRL[i].out&&<circle cx={CX+JITTER[i]} cy={toY(v)} r={8} fill="none" stroke="#ffaa44" strokeWidth={1}/>}
            </g>
          ))}

          {/* VDS dots */}
          <text x={VX} y={PH-10} textAnchor="middle" fill={VCORAL} fontSize={9} letterSpacing={1.5}>VDS</text>
          <line x1={VX} y1={toY(vMean+vSD)} x2={VX} y2={toY(vMean-vSD)} stroke={VCORAL} strokeWidth={1} opacity={0.35}/>
          <line x1={VX-14} y1={toY(vMean+vSD)} x2={VX+14} y2={toY(vMean+vSD)} stroke={VCORAL} strokeWidth={0.8} opacity={0.35}/>
          <line x1={VX-14} y1={toY(vMean-vSD)} x2={VX+14} y2={toY(vMean-vSD)} stroke={VCORAL} strokeWidth={0.8} opacity={0.35}/>
          <line x1={VX-36} y1={toY(vMean)} x2={VX+36} y2={toY(vMean)} stroke={VCORAL} strokeWidth={2.5}/>
          <text x={VX+44} y={toY(vMean)+3} fill={VCORAL} fontSize={9}>{vMean.toFixed(3)}</text>
          {vVals.map((v,i)=>(
            <g key={VDS[i].id} style={{cursor:'crosshair'}}
              onMouseEnter={()=>setTt({sample:VDS[i].id,gene:selG,val:v,type:'VDS'})}
              onMouseLeave={()=>setTt(null)}>
              <circle cx={VX+JITTER[i]} cy={toY(v)} r={5.5} fill={VCORAL} opacity={0.85}/>
            </g>
          ))}

          {/* Connector dashed line */}
          <line x1={CX+40} y1={toY(cMean)} x2={VX-40} y2={toY(vMean)} stroke="#1e4060" strokeWidth={1} strokeDasharray="4,4"/>
        </svg>

        {/* Stats row */}
        <div style={{display:'flex',gap:10,marginTop:10,flexWrap:'wrap'}}>
          {[
            {l:'Ctrl Mean',v:cMean.toFixed(4),c:CBLUE},
            {l:'Ctrl SD',v:'\u00b1'+cSD.toFixed(4),c:CBLUE},
            {l:'VDS Mean',v:vMean.toFixed(4),c:VCORAL},
            {l:'VDS SD',v:'\u00b1'+vSD.toFixed(4),c:VCORAL},
            {l:'VDS / Ctrl',v:ratio.toFixed(3)+'x',c:ratio>1.25?'#ff8844':ratio<0.8?'#5599ff':ACCENT},
          ].map(s=>(
            <div key={s.l} style={{background:'#0c1922',border:'1px solid #182f44',borderRadius:4,padding:'8px 14px',minWidth:100}}>
              <div style={{color:DIM,fontSize:8.5,letterSpacing:1,marginBottom:3}}>{s.l}</div>
              <div style={{color:s.c,fontSize:13,fontWeight:'bold'}}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* All-gene summary table */}
        <div style={{marginTop:24}}>
          <div style={{fontSize:9,color:DIM,letterSpacing:2,marginBottom:10}}>ALL GENES — MEAN COMPARISON</div>
          <div style={{overflowX:'auto'}}>
            <table style={{borderCollapse:'collapse',fontSize:9.5,width:'100%',maxWidth:720}}>
              <thead>
                <tr>
                  {['GENE','CTRL MEAN','CTRL SD','VDS MEAN','VDS SD','RATIO','DIRECTION'].map(h=>(
                    <th key={h} style={{padding:'6px 12px',textAlign:'left',color:DIM,fontWeight:'normal',
                      letterSpacing:1,borderBottom:'1px solid #0e2535',fontSize:8.5}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {GENES.map((g,i)=>{
                  const cM=gmean(CTRL,g),vM=gmean(VDS,g);
                  const cS=gsd(CTRL,g),vS=gsd(VDS,g);
                  const r=vM/cM;
                  const up=r>1.25,dn=r<0.80;
                  const bg=g===selG?'#0c2035':'transparent';
                  return (
                    <tr key={g} style={{background:bg,cursor:'pointer'}} onClick={()=>setSelG(g)}>
                      <td style={{padding:'5px 12px',color:g.includes('\u2605')?ACCENT:'#7898b8',fontWeight:'bold'}}>{g}</td>
                      <td style={{padding:'5px 12px',color:CBLUE}}>{cM.toFixed(4)}</td>
                      <td style={{padding:'5px 12px',color:'#304860'}}>±{cS.toFixed(3)}</td>
                      <td style={{padding:'5px 12px',color:VCORAL}}>{vM.toFixed(4)}</td>
                      <td style={{padding:'5px 12px',color:'#603040'}}>±{vS.toFixed(3)}</td>
                      <td style={{padding:'5px 12px',color:up?'#ff8844':dn?'#5599ff':DIM,fontWeight:'bold'}}>{r.toFixed(3)}x</td>
                      <td style={{padding:'5px 12px',color:up?'#ff8844':dn?'#5599ff':DIM,fontSize:8.5}}>
                        {up?'\u2191 HIGHER IN VDS':dn?'\u2193 LOWER IN VDS':'\u2014'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
