import { Controller } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Checkbox } from '@/components/ui/checkbox';

const CheckBoxField = ({ name, control, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field orientation='horizontal' data-invalid={fieldState.invalid}>
          <Checkbox
            id={field.name}
            aria-invalid={fieldState.invalid}
            checked={field.value}
            onCheckedChange={field.onChange}
          />

          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default CheckBoxField;
