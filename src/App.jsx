import { useState } from "react";
import { THEME } from "./styles/theme";
import Header from "./components/Header";
import HeatmapView from "./components/HeatmapView";
import DistributionView from "./components/DistributionView";
import QCFlagsView from "./components/QCFlagsView";
import Tooltip from "./components/Tooltip";

export default function App() {
  const [tab, setTab] = useState('heatmap');
  const [tt, setTt] = useState(null);
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);

  return (
    <div style={{background:THEME.BG,minHeight:'100vh',fontFamily:"'Courier New',Courier,monospace",color:'#98bcd0',userSelect:'none'}}
         onMouseMove={e=>{setMx(e.clientX);setMy(e.clientY);}}>

      <Header tab={tab} setTab={setTab} />

      <div style={{padding:'20px 28px'}}>
        {tab === 'heatmap' && <HeatmapView setTt={setTt} />}
        {tab === 'dist' && <DistributionView setTt={setTt} />}
        {tab === 'qc' && <QCFlagsView />}
      </div>

      <Tooltip tt={tt} mx={mx} my={my} />
    </div>
  );
}
