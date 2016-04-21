import * as React from 'react'
import * as Draft from 'draft-js'

interface TextEditorProps {
  content: string
  onChange: { (s: string): any }
}

interface TextEditorState {
  editorState: Draft.EditorState
}

const serializeState = (editorState: Draft.EditorState): string => 
  JSON.stringify(Draft.convertToRaw(editorState.getCurrentContent()))
const deserializeState = (str: string): Draft.EditorState => 
  Draft.EditorState.createWithContent(Draft.ContentState.createFromBlockArray(Draft.convertFromRaw(JSON.parse(str))))

class TextEditor extends React.Component<TextEditorProps, TextEditorState> {
  constructor(props) {
    super(props)
    this.emitChange = this.emitChange.bind(this)
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
    this.state = {
      editorState: deserializeState(props.content)
    }
  }
  
  public render() {
    let editorState = deserializeState(this.props.content)
    return <Draft.Editor editorState={this.state.editorState} onChange={this.emitChange} handleKeyCommand={this.handleKeyCommand} />
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
}

export default TextEditor