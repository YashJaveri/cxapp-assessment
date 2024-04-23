import React, { useEffect, useState } from "react";
import PieChart from "./Components/PieChart";
import LineChart from "./Components/LineChart";
import { fetchData, parseData } from "./Utils/get-data";
import { getPieData, compressPieData } from "./Utils/pie-data-manupilation";
import { fitlerByCategory, filterByTime } from "./Utils/line-data-manupilation";
import { NUMBER_OF_SECTIONS } from "./constants";

const App = () => {
  const [data, setData] = useState();
  const [lineData, setLineData] = useState(data);
  const [pieData, setPieData] = useState();  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [timeMode, setTimeMode] = useState();

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

  useEffect(() => {
    let filteredData = data;    
    if (selectedCategory) {
      filteredData = fitlerByCategory(data, selectedCategory, pieData);
    }  
    setLineData(filteredData);
  }, [selectedCategory]);

  const handleTimeChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    setLineData(filterByTime(lineData, startDate, endDate));
  };

  const handlePieChartClick = (selectedSection) => {
    setSelectedCategory(selectedSection.name);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "40px" }}>
      {pieData && (
        <PieChart data={pieData} onCategorySelect={handlePieChartClick} />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {lineData && <LineChart data={lineData} handleTimeChange={handleTimeChange} startDate={startDate} endDate={endDate} timeMode={timeMode}/>}
      </div>
    </div>
  );
};

export default App;
