import React from 'react';
import { Decorator, ITagProp } from './tag';

const H1TagComponent = (props: ITagProp) => {
  const { classes, children, ...rest } = props;
  return <h1 {...rest} className={classes.h1}>{children}</h1>;
};

export const H1Decorator = Decorator({
  component: H1TagComponent,
  regex: /^# [^\n]+/,
});