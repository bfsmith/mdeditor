import { withStyles } from '@material-ui/core';
import MarkdownIt from 'markdown-it';
import React from 'react';
import '../style.css';
import { IStyledProps, styles } from '../styles';

export interface IPreviewProps extends IStyledProps {
  markdown?: string;
}

const md = new MarkdownIt();

class MarkdownItEditorComponent extends React.Component<IPreviewProps> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className={this.props.classes.parent}>
        <div className={this.props.classes.preview} dangerouslySetInnerHTML={{__html: md.render(this.props.markdown || '')}} />
      </div>
    );
  }
}

export const MarkdownItEditor = withStyles(styles)(MarkdownItEditorComponent);
// export const MarkdownItEditor = StyledComponent(MarkdownItEditorComponent)