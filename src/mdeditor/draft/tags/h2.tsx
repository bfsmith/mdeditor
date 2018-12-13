import React from 'react';
import { Decorator, ITagProp } from './tag';

const H2TagComponent = (props: ITagProp) => {
  const { classes, children, ...rest } = props;
  return <h2 {...rest} className={classes.h2}>{children}</h2>;
};

export const H2Decorator = Decorator({
  component: H2TagComponent,
  regex: /^## [^\n]+/,
});
