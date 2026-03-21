import { Controller } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '../ui/field';

function FormField({ name, control, label, children }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          {children(field, fieldState)}
          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export default FormField;
