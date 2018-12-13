import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import '../style.css';
import { IStyledProps, StyledComponent } from '../styles';
import './style.css';


import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/theme/material.css';
import 'codemirror/theme/monokai.css';

interface IState {
  markdown: string;
  theme: string;
}

class CodeMirrorEditorComponent extends React.Component<IStyledProps, IState> {
  constructor(props: IStyledProps) {
    super(props);

    this.state = {
      markdown: `
# Title

__bold__

_italics_

__*bold and italics*__

> testing  
> testing 2

some \`inline\` code

\`\`\`
block code
\`\`\`

1. a
1. b
1. c

* bullet
* bullet


## Tables?

| Feature   | Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |
`,
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
              mode: 'markdown',
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
  }

  private changeTheme(theme: any) {
    this.setState({theme: theme.target.checked ? 'monokai' : 'material'});
  }
}

export const CodeMirrorEditor = StyledComponent(CodeMirrorEditorComponent)