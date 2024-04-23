import React, { useEffect, useState, useMemo } from "react";
import PieChart from "./Components/PieChart";
import LineChart from "./Components/LineChart";
import { fetchData, parseData } from "./Utils/get-data";
import { getPieData, compressPieData } from "./Utils/pie-data-manupilation";
import {
  fitlerByCategory,
  customeFilter,
} from "./Utils/line-data-manupilation";
import { NUMBER_OF_SECTIONS } from "./constants";

const App = () => {
  const [data, setData] = useState();
  const [lineData, setLineData] = useState(data);
  const [pieData, setPieData] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [timeMode, setTimeMode] = useState();
  const [campus, setCampus] = useState("All");

  useEffect(() => {
    fetchData()
      .then(parseData)
      .then((d) => {
        setData(d);
        setLineData(d);
        const pieChartData = compressPieData(getPieData(d), NUMBER_OF_SECTIONS);
        setPieData(pieChartData);
      });
  }, []);

  const uniqueCampuses = useMemo(() => {
    if (!data) return [];
    var uniqueCampuses = new Set();
    for (let d of data) {
      uniqueCampuses.add(d.BUILDING_NAME);
    }
    return ["All", ...uniqueCampuses];
  }, [data]);

  useEffect(() => {
    let filteredData = data;
    if (selectedCategory) {
      filteredData = fitlerByCategory(data, selectedCategory, pieData);
    }
    setLineData(filteredData);
  }, [selectedCategory]);

  useEffect(() => {
    setLineData(
      customeFilter(data, startDate, endDate, campus, uniqueCampuses)
    );
  }, [startDate, endDate, campus]);

  const handleTimeChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handlePieChartClick = (selectedSection) => {
    setSelectedCategory(selectedSection.name);
  };

  const handleCampusChange = (selectedCampus) => {
    setCampus(selectedCampus.target.value);
  };

  const reset = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedCategory(null);
    setCampus("All");
    setLineData(data);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "40px",
        }}
      >
        {pieData && (
          <PieChart data={pieData} onCategorySelect={handlePieChartClick} />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {lineData && (
            <LineChart
              data={lineData}              
              handleTimeChange={handleTimeChange}
              startDate={startDate}
              endDate={endDate}              
            />
          )}
        </div>
      </div>
      <div>
        <label>Filter by campus:</label>
        <select id="filterType" value={campus} onChange={handleCampusChange}>
          {uniqueCampuses.map((campus) => (
            <option value={campus}>{campus}</option>
          ))}
        </select>
      </div>
      <button style={{margin: '20px'}} onClick={reset}>Reset</button> {/* Reset button */}
    </div>
  );
};

export default App;
