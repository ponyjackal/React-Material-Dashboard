import React from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
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
    list: {
        padding: theme.spacing(2),
    },
    message: {
        marginBottom: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        width: '70%',
        '& div': {
            padding: theme.spacing(1),
            borderRadius: '5px',
            "&:hover": {
                background: "#ccc",
            }
        },
    },
    inBound: {
        float: 'left',
        textAlign: 'left',
        itemAlign: 'left',
        '& div': {
            background: '#64b5f6',
        }
    },
    outBound: {
        float: 'right',
        textAlign: 'left',
        itemAlign: 'right',
        '& div': {
            background: theme.palette.divider,
        }
    }
}));

const MessageComponent = ({ message, style }) => {
    const classes = useStyles();

    return (
        <ListItem button className={clsx(style, classes.message)} onClick={(id) => console.log("clicked", message.id)} >
            <div>
                <p>{message.message}</p>
            </div>
            <span>{message.created_at}</span>
        </ListItem>
    )
}
const Message = ({ data, selectedChat }) => {
    const classes = useStyles();

    console.log("Message", selectedChat);

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <List className={classes.list}>
                    {data[selectedChat].messages && data[selectedChat].messages.map(message =>
                        <MessageComponent key={message.id} message={message} style={message.direction === 'outbound' ? classes.outBound : classes.inBound} />
                    )}
                </List>
            </div>
        </div >
    );
}

export default React.memo(Message);