import { useState } from "react";
import { DatePickerProps } from "./types";
import { DatePickerInput } from "./DatePickerInput";
import { DatePickerHeader } from "./DatePickerHeader";
import { DatePickerBody } from "./DatePickerBody";
import { twMerge } from "tailwind-merge";

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

      <div
        className={twMerge(
          "absolute flex flex-col gap-2 shadow-md bg-gray-950 rounded-lg mt-4 px-4 h-fit w-64 items-center transition-all z-50 left-1/2 -translate-x-1/2",
          isOpen
            ? "max-h-96 py-4 border border-white/10 translate-y-0 opacity-100 duration-300 scale-100"
            : "max-h-0 py-0 border-transparent border-none -translate-y-6 opacity-0 scale-75 overflow-hidden"
        )}
      >
        <DatePickerHeader
          dateView={viewDate}
          onClickMonth={handleOnClickMonth}
          onClickYear={handleOnClickYear}
          onClickPrev={handleOnClickPrevMonth}
          onClickNext={handleOnClickNextMonth}
        />
        <DatePickerBody
          type={props.type}
          dateView={viewDate}
          setDateView={setViewDate}
          dateSelected={selectedDate}
          datesSelected={selectedDates}
          rangeSelected={selectedRange}
          onClickDate={handleOnClickDate}
        />
      </div>
    </div>
  );
}
