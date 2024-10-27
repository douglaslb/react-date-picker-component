import React from "react";
import { DatePickerType } from "./types";
import { createDatesArray, WEEK_DAYS } from "../../utils";
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

export function DatePickerBody(props: DatePickerBodyProps) {
  return (
    <div>
      <div className="grid grid-cols-7 w-fit h-fit gap-y-1">
        {WEEK_DAYS.map(({ label }) => (
          <div className="text-center text-xs font-medium text-white/50 w-8">
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
