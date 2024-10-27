import { DropdownItem } from "./types";
import { Dropdown } from "./Dropdown";
import { createYearsArray, MONTHS } from "../../utils";
import { useState } from "react";

export interface DatePickerHeaderProps {
  dateView: Date;
  onClickPrev: () => void;
  onClickNext: () => void;
  onClickMonth: (item: DropdownItem) => void;
  onClickYear: (item: DropdownItem) => void;
}

export function DatePickerHeader({
  dateView,
  onClickMonth,
  onClickYear,
  onClickPrev,
  onClickNext,
}: DatePickerHeaderProps) {
  const [isOpenMonth, setIsOpenMonth] = useState<boolean>(false);
  const [isOpenYear, setIsOpenYear] = useState<boolean>(false);

  return (
    <div className="flex items-center w-full">
      <div
        onClick={onClickPrev}
        className="text-white hover:bg-white/10 text-xs w-8 h-8 flex items-center justify-center cursor-pointer rounded-full transition-colors border border-white/10 mr-auto"
      >
        <svg
          fill="currentColor"
          strokeWidth="0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          height="1em"
          width="1em"
          style={{ overflow: "visible", color: "currentcolor" }}
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path>
        </svg>
      </div>
      <Dropdown
        items={MONTHS}
        currentSelected={dateView.getMonth()}
        isOpen={isOpenMonth}
        setIsOpen={setIsOpenMonth}
        onClick={onClickMonth}
      />
      <Dropdown
        items={createYearsArray(new Date())}
        currentSelected={dateView.getFullYear()}
        isOpen={isOpenYear}
        setIsOpen={setIsOpenYear}
        onClick={onClickYear}
      />
      <div
        onClick={onClickNext}
        className="text-white hover:bg-white/10 text-xs w-8 h-8 flex items-center justify-center cursor-pointer rounded-full transition-colors border border-white/10 ml-auto"
      >
        <svg
          fill="currentColor"
          strokeWidth="0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          height="1em"
          width="1em"
          style={{ overflow: "visible", color: "currentcolor" }}
        >
          <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path>
        </svg>
      </div>
    </div>
  );
}
