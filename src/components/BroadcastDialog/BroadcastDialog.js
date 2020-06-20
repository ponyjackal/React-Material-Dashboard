import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    content: {
        '& p': {
            fontSize: '18px',
            padding: theme.spacing(1),
        }
    },
    contentText: {
        fontSize: '24px',
    }
}));

const BroadcastDialog = ({ open, handleClose, broadcast, type }) => {
    const classes = useStyles();

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{broadcast && broadcast.name}</DialogTitle>
                <DialogContent className={classes.content}>
                    <DialogContentText className={classes.contentText}>
                        {broadcast && broadcast.message}
                    </DialogContentText>
                    {/* <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    /> */}
                    <p>Scheduled to Start @ {broadcast && broadcast.start_at}</p>
                    <p>Published @ {broadcast && broadcast.published_at}</p>
                    <p>List Size: {broadcast && broadcast.list_size}</p>
                    <p>Approximate Cost: ${broadcast && broadcast.list_size * 75 / 10000}</p>
                    <p>Not Sent Due To Unsubscribes: {broadcast && broadcast.blacklist_count}</p>
                    <p>Not Sent Due To Duplicates: {broadcast && broadcast.duplicate_count}</p>
                    <p>Not Sent Due To Invalid Record: {broadcast && broadcast.invalid_row_count}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Publish
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default BroadcastDialog;