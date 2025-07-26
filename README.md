# Paylocity Assignment: Data-Driven Playwright Test Suite

## Overview
This project contains Playwright end-to-end tests for product search and cart functionality. The tests are data-driven, running for each filter value (e.g., Noise, boAt, Pebble) to ensure robust coverage of product filtering and cart operations.
## Execution Flow
<img width="989" height="330" alt="Screenshot 2025-07-26 at 11 02 51 PM" src="https://github.com/user-attachments/assets/54aa05cc-9013-4843-9aa8-534dab2d0848" />

## Local Test RUN (Traces)
<img width="1508" height="829" alt="Screenshot 2025-07-26 at 3 21 01 AM" src="https://github.com/user-attachments/assets/536ae1ee-88e5-4061-b311-7c0b74632f9e" />

## Test Reports View
<img width="1056" height="731" alt="Screenshot 2025-07-26 at 2 51 27 PM" src="https://github.com/user-attachments/assets/b0296a92-2f9b-432a-83b0-cb2d56ece8ef" />

## Test Artefacts Capture Under GitHub Actions 
<img width="1906" height="853" alt="Screenshot 2025-07-26 at 3 22 49 PM" src="https://github.com/user-attachments/assets/fd1f2774-f640-4bd4-a42a-1ebe2de42162" />

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
