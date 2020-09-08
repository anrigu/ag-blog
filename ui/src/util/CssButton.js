import { IconButton, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export const CssIconButton = withStyles({
    root: {
        '&:focus': {
            outline: '0px'
        }
    }
})(IconButton);

export const CssButton = withStyles({
    root: {
        '&:focus': {
            outline: '0px'
        }
    }
})(Button);
