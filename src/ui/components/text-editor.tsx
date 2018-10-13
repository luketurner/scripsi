import * as Draft from 'draft-js';
import { observer } from 'mobx-react';
import * as React from 'react';

import { bind } from 'bind-decorator';
import Editor from 'draft-js-plugins-editor';

export type EditorKeyHandler<T> = (e: T) => Draft.DraftHandleValue;
export type EditorEventHandler<T> = (e: T) => void;

interface TextEditorProps {
  type: Draft.DraftBlockType;
  content: string;
  isFocused: boolean;
  plugins?: any[];

  // event handler props
  onChange: EditorEventHandler<string>;
  onFocus?: EditorEventHandler<void>;

  // keybinding props
  onReturn?: EditorKeyHandler<KeyboardEvent>;
  onTab?: EditorKeyHandler<KeyboardEvent>;
  onDrop?: EditorKeyHandler<KeyboardEvent>;
  onBackspace?: (state: Draft.EditorState) => Draft.DraftHandleValue;
}

interface TextEditorState {
  editorState: Draft.EditorState;
}

const constantlyFalse = () => false;
const constantlyTrue = () => true;

const serializeState = (editorState: Draft.EditorState): string =>
  JSON.stringify(
    Draft.convertToRaw(
      editorState.getCurrentContent()));

const deserializeState = (stateString: string): Draft.EditorState =>
  Draft.EditorState.createWithContent(
    Draft.convertFromRaw(
      JSON.parse(stateString)));

/**
 * Component that wraps the Draft.js editor, maintaining editor state internally to
 * minimize editing latency. Also enforces some consistent behavioral rules, and exposes
 * a lot of hooks for handling different types of user input.
 *
 * A TextEditor block is deliberately simpler than a full Draft.js editor -- for example,
 * it can only represent a single Draft block type. For more than one block type, you have
 * to use multiple TextEditor components. This seems to correspond best with scripsi's "nodes"
 * paradigm.
 *
 * Possibly could refactor the app so that the whole thing is just one Draft editor.
 *
 * @class TextEditor
 * @extends {React.Component<TextEditorProps, TextEditorState>}
 */
@observer
class TextEditor extends React.Component<TextEditorProps, TextEditorState> {

  private editorRef: any;

  constructor(props) {
    super(props);

    this.state = {
      editorState: props.content.length > 1 ? deserializeState(props.content) : Draft.EditorState.createEmpty()
    };
    this.editorRef = React.createRef();
  }

  public render() {

    // render the internal editorState using the appropriate block type if it's specified to be different.
    const editorState = this.updateBlockType(this.state.editorState, this.props.type);

    return (
      <Editor
        editorState={editorState}
        onChange={this.emitChange}
        handleKeyCommand={this.handleKeyCommand}
        handleReturn={this.handleReturn}
        onTab={this.onTab}
        handleDrop={this.props.onDrop || constantlyTrue}
        onFocus={this.props.onFocus || constantlyFalse}
        ref={this.editorRef}
        plugins={this.props.plugins || []}
      />
    );
  }

  /**
   * Handles a Return command by calling the onReturn handler.
   *
   * @param {any} e
   * @returns
   * @memberof TextEditor
   */
  @bind
  public handleReturn(e) {
    return this.props.onReturn ? this.props.onReturn(e) : 'not-handled';
  }

  /**
   * Handle tab events by calling the onTab handler. Mimics the behavior of
   * the handleKeyCommand API, such that if the onTab handler returns 'handled',
   * the tab is not inserted.
   *
   * @param {any} e
   * @memberof TextEditor
   */
  @bind
  public onTab(e) {
    const handled = this.props.onTab ? this.props.onTab(e) : 'not-handled';
    if (handled === 'handled') {
      e.preventDefault(); // keybinding was handled already -- don't insert the character
    }
  }

  /**
   * Hey, we changed! Call our onChange event handler.
   * Also set our local state, which re-renders the component.
   *
   * @param {Draft.EditorState} editorState
   * @memberof TextEditor
   */
  @bind
  public emitChange(editorState: Draft.EditorState) {
    this.setState({ editorState });
    this.props.onChange(serializeState(editorState));
  }

  /**
   * When we receive certain keys, this function calls the corresponding
   * event handler prop on the TextEditor. For example, when we get a 'backspace',
   * we call onBackspace.
   *
   * This allows us to provide a unified and type-checked set of key bindings for the TextEditor
   * component, in a deliberately less flexible way than Draft.js expsoes by default.
   *
   * Annoyingly, we have no event object to pass to the event listeners.
   *
   * @param {any} command
   * @returns
   * @memberof TextEditor
   */
  @bind
  public handleKeyCommand(command) {
    if (command === 'backspace') {
      // Defer to optional onBackspace prop
      return this.props.onBackspace ? this.props.onBackspace(this.state.editorState) : 'not-handled';
    }
    return 'not-handled';
  }

  /**
   * Focuses the text editor, but only if it's selected.
   *
   * @memberof TextEditor
   */
  public componentDidUpdate() {
    const editorElement = this.editorRef.current;
    if (this.props.isFocused && document.activeElement !== editorElement) {
      editorElement['focus'](); // focus the element in the DOM
      // this.setState({ editorState: Draft.EditorState.moveFocusToEnd(this.state.editorState) })
    }
  }

  /**
   * Updates the Draft.js editorState such that the first content block is updated
   * to have the requested blockType. Returns the new editor state object.
   *
   * @private
   * @param {Draft.EditorState} editorState
   * @param {Draft.DraftBlockType} blockType
   * @returns {Draft.EditorState}
   * @memberof TextEditor
   */
  private updateBlockType(editorState: Draft.EditorState, blockType: Draft.DraftBlockType): Draft.EditorState {
    const contentState = editorState.getCurrentContent();
    const contentBlock = contentState.getFirstBlock();
    const newContent = contentState.mergeDeep({
      blockMap: {
        [contentBlock.get('key')]: contentBlock.set('type', this.props.type || 'unstyled')
      }
    }) as Draft.ContentState;
    return Draft.EditorState.push(editorState, newContent, 'change-block-type');
  }
}

export default TextEditor;
