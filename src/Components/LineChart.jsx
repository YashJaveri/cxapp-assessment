import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { display } from "../Utils/line-data-manupilation";

const LineChartComponent = ({
  data,
  startDate,
  endDate,
  handleTimeChange,
}) => {  
  const uniqueSpaceTypes = ["desk", "Room", "office"] //This can be calcualted on the fly and then cached
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        <label>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => handleTimeChange(date, endDate)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
        />
        <label>End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => handleTimeChange(startDate, date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
        />
      </div>
      <LineChart
        width={800}
        data={display(data)}
        height={400}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          label={{ value: "Time", position: "insideBottomRight", offset: -10 }}
        />
        <YAxis label={{ value: "Value", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />
        {uniqueSpaceTypes.map((d, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={d}            
            stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random color
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
      {/* <div>
        <label htmlFor="filterType">Filter by:</label>
        <select
          id="filterType"
          value={timeMode}
          onChange={handleFilterTypeChange}
        >
          <option value="START_TM">Start Time</option>
          <option value="END_TM">End Time</option>
        </select>
      </div> */}
    </div>
  );
};

export default LineChartComponent;
