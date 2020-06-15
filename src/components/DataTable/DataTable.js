import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardActions,
    CardContent,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TablePagination
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    avatar: {
        marginRight: theme.spacing(2)
    },
    actions: {
        justifyContent: 'flex-end'
    },
    tableRow: {
        '&:hover': {
            background: '#ccc !important',
        }
    }
}));

const DataTable = props => {
    const { className,
        columns,
        data,
        count,
        selectedData,
        rowsPerPage,
        rowsPerPageOptions,
        page,
        handleRowClick,
        handleSelectAll,
        handleSelectOne,
        handlePageChange,
        handleRowsPerPageChange,
        ...rest } = props;

    const classes = useStyles();

    const onClick = (index) => {
        console.log("row selected", data[index]);
    }

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <CardContent className={classes.content}>
                <PerfectScrollbar>
                    <div className={classes.inner}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedData.length === data.length}
                                            color="primary"
                                            indeterminate={
                                                selectedData.length > 0 &&
                                                selectedData.length < data.length
                                            }
                                            onChange={handleSelectAll}
                                        />
                                    </TableCell>
                                    {columns.map(column => (
                                        <TableCell key={column.name}>{column.label}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, key) => (
                                    <TableRow
                                        className={classes.tableRow}
                                        hover
                                        key={row.id}
                                        selected={selectedData.indexOf(row.id) !== -1}
                                        onClick={() => handleRowClick(key)}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={selectedData.indexOf(row.id) !== -1}
                                                color="primary"
                                                onChange={event => handleSelectOne(event, row.id)}
                                                value="true"
                                            />
                                        </TableCell>
                                        {columns.map((column) => (
                                            <TableCell key={column.name}>{row[column.name]}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </PerfectScrollbar>
            </CardContent>
            <CardActions className={classes.actions}>
                <TablePagination
                    component="div"
                    count={count}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleRowsPerPageChange}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={rowsPerPageOptions}
                />
            </CardActions>
        </Card>
    );
};

DataTable.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    data: PropTypes.array.isRequired
};

export default DataTable;
