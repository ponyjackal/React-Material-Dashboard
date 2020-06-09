import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import {
    List,
    ListItem,
    ListItemText,
    TextField,
    Button,
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
        paddingBottom: theme.spacing(1),
        paddingTop: theme.spacing(2),
        width: 100,
        "& .button": {
            height: '100%',
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

    console.log("Message", selectedChat);

    const handleSubmit = () => {
        console.log("submit");
    }

    const handleChange = (event) => {
        console.log(event.target.value);
    }

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <List className={classes.list}>
                    {data[selectedChat].messages && data[selectedChat].messages.map(message =>
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
                    </div>
                </form>
            </div>
        </div >
    );
}

export default React.memo(Message);