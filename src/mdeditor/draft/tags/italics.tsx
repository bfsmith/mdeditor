import React from 'react';
import { Decorator, ITagProp } from './tag';

const ItalicsTagComponent = (props: ITagProp) => {
  const { classes, children, ...rest } = props;
  return <em {...rest} className={classes.italics}>{children}</em>;
};

export const ItalicsDecorators = [
  Decorator({
    component: ItalicsTagComponent,
    regex: /(\*)[^\1]+?\*/,
  }),
  Decorator({
    component: ItalicsTagComponent,
    regex: /(_)[^\1]+?_/,
  }),
];