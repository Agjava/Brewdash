# Web Development Project 6 - Brewdash

Submitted by: **[Anvesh Gupta]**

This web app fetches brewery data from the Open Brewery DB API, displays it in a filterable dashboard with interactive charts (brewery types and top states), and allows users to click on a brewery to navigate to a detailed view with more information.

Time spent: **10** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Clicking on an item in the list view displays more details about it**
  - Clicking on an item in the dashboard list navigates to a detail view for that item
  - Detail view includes extra information about the item (address, phone, website, map link, etc.) not included in the dashboard view
  - The same sidebar is displayed in detail view as in dashboard view
  - *To ensure an accurate grade, your sidebar **must** be viewable when showing the details view in your recording.*
- [x] **Each detail view of an item has a direct, unique URL link to that item’s detail view page**
  - *To ensure an accurate grade, the URL/address bar of your web browser **must** be viewable in your recording.* (e.g., `/brewery/some-brewery-id`)
- [x] **The app includes at least two unique charts developed using the fetched data that tell an interesting story**
  - At least two charts (Pie chart for brewery types, Bar chart for top states by brewery count) are incorporated into the dashboard view of the site using the Recharts library.
  - Each chart describes a different aspect of the dataset (type distribution vs. geographical distribution).

The following **optional** features are implemented:

- [x] The site’s customized dashboard contains more content that explains what is interesting about the data
    
- [x] The site allows users to toggle between different data visualizations
    

The following **additional** features are implemented:

* [x] Implemented filtering functionality by brewery type and state/province via dropdowns in the sidebar.
* [x] Added a 'Clear Filters' button to reset the type and state filters.
* [x] Included loading indicators and error messages for data fetching states.
* [x] Used the Recharts library for creating interactive Pie and Bar charts.
* [x] Styled components for a clearer user interface, including layout, sidebar, charts, list, and detail page.
* [x] Made phone numbers and website URLs clickable links in the detail view.
* [x] Added a Google Maps link based on latitude/longitude in the detail view.

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='[Your GIF Link Here]' title='Video Walkthrough' width='' alt='Video Walkthrough' />

## License

    Copyright [2025] [Anvesh Gupta]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
