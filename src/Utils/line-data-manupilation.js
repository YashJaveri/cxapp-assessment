export const display = (data) => {
  const timeSeriesData = {};
  const uniqueSpaceTypes = ["desk", "Room", "office"] //This can be calcualted on the fly and then cached
  if (data) {
    data.forEach((curr) => {
      const spaceType = curr.SPACE_TYPE;      
      const time = new Date(curr.START_TM);
      const hour = time.getHours();
      const hourRange = `${hour}-${(hour + 1) % 24}`; // Calculate the hour range for the time slot
  
      if (!timeSeriesData[hourRange]) {
        timeSeriesData[hourRange] = {};
      }
      if (!timeSeriesData[hourRange][spaceType]) {
        timeSeriesData[hourRange][spaceType] = 0;
      }
      timeSeriesData[hourRange][spaceType] += curr.CAPACITY; // Incrementally accumulate capacity
    });
  }
  const lineChartData = [];
  
  Object.keys(timeSeriesData).forEach((timeKey) => {
    const timeData = timeSeriesData[timeKey];
    const timeEntry = { time: timeKey };
        
    uniqueSpaceTypes.forEach((spaceType) => {
      timeEntry[spaceType] = timeData[spaceType] || 0;
    });
    
    lineChartData.push(timeEntry);
  });
    
  return lineChartData;
};

export const customeFilter = (data, startDate, endDate, campus) => {  
  let lineChartData = [];
  if (data) {    
    //Filter by campuses
    data = data.filter((d) => {
      return campus === "All" || campus == d.BUILDING_NAME;
    });    
    
    //Fitler by start and end time
    if (startDate != null && endDate != null) {
      if (startDate == null) {
        lineChartData = data.filter((curr) => {
          const currEndTime = new Date(curr.END_TM);
          return currEndTime <= endDate;
        });
      } else if (endDate == null) {
        lineChartData = data.filter((curr) => {
          const currStartTime = new Date(curr.START_TM);
          return currStartTime >= startDate;
        });
      } else {
        lineChartData = data.filter((curr) => {
          const currStartTime = new Date(curr.START_TM);
          const currEndTime = new Date(curr.END_TM);
          return !(currEndTime <= startDate || currStartTime >= endDate);
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
