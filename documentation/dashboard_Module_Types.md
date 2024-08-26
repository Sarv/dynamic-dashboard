## Detailed Documentation: `dashboard_Module_Types`

----------

#### Overview

The `dashboard_Module_Types` constant in the **dynamic dashboard module** defines the various visualization types available (such as bar charts, line charts, pie charts, etc.) and the corresponding configurations for the axes and color options for each visualization. This constant is crucial for creating and managing different types of visualizations within the dashboard, ensuring that the correct axes and options are used based on the selected graph type.

Each graph type is associated with specific axis configurations (e.g., **main axis**, **value axis**), frequency (whether the axis allows **single** or **multiple** fields), and options for color customization.

----------

### Structure of `dashboard_Module_Types`

The structure of `dashboard_Module_Types` is an object where each key represents a type of graph (e.g., `bar_horizontal`, `line_chart`). Each graph type object contains several fields:

1.  **graphType**: The name of the graph type (e.g., `Bar Horizontal`, `Pie Chart`).
2.  **mainAxis**: Specifies which axis is the main axis for the graph (e.g., `x`, `y`).
3.  **mainAxisFrequency**: Indicates whether the main axis allows a single field or multiple fields.
4.  **valueAxis**: Specifies which axis is the value axis for the graph (e.g., `x`, `y`).
5.  **valueAxisFrequency**: Indicates whether the value axis allows a single or multiple values.
6.  **colorAxis**: Specifies whether color is applied to the main axis (`main`) or value axis (`value`) to distinguish different categories or values.
7.  **zAxisTitle** (only for heatmaps): Specifies a custom title for the **z-axis**, which represents non-standard values such as **color intensity**.

----------

### Example Structure

Below is an example of how a specific graph type, **Bar Horizontal**, is structured:


```js
bar_horizontal: {
    graphType: 'Bar Horizontal', // Name of the chart type
    mainAxis: 'y', // Main axis used for categories (y-axis in this case)
    mainAxisFrequency: 'Single', // Only one category field allowed on the y-axis
    valueAxis: 'x', // Value axis used for metrics (x-axis for bar values)
    valueAxisFrequency: 'Multiple', // Multiple metric fields allowed on the x-axis
    colorAxis: 'value' // Color is applied to the value axis (x) as the main axis has a single value
}
``` 

----------

### Explanation of Fields

-   **graphType**:
    
    -   A string representing the name of the visualization type (e.g., `Bar Horizontal`, `Pie Chart`). This is primarily for clarity and user selection.
-   **mainAxis**:
    
    -   This field specifies which axis is considered the **main axis** for this particular graph type.
    -   Examples:
        -   **Bar Horizontal**: The **main axis** is the **y-axis**, as categories are plotted vertically.
        -   **Bar Vertical**: The **main axis** is the **x-axis**, as categories are plotted horizontally.
-   **mainAxisFrequency**:
    
    -   Specifies whether the main axis can have multiple categories or is restricted to a single field.
    -   **Single**: Only one field can be used to categorize the data on the main axis (e.g., one grouping field for categories).
    -   **Multiple**: Multiple fields can be used to categorize the data (e.g., multiple slices in a pie chart).
-   **valueAxis**:
    
    -   This field specifies which axis is the **value axis**, where the numerical data or metrics are plotted.
    -   Examples:
        -   **Bar Horizontal**: The **value axis** is the **x-axis**, where the values (e.g., sales numbers) are plotted.
        -   **Bar Vertical**: The **value axis** is the **y-axis**, where the values are plotted.
-   **valueAxisFrequency**:
    
    -   Indicates whether the value axis can have multiple values or is restricted to a single field.
    -   **Single**: Only one value is allowed (e.g., a single metric like sales or revenue).
    -   **Multiple**: Multiple values are allowed (e.g., multiple metrics, such as sales and profit).
-   **colorAxis**:
    
    -   Specifies which axis should be used for color coding.
    -   **main**: Colors are applied to differentiate between different categories on the **main axis**.
    -   **value**: Colors are applied to differentiate between values on the **value axis**.
-   **zAxisTitle** (for **Heat Maps**):
    
    -   This field specifies the custom title for the **z-axis** when dealing with non-standard axes, such as **color intensity** in heatmaps.

----------

### Example of Graph Types

1.  **Line Chart**:


