"use client";

import { useRef } from "react";
import { createCalendar } from "@internationalized/date";
import {
  useDateField,
  useLocale,
  type AriaDatePickerProps,
  type DateValue,
} from "react-aria";
import { useDateFieldState } from "react-stately";
import { DateSegment } from "./date-segment";
import { cn } from "../../lib/utils";

function DateField(props: AriaDatePickerProps<DateValue>) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { locale } = useLocale();

  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });
  const { fieldProps } = useDateField(props, state, ref);

  const dateSegments = state.segments.slice(0, 5);
  return (
    <div
    
      {...fieldProps}
      ref={ref}
      className={cn(
        "inline-flex h-10 flex-1 items-center rounded-l-md border border-r-0 border-input bg-transparent py-2 pl-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        props.isDisabled ? "cursor-not-allowed opacity-50" : ""
      )}
    >
      {dateSegments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
      {state.validationState === "invalid" && (
        <span aria-hidden="true">🚫</span>
      )}
    </div>
  );
}

export { DateField };
