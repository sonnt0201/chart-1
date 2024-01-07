// app.js


import React, { useState } from 'react';
import ChartComponent1 from './ChartComponent1.js';
import RealtimeChart from './RealtimeChart.js';
import "./App.css"
function App() {
  const [mode, setMode] = useState('');

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
  };

  return (
    <div className='App'>
      <h1>Realtime Chart</h1>
      {/* <button onClick={() => handleModeChange('mode1')}>Xem từ đầu</button> */}
      {/* <button onClick={() => handleModeChange('mode2')}>Thời gian thực</button> */}

      {/* {mode === 'mode1' && <ChartComponent1 />} */}

      {<RealtimeChart />}
    </div>
  );
}

export default App;