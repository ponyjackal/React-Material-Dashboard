import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Card
} from '@material-ui/core';
import LeftList from './LeftList';
import { products } from './data.js';


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
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


    return (
        <div className={classes.root}>
            <Card>
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
                        <LeftList products={products} />
                    </Grid>
                    <Grid
                        item
                        lg={9}
                        sm={9}
                        xl={9}
                        xs={9}
                    >
                        <h1>Message</h1>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
};

export default Chat;
