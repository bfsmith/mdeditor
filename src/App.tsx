import * as React from 'react';
import './App.css';
import { CodeMirrorEditor } from './mdeditor/codemirror/Editor';
import { DraftJsEditor } from './mdeditor/draft/Editor';
import { MarkdownItEditor } from './mdeditor/markdown-it/Editor';
import { ReactMarkdownPreview } from './mdeditor/react-markdown/Editor';
import { RemarkEditor } from './mdeditor/remark/Editor';
import { SlateEditor } from './mdeditor/slate/Editor';

interface IState {
  markdown: string;
}

class App extends React.Component<{}, IState> {
  constructor() {
    super({});
    this.state = {
      markdown: `# H1
## H2
### H3

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
`
    };
    this.onChange = this.onChange.bind(this);
  }

  public render() {

    return (
      <div className="App">
        <div className="editor">
          <CodeMirrorEditor markdown={this.state.markdown} onChange={this.onChange} />
        </div>
        <div className="preview">
          <MarkdownItEditor markdown={this.state.markdown} />
        </div>
        <div>
          <h1 className="editor-header">Draft JS</h1>
          <DraftJsEditor />
        </div>
        <div>
          <h1 className="editor-header">Slate</h1>
          <SlateEditor />
        </div>
        <div>
          <h1 className="editor-header">Code Mirror</h1>
          <CodeMirrorEditor markdown={this.state.markdown} onChange={this.onChange} />
        </div>
        <div>
          <h1 className="editor-header">Remark</h1>
          <RemarkEditor />
        </div>
        <div>
          <h1 className="editor-header">Markdown-It</h1>
          <MarkdownItEditor markdown={this.state.markdown} />
        </div>
        <div>
          <h1 className="editor-header">React Markdown</h1>
          <ReactMarkdownPreview />
        </div>
      </div>
    );
  }
  private onChange(markdown: string): void {
    this.setState({
      markdown,
    });
  }
}

export default App;
