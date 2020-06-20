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
                            <FlexDiv><p>Scheduled to Start @</p> <Bold>{Math.floor(broadcast.duration / 86400)} days {Math.floor((broadcast.duration % 86400) / 3600)} hours {Math.floor((broadcast.duration % 3600) / 60)} mins {broadcast.duration % 60} secs later</Bold></FlexDiv>
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