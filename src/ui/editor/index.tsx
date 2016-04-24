import * as React from 'react'
import * as Draft from 'draft-js'

interface TextEditorProps {
  content: string
  onChange: { (s: string): any }
  onReturn: Function
}

interface TextEditorState {
  editorState: Draft.EditorState
}

const serializeState = (editorState: Draft.EditorState): string => 
  JSON.stringify(
    Draft.convertToRaw(
      editorState.getCurrentContent()))
const deserializeState = (str: string): Draft.EditorState => 
  Draft.EditorState.createWithContent(
    Draft.ContentState.createFromBlockArray(
      Draft.convertFromRaw(
        JSON.parse(str))))

class TextEditor extends React.Component<TextEditorProps, TextEditorState> {
  constructor(props) {
    super(props)
    this.emitChange = this.emitChange.bind(this)
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
    
    this.state = {
      editorState: props.content.length > 1 ? deserializeState(props.content) : Draft.EditorState.createEmpty()
    }
  }
  
  public render() {
    return <Draft.Editor editorState={this.state.editorState} 
                         onChange={this.emitChange}
                         handleKeyCommand={this.handleKeyCommand}
                         handleReturn={this.props.onReturn}
                         ref="editor" />
  }
  
  emitChange(editorState: Draft.EditorState) {
    this.props.onChange(serializeState(editorState))
    this.setState({ editorState })
  }
  
  handleKeyCommand(command) {
    const newState = Draft.RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this.emitChange(newState)
      return true
    }
    return false
  }
  
  componentDidMount() {
    this.refs['editor']['focus']();
  }
}

export default TextEditor