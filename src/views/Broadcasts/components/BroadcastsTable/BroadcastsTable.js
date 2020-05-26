import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardContent,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';


const useStyles = makeStyles(theme => ({
    avatar: {
        marginRight: theme.spacing(2)
    },
    actions: {
        justifyContent: 'flex-end'
    }
}));

const BroadcastsTable = props => {
    const { className, broadcasts, title, ...rest } = props;

    const classes = useStyles();

    const columns = [
        {
            name: 'name',
            label: 'Name'
        },
        {
            name: 'list_size',
            label: 'List Size',
        },
        {
            name: 'status',
            label: 'Status'
        },
        {
            name: 'date',
            label: 'Date'
        },
    ];

    return (
        <Card {...rest} className={clsx(classes.root, className)}>
            <CardContent className={classes.content}>
                <PerfectScrollbar>
                    <div className={classes.inner}>
                        <MUIDataTable title={title} data={broadcasts} columns={columns} />
                    </div>
                </PerfectScrollbar>
            </CardContent>
        </Card>
    );
};

BroadcastsTable.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    broadcasts: PropTypes.array.isRequired
};

export default BroadcastsTable;
