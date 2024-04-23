export const display = (data) => {  
  const timeSeriesData = {};
  let lineChartData = undefined;
  if (data) {
    data.forEach((curr) => {
      // const fitler = filterType === "START_TM" ? curr.START_TM : curr.END_TM;
      const time = new Date(curr.START_TM);
      const hour = time.getHours();
      const hourRange = `${hour}-${(hour + 1) % 24}`; // Calculate the hour range for the time slot

      if (!timeSeriesData[hourRange]) {
        timeSeriesData[hourRange] = 0;
      }
      timeSeriesData[hourRange] += curr.CAPACITY;
    });

    lineChartData = Object.keys(timeSeriesData).map((timeKey) => ({
      time: timeKey,
      value: timeSeriesData[timeKey],
    }));
  }  
  return lineChartData;
};

export const filterByTime = (data, startDate, endDate) => {
  let lineChartData = [];  
  if (data) {
    if (startDate !== null && endDate !== null) {
      if (startDate === null) {
        lineChartData = data.filter((curr) => {
          const currEndTime = new Date(curr.END_TM);
          return currEndTime <= endDate;
        });
      } else if (endDate === null) {
        lineChartData = data.filter((curr) => {
          const currStartTime = new Date(curr.START_TM);
          return currStartTime >= startDate;
        });
      } else {
        lineChartData = data.filter((curr) => {
          const currStartTime = new Date(curr.START_TM);
          const currEndTime = new Date(curr.END_TM);
          return (currStartTime >= startDate && currEndTime <= endDate) || (startDate <= currEndTime && currEndTime <= endDate) || (startDate <= currStartTime && currStartTime <= endDate);
        });
      }
    } else {
      lineChartData = data;
    }
  }  
  return lineChartData;
};

export const fitlerByCategory = (data, selectedCategory, pieData) => {
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
