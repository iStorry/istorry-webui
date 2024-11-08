"use client";

import React, { useRef, useState } from "react";
import { useDatePickerState, type DatePickerStateOptions } from "react-stately";
import {
  I18nProvider,
  useButton,
  useDatePicker,
  useInteractOutside,
  type DateValue,
} from "react-aria";
import { useForwardedRef } from "../../lib/use-forwarded-ref";
import { DateField } from "./date-field";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "./calendar";
import { cn } from "../../lib/utils";
import { CalendarIcon } from '@radix-ui/react-icons';

const DateTimePicker = React.forwardRef<
  HTMLDivElement,
  DatePickerStateOptions<DateValue>
>((props, forwardedRef) => {
  const ref = useForwardedRef(forwardedRef);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState(false);

  const state = useDatePickerState(props);
  const {
    groupProps,
    fieldProps,
    buttonProps: _buttonProps,
    dialogProps,
    calendarProps,
  } = useDatePicker(props, state, ref);
  const { buttonProps } = useButton(_buttonProps, buttonRef);
  useInteractOutside({
    ref: contentRef,
    onInteractOutside: () => {
      setOpen(false);
    },
  });

  return (
    <I18nProvider locale="ja-JP">
      <div
        {...groupProps}
        ref={ref}
        className={cn(
          groupProps.className,
          "flex items-center rounded-md ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
        )}
      >
        <DateField {...fieldProps} />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              {...buttonProps}
              variant="outline"
              className="rounded-l-none"
              disabled={props.isDisabled}
              onClick={() => setOpen(true)}
            >
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent ref={contentRef} className="w-full">
            <div {...dialogProps} className="space-y-3">
              <Calendar {...calendarProps} />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </I18nProvider>
  );
});

DateTimePicker.displayName = "DateTimePicker";

export { DateTimePicker };
