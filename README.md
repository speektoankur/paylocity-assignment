# Paylocity Assignment: Data-Driven Playwright Test Suite

## Overview
This project contains Playwright end-to-end tests for product search and cart functionality. The tests are data-driven, running for each filter value (e.g., Noise, boAt, Pebble) to ensure robust coverage of product filtering and cart operations.

## Test Flow
The following flowchart illustrates how the tests are executed:

```mermaid
flowchart TD
    A["Start Test Suite"] --> B["Initialize Page Objects"]
    B --> C["Go to Home Page"]
    C --> D["Search for Product (Smartwatches)"]
    D --> E{"For each Filter Value"}
    E -->|"Noise"| F["Apply Filter: Noise"]
    E -->|"boAt"| G["Apply Filter: boAt"]
    E -->|"Pebble"| H["Apply Filter: Pebble"]
    F --> I["Add Price Filter to URL"]
    G --> I
    H --> I
    I --> J["Sort by Price Descending"]
    J --> K["Wait and Take Screenshot"]
    K --> L["Select First Product"]
    L --> M["Wait and Go to Product View"]
    M --> N["Get Product Title"]
    N --> O["Take Screenshot"]
    O --> P["Add to Cart"]
    P --> Q["Go to Cart"]
    Q --> R["Get Product Title in Cart"]
    R --> S["Assert Product Title Matches"]
    S --> T["After Each: Take Final Screenshot"]
    T --> U["End Test"]
```

## How to Add New Filter Values
To run the test for additional product filters, simply update the `filterValues` array in `tests/product_search.spec.ts`:

```
const filterValues = ['Noise', 'boAt', 'Pebble', 'NewBrand'];
```

The test will automatically run for each value in the array.

## Running the Tests
1. Install dependencies:
   ```
   npm install
   ```
2. Run the tests:
   ```
   npx playwright test
   ```

## Project Structure
- `tests/product_search.spec.ts`: Main data-driven test file
- `page_objects/`: Page Object Model files for each page
- `utils/`: Utility functions (e.g., screenshot attachment)

---

For more details, see the code and comments in each file. 