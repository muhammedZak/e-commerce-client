import React from 'react';
import FormField from './FormField';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

function SelectField({
  name,
  control,
  label,
  options,
  placeholder,
  disable,
  id,
  mode,
}) {
  return (
    <FormField name={name} control={control} label={label}>
      {(field, state) => (
        <Select
          value={(mode ? (field.value = id) : field.value) || ''}
          onValueChange={field.onChange}
          disabled={disable}>
          <SelectTrigger
            aria-invalid={state.invalid}
            id={field.name}
            className='w-full'>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{label}</SelectLabel>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </FormField>
  );
}

export default SelectField;
