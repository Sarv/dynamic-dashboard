Structure of my complete project
```
dynamic-dashboard/
├── admin/
│   └── elasticIndexManager.js
├── lib/
│   ├── dynamic-dashboard-functions.js
│   ├── es-config.js
│   ├── index-Stock.json
│   └── index-callLogs.json
├── routes/
│   ├── constants.js
│   ├── dashboard.js
│   ├── errorHandler.js
│   ├── utils.js
│   └── validations.js
```

Now, I want to work on new api route, /module
- this will not come under /dashboard, instead it will be in parallel
- This route will help to create, update, list, delete modules 
- Important Points,
    - structure of dashboard_modules elasticsearch index is already saved in elasticIndexManager.js file
    - behaviour of each field and concepts related to modules are mentioned in Dashboard_Module_Types.md, Dashboard_Module_Functions.md and Dynamic_Dashboard_Functions_JS.md
    - you can find important constants in es-config.js and some validation functions in dynamic-dashboard-functions.js 
    - when you will write create/update/list api for /module then behaviour, frequency and validation of fields will be according to above mentioned files.
- Important points related to /module file structure
    - do not use any existing file which has been used in /dashboard, create new files and add module_ prefix. For example, if you want to use constants.js file then do not use the file which is used for /dashboard. create a new file module_constants.js
    - this is because, I want to avoid any chance of accidentally wrongly updating exiting files and their codes. 
    - Though, you can use existing functions/constant from existing files, but if you want to change that function or constant then create a new one in your new files.
    - you can also create a new folder 'module' in routes folder and save all your files related to /module in it.
    - though, you can use same app.js if required.
- Follow the instructions mentioned in API_Development_Best_Practices.md to follow best practices while coding /module (that we have followed during coding of /dashboard api)


Rules of dashboard_modules index
    - valid values of module_type is in DASHBOARD_MODULE_TYPES constant (in es-config.js file)
    - main_axis and value_axis are array of nested objects, which means a module can have multiple values of both or  any of them,
    - whether a module can have or haven not  multiple values of main_axis or value_axis is set in DASHBOARD_MODULE_TYPES constant (in es-config.js file) where mainAxisFrequency is for main_axis frequency and valueAxisFrequency is for value_axis frequency. 
    - validation must be applied on frequency while taking input from APIs
    - values of nested fields of main_axis and value_axis will depend upon DASHBOARD_MODULE_FUNCTIONS constant (in es-config.js file) 
    - 


Pending Tasks
    - While creating Dashboard, validate whether the passed module id exists or not, and under the same dashboard.
    - While creating module, validation of dashboard id, userid, title.
    - While creating and updating module, check if the chosen function is allowed to call on selected field or not according to the field type 
    - update, list, delete api for ,module.
    - Filter creating in Dashboard and Module
    - APIs for
        - list of valid functions
        - list of valid module types
        - list of valid data views
        - list of fields in that data view
    - masking of actual database fields of data_view. Fields which are in mask list are allowed to pass from frontend
    - need to review flow of heatmap in module create api (color and other properties)
    