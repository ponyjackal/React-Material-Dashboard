import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
    List,
    ListItem,
    ListItemText,
} from '@material-ui/core';

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

const Message = ({ data, selectedChat }) => {
    const classes = useStyles();

    console.log("Message", selectedChat);

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <List>
                    {data[selectedChat].messages && data[selectedChat].messages.map(message =>
                        <ListItem button key={message.id} onClick={(id) => console.log("clicked", message.id)} >
                            <ListItemText primary={message.message} />
                        </ListItem>
                    )}
                </List>
            </div>
        </div >
    );
}

export default React.memo(Message);