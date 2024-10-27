import { useState } from "react";
import { DatePickerProps } from "./types";
import { DatePickerInput } from "./DatePickerInput";

export function DatePicker(props: DatePickerProps) {
  const today = new Date();

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [viewDate, setViewDate] = useState<Date>(today);

  //For single selection
  const [selectedDate, setSelectedDate] = useState<Date>(
    props.value.selectedDate ?? today
  );

  //For multiple selection
  const [selectedDates, setSelectedDates] = useState<Date[]>(
    props.value.multipleDates ?? [today]
  );

  //For range selection
  const [selectedRange, setSelectedRange] = useState<{
    start: Date;
    end: Date;
  }>({
    start: props.value.startDate ?? today,
    end: props.value.endDate ?? today,
  });

  function handleOnClickMonth() {}
  function handleOnClickYear() {}
  function handleOnClickNextMonth() {}
  function handleOnClickPrevMonth() {}
  function handleOnClickDate() {}

  return (
    <div className="relative">
      <DatePickerInput
        type={props.type}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dateSelected={selectedDate}
        datesSelected={selectedDates}
        rangeSelected={selectedRange}
        setDateView={setViewDate}
      />
    </div>
  );
}
