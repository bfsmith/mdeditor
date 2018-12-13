import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';
import { Theme } from '@material-ui/core/styles';
import React from 'react';

export const styles = (theme: Theme) => createStyles({
  bold: {
    // fontWeight: 'bold',
  },
  editor: {
    '& textarea': {
      height: '100%',
      width: '100%',
    },
    background: '#aa0',
    float: 'left',
    width: '49%',
  },
  italics: {
    // fontWeight: 'bold',
  },
  parent: {
    alignContent: 'stretch',
    display: 'flex',
    height: '100%',
    width: '100%',
  },
  preview: {
    '& h1': {
      color: blue[700],
    },
    '& h2': {
      color: red[700],
    },
    background: '#a0a',
    float: 'right',
    width: '49%',
  }
});

export interface IStyledProps extends WithStyles<typeof styles> {

}

export const StyledComponent = (component: React.ComponentType) => withStyles(styles)(component);
