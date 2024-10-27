import { useEffect, useRef, useState } from "react";
import { DatePickerProps, DropdownItem } from "./types";
import { DatePickerInput } from "./DatePickerInput";
import { DatePickerHeader } from "./DatePickerHeader";
import { DatePickerBody } from "./DatePickerBody";
import { twMerge } from "tailwind-merge";
import { equalDates } from "./utils";

export function DatePicker(props: DatePickerProps) {
  const datePickerRef = useRef<HTMLDivElement>(null);
  const today = new Date();

  const [isOpen, setIsOpen] = useState<boolean>(false);
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
    start?: Date;
    end?: Date;
  }>({
    start: props.value.startDate ?? today,
    end: props.value.endDate ?? today,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  function handleOnClickMonth(item: DropdownItem) {
    setViewDate((prevViewDate) => {
      const newViewDate = new Date(prevViewDate);
      newViewDate.setMonth(item.id);
      return newViewDate;
    });
  }

  function handleOnClickYear(item: DropdownItem) {
    setViewDate((prevViewDate) => {
      const newViewDate = new Date(prevViewDate);
      newViewDate.setFullYear(item.id);
      return newViewDate;
    });
  }

  function handleOnClickNextMonth() {
    setViewDate((prevViewDate) => {
      const newViewDate = new Date(prevViewDate);
      newViewDate.setMonth(newViewDate.getMonth() + 2, 0);

      return newViewDate;
    });
  }

  function handleOnClickPrevMonth() {
    setViewDate((prevViewDate) => {
      const newViewDate = new Date(prevViewDate);
      newViewDate.setMonth(newViewDate.getMonth(), 0);

      return newViewDate;
    });
  }

  function handleOnClickDate(selectedDate: Date) {
    if (props.type == "multiple") {
      setSelectedDates((prevSelectedDates) => {
        const hasDate = prevSelectedDates.find((date) =>
          equalDates(date, selectedDate)
        );

        if (!hasDate) {
          return [...prevSelectedDates, selectedDate];
        }

        return prevSelectedDates.filter(
          (date) => !equalDates(date, selectedDate)
        );
      });

      return;
    }

    if (props.type == "range") {
      if (!selectedRange.start) {
        setSelectedRange(() => {
          return {
            start: selectedDate,
            end: undefined,
          };
        });

        props.setValue({
          startDate: selectedRange.start,
          endDate: selectedRange.end,
        });

        return;
      }

      const isSelectedDateDifferentFromStartDate = !equalDates(
        selectedDate,
        selectedRange.start
      );

      if (
        selectedRange.start &&
        !selectedRange.end &&
        isSelectedDateDifferentFromStartDate
      ) {
        const isSelectedDateBeforeStartDate =
          selectedDate.getTime() < selectedRange.start.getTime();

        if (isSelectedDateBeforeStartDate) {
          setSelectedRange((prevSelectedRange) => {
            return {
              start: selectedDate,
              end: prevSelectedRange.start,
            };
          });

          return;
        }

        setSelectedRange((prevSelectedRange) => {
          return {
            start: prevSelectedRange.start,
            end: selectedDate,
          };
        });

        props.setValue({
          startDate: selectedRange.start,
          endDate: selectedRange.end,
        });
      }

      if (selectedRange.start && selectedRange.end) {
        setSelectedRange({
          start: selectedDate,
          end: undefined,
        });

        props.setValue({
          startDate: selectedRange.start,
          endDate: selectedRange.end,
        });

        return;
      }

      return;
    }

    setSelectedDate(selectedDate);
    setViewDate(selectedDate);
    props.setValue({ selectedDate });
  }

  return (
    <div ref={datePickerRef} className="relative">
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
