import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import {
    Paper,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    Typography
} from '@material-ui/core';
import useActions from './../../../lib/useActions';
import { getRequest } from './../../../redux/message/actions';

const useStyles = makeStyles(theme => ({
    root: {},
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(1)
    },
    spacer: {
        flexGrow: 1
    },
    importButton: {
        marginRight: theme.spacing(1)
    },
    exportButton: {
        marginRight: theme.spacing(1)
    },
    searchInput: {
        marginRight: theme.spacing(1)
    },
    content: {
        marginTop: theme.spacing(2),
        textAlign: 'center',
    },
    loading: {
        display: 'inline-block',
        marginTop: '30vh',
    },
}));

const Message = ({ selectedChat }) => {
    const classes = useStyles();

    const isLoading = useSelector(({ loading }) => loading.MESSAGE_GET);
    const isGet = useSelector(({ message }) => message.isGet);
    const data = useSelector(({ message }) => message.data);

    const [onGet] = useActions(
        [getRequest],
        []
    );

    useEffect(() => {
        onGet(selectedChat);
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                {isLoading
                    ? <CircularProgress color="primary" size={50} className={classes.loading} />
                    : isGet ?
                        <List>
                            {data.length && data.map(({ ID }) =>
                                <ListItem button key={ID} onClick={(ID) => console.log("clicked", ID)} >
                                    <ListItemText primary={ID} />
                                </ListItem>
                            )}
                        </List>
                        : <div className={classes.loadingError}>
                            <Typography variant="h1">Connection Error</Typography>
                        </div>}

            </div>
        </div>
    );
}

export default React.memo(Message);