import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';
import { Theme } from '@material-ui/core/styles';

export const styles = (theme: Theme) => createStyles({
  bold: {
    // fontWeight: 'bold',
  },
  editor: {
    // border: '1px solid #000',
    padding: theme.spacing.unit * 1,
  },
  h1: {
    color: blue[700],
  },
  h2: {
    color: red[700],
  },
  italics: {
    // fontWeight: 'bold',
  },
});

export interface IStyledProps extends WithStyles<typeof styles> {

}

export const StyledComponent = (component: React.ComponentType) => withStyles(styles)(component)