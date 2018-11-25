import * as React from 'react';
import { InputHandler } from "./input-handler";

export const Overlay = ({ onClick }) => {
  return (
    <InputHandler onClick={onClick}>
      <div className='pin absolute' />
    </InputHandler>
  );
}