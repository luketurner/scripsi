import * as React from 'react';
import { InputHandlerCallback, InputHandlerKeymap, InputHandler } from './input-handler';
import ContentEditable from 'react-contenteditable';
import { observer } from 'mobx-react';

export type TextEditorChangeHandler = (newContent) => any;

interface TextEditorProps {
  focused?: boolean;
  onClick?: InputHandlerCallback;
  keymap?: InputHandlerKeymap;
  content: string;
  onChange: TextEditorChangeHandler;
}

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
 * @param {TextEditorProps} { onClick, onChange, keymap, content }
 * @returns
 */
@observer
export class TextEditor extends React.Component<TextEditorProps, {}> {

  public componentDidUpdate() {
    if (this.props.focused) this.refs['editor']['htmlEl']['focus']();
  }

  public render() {
    const { onClick, onChange, keymap, content } = this.props;
    return (
      <InputHandler onClick={onClick} keymap={keymap} context={{ content }}>
        <ContentEditable
          ref='editor'
          className='outline-none'
          html={content}
          onChange={e => onChange(e.target.value)}
        />
      </InputHandler>
    );
  }
}
