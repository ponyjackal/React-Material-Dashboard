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
import { getRequest } from './../../../redux/chat/actions';

import { SearchInput } from 'components';

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

const LeftList = ({ conversations, updateSelect, className, ...rest }) => {

    const classes = useStyles();

    const isLoading = useSelector(({ loading }) => loading.CHAT_GET);
    const isGet = useSelector(({ chat }) => chat.isGet);
    const data = useSelector(({ chat }) => chat.data);

    const [onGet] = useActions(
        [getRequest],
        []
    );

    useEffect(() => {
        onGet();
    }, []);

    useEffect(() => {
        Object.keys(data).map(key => {
            console.log(data[key]);
        });
    }, [data]);

    return (
        <div
            {...rest}
            className={clsx(classes.root, className)}
        >
            <div className={classes.content}>
                <div className={classes.row}>
                    <SearchInput
                        className={classes.searchInput}
                        placeholder="Search user"
                    />
                </div>

                {isLoading
                    ? <CircularProgress color="primary" size={50} className={classes.loading} />
                    : isGet ?
                        <List>
                            {data.length > 0 && Object.keys(data).map((conversation, key) => {
                                return (
                                    <ListItem button key={conversation.id} onClick={(to) => console.log("clicked", to)} >
                                        <ListItemText primary={conversation.to} />
                                    </ListItem>
                                );
                            })}
                        </List>
                        : <div className={classes.loadingError}>
                            <Typography variant="h1">Connection Error</Typography>
                        </div>}

            </div>
        </div>
    );

}

export default LeftList;