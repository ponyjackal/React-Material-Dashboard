import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardContent,
    Typography,
    CircularProgress
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { DataTable } from './../../../../components';
import useActions from './../../../../lib/useActions';
import { getRequest } from './../../../../redux/broadcast/actions';
import BroadcastDialog from './../BroadcastDialog';


const useStyles = makeStyles(theme => ({
    avatar: {
        marginRight: theme.spacing(2)
    },
    actions: {
        justifyContent: 'flex-end'
    }
}));

const BroadcastsTable = props => {
    const { className, title, type, ...rest } = props;

    const classes = useStyles();

    const isLoading = useSelector(({ loading }) => loading.BROADCAST_GET);
    const isGet = useSelector(({ broadcast }) => broadcast.isGet);
    const broadcasts = useSelector(({ broadcast }) => broadcast.broadcasts);

    const [selectedBroadcasts, setSelectedBroadcasts] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(-1);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const rowsPerPageOptions = [10, 50, 100];

    const [onGet] = useActions(
        [getRequest],
        []
    );

    const getBroadcasts = (type = "scheduled", rowPerPage = 10, page = 1) => {
        onGet({ type, rowPerPage, page });
    }

    useEffect(() => {
        getBroadcasts(type);
    }, []);

    const columns = [
        {
            name: 'name',
            label: 'Name'
        },
        {
            name: 'target_state',
            label: 'State'
        },
        {
            name: 'target_city',
            label: 'City'
        },
        {
            name: 'list_size',
            label: 'List Size',
        },
        {
            name: 'start_at',
            label: 'Date'
        },
    ];

    const handleRowClick = (index) => {
        setSelectedRow(index);
        setOpen(true);
    }

    const handleSelectAll = event => {
        // const { broadcasts } = props;

        // let selectedBroadcasts;

        // if (event.target.checked) {
        //   selectedBroadcasts = broadcasts.data.map(customer => customer.id);
        // } else {
        //   selectedBroadcasts = [];
        // }

        // setSelectedBroadcasts(selectedBroadcasts);
    };

    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedBroadcasts.indexOf(id);
        let newSelectedBroadcasts = [];

        if (selectedIndex === -1) {
            newSelectedBroadcasts = newSelectedBroadcasts.concat(selectedBroadcasts, id);
        } else if (selectedIndex === 0) {
            newSelectedBroadcasts = newSelectedBroadcasts.concat(selectedBroadcasts.slice(1));
        } else if (selectedIndex === selectedBroadcasts.length - 1) {
            newSelectedBroadcasts = newSelectedBroadcasts.concat(selectedBroadcasts.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedBroadcasts = newSelectedBroadcasts.concat(
                selectedBroadcasts.slice(0, selectedIndex),
                selectedBroadcasts.slice(selectedIndex + 1)
            );
        }

        setSelectedBroadcasts(newSelectedBroadcasts);
    };

    const handlePageChange = (event, page) => {
        getBroadcasts(type, rowsPerPage, page + 1);
        setPage(page);
    };

    const handleRowsPerPageChange = event => {
        getBroadcasts(type, event.target.value);
        setRowsPerPage(event.target.value);
    };
    return (
        <Card {...rest} className={clsx(classes.root, className)}>
            <CardContent className={classes.content}>
                <PerfectScrollbar>
                    <div className={classes.inner}>
                        {isLoading
                            ? <CircularProgress color="primary" size={100} className={classes.loading} />
                            : isGet
                                ?
                                <>
                                    <DataTable
                                        data={broadcasts.data}
                                        columns={columns}
                                        count={broadcasts.total}
                                        selectedData={selectedBroadcasts}
                                        rowsPerPage={rowsPerPage}
                                        rowsPerPageOptions={rowsPerPageOptions}
                                        page={page}
                                        handleRowClick={handleRowClick}
                                        handleSelectAll={handleSelectAll}
                                        handleSelectOne={handleSelectOne}
                                        handlePageChange={handlePageChange}
                                        handleRowsPerPageChange={handleRowsPerPageChange} />
                                    <BroadcastDialog open={open} handleClose={handleClose} broadcast={broadcasts.data[selectedRow]} />
                                </>
                                : <div className={classes.loadingError}>
                                    <Typography variant="h1">Connection Error</Typography>
                                    <img
                                        alt="Under development"
                                        className={classes.image}
                                        src="/images/undraw_page_not_found_su7k.svg"
                                    />
                                </div>}

                    </div>
                </PerfectScrollbar>
            </CardContent>
        </Card>
    );
};

BroadcastsTable.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string.isRequired
};

export default BroadcastsTable;
