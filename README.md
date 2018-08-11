# number-p

## Getting Started

Install

```
$ npm install
```

Start

```
$ npm run start
```

# Requirements

Implement csv import with the possibility to search from imported data.
- Import form displays real-time progress.
- Search field displays names in autocomplete manner and only 20 or less most related items. - On clicking search result, displays all the data related to the item.
- User interface must be on one page, without any reloads. How it looks, is up to you.
- Frontend must be testable in a way that :
- Import upload field has an id "uploadField" and submit button has id "uploadButton"
- Search field has an id "searchField" and results have id "result-N" where N is the order of item in search result list.
- API tests assume that:
- GET / - Will display UI and all the frontend components mentioned above
- POST /import - for file upload
- POST /search - Payload should be {query : "query"} and result "results":[{"id":id, "name":
"name", "age": age, "address": "address", "team": "team"
- Solution is installable by "npm install" and run by "npm start". All dependencies for solution should be installed and started via npm.
