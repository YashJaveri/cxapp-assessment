export const getPieData = (data) => {
  const uniqueRoles = [
    ...new Set(
      data.map((item) => {
        if (item.USER_TITLE) {
          return item.USER_TITLE.split(",")[0];
        } else {
          return null;
        }
      })
    ),
  ].filter((role) => role !== null);  
  const pieChartData = uniqueRoles.map((role) => {
    const filteredData = data.filter(
      (item) =>
        item.USER_TITLE && item.CAPACITY && item.USER_TITLE.startsWith(role)
    ); // Filter out data items where both USER_TITLE and CAPACITY exist and USER_TITLE matches the role
    const totalCapacity = filteredData.reduce(
      (acc, curr) => acc + curr.CAPACITY,
      0
    );
    return {
      name: role,
      value: totalCapacity,
    };
  });
  return pieChartData;
};

export const compressPieData = (pieData, n) => {
  const sortedPieData = pieData.sort((a, b) => b.value - a.value);  // Sort the pie data by value in descending order
  
  // Pick the top n-1 categories. Leaving 1 for "Others"
  const topCategories = sortedPieData.slice(0, n-1);
  const totalTopCategoriesValue = topCategories.reduce(
    (acc, curr) => acc + curr.value,
    0
  );  
  const totalValue = pieData.reduce((acc, curr) => acc + curr.value, 0);
  const othersValue = totalValue - totalTopCategoriesValue;
  
  const compressedPieData = [
    ...topCategories,
    { name: "Others", value: othersValue },
  ];

  return compressedPieData;
};
