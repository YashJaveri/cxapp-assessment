import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const generateRandomColors = (n) => {
  const colors = [];
  for (let i = 0; i < n; i++) {
    colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  }
  return colors;
};

const PieChartComponent = ({ data, onCategorySelect }) => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    setColors(generateRandomColors(data.length));
  }, []);

  return (
    <PieChart width={400} height={400}>
      <text
        x={200}
        y={30}
        textAnchor="middle"
        fontSize="20px"
        fontWeight="bold"
      >
        User titlewise Capacity
      </text>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
        onClick={onCategorySelect}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
