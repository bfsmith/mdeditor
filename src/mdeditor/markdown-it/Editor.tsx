import MarkdownIt from 'markdown-it';
import React from 'react';
import '../style.css';
import { IStyledProps, StyledComponent } from '../styles';

interface IState {
  markdown: string;
}

const md = new MarkdownIt();

class MarkdownItEditorComponent extends React.Component<IStyledProps, IState> {
  constructor(props: any) {
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
    };
    this.onChange = this.onChange.bind(this);
  }

  public render() {
    return (
      <div className={this.props.classes.parent}>
        <div className={this.props.classes.editor}>
          <textarea value={this.state.markdown} onChange={this.onChange} />
        </div>
        <div className={this.props.classes.preview} dangerouslySetInnerHTML={{__html: md.render(this.state.markdown)}} />
      </div>
    );
  }

  private onChange(e: any) {
    console.log(e.target.value);
    this.setState({ markdown: e.target.value });
  }
}

export const MarkdownItEditor = StyledComponent(MarkdownItEditorComponent)