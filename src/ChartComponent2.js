import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
 const [timestamp, setTimestamp]=useState(Math.floor(new Date().getTime()/1000));
  const [isRunning, setIsRunning] = useState(true);




  // call whenever begin changes
  useEffect(() => {
    fetchData();
    // call fetch function
  }, [timestamp]);

  useEffect(() => {
    // setInterval goes here.
    // Interval does increase "begin" ONLY
    const intervalId = setInterval(() => {
      if (isRunning) {
        setTimestamp(Math.floor(new Date().getTime()/1000));
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  // fixed
  // update chartData whenever data changes
  useEffect(() => {
    console.log(data);
    update();
  }, [data]);

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/v1/range?end=${timestamp}&range=10`
    );

    responseToDataObject(response.data);
    // setRequestCount((prevCount) => prevCount + 1);
  };

  const responseToDataObject = (responseData) => {
    const payload = responseData.payload;

    const arr = [];
    payload.forEach((record) => {
      var start = record.timestamp * 1000;
      const vols = record.voltages;
      vols.forEach((vol) => {
        arr.push({
          time: start,
          voltage: vol,
        });
        start += 10;
      });
    });

    console.log("array: ", arr);
    setData(arr);
  };

  const update = () => {
    if (data)
      setChartData({
        labels: data.map((entry) => entry.time),
        datasets: [
          {
            label: "Voltage",
            data: data.map((entry) => entry.voltage),
            fill: false,
            borderColor: "rgba(75,192,192,1)",
            tension: 0.1,
          },
        ],
      });
  };

  const toggleRunning = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  return (
    <div>
      <h1>Đồ thị 1</h1>
      <button onClick={toggleRunning}>
        {isRunning ? "Dừng" : "Tiếp tục"}
      </button>
      {chartData && <Line data={chartData} />}
    </div>
  );
}

export default App;