```js
line_chart: {
    graphType: 'Line Chart', // Standard line chart
    mainAxis: 'x', // Main axis is horizontal (typically time or categories)
    mainAxisFrequency: 'Single', // Single time field or category field on the x-axis
    valueAxis: 'y', // Value axis is vertical for plotting metrics over time
    valueAxisFrequency: 'Multiple', // Multiple metrics can be plotted on the y-axis
    colorAxis: 'value' // Color is applied to the value axis for different lines (metrics)
}
``` 

-   **Use Case**: A line chart where data is plotted over time on the **x-axis** and the corresponding values are plotted on the **y-axis**.

2.  **Pie Chart**:

```js
pie_chart: {
    graphType: 'Pie Chart', // Pie chart visualization
    mainAxis: 'x', // Slices represent categories on the x-axis
    mainAxisFrequency: 'Multiple', // Multiple categories are allowed (e.g., product types)
    valueAxis: 'y', // Metric determining the size of each slice
    valueAxisFrequency: 'Single', // Only one value (metric) determines slice size
    colorAxis: 'main' // Color is applied to the main axis to differentiate categories
}
``` 

-   **Use Case**: A pie chart where slices represent different categories, and color is used to differentiate these slices.

3.  **Heat Map**:

```js
heat_map: {
    graphType: 'Heat Map', // Heatmap visualization
    mainAxis: ['x', 'y'], // Heatmap uses both x and y axes
    mainAxisFrequency: 'Single', // Single field on both axes
    valueAxis: 'z', // Color intensity represents the value axis
    valueAxisFrequency: 'Single', // Only a single metric is plotted
    zAxisTitle: 'Color Intensity', // Custom title for the z-axis representing intensity
    colorAxis: 'value' // Color represents the value axis, indicating intensity
}
``` 

-   **Use Case**: A heatmap where data is represented by colors on a grid. Both axes represent categories, while the color intensity indicates the metric's value.

----------

### Interaction with `Dashboard_Module_Functions`

The `dashboard_Module_Types` constant interacts closely with the `Dashboard_Module_Functions` constant, which defines the various operations or aggregations that can be applied to the data. The configuration of the axes in `dashboard_Module_Types` determines which functions from `Dashboard_Module_Functions` are valid for each graph type.

For example:

-   A **Line Chart** might use a `date_histogram` function from `Dashboard_Module_Functions` to group data by time on the **x-axis**, and apply an `average` function to the **y-axis** to plot the average value over time.

The two constants work together to ensure that the correct operations are applied to the correct axes, providing flexibility and accuracy in data visualization.


## Concept of Graphs with and without X and Y Axes



In the context of `dashboard_Module_Types`, visualizations can generally be categorized into two groups:

1.  **Visualizations with Both X and Y Axes**: These are traditional Cartesian visualizations where data is plotted along both a horizontal (X-axis) and a vertical (Y-axis) axis.
2.  **Visualizations without Explicit X and Y Axes**: These visualizations, such as pie charts or metrics, represent data in alternative formats that do not require Cartesian coordinates.

Understanding the presence (or absence) of X and Y axes helps define how data is visualized and which operations and configurations are valid for a given graph type.

----------

### Graphs with Both X and Y Axes

Visualizations that use both an X-axis and Y-axis typically represent data in a two-dimensional space. These visualizations allow the user to map **categories** or **time intervals** along one axis (main axis) and **values** or **metrics** along the other axis (value axis).

Examples of graphs with both X and Y axes include:

1.  **Bar Horizontal**
2.  **Bar Horizontal Stacked**
3.  **Bar Horizontal Percentage**
4.  **Bar Vertical**
5.  **Bar Vertical Stacked**
6.  **Bar Vertical Percentage**
7.  **Line Chart**
8.  **Area Stacked**
9.  **Area Percentage**
10.  **Heat Map**
11.  **Scatter Plot**

#### Key Characteristics:

-   **X-axis** (or **Y-axis**): Typically used for **categories**, **time intervals**, or **groupings**.
-   **Y-axis** (or **X-axis**): Used for **numerical values**, **metrics**, or **aggregations**.
-   **Purpose**: These graphs are designed for detailed analysis where data is plotted across two dimensions, allowing for complex relationships to be visualized.

##### Example:

-   **Line Chart**: The **X-axis** represents time intervals, and the **Y-axis** represents the value of the metric over time (e.g., temperature trends over months).

### Graphs without X and Y Axes

