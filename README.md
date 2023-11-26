# Home Assignment

## Task Overview

This assignment involves building a movie display application with the following features:

### RQ001: Infinite Scroll :x:

Mark requires the ability to view an extensive list of movies using infinite scroll. As he scrolls down, the list should dynamically load additional movies until the end of the list is reached.

### RQ002: Movie Details Popup :heavy_check_mark:

Mark wants to access detailed information about a particular movie by triggering a popup when clicking on a movie within the list. This functionality should provide a seamless way to view specific movie details.

### RQ003: Top Revenue Movies :heavy_check_mark:

Mark wishes to see two specific sets of movies ranked by revenue:

- **Top 10 Movies Overall:** Display the top 10 movies by revenue.
- **Top 10 Movies by Year:** Enable the display of the top 10 movies by revenue for a chosen year.

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

# User Guide
### 1. Top 10 Revenue
This feature facilitates sorting movies based on their revenue, showcasing the ten highest-earning films.

### 2. Top 10 Revenue by Year
Select a specific year to filter movies by both their release year and revenue, providing a refined list based on user preferences.

### 3. Filter Icon
Use this icon to reset the applied filters and revert to the original, unfiltered movie list.

### 4. Table Icon
Access the detailed description of a movie by clicking this icon, allowing users to explore comprehensive information about a selected film.

### 5. Description Icon
Close the movie description page using this icon, returning to the main interface.

### 6. More Movies
Fetch additional data, expanding the movie list to a maximum of 1000 entries for a broader selection.

### 7. Arrow Icon
Effortlessly navigate back to the top of the page by clicking this icon, facilitating a smoother user experience and quicker access.


# Bugs & Tricks

## Bugs

1. **Scrolling Behavior Issue:**
   Clicking on "Top 10 Revenue by Year," opening and closing the description, and then resetting the page leads to loss of scrolling behavior.
   - **Quick Fix:** Refresh the page.
   - **Alternative:** Click reset, then "Top 10 Revenue," open and close the description; it should resume the expected behavior.

2. **More Movies Loading:**
   The "More Movies" feature fetches data only upon mouse hover, not triggering data loading via scrolling.

## Tricks

1. **Top 10 Revenue Scroll Disablement:**
   Both "Top 10 Revenue" and "Top 10 Revenue by Year" disable scrolling while displaying the top 10 and prevent fetching additional data.

2. **Table Icon and Scroll Disablement:**
   The Table Icon disables scrolling to maintain the display of descriptions at a consistent height for better visualization.

3. **Description Icon and Scroll Enablement:**
   Clicking the Description Icon enables scrolling to view the list or fetch more data.

4. **Fixed Filter Container:**
   The Filter Container remains fixed while scrolling, allowing data filtering from any position on the page.

5. **Max Amount Indicator - Arrow Icon:**
   An Arrow Icon appears when the data reaches its maximum limit, enabling a quick scroll to the top of the page.



# Author
Pedro Paças
