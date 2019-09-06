# high-water-steaks
🍖💧🍗 Meat consumption across the globe, from 1995 to 2025, and the resulting water footprint. Isolate by your meat of choice! D3.js, React. 

See it [live](https://nwilliams770.github.io/high-water-steaks/)

Datasource: [Organisation de coopération et de développement économiques](http://www.oecd.org/) and [World Wildlife Foundation](https://www.worldwildlife.org/)

### Features
- Stacked bar chart of global meat consumption and corresponding water footprint
- Clickable legend to isolate dataset by meat type
- Dropdown to plot global consumption for different years
- Tooltip revealing X-Axis details
- Reusable `<BarChart/>` component

### Technologies
- D3 (axis, ease, fetch, scale, selection, transition)
- React
- Sass
- React-Select
- Country-Data

## Component Structure
- In `<Content/>` data is fetched and calculations are performed to derive coordinate values for the stacked bars. Because both charts will be affected when a user isolates a meat category or changes the current year, `<Content/>` is a stately component that tracks those values and has functionality to update those values in response to user actions. 
- `<BarChart/>` is a fully reusable, stacked bar chart component that accepts a variety of optional props for UI purposes such as a title and legend details.

- What I found most interesting when implementing this visualization was working on the `<Bar/>` component. To capitalize from D3 built-in transitions, each `<Bar/>` tracks its own height, y-position, and opacity via state. When new props are received, an appropriate transition is instantiated, using a combination of React refs and `d3-transition`, based on which prop value changed and in what way (increase or decrease). 
