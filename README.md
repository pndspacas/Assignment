# Assignment

This application is designed to display a list of movies and their details, allowing users to filter and view movie information.

# Installation
1. Clone the repository: ```git clone https://github.com/your-username/assignment.git```
1. ```cd assignment```
1. Install dependencies: Ensure you have Node.js and npm installed.
1. Run: ```npm install```

# Usage
To start the application, run: ```npm run dev``` <br>This will launch the application in your default browser at http://localhost:5173.

# Functionality
- The application fetches movie data from a provided API endpoint and displays it in a table format.
- Users can click on a movie to view its details.
- Filtering options are available to sort movies by revenue and year.

# Dependencies
- Vite
- React
- TypeScript
- Axios

# File Structure
- src/assets: Contains SVG used in the application
- src/components: Contains various React components used in the application.
- src/styles: Contains all styles of React components used in the application
- src/App.tsx: Main application logic and state management.
- src/global.css: Contains all styles that don't need class names.

# Application Structure
- Top 10 Revenue allows sorting the 10 highest revenues movies.
- Top 10 Revenue by Year select the year and filter movies by year and revenue.
- The Filter Icon reset to the original movie list.
- The Table Icon allows open the movie description.
- The Description icon closes the description page.
- More Movies allow fetching more data at the max length of 1000.
- The Arrow Icon allows scrolling to the top page.

# Bugs & Tricks

## Bugs
1. Clicking on the Top 10 Revenue by Year, open the description, close the description, and reset the page to lose the scrolling behavior.
   - A fixed is refresh the page or click reset, click top 10 revenue, open description, close description, then it will work as expected.
1. More movies fetch the data only with mouse hover, scrolling won't trigger the loading.

## Tricks
1. Top 10 Revenue and Top 10 Revenue by Year disables scrolling when visualizing the top 10 and disables fetch more data. 
2. The Table Icon disabled scroll when the display description has to allow stay on the same height of visualization.
3. The Description icon enables the scroll to see the list or get more data.
4. The Filter Container is fixed when scrolling it allows the filtering of the data everywhere on the page.
5. The Arrow Icon appears when the data has reached the max amount and allows you to scroll to the top.



# Author
Pedro Paças