Some visualizations do not rely on Cartesian coordinates and instead represent data in alternative formats. These graphs typically focus on summarizing or aggregating data without requiring both an X and Y axis.

Examples of graphs without explicit X and Y axes include:

1.  **Pie Chart**
2.  **Donut Chart**
3.  **Metric**
4.  **Data Table**

#### Key Characteristics:

-   **No X or Y Axis**: These visualizations do not need both axes. Instead, they may use alternative ways to represent data, such as slices (for pie charts) or single numbers (for metrics).
-   **Purpose**: These visualizations are typically used for high-level summaries, single values, or categorical breakdowns without the need for traditional plotting along two axes.

##### Example:

-   **Pie Chart**: Slices represent different categories, and the size of each slice corresponds to the proportion of a particular value (e.g., sales distribution by product).

### Interaction with `dashboard_Module_Functions`

In graphs with both X and Y axes, the interaction between `dashboard_Module_Functions` and `dashboard_Module_Types` becomes more complex, as certain functions (like `sum` or `average`) are applied to the **Value Axis**, while other functions (like `terms` or `date_histogram`) are applied to the **Main Axis**. For example:

-   In a **Bar Vertical Stacked Chart**, the **Main Axis** groups the data by categories, while the **Value Axis** applies the function to aggregate metrics (e.g., summing the values for each category).

In graphs without X and Y axes, such as a **Pie Chart**, only the **Main Axis** (e.g., slices of the pie) is relevant, and functions are applied to group the data by categories. Here, the interaction between the `dashboard_Module_Functions` and `dashboard_Module_Types` remains simpler, as there is no second axis to account for.

----------

### Summary of X and Y Axes in Visualizations

#### Graphs with X and Y Axes:

-   **Used for**: Detailed analysis across two dimensions (categories/time vs. values).
-   **Examples**: Line Charts, Bar Charts, Heatmaps.
-   **Functions**: Apply to both axes—e.g., `date_histogram` on X-axis and `sum` on Y-axis.

#### Graphs without X and Y Axes:

-   **Used for**: High-level summaries or breakdowns without two dimensions.
-   **Examples**: Pie Charts, Metrics, Data Tables.
-   **Functions**: Primarily apply to a single axis (or no axes in the case of Metrics).

This concept clarifies which visualizations support complex two-axis analysis and which are designed for simpler, one-dimensional summaries.



## Concept of Frequency

The **Frequency** in the context of `dashboard_Module_Types` refers to how many fields or values can be plotted on a specific axis in a given visualization type. Frequency can be classified as either **Single** or **Multiple** depending on whether the axis allows one or more fields or values.

-   **Single Frequency**: Indicates that the axis can only handle a single field or value. For example, in a simple bar chart, the **Main Axis** (categories) might only accommodate one field (e.g., product names).
    
-   **Multiple Frequency**: Indicates that the axis can handle multiple fields or values. For instance, in a **stacked bar chart**, the **Value Axis** (e.g., sales numbers) might accommodate multiple fields, each representing a different metric (e.g., sales and profit).
    

The concept of frequency ensures that the dashboard module knows how to handle different axes and fields based on the graph type. This is essential for creating complex visualizations where multiple fields or values need to be visualized simultaneously.

----------

### Examples of Frequency

1.  **Bar Horizontal Chart**:
    
    -   **Main Axis (y)**: **Single** frequency—only one category field (e.g., product name) is allowed on the y-axis.
    -   **Value Axis (x)**: **Multiple** frequency—multiple values (e.g., sales and profit) can be plotted on the x-axis.
2.  **Line Chart**:
    
    -   **Main Axis (x)**: **Single** frequency—typically only one time-based field (e.g., date) is allowed on the x-axis.
    -   **Value Axis (y)**: **Multiple** frequency—multiple metrics (e.g., temperature and humidity) can be plotted on the y-axis.
3.  **Pie Chart**:
    
    -   **Main Axis (x)**: **Multiple** frequency—multiple slices (categories) are allowed, such as different product categories in a pie chart.
    -   **Value Axis (y)**: **Single** frequency—only one value (e.g., revenue) determines the size of each slice.
4.  **Heat Map**:
    
    -   **Main Axis (x, y)**: **Single** frequency on both axes—one field per axis (e.g., x-axis for time and y-axis for product categories).
    -   **Value Axis (z)**: **Single** frequency—only one metric (e.g., color intensity) is allowed to represent the values.

----------

