import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import {
    List,
    ListItem,
    ListItemText,
    TextField,
    Button,
} from '@material-ui/core';

import useActions from './../../../lib/useActions';
import { sendRequest } from './../../../redux/message/actions';

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
        height: '60vh',
        maxHeight: '60vh',
        overflow: 'auto'
    },
    message: {
        marginBottom: theme.spacing(2),
        maxWidth: '70%',
        display: 'flex',
        flexDirection: 'column',
        '& p': {
            padding: theme.spacing(1),
            borderRadius: '5px',
            fontSize: '16px',
            "&:hover": {
                background: "#ccc",
            }
        },
        '& span': {
            fontSize: '12px',
        },
    },
    inBound: {
        float: 'left',
        alignItems: 'flex-start',
        '& p': {
            background: '#64b5f6',
        }
    },
    outBound: {
        float: 'right',
        alignItems: 'flex-end',
        '& p': {
            background: theme.palette.divider,
        },
    },
    sendMessage: {
        display: 'flex',
        alignItems: 'stretch',
    },
    sendButton: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    unsubscribe: {
        background: theme.palette.error.light,
        '&:hover': {
            background: theme.palette.error.main,
        }
    }
}));

const MessageComponent = ({ message, style }) => {
    const classes = useStyles();

    return (
        <ListItem button className={clsx(style, classes.message)} onClick={(id) => console.log("clicked", message.id)} >
            <p>{message.message}</p>
            <span>{message.created_at}</span>
        </ListItem>
    )
}

const Message = ({ data, selectedChat }) => {
    const classes = useStyles();

    const [text, setText] = useState('');

    const isLoading = useSelector(({ loading }) => loading.MESSAGE_SEND);
    const isSent = useSelector(({ message }) => message.isSent);
    const [onSend] = useActions(
        [sendRequest],
        []
    );

    console.log("Message", selectedChat);

    const handleSubmit = () => {
        console.log("submit");
        if (selectedChat >= 0) {
            onSend({
                id: selectedChat,
                message: text
            });
        }
    }

    const handleUnsubscribe = () => {
        console.log("unsubscribe");
    }

    const handleChange = (event) => {
        console.log(event.target.value);
        setText(event.target.value);
    }

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <List className={classes.list}>
                    {data[selectedChat] && data[selectedChat].messages && data[selectedChat].messages.map(message =>
                        <MessageComponent key={message.id} message={message} style={message.direction === 'outbound' ? classes.outBound : classes.inBound} />
                    )}
                </List>

                <form className={classes.sendMessage}>
                    <TextField
                        fullWidth
                        label="Message"
                        margin="normal"
                        name="message"
                        multiline
                        rows={4}
                        onChange={handleChange}
                        required
                        value={text}
                        variant="outlined"
                    />
                    <div className={classes.sendButton}>
                        <Button
                            color="primary"
                            variant="contained"
                            className={classes.button}
                            onClick={() => handleSubmit()}
                        >SEND</Button>
                        <Button
                            variant="contained"
                            className={classes.unsubscribe}
                            onClick={() => handleUnsubscribe()}
                        >UNSUBSCRIBE</Button>
                    </div>
                </form>
            </div>
        </div >
    );
}

export default React.memo(Message);