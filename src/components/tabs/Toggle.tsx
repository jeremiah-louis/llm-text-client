import React from "react";

/**
 * Toggle switch for boolean settings (e.g., structured output mode).
 * @param checked - Whether the toggle is on
 * @param onChange - Callback for toggle state change
 * @param label - Label to display next to the toggle
 */
export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <span>{label}</span>
      <span className="relative inline-block w-10 h-6">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <span
          className={`block w-10 h-6 rounded-full transition-colors duration-200 ${
            checked ? "bg-blue-500" : "bg-gray-300"
          }`}
        ></span>
        <span
          className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? "translate-x-4" : ""
          }`}
        ></span>
      </span>
    </label>
  );
} 