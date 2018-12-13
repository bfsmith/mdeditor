import * as React from 'react';
import './App.css';
import { CodeMirrorEditor } from './mdeditor/codemirror/Editor';
import { DraftJsEditor } from './mdeditor/draft/Editor';
import { MarkdownItEditor } from './mdeditor/markdown-it/Editor';
import { ReactMarkdownPreview } from './mdeditor/react-markdown/Editor';
import { RemarkEditor } from './mdeditor/remark/Editor';
import { SlateEditor } from './mdeditor/slate/Editor';


class App extends React.Component {
  public render() {
    return (
      <div className="App">
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
          <CodeMirrorEditor />
        </div>
        <div>
          <h1 className="editor-header">Remark</h1>
          <RemarkEditor />
        </div>
        <div>
          <h1 className="editor-header">Markdown-It</h1>
          <MarkdownItEditor />
        </div>
        <div>
          <h1 className="editor-header">React Markdown</h1>
          <ReactMarkdownPreview />
        </div>
      </div>
    );
  }
}

export default App;
