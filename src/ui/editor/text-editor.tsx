import * as Draft from 'draft-js'
import * as React from 'react'

export interface EditorEventHandler<T> { (e: T): boolean }

interface TextEditorProps {
  content: string
  onChange: { (s: string): any }
  onReturn?: EditorEventHandler<any>
  onTab?: EditorEventHandler<any>
  onDrop?: EditorEventHandler<any>
  onBackspace?: { (): void }
}

interface TextEditorState {
  editorState: Draft.EditorState
}

const constantlyFalse = () => false;
const constantlyTrue = () => true;

const serializeState = (editorState: Draft.EditorState): string => 
  JSON.stringify(
    Draft.convertToRaw(
      editorState.getCurrentContent()));

const deserializeState = (stateString: string): Draft.EditorState => 
  Draft.EditorState.createWithContent(
    Draft.ContentState.createFromBlockArray(
      Draft.convertFromRaw(
        JSON.parse(stateString))));

class TextEditor extends React.Component<TextEditorProps, TextEditorState> {
  constructor(props) {
    super(props);
    this.emitChange = this.emitChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    
    this.state = {
      editorState: props.content.length > 1 ? deserializeState(props.content) : Draft.EditorState.createEmpty()
    };
  }
  
  public render() {
    return <Draft.Editor editorState={this.state.editorState} 
                         onChange={this.emitChange}
                         handleKeyCommand={this.handleKeyCommand}
                         handleReturn={this.props.onReturn || constantlyFalse}
                         onTab={this.props.onTab || constantlyFalse}
                         handleDrop={this.props.onDrop || constantlyTrue}
                         ref="editor" />;
  }
  
  emitChange(editorState: Draft.EditorState) {
    this.setState({ editorState });
    this.props.onChange(serializeState(editorState));
  }
  
  handleKeyCommand(command) {
    if (command === 'backspace') {
      // if there's no text to delete, allow caller to rebind onBackspace
      const hasText = this.state.editorState.getCurrentContent().hasText();
      if (!hasText) {
        this.props.onBackspace();
      }
    }
    return false;
  }
  
  componentDidMount() {
    this.refs['editor']['focus']();
  }
}

export default TextEditor;