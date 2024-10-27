import React from "react";

export interface DatePickerValue {
  selectedDate?: Date;
  multipleDates?: Date[];
  startDate?: Date;
  endDate?: Date;
}

export type DatePickerType = "single" | "multiple" | "range";

export interface DatePickerProps {
  type?: DatePickerType;
  value: DatePickerValue;
  setValue: React.Dispatch<React.SetStateAction<DatePickerValue>>;
}

export interface DropdownItem {
  id: number;
  label: string;
}
