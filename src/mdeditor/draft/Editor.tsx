import {
  CompositeDecorator,
  DraftEditorCommand,
  Editor,
  EditorState,
  RichUtils
  } from 'draft-js';
import 'draft-js/dist/Draft.css';
import React from 'react';
import '../style.css';
import { StyleButton } from './StyleButton';
import { IStyledProps, StyledComponent } from './styles';
import { Decorators } from './tags';

interface IState {
  editorState: EditorState
}

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];
const BlockStyleControls = (props: any) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

class DraftJsEditorComponent extends React.Component<IStyledProps, IState> {
  constructor(props: IStyledProps) {
    super(props);
    const compositeDecorator = new CompositeDecorator([
      ...Decorators,
    ]);

    this.state = {
      editorState: EditorState.set(EditorState.createEmpty(), { decorator: compositeDecorator }),
    };
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
  }

  public render() {
    const onChange = this.onChange.bind(this);
    return (
      <div>
        <BlockStyleControls
          editorState={this.state.editorState}
          onToggle={this.toggleBlockType}
        />
        <div
          className={this.props.classes.editor}>
          <Editor

            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={onChange}
          />
        </div>
      </div>
    );
  }


  private handleKeyCommand(command: DraftEditorCommand, editorState: EditorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  private toggleBlockType(blockType: string) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  private toggleInlineStyle(inlineStyle: string) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  private onChange(editorState: EditorState) {
    console.log(editorState);
    this.setState({ editorState });
  }
}

export const DraftJsEditor = StyledComponent(DraftJsEditorComponent)