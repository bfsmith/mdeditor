import React from 'react';
import { Decorator, ITagProp } from './tag';

const BoldTagComponent = (props: ITagProp) => {
  const { classes, children, ...rest } = props;
  return <strong {...rest} className={classes.bold}>{children}</strong>;
};

export const BoldDecorators = [
  Decorator({
    component: BoldTagComponent,
    regex: /(\*\*)[^\1]+?\*\*/,
  }),
  Decorator({
    component: BoldTagComponent,
    regex: /(__)[^\1]+?__/,
  }),
];