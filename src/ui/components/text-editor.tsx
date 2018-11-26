import { observer } from 'mobx-react-lite';
import * as React from 'react';
import ContentEditable from 'react-contenteditable';
import { focusEnd } from '../../util/selection';
import { InputHandler, InputHandlerCallback, InputHandlerKeymap } from './input-handler';
import { RequestedClick } from '../state';

export type TextEditorChangeHandler = (newContent) => any;

export interface TextEditorProps {
  isFocused?: boolean;
  onClick?: InputHandlerCallback;
  keymap?: InputHandlerKeymap;
  contentToHtml?: (content: string) => string;
  htmlToContent?: (content: string) => string;
  content: string;
  onChange: TextEditorChangeHandler;
  requestedClick?: RequestedClick;
}

const identity = (x, ...xs) => x;

/**
 * Generic text editor built around ContentEditable, implementing Scripsi conventions.
 *
 * Accepts a `content` which is an HTML string to be rendered into the text editor.
 * The `onChange` prop should be a function that accepts an updated HTML string.
 *
 * The `onClick` and `keymap` props work the same as for the InputHandler component, except
 *  that they automatically receive the current editor content in the `content` property
 *  of their context object (second argument for the handlers).
 *
 * @param {TextEditorProps} props
 * @returns
 */
export const TextEditor = observer((props: TextEditorProps) => {
  const { onClick, onChange, keymap, content, contentToHtml = identity, htmlToContent = identity, isFocused, requestedClick } = props;

  const contentEditableRef = React.useRef(null);

  React.useEffect(() => {
    const el = contentEditableRef.current && contentEditableRef.current.htmlEl;
    if (el && isFocused && !el.contains(document.activeElement)) focusEnd(el);
  });

  // React.useEffect(() => {
  //   if (isFocused && requestedClick) {
  //     const el: HTMLElement | void = contentEditableRef.current && contentEditableRef.current.htmlEl;
  //     if (!el) return;

  //     console.log('dispatching requested click');
  //     el.dispatchEvent(new MouseEvent('click', {
  //       view: window, // TODO what does this do?
  //       bubbles: true, 
  //       cancelable: true,
  //       ...requestedClick
  //     }));
  //   }
  // })

  return (
    <InputHandler onClick={onClick} keymap={keymap} context={{ content }}>
      <ContentEditable
        // tslint:disable-next-line:jsx-no-string-ref
        ref={contentEditableRef}
        className='outline-none'
        html={contentToHtml(content)}
        onChange={e => onChange(htmlToContent(e.target.value))}
      />
    </InputHandler>
  );
});
