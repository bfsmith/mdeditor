import { withStyles } from '@material-ui/core';
import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import '../style.css';
import { IStyledProps, styles,  } from '../styles';
import './style.css';


import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/theme/material.css';
import 'codemirror/theme/monokai.css';

export interface IEditorProps extends IStyledProps {
  markdown?: string;
  onChange(markdown: string): void;
}

interface IState {
  markdown: string;
  theme: string;
}

class CodeMirrorEditorComponent extends React.Component<IEditorProps, IState> {
  constructor(props: IEditorProps) {
    super(props);

    this.state = {
      markdown: props.markdown || '',
      theme: 'material',
    };
    this.onChange = this.onChange.bind(this);
    this.changeTheme = this.changeTheme.bind(this);
  }

  public render() {
    return (
      <div className={this.props.classes.parent}>
        THeme: <input type="checkbox" value="yo" onChange={this.changeTheme} />
        <div className={this.props.classes.preview}>
          <CodeMirror
            value={this.state.markdown}
            options={{
              mode: 'gfm',
              theme: this.state.theme,
              
            }}
            onBeforeChange={this.onChange} />
        </div>
      </div>
    );
  }

  private onChange(_: any, _2: any, value: string) {
    console.log(value);
    this.setState({ markdown: value });
    this.props.onChange(value);
  }

  private changeTheme(theme: any) {
    this.setState({theme: theme.target.checked ? 'monokai' : 'material'});
  }
}

export const CodeMirrorEditor = withStyles(styles)(CodeMirrorEditorComponent);
// export const CodeMirrorEditor = StyledComponent(CodeMirrorEditorComponent)