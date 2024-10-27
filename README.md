# Date Picker Component

A customizable React Date Picker component built with Tailwind CSS that supports three variants: single date selection, multiple date selection, and range date selection.

## Usage

The app includes a date picker that can be used in different types:

- Single Date
- Multiple Dates
- Date Range

```js
import { DatePicker } from "./components/DatePicker";
import { DatePickerValue } from "./components/DatePicker/types";

const MyComponent = () => {
  const [datePickerValue, setDatePickerValue] = useState < DatePickerValue > {};

  return (
    <DatePicker
      value={datePickerValue}
      setValue={setDatePickerValue}
      type="single | multiple | range"
    />
  );
};
```

Inspired by the YouTube video: [Date Picker Tutorial - SolidJS](https://www.youtube.com/watch?v=7Tp8l909gHQ).
