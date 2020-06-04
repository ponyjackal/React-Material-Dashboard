import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Card
} from '@material-ui/core';
import LeftList from './LeftList';
import Message from './Message';
import { conversations } from './data.js';


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2),
        height: '80vh',
    },
    pagination: {
        marginTop: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
}));

const Chat = () => {
    const classes = useStyles();

    const selectedChat = useRef(0);

    const updateSelect = (index) => {
        selectedChat.current = index;
    }
    return (
        <div className={classes.root}>
            <Card className={classes.content}>
                <Grid
                    container
                    spacing={4}
                >
                    <Grid
                        item
                        lg={3}
                        sm={3}
                        xl={3}
                        xs={3}
                    >
                        <LeftList updateSelect={updateSelect} />
                    </Grid>
                    <Grid
                        item
                        lg={9}
                        sm={9}
                        xl={9}
                        xs={9}
                    >
                        <Message selectedChat={selectedChat} />
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
};

export default Chat;
