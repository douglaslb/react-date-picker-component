import { twMerge } from "tailwind-merge";
import { DatePickerType } from "./types";

import styles from "./styles.module.css";

export interface DatePickerInputProps {
  type?: DatePickerType;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dateSelected: Date;
  datesSelected: Date[];
  rangeSelected: { start?: Date | null; end?: Date | null };
  setDateView: React.Dispatch<React.SetStateAction<Date>>;
}

export function DatePickerInput({
  isOpen,
  setIsOpen,
  type,
  dateSelected,
  datesSelected,
  rangeSelected,
}: DatePickerInputProps) {
  return (
    <div
      className={twMerge(
        "curso-pointer text-white/80 text-xs font-semibold bg-gray-950 hover:bg-gray-950/70 border border-white/10 shadow-xs rounded-md w-full h-9 flex items-center px-3 py-1 transition-all",
        isOpen && "outline-none ring-1 ring-white/40"
      )}
      onClick={() => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
      }}
    >
      {(!type || type === "single") &&
        dateSelected.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}

      {type === "multiple" && (
        <div
          className={`${styles.dateInput} flex items-center overflow-x-auto gap-1`}
        >
          {datesSelected.map((date, index) => (
            <p key={date.toISOString()} className="whitespace-nowrap">
              {`${index >= 1 ? `• ` : ""} ${date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}`}
            </p>
          ))}
        </div>
      )}

      {type === "range" && (
        <div
          className={`${styles.dateInput} flex items-center overflow-x-auto gap-1`}
        >
          {rangeSelected.start && (
            <p className="whitespace-nowrap">
              {rangeSelected.start.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          )}

          {rangeSelected.end && (
            <p className="whitespace-nowrap">
              -{" "}
              {rangeSelected.end.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
