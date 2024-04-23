import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { display } from "../Utils/line-data-manupilation";

const LineChartComponent = ({ data, startDate, endDate, timeMode, handleTimeChange }) => {  
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
        height={400}
        data={display(data)}
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
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
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
