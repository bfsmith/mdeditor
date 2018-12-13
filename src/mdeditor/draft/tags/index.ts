import { BoldDecorators } from './bold';
import { H1Decorator } from './h1';
import { H2Decorator } from './h2';
import { ItalicsDecorators } from './italics';

export const Decorators = [
  H1Decorator,
  H2Decorator,
  ...BoldDecorators,
  ...ItalicsDecorators,
];