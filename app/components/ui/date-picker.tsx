import { cn } from "~/lib/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

type DatePickerProps = {
    value: Date | undefined,
    onChange: (date: Date | undefined) => void
    placeholder?: string;
}

export function DatePicker({
    placeholder = 'Pick a date',
    onChange,
    value
}: DatePickerProps) { 
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => onChange(date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}