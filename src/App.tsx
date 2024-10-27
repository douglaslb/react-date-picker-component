import { useState } from "react";
import { DatePickerValue } from "./components/DatePicker/types";
import { DatePicker } from "./components/DatePicker";

function App() {
  const start = new Date();
  start.setDate(start.getDate() - 3);
  const end = new Date();
  end.setDate(end.getDate() + 2);

  const [datePickerValue, setDatePickerValue] = useState<DatePickerValue>({
    endDate: end,
    startDate: start,
  });

  return (
    <section className="w-screen h-screen bg-gray-900 flex items-center justify-center">
      <div className="flex flex-col w-full max-w-xs">
        <h3 className="text-white font-semibold text-sm mb-2">
          Single Date Picker
        </h3>
        <DatePicker value={datePickerValue} setValue={setDatePickerValue} />
        <h3 className="text-white font-semibold text-sm mb-2 mt-8">
          Multiple Date Picker
        </h3>
        <DatePicker
          value={datePickerValue}
          setValue={setDatePickerValue}
          type="multiple"
        />
        <h3 className="text-white font-semibold text-sm mb-2 mt-8">
          Range Date Picker
        </h3>
        <DatePicker
          value={datePickerValue}
          setValue={setDatePickerValue}
          type="range"
        />
      </div>
    </section>
  );
}

export default App;
