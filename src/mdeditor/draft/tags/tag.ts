import { ContentBlock, ContentState } from 'draft-js';
import React from 'react';
import { IStyledProps, StyledComponent } from '../styles';

export interface IDraftDecorator {
  strategy: (block: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) => void;
  component: React.ComponentType;
  props?: object;
}

export interface ITagProp extends IStyledProps {
  children: any;
}

export interface ITag {
  regex: RegExp;
  component: React.ComponentType;
  props?: object;
}

const applyBlock = (callback: (start: number, end: number) => void, regex: RegExp, startIndex: number, text: string): void => {
  const matchArr = regex.exec(text);
  if (matchArr != null) {
    const start = startIndex + matchArr.index;
    const endIndex = start + matchArr[0].length;
    matchArr.forEach(m => callback(start, endIndex));
    applyBlock(callback, regex, endIndex, text.substring(matchArr.index + matchArr[0].length +1));
  }
}

export const Decorator = (tag: ITag): IDraftDecorator => {
  const strategy = (contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) => {
    const text = contentBlock.getText();
    applyBlock(callback, tag.regex, 0, text);
  };
  return {
    component: StyledComponent(tag.component),
    props: tag.props,
    strategy,
  }
}