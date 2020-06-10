import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Card,
    CircularProgress,
    Typography
} from '@material-ui/core';
import LeftList from './LeftList';
import Message from './Message';
import useActions from './../../lib/useActions';
import { getRequest } from './../../redux/chat/actions';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(1),
        textAlign: 'center',
        height: '82vh',
    },
    loading: {
        display: 'inline-block',
        marginTop: '30vh',
    },
    pagination: {
        marginTop: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    image: {
        marginTop: 50,
        display: 'inline-block',
        maxWidth: '100%',
        height: 400,
    },
    loadingError: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }
}));

const Chat = () => {
    const classes = useStyles();

    const isLoading = useSelector(({ loading }) => loading.CHAT_GET);
    const isGet = useSelector(({ chat }) => chat.isGet);
    const data = useSelector(({ chat }) => chat.data);

    const [selectedChat, setSelectedChat] = useState(0);
    const [status, setStatus] = useState([]);

    const [onGet] = useActions(
        [getRequest],
        []
    );

    useEffect(() => {
        onGet();
    }, [onGet]);

    useEffect(() => {
        let tempStatus = [];
        if (data) {
            tempStatus = Object.keys(data).map(key => {
                const messages = data[key].messages;
                let isRead = true;
                messages.forEach(message => {
                    if (message.read_at === null) {
                        isRead = false;
                        return false;
                    }
                });
                return isRead;
            });
            setStatus(tempStatus);
        }
    }, [isGet, data]);

    console.log("Chat", selectedChat);

    const onSelect = (index) => {
        let tempStatus = status.map((value, key) => {
            if (index == key)
                return true;
            else
                return value;
        });
        setStatus(tempStatus);
        setSelectedChat(index);
    }
    return (
        <div className={classes.root}>
            <Card className={classes.content}>
                {isLoading
                    ? <CircularProgress color="primary" size={100} className={classes.loading} />
                    : isGet
                        ? <Grid
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
                                <LeftList data={data} onSelect={onSelect} selectedChat={selectedChat} status={status} />
                            </Grid>
                            <Grid
                                item
                                lg={9}
                                sm={9}
                                xl={9}
                                xs={9}
                            >
                                <Message data={data} selectedChat={selectedChat} />
                            </Grid>
                        </Grid>
                        : <div className={classes.loadingError}>
                            <Typography variant="h1">Connection Error</Typography>
                            <img
                                alt="Under development"
                                className={classes.image}
                                src="/images/undraw_page_not_found_su7k.svg"
                            />
                        </div>}
            </Card>
        </div>
    );
};

export default Chat;
