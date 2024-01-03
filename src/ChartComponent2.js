import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const [isRunning, setIsRunning] = useState(true);
  const [timestamp, setTimestamp] = useState(new Date().getTime()/1000);

  useEffect(() => {
    fetchData();
  }, [timestamp]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isRunning) {
        setTimestamp(new Date().getTime()/1000);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/v1/range?end=${timestamp}&range=10`
    );

    responseToDataObject(response.data);
  };

  const responseToDataObject = (responseData) => {
    // Process the data and update the state
  };

  return (
    <div>
      <h1>Đồ thị 2</h1>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Dừng" : "Tiếp tục"}
      </button>
      {chartData && <Line data={chartData} />}
    </div>
  );
}

export default App;