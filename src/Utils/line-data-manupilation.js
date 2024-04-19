export const getLineData = (data, filterType) => {
  const timeSeriesData = {};
  console.log(filterType);
  data.forEach((curr) => {
    const fitler = filterType === "Start Time" ? curr.START_TM : curr.END_TM;
    const time = new Date(fitler);
    const hour = time.getHours();
    const hourRange = `${hour}-${(hour + 1) % 24}`; // Calculate the hour range for the time slot

    if (!timeSeriesData[hourRange]) {
      timeSeriesData[hourRange] = 0;
    }
    timeSeriesData[hourRange] += curr.CAPACITY;
  });

  const lineChartData = Object.keys(timeSeriesData).map((timeKey) => ({
    time: timeKey,
    value: timeSeriesData[timeKey],
  }));
  return lineChartData;
};

export const fitlerByCategory = (data, selectedCategory, pieData) => {
  console.log("Slected: ", selectedCategory, pieData);
  if (selectedCategory === null) return data;

  const categories = pieData
    .filter((item) => item.name !== "Others")
    .map((item) => item.name);
  let filteredData = data;

  if (selectedCategory === "Others") {
    filteredData = data.filter(
      (item) =>
        item.USER_TITLE && !categories.includes(item.USER_TITLE.split(",")[0])
    );
  } else {
    filteredData = data.filter(
      (item) => item.USER_TITLE && item.USER_TITLE.startsWith(selectedCategory)
    );
  }
 
  return filteredData;
};
