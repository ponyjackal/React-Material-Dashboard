import React from 'react';
import styled from 'styled-components';
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const Bold = styled.p`
    font-weight : bold
`;

const FlexDiv = styled.div`
    display : flex
`;
const useStyles = makeStyles(theme => ({
    content: {
        '& p': {
            fontSize: '18px',
            padding: theme.spacing(1),
        }
    },
    contentText: {
        fontSize: '24px',
    },
    dialogActions: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    publishButton: {
        color: '#1976d2',
    },
    cancelButton: {
        color: '#dc004e',
    }
}));

const PublishDialog = ({ open, handleClose, broadcast, handlePublish, isPublishing }) => {
    const classes = useStyles();

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                {broadcast && (
                    <>
                        <DialogTitle id="form-dialog-title">{broadcast.name}</DialogTitle>
                        <DialogContent className={classes.content}>
                            <DialogContentText className={classes.contentText}>
                                {broadcast.message}
                            </DialogContentText>
                            <FlexDiv><p>Scheduled to Start @</p> <Bold>{Math.floor(Math.abs(broadcast.duration) / 1440)} days {Math.floor((Math.abs(broadcast.duration) % 1440) / 60)} hours {Math.abs(broadcast.duration) % 60} mins {broadcast.duration > 0 ? "later" : "ago"}</Bold></FlexDiv>
                            <FlexDiv><p>Target State: </p><Bold>{broadcast.target_state}</Bold></FlexDiv>
                            <FlexDiv><p>Target City: </p><Bold>{broadcast.target_city}</Bold></FlexDiv>
                            <FlexDiv><p>List Size: </p><Bold>{broadcast.list_size}</Bold></FlexDiv>
                            <FlexDiv><p>Approximate Cost: </p><Bold>${broadcast.list_size * 75 / 10000}</Bold></FlexDiv>
                        </DialogContent>
                    </>
                )}

                <DialogActions className={classes.dialogActions}>
                    <Button onClick={handleClose} className={classes.cancelButton}>
                        Cancel
                    </Button>
                    <Button onClick={handlePublish} className={classes.publishButton}>
                        {isPublishing
                            ? <CircularProgress color="inherit" size={26} />
                            : <>Publish</>}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PublishDialog;