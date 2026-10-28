import { THEME } from "../styles/theme";
import { GENES, CTRL, VDS } from "../data/atlas_data";
import { foldColor, txtCol, gmean } from "../utils/stats_engine";

export default function HeatmapView({ setTt }) {
  const { LW, CW, CH, HH, SEP, RP, CBLUE, VCORAL, ACCENT, DIM } = THEME;
  const svgW = LW + 9*CW + SEP + 9*CW + RP + 56;
  const svgH = HH + GENES.length*CH + 56;

  return (
    <div>
      <div style={{fontSize:9,color:DIM,letterSpacing:1.5,marginBottom:12}}>
        FOLD CHANGE RELATIVE TO GAPDH-NORMALIZED STANDARD · HOVER CELLS FOR VALUES
      </div>
      <div style={{overflowX:'auto'}}>
        <svg width={svgW} height={svgH} onMouseLeave={()=>setTt(null)}>

          {/* Group banners */}
          <text x={LW+9*CW/2} y={14} textAnchor="middle" fill={CBLUE} fontSize={8.5} letterSpacing={2}>CONTROLS</text>
          <line x1={LW+3} y1={19} x2={LW+9*CW-3} y2={19} stroke={CBLUE} strokeWidth={0.6} opacity={0.4}/>
          <text x={LW+9*CW+SEP+9*CW/2} y={14} textAnchor="middle" fill={VCORAL} fontSize={8.5} letterSpacing={2}>VDS</text>
          <line x1={LW+9*CW+SEP+3} y1={19} x2={LW+9*CW+SEP+9*CW-3} y2={19} stroke={VCORAL} strokeWidth={0.6} opacity={0.4}/>

          {/* Sample headers */}
          {CTRL.map((s,ci)=>(
            <text key={s.id} x={LW+ci*CW+CW/2} y={22} textAnchor="start"
              fill={s.out?'#d9a441':CBLUE} fontSize={8}
              transform={`rotate(-58,${LW+ci*CW+CW/2},22)`}>{s.id}</text>
          ))}
          {VDS.map((s,vi)=>(
            <text key={s.id} x={LW+9*CW+SEP+vi*CW+CW/2} y={22} textAnchor="start"
              fill={VCORAL} fontSize={8}
              transform={`rotate(-58,${LW+9*CW+SEP+vi*CW+CW/2},22)`}>{s.id}</text>
          ))}
          <text x={LW+9*CW+SEP+9*CW+RP+20} y={HH-6} textAnchor="middle" fill={DIM} fontSize={7.5} letterSpacing={0.5}>V/C</text>

          {/* Gene rows */}
          {GENES.map((g,gi)=>{
            const y = HH + gi*CH;
            const cM = gmean(CTRL,g), vM = gmean(VDS,g);
            const ratio = vM/cM;
            const rc = ratio>1.25?'#e8520a':ratio<0.80?'#6f9ab8':'#948f87';
            return (
              <g key={g}>
                <text x={LW-6} y={y+CH/2+3.5} textAnchor="end"
                  fill={g.includes('\u2605')?ACCENT:'#aeaaa2'} fontSize={9.5}>
                  {g}
                </text>

                {/* Ctrl cells */}
                {CTRL.map((s,ci)=>{
                  const val=s[g]||0, bg=foldColor(val), tc=txtCol(val);
                  const cx=LW+ci*CW;
                  return (
                    <g key={s.id} style={{cursor:'crosshair'}}
                      onMouseEnter={()=>setTt({sample:s.id,gene:g,val,type:'CTRL',out:s.out})}
                      onMouseLeave={()=>setTt(null)}>
                      <rect x={cx+0.5} y={y+0.5} width={CW-1} height={CH-1} fill={bg} rx={1}/>
                      {s.out&&<rect x={cx+0.5} y={y+0.5} width={CW-1} height={CH-1} fill="none" stroke="#d9a441" strokeWidth={1.2} rx={1}/>}
                      <text x={cx+CW/2} y={y+CH/2+3} textAnchor="middle" fill={tc} fontSize={7.5}>{val.toFixed(2)}</text>
                    </g>
                  );
                })}

                {/* VDS cells */}
                {VDS.map((s,vi)=>{
                  const val=s[g]||0, bg=foldColor(val), tc=txtCol(val);
                  const cx=LW+9*CW+SEP+vi*CW;
                  return (
                    <g key={s.id} style={{cursor:'crosshair'}}
                      onMouseEnter={()=>setTt({sample:s.id,gene:g,val,type:'VDS'})}
                      onMouseLeave={()=>setTt(null)}>
                      <rect x={cx+0.5} y={y+0.5} width={CW-1} height={CH-1} fill={bg} rx={1}/>
                      <text x={cx+CW/2} y={y+CH/2+3} textAnchor="middle" fill={tc} fontSize={7.5}>{val.toFixed(2)}</text>
                    </g>
                  );
                })}

                {/* Ratio badge */}
                <text x={LW+9*CW+SEP+9*CW+RP+20} y={y+CH/2+3.5} textAnchor="middle"
                  fill={rc} fontSize={9} fontWeight="bold">{ratio.toFixed(2)}x</text>

                <line x1={LW} y1={y+CH} x2={LW+9*CW+SEP+9*CW} y2={y+CH} stroke="#2a2925" strokeWidth={0.5}/>
              </g>
            );
          })}

          {/* Vertical grid */}
          {[...Array(10)].map((_,i)=>(
            <line key={`cg${i}`} x1={LW+i*CW} y1={HH} x2={LW+i*CW} y2={HH+GENES.length*CH} stroke="#2a2925" strokeWidth={0.5}/>
          ))}
          {[...Array(10)].map((_,i)=>(
            <line key={`vg${i}`} x1={LW+9*CW+SEP+i*CW} y1={HH} x2={LW+9*CW+SEP+i*CW} y2={HH+GENES.length*CH} stroke="#2a2925" strokeWidth={0.5}/>
          ))}

          {/* Legend */}
          {(()=>{
            const lx=LW, ly=HH+GENES.length*CH+16, lw=200, lh=10;
            return (
              <g>
                <text x={lx} y={ly-3} fill={DIM} fontSize={7.5} letterSpacing={1}>FOLD CHANGE SCALE</text>
                {[...Array(50)].map((_,i)=>(
                  <rect key={i} x={lx+i*(lw/50)} y={ly} width={lw/50+0.5} height={lh} fill={foldColor((i/50)*5)}/>
                ))}
                {[0,1,2,3,4,5].map(v=>(
                  <text key={v} x={lx+(v/5)*lw} y={ly+lh+9} textAnchor="middle" fill={DIM} fontSize={7}>{v}.0</text>
                ))}
                <line x1={lx+(1/5)*lw} y1={ly-2} x2={lx+(1/5)*lw} y2={ly+lh+2} stroke="#948f87" strokeWidth={0.8}/>
                <text x={lx+(1/5)*lw} y={ly-5} textAnchor="middle" fill="#948f87" fontSize={6.5}>1.0</text>
              </g>
            );
          })()}
        </svg>
      </div>
    </div>
  );
}
