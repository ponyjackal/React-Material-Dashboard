import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import {
    Paper,
    List,
    ListItem,
    ListItemText
} from '@material-ui/core';
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
    }
}));

const LeftList = ({ products, className, ...rest }) => {

    const classes = useStyles();

    return (
        <div
            {...rest}
            className={clsx(classes.root, className)}
        >
            <div>
                <div className={classes.row}>
                    <SearchInput
                        className={classes.searchInput}
                        placeholder="Search user"
                    />
                </div>

                <Paper>
                    <List>
                        {products.map(({ ID }) =>
                            <ListItem button key={ID} onClick={(ID) => console.log("clicked", ID)} >
                                <ListItemText primary={ID} />
                            </ListItem>
                        )}
                    </List>
                </Paper>
            </div>
        </div>
    );

}

export default LeftList;