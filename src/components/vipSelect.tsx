"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Control } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type VIPSelectProps = {
  name: string;
  control: Control<any>;
};

export function VIPSelect({ name, control }: VIPSelectProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{name}</FormLabel>
          <FormControl>
            <Select
              onValueChange={(value) => field.onChange(value === "true")} // Convert to boolean
              value={field.value ? "true" : "false"} // Use value prop instead of defaultValue
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="false" value="false">
                  False
                </SelectItem>
                <SelectItem key="true" value="true">
                  True
                </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default VIPSelect;

