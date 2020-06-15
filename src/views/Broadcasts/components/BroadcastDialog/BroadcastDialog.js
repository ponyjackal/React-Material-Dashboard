import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const BroadcastDialog = ({ open, handleClose }) => {

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Broadcast Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Broadcast details
                    </DialogContentText>
                    {/* <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    /> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default BroadcastDialog;