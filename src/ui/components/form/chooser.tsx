import * as React from 'react';

export interface Choice {
  value: string;
  label: string;
}

export interface ChooserProps {
  value?: string;
  choices: Choice[];
  onChange?: (newValue: string) => void;
}

export const Chooser = ({ value: currentValue, choices, onChange }: ChooserProps) => {
  return (
    <select onChange={e => onChange(e.target.value)} value={currentValue}>
      {choices.map(({ value, label }) => (
        <option key={value} value={value}>{label}</option>
      ))}
    </select>
  );
};
