# CXApp Assessment
![alt text](<Screenshot 2024-04-23 at 1.40.14 AM.png>)
- Pie Chart: Considering there are 92 unique user titles in the dataset, presenting all of them in a pie chart might not offer meaningful insights due to the large number of sections. To address this, I've opted to display only the top 7 user titles, grouping the remaining titles under "Others". The number 7 can be easily adjusted using a constant variable defined in constants.js.
- Line Chart: The X-axis indicates time, with the option to toggle between "Start" and "End" using a dropdown menu. The Y-axis represents capacity.
- Dataset Size: With a dataset size of 104MB, processing it entirely on the client side might not be the most efficient approach. For testing purposes, I've selected a subset of the dataset to work with.
- Interaction: Clicking on a section of the pie chart updates the line chart to display data relevant to the selected section.

## Transition to Dynamic Data:
### REST API Endpoints for Pie Chart:
- Instead of transferring the entire 104MB dataset to the client side, we can implement multiple REST API endpoints.
- These endpoints will accept parameters such as n => the top n sections to display on the pie chart, value => CAPACITY/INVITED_COUNT/ACCEPTED_COUNT
- The API will then process the data server-side and return only the filtered data required for the chart, formatted as { "name": "section_name", "value": section_value }.
- This filtered data can then be directly fed to the PieChart component on the client side, reducing the data payload significantly.
### REST API Endpoints for Line Chart:
- Similarly, for the line chart, we can design another REST API endpoint. This endpoint will accept parameters defining what we want on the x-axis (e.g., START_TM, END_TM, etc).
- The API will process the data server-side and return the required dataset formatted for the line chart.
- The returned data can be in a format suitable for the line chart component, such as { "time": value, "value": value }.
### Pagination and Caching:
- Break down large datasets into smaller chunks so clients can handle them efficiently.
- We can save frequently used data on the server to speed up responses.
### Dynamic Data Filtering:
- Clients can ask for specific data based on things like dates or categories.
- Clients can request exactly what they need, so they don't have to process more than necessary.