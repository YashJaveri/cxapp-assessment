import React, { useEffect, useState } from 'react';
import PieChart from './Components/PieChart';
import LineChart from './Components/LineChart';
import { fetchData, parseData } from './Utils/get-data';
import { getPieData, compressPieData } from './Utils/pie-data-manupilation';
import { fitlerByCategory, getLineData } from './Utils/line-data-manupilation'
import { NUMBER_OF_SECTIONS } from './constants';

const App = () => {
  const [data, setData] = useState();
  const [pieData, setPieData] = useState();
  const [lineData, setLineData] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [lineFilterType, setLineFilterType] = useState('START_TM'); // Default filter type


  useEffect(() => {
    fetchData()
      .then(parseData)
      .then((d) => {
        setData(d);
        const pieChartData = compressPieData(getPieData(d), NUMBER_OF_SECTIONS);
        setPieData(pieChartData);
        // setLineData(getLineData(d, lineFilterType));
      });
  }, []);

  useEffect(() => {   
    let filteredData = data;
    if (selectedCategory) {
      filteredData = fitlerByCategory(data, selectedCategory, pieData);      
    }
    setLineData(getLineData(filteredData, lineFilterType));
  }, [selectedCategory, lineFilterType]);

  const handlePieChartClick = (selectedSection) => {
    setSelectedCategory(selectedSection.name);    
  };

  const handleFilterTypeChange = (event) => {
    setLineFilterType(event.target.value);
  };
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '00px' }}>
      {pieData && <PieChart data={pieData} onCategorySelect={handlePieChartClick}/>}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {lineData && <LineChart data={lineData} />}
        <div>
          <label htmlFor="filterType">Filter by:</label>
          <select id="filterType" value={lineFilterType} onChange={handleFilterTypeChange}>
            <option value="START_TM">Start Time</option>
            <option value="END_TM">End Time</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default App;