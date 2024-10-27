import React from "react";
import { DatePickerType } from "./types";
import { betweenDates, createDatesArray, equalDates, WEEK_DAYS } from "./utils";
import { twMerge } from "tailwind-merge";

export interface DatePickerBodyProps {
  type?: DatePickerType;
  dateView: Date;
  dateSelected: Date;
  datesSelected: Date[];
  rangeSelected: { start?: Date | null; end?: Date | null };
  setDateView: React.Dispatch<React.SetStateAction<Date>>;
  onClickDate: (date: Date) => void;
}

export function DatePickerBody({
  dateView,
  type,
  dateSelected,
  datesSelected,
  rangeSelected,
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
            {/* SINGLE TYPE SELECTION */}
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

            {/* MULTIPLE TYPE SELECTION */}
            {type === "multiple" && (
              <div
                onClick={() => onClickDate(date)}
                className={twMerge(
                  "flex items-center justify-center text-center text-xs font-semibold cursor-pointer rounded-full hover:bg-white/10 w-8 h-8 transition-all select-none active:scale-90",
                  equalDates(today, date) &&
                    "border border-dashed border-white/30",
                  datesSelected.some((d) => equalDates(d, date)) &&
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

            {/* RANGE TYPE SELECTION */}
            {type === "range" && (
              <div
                onClick={() => onClickDate(date)}
                className={twMerge(
                  "relative flex items-center justify-center text-center text-xs font-semibold cursor-pointer rounded-full hover:bg-white/10 w-8 h-8 transition-all select-none active:scale-90",
                  equalDates(today, date) && "ring-1 ring-white/30",
                  rangeSelected.start && equalDates(rangeSelected.start, date)
                    ? "bg-orange-800 border-none hover:bg-orange-800"
                    : "",
                  rangeSelected.end && equalDates(rangeSelected.end, date)
                    ? "bg-orange-800 border-none hover:bg-orange-800"
                    : "",
                  dateView.getMonth() !== date.getMonth() ||
                    dateView.getFullYear() !== dateView.getFullYear()
                    ? "text-white/30"
                    : ""
                )}
              >
                {rangeSelected.start &&
                  rangeSelected.end &&
                  betweenDates(
                    rangeSelected.start,
                    date,
                    rangeSelected.end
                  ) && (
                    <div className="bg-orange-800/30 h-full w-full absolute" />
                  )}

                {rangeSelected.start &&
                  rangeSelected.end &&
                  equalDates(rangeSelected.start, date) &&
                  !equalDates(rangeSelected.start, rangeSelected.end) && (
                    <div className="bg-gradient-to-l from-orange-800/30 w-full h-full absolute rounded-l-full" />
                  )}

                {rangeSelected.start &&
                  rangeSelected.end &&
                  equalDates(rangeSelected.end, date) &&
                  !equalDates(rangeSelected.start, rangeSelected.end) && (
                    <div className="bg-gradient-to-r from-orange-800/30 w-full h-full absolute rounded-r-full" />
                  )}

                <p className="z-10">{date.getDate()}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