### Example Table: Frequency and Axes in Visualizations

This table was created during our discussion to summarize the axis configurations and frequencies for different visualization types. It helps clarify how main and value axes are used, and whether they can accommodate single or multiple fields/values.


| **Graph Type**             | **Main Axis** (x/y) | **Main Axis Frequency**  | **Value Axis** (y/x)     | **Value Axis Frequency**  | **Color Axis**  |
|----------------------------|---------------------|--------------------------|--------------------------|---------------------------|-----------------|
| **Bar Horizontal**          | y                   | Single                   | x                        | Multiple                  | value           |
| **Bar Horizontal Stacked**  | y                   | Single                   | x                        | Multiple                  | value           |
| **Bar Horizontal Percentage**| y                  | Single                   | x                        | Multiple                  | value           |
| **Bar Vertical**            | x                   | Single                   | y                        | Multiple                  | value           |
| **Bar Vertical Stacked**    | x                   | Single                   | y                        | Multiple                  | value           |
| **Bar Vertical Percentage** | x                   | Single                   | y                        | Multiple                  | value           |
| **Line Chart**              | x                   | Single                   | y                        | Multiple                  | value           |
| **Area Stacked**            | x                   | Single                   | y                        | Multiple                  | value           |
| **Area Percentage**         | x                   | Single                   | y                        | Multiple                  | value           |
| **Heat Map**                | x, y                | Single                   | z (Color Intensity)      | Single                    | value           |
| **Scatter Plot**            | None                | N/A                      | x, y                     | Single                    | value           |
| **Pie Chart**               | x                   | Multiple                 | y                        | Single                    | main            |
| **Donut Chart**             | x                   | Multiple                 | y                        | Single                    | main            |
| **Metric**                  | None                | N/A                      | y                        | Single                    | value           |
| **Data Table**              | x                   | Multiple                 | y                        | Multiple                  | N/A             | 
|||||||

----------

### Explanation with Detailed Examples

1.  **Bar Horizontal Chart**:
    
    -   The **Main Axis** is the **y-axis**, and it has a **Single** frequency. This means only one category can be plotted on the y-axis (e.g., product names).
    -   The **Value Axis** is the **x-axis**, and it has a **Multiple** frequency. This means multiple values (e.g., sales, profit) can be plotted for each category on the x-axis.
2.  **Line Chart**:
    
    -   The **Main Axis** is the **x-axis**, which usually represents time or categories, and it has a **Single** frequency. For example, in a line chart showing temperature trends, the x-axis might represent time (e.g., days or months).
    -   The **Value Axis** is the **y-axis**, and it has a **Multiple** frequency. This allows the chart to display multiple metrics simultaneously (e.g., temperature and humidity over time).
3.  **Pie Chart**:
    
    -   The **Main Axis** in a pie chart is the **x-axis**, representing different categories (e.g., product categories), and it has a **Multiple** frequency. Each slice of the pie represents a different category.
    -   The **Value Axis** is the **y-axis**, and it has a **Single** frequency, meaning only one value (e.g., sales revenue) is used to determine the size of each slice.
4.  **Heat Map**:
    
    -   Both the **x-axis** and **y-axis** in a heatmap have **Single** frequency. This means that for each pair of values (one on the x-axis and one on the y-axis), a single value representing intensity (the **z-axis**) is plotted, typically using color to indicate the magnitude.

----------

### Key Takeaways

-   **Single Frequency**: Restricts the axis to one field or value, ideal for simple visualizations like bar charts or line charts where each axis only represents one dimension.
-   **Multiple Frequency**: Allows multiple fields or values, useful for more complex visualizations like stacked charts or pie charts where each axis or slice can represent multiple dimensions or metrics.
-   **Color Customization**: The **Color Axis** defines where the color is applied, depending on the frequency and axis configuration. Color is typically applied to the axis that has **multiple** categories or values to help distinguish between them.

----------

This concept of **frequency** helps control how complex or simple each visualization will be and ensures the correct application of functions based on the graph type and axis configuration.





----------

### Summary

The `dashboard_Module_Types` constant is a critical component of the dynamic dashboard module, defining how different types of visualizations should be configured and rendered. It ensures that the appropriate axes are used for each graph type, allows for color customization, and determines whether multiple fields or values can be plotted on each axis.

By working in tandem with `Dashboard_Module_Functions`, it provides a robust framework for dynamic, flexible, and accurate data visualization.

----------
