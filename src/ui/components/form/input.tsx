import * as React from 'react';

export interface CompactInputProps {
  value?: string;
  onChange?: (newValue: string) => void;
  onValidate?: (newValue: string) => boolean | string;
}

export const CompactInput = ({ value, onChange, onValidate }: CompactInputProps) => {

  const [ validationError, setValidationError ] = React.useState(null);

  const commitChange = (newValue: string) => {
    if (onChange) onChange(newValue);
  };

  const validateChange = (newValue: string) => {
    const result = onValidate ? onValidate(newValue) : true;
    if (typeof result !== 'string' && typeof result !== 'boolean') throw new Error(`Invalid response from onValidate: ${result}`);

    if (result === true) setValidationError(null);
    else if (result === false) setValidationError('Invalid value.');
    else setValidationError(result);

    return result;
  };

  const handleChange = e => {
    const newValue = e.target.value;
    const validationResult = validateChange(newValue);
    if (validationResult === true) commitChange(newValue);
  };

  return (
    <div>
      <input type='text' value={value} onChange={handleChange} />
      { validationError && <div> {validationError} </div>}
    </div>
  );
};
