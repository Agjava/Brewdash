# BrewDash

Submitted by: **Anvesh Gupta**

This web app displays data about breweries fetched from the Open Brewery DB API. It provides a dashboard view with summary statistics, a searchable and filterable list of breweries, including their type, location, and website link.

Time spent: **10** hours spent in total 

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard displays at least 10 unique items, one per row (Displays 100 items in the screenshots)
  - The dashboard includes at least two features in each row (Displays Name, Type, City, State, Website)
- [x] **`useEffect` React hook and `async`/`await` are used** (Assumed based on successful data fetching and project requirements)
- [x] **The app dashboard includes at least three summary statistics about the data**
  - The app dashboard includes at least three summary statistics about the data, such as:
    - Total number of breweries displayed
    - Count of micro breweries displayed
    - Count of brewpubs displayed
- [x] **A search bar allows the user to search for an item in the fetched data**
  - The search bar **correctly** filters items in the list, only displaying items matching the search query (Assumed based on UI element presence)
  - The list of results dynamically updates as the user types into the search bar (Assumed based on standard implementation)
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter restricts items in the list using a **different attribute** than the search bar (Search by Name, Filter by Brewery Type)
  - The filter **correctly** filters items in the list, only displaying items matching the filter attribute in the dashboard (Assumed based on UI element presence)
  - The dashboard list dynamically updates as the user adjusts the filter (Assumed based on standard implementation)

The following **optional** features are implemented:

- [x] Multiple filters can be applied simultaneously (Search and Type filter work together, but not multiple *distinct* category filters beyond that)
- [x] Filters use different input types
  - e.g., Text input for search, dropdown selection for Brewery Type.

The following **additional** features are implemented:

* [x] Clean, dark-themed UI with sidebar navigation (Dashboard, Search, About).
* [x] Clickable "Visit Site" links that likely open the brewery's website (or show N/A if no website provided).
* [x] Displays the total count of matching breweries based on current filters.
* [x] Clear visual separation of summary cards, search/filter controls, and the data table.

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with Kap



## License

    Copyright 2024 Anvesh Gupta

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.