// app.js

import React, { useState } from 'react';
import ChartComponent1 from './ChartComponent1.js';
import ChartComponent2 from './ChartComponent2.js';

function App() {
  const [mode, setMode] = useState('');

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
  };

  return (
    <div>
      <button onClick={() => handleModeChange('mode1')}>Chế độ 1</button>
      <button onClick={() => handleModeChange('mode2')}>Chế độ 2</button>

      {mode === 'mode1' && <ChartComponent1 />}
      {mode === 'mode2' && <ChartComponent2 />}
    </div>
  );
}

export default App;