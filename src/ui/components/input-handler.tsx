import * as React from 'react';

export enum InputResult {
  Handled = 'handled',
  NotHandled = 'not-handled',
}

export enum KeyCode {
  Backspace = 'Backspace',
  Enter = 'Enter',
  Tab = 'Tab',
}

export enum ModifierCode {
  None = '',
  Shift = 'S',
  Control = 'C',
  Alt = 'A',
}

export interface InputHandlerContext { [key: string]: any; }
export type InputHandlerCallback = (event: any, context?: InputHandlerContext) => InputResult;

export interface InputHandlerKeymap {
  [key: string]: InputHandlerCallback;
}

export interface InputHandlerProps {
  onClick?: InputHandlerCallback;
  keymap?: InputHandlerKeymap;
  context?: { [key: string]: any };
  children?: React.ReactNode;
}

const getKeyString = (event: React.KeyboardEvent<any>) => {
  const key = event.key;

  // Will be some combination of 'S', 'C', and 'A', e.g. 'SC' or ''
  const modifier = (event.altKey && key !== 'Alt' && ModifierCode.Alt || '')
                 + (event.ctrlKey && key !== 'Control' && ModifierCode.Control || '')
                 + (event.shiftKey && key !== 'Shift' && ModifierCode.Shift || '');
  return modifier ? `${modifier}-${key}` : key;
};

// TODO -- trying to make this function generic overlaps with jsx syntax?
const handleKeypress = (event: React.KeyboardEvent<any>, keymap: InputHandlerKeymap, { skip = false, context = {} } = {}) => {
  const key = getKeyString(event); // e.g. CA-b or S-Enter

  const handler = keymap[key];
  if (!handler) return; // Nothing to do -- allow event to be handled normally.

  // Do not call handlers repeatedly when key is held down.
  if (event.repeat || skip) {
    event.preventDefault(); // Prevent keypress from being handled by the browser
    event.stopPropagation(); // Prevent keypress from being handled by any parent InputHandlers
    return;
  }

  const result = handler(event, context);

  if (result === InputResult.Handled) {
    event.preventDefault(); // Prevent keypress from being handled by the browser
    event.stopPropagation(); // Prevent keypress from being handled by any parent InputHandlers
  }
}

/**
 * Utility component for adding interactivity (in the form of click events and keybindings) to its children.
 * 
 * The most useful prop is `keymap`, which can be an object mapping keys to handler functions. Keys are strings
 * like "C-s", "a", "Tab", "S-Enter", etc.
 *
 * @param {InputHandlerProps} { onClick, keymap, children, context }
 * @returns
 */
export const InputHandler = ({ onClick, keymap, children, context }: InputHandlerProps) => {
  keymap = keymap || {};
  return (
    <div
      onKeyDown={e => handleKeypress(e, keymap, { context })}
      onKeyUp={e => handleKeypress(e, keymap, { skip: true })}
      onClick={onClick}
    >
      {children}
    </div>
  )
};