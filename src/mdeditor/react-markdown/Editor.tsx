import React from 'react';
import ReactMarkdown from 'react-markdown';
import '../style.css';
import { IStyledProps, StyledComponent } from '../styles';



interface IState {
  markdown: string;
}

class ReactMarkdownPreviewComponent extends React.Component<IStyledProps, IState> {
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
    };
    this.onChange = this.onChange.bind(this);
  }

  public render() {
    return (
      <div className={this.props.classes.parent}>
        <div className={this.props.classes.editor}>
          <textarea value={this.state.markdown} onChange={this.onChange} />
        </div>
        <div className={this.props.classes.preview}>
          <ReactMarkdown source={this.state.markdown} />
        </div>
      </div>
    );
  }

  private onChange(e: any) {
    console.log(e.target.value);
    this.setState({ markdown: e.target.value });
  }
}

export const ReactMarkdownPreview = StyledComponent(ReactMarkdownPreviewComponent)