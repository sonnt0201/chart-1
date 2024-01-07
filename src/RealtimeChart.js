import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "axios";
import { MyTable } from "./MyTable";
import { Selector } from "./Selector";
import { Button } from "react-bootstrap";
import "./RealtimeChart.css"
function RealtimeChart() {
  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [timestamp, setTimestamp] = useState(
    Math.floor(new Date().getTime() / 1000)
  );
  const [isRunning, setIsRunning] = useState(true);

  const [records, setRecords] = useState(null);
  const [espID, setEspID] = useState(0);

  // call whenever begin changes
  useEffect(() => {
    fetchData();
    // call fetch function
  }, [timestamp, espID]);

  useEffect(() => {
    // setInterval goes here.
    // Interval does increase "begin" ONLY
    const intervalId = setInterval(() => {
      if (isRunning) {
        setTimestamp(Math.floor(new Date().getTime() / 1000));
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
    setRecords(payload);
    const arr = [];
    payload.forEach((record) => {
      if (record["esp_id"] != espID) return;
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
    <>
     
      <Selector setEspID={setEspID} espID={espID} />
      {/* <Button onAbort={} */}
      <Button className="Button" variant={isRunning ? "outline-danger": "outline-success"} onClick={toggleRunning}>{isRunning ? "Pause" : "Play"}</Button>
      <span>
        {chartData && <Line data={chartData} />}

        <MyTable records={records} />
      </span>
    </>
  );
}

export default RealtimeChart;
