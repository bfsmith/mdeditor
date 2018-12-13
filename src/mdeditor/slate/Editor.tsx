import Prism from 'prismjs';
import 'prismjs/components/prism-markdown';
import React from 'react';
import Plain from 'slate-plain-serializer';
import { Editor } from 'slate-react';
import { IStyledProps, StyledComponent } from '../styles';
// import { Value } from 'slate';

// @ts-ignore
Prism.languages.jmd = Prism.languages.extend("markdown", {
    blockquote: {
      // > ...
      // alias: 'punctuation',
      pattern: /^>[\s\S]*/m,
      // pattern: /^>[\s\S](?:\n^>.*$)*/m,
    },
    meep: {
      pattern: /meep\nmeep/m,
    }
} as any)
// Prism.languages.insertBefore('jmd', 'prolog', {
// 	blockquote: {
// 		// > ...
// 		pattern: /^>(?:[\t ]*>)*/m,
// 		alias: 'punctuation'
//   },
// }, Prism.languages);

interface IState {
  value: object;
}

const initialValue = Plain.deserialize(
  `
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

`,
);

class SlateEditorComponent extends React.Component<IStyledProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      value: initialValue,
    };
    this.onChange = this.onChange.bind(this);
  }

  public render() {
    return (
      <div className={this.props.classes.parent}>
        {/* <div className={this.props.classes.editor}>
          <textarea value={this.state.markdown} onChange={this.onChange} />
        </div> */}
        <div className={this.props.classes.preview}>
          <Editor
            placeholder="Write some markdown..."
            defaultValue={initialValue}
            renderMark={this.renderMark}
            decorateNode={this.decorateNode}
          />
        </div>
      </div>
    );
  }

  /**
   * Render a Slate mark.
   *
   * @param {Object} props
   * @param {Editor} editor
   * @param {Function} next
   * @return {Element}
   */

  private renderMark = (props: any, editor: any, next: () => void) => {
    const { children, mark, attributes } = props

    switch (mark.type) {
      case 'blockquote':
        return <blockquote {...attributes}>This is a block quote. {children}</blockquote>
      case 'bold':
        return <strong {...attributes}>{children}</strong>

      case 'code':
        return <code {...attributes}>{children}</code>

      case 'italic':
        return <em {...attributes}>{children}</em>

      case 'underlined':
        return <u {...attributes}>{children}</u>
      
      case 'meep':
        return <strong>did you meep?</strong>

      case 'title': {
        return (
          <span
            {...attributes}
            style={{
              display: 'inline-block',
              fontSize: '20px',
              fontWeight: 'bold',
              margin: '20px 0 10px 0',
            }}
          >
            {children}
          </span>
        )
      }

      case 'punctuation': {
        return (
          <span {...attributes} style={{ opacity: 0.2 }}>
            {children}
          </span>
        )
      }

      case 'list': {
        return (
          <span
            {...attributes}
            style={{
              fontSize: '20px',
              lineHeight: '10px',
              paddingLeft: '10px',
            }}
          >
            {children}
          </span>
        )
      }

      case 'hr': {
        return (
          <span
            {...attributes}
            style={{
              borderBottom: '2px solid #000',
              display: 'block',
              opacity: 0.2,
            }}
          >
            {children}
          </span>
        )
      }

      default: {
        return next()
      }
    }
  }

  /**
   * Define a decorator for markdown styles.
   *
   * @param {Node} node
   * @param {Function} next
   * @return {Array}
   */

  private decorateNode(node: any, editor: any, next: () => any) {
    const others = next() || []
    if (node.object !== 'block') {
      return others
    }

    const text = node.text;
    const texts = node.getTexts().toArray();
    const grammar = Prism.languages.jmd;
    const tokens = Prism.tokenize(text, grammar);
    const decorations = [];
    let startText = texts.shift();
    let endText = startText;
    let startOffset = 0;
    let endOffset = 0;
    let start = 0;

    function getLength(token: any) {
      if (typeof token === 'string') {
        return token.length;
      } else if (typeof token.content === 'string') {
        return token.content.length;
      } else {
        return token.content.reduce((l: number, t: any) => l + getLength(t), 0);
      }
    }

    for (const token of tokens) {
      startText = endText;
      startOffset = endOffset;

      const length = getLength(token);
      const end = start + length;

      let available = startText.text.length - startOffset;
      let remaining = length;

      endOffset = startOffset + remaining;

      while (available < remaining) {
        endText = texts.shift();
        remaining = length - available;
        available = endText.text.length;
        endOffset = remaining;
      }

      if (typeof token !== 'string') {
        const dec = {
          anchor: {
            key: startText.key,
            offset: startOffset,
          },
          focus: {
            key: endText.key,
            offset: endOffset,
          },
          mark: {
            type: token.type,
          },
        }

        decorations.push(dec)
      }

      start = end
    }

    return [...others, ...decorations]
  }

  private onChange(event: any) {
    console.log(event);
    this.setState({ value: event.value });
  }
}

export const SlateEditor = StyledComponent(SlateEditorComponent)