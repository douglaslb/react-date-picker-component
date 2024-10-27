import { useEffect, useRef } from "react";

import { twMerge } from "tailwind-merge";
import { DropdownItem } from "./types";

import styles from "./styles.module.css";

export interface DropdownProps {
  items: DropdownItem[];
  currentSelected: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: (item: DropdownItem) => void;
}
export function Dropdown({
  items,
  isOpen,
  setIsOpen,
  currentSelected,
  onClick,
}: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleClickOutside(event: Event) {
    if (dropdownRef && !dropdownRef.current!.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  return (
    <div ref={dropdownRef} className="relative">
      <div
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
        className="text-white text-sm font-bold hover:bg-white/10 w-16 h-8 rounded-md cursor-pointer text-center flex items-center justify-center transition-colors"
      >
        {items.find((item) => item.id === currentSelected)?.label || ""}
      </div>
      <div
        className={twMerge(
          `${styles.dropdown} absolute grid grid-cols-4 bg-gray-950 w-56 rounded-md top-10 px-2 overflow-auto transition-all duration-200 gap-1 z-50 -translate-x-1/2 left-1/2`,
          isOpen
            ? "max-h-40 py-2 border border-white/20 shadow-xl opacity-100"
            : "max-h-0 py-0 border-none border-transparent shadow-none opacity-0"
        )}
      >
        {items.map((item) => (
          <div
            onClick={() => {
              onClick(item);
              setIsOpen(false);
            }}
            className={twMerge(
              "text-white flex items-center justify-center text-center text-xs font-bold cursor-pointer hover:bg-white/10 rounded-md py-1 px-3",
              currentSelected == item.id && "bg-orange-600 hover:bg-orange-600"
            )}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
