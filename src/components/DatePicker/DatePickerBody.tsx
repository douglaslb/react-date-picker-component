import React from "react";
import { DatePickerType } from "./types";
import { createDatesArray, equalDates, WEEK_DAYS } from "./utils";
import { twMerge } from "tailwind-merge";

export interface DatePickerBodyProps {
  type?: DatePickerType;
  dateView: Date;
  dateSelected: Date;
  datesSelected: Date[];
  rangeSelected: { start: Date | null; end: Date | null };
  setDateView: React.Dispatch<React.SetStateAction<Date>>;
  onClickDate: (date: Date) => void;
}

export function DatePickerBody({
  dateView,
  type,
  dateSelected,
  onClickDate,
}: DatePickerBodyProps) {
  const today = new Date();

  return (
    <div>
      <div className="grid grid-cols-7 w-fit h-fit gap-y-1">
        {WEEK_DAYS.map(({ label }) => (
          <div
            key={label}
            className="text-center text-xs font-medium text-white/50 w-8"
          >
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 w-fit h-fit gap-y-1">
        {createDatesArray(dateView).map((date) => (
          <div
            key={date.toISOString()}
            className="flex items-center justify-center"
          >
            {(!type || type === "single") && (
              <div
                onClick={() => onClickDate(date)}
                className={twMerge(
                  "flex items-center justify-center text-center text-xs font-semibold cursor-pointer rounded-full hover:bg-white/10 w-8 h-8 transition-all select-none active:scale-90",
                  equalDates(today, date) &&
                    "border border-dashed border-white/30",
                  equalDates(dateSelected, date) &&
                    "bg-orange-700 hover:bg-orange-700",
                  dateView.getMonth() !== date.getMonth() ||
                    dateView.getFullYear() !== dateView.getFullYear()
                    ? "text-white/30"
                    : ""
                )}
              >
                {date.getDate()}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
