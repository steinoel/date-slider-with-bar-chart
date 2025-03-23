# Date Slider with Bar Chart

This project is an Angular-based web application that provides an interactive way to visualize and filter data using a date slider, bar chart, and data table. Users can select a date range and view corresponding data in a visually appealing and responsive format.

## Features

- **Date Slider**: An interactive slider for selecting a date range, with support for mobile-friendly date pickers.
- **Bar Chart**: Displays the count of entries for each month within the selected date range.
- **Date Table**: Shows the filtered data in a tabular format, sorted by date.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Project Structure

```
src/
├── app/
│   ├── app.component.ts       # Main application component
│   ├── app.component.html     # Main application template
│   ├── app.component.css      # Main application styles
│   ├── bar-chart/             # Bar chart component
│   ├── date-slider/           # Date slider component
│   ├── date-table/            # Date table component
│   └── data.ts                # Dataset for the application
├── index.html                 # Main HTML file
├── main.ts                    # Application bootstrap file
├── main.server.ts             # Server-side bootstrap file
└── styles.css                 # Global styles
```

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd date-slider-with-bar-chart
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development Server

Run the following command to start the development server:

```bash
npm start
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you make changes to the source files.

## Build

To build the project for production, run:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Running Unit Tests

Run the following command to execute the unit tests using [Karma](https://karma-runner.github.io):

```bash
npm test
```

## Running End-to-End Tests

To execute end-to-end tests, first install a testing framework (e.g., Cypress or Protractor), then run:

```bash
ng e2e
```

## Server-Side Rendering (SSR)

To serve the application with SSR, build the project and run the server:

```bash
npm run build
npm run serve:ssr:date-slider-with-bar-chart
```

## Components

### Bar Chart

- Displays a bar chart representing the count of entries for each month in the selected date range.
- **File**: `src/app/bar-chart/bar-chart.component.ts`

### Date Slider

- Allows users to select a date range using a slider or date pickers.
- **File**: `src/app/date-slider/date-slider.component.ts`

### Date Table

- Displays the filtered data in a table format.
- **File**: `src/app/date-table/date-table.component.ts`

## Dataset

The dataset is defined in `src/app/data.ts` and contains a list of entries with dates. You can modify this file to include your own data.

## Responsive Design

The application is fully responsive:

- **Desktop**: Features an interactive slider for date selection.
- **Mobile**: Replaces the slider with date pickers for better usability.

## Further Help

For more information about Angular, visit the [Angular CLI Documentation](https://angular.dev/tools/cli).

## License

This project is licensed under the MIT License.
