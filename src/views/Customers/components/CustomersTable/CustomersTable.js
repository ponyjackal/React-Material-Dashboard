import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  CircularProgress,
  Typography
} from '@material-ui/core';

import DataTable from './../../../../components/DataTable';
import useActions from './../../../../lib/useActions';
import { getRequest } from './../../../../redux/customer/actions';

const useStyles = makeStyles(theme => ({
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  loading: {
    display: 'inline-block',
    marginTop: 100,
    marginBottom: 100,
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

const columns = [
  {
    name: 'first_name',
    label: 'First Name'
  },
  {
    name: 'last_name',
    label: 'Last Name',
  },
  {
    name: 'email',
    label: 'Email',
  },
  {
    name: 'phone_number',
    label: 'Phone'
  },
  {
    name: 'state',
    label: 'State'
  },
  {
    name: 'city',
    label: 'City'
  },
];

const CustomersTable = props => {
  // const { className, title } = props;
  const classes = useStyles();

  const isLoading = useSelector(({ loading }) => loading.CUSTOMER_GET);
  const isGet = useSelector(({ customer }) => customer.isGet);
  const customers = useSelector(({ customer }) => customer.customers);

  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const rowsPerPageOptions = [10, 50, 100];

  const [onGet] = useActions(
    [getRequest],
    []
  );

  const getCustomers = (rowPerPage = 10, page = 1) => {
    onGet({ rowPerPage, page });
  }

  useEffect(() => {
    getCustomers();
  }, []);

  const handleRowClick = (index) => {
    console.log("row clicked", customers.data[index]);
  }
  const handleSelectAll = event => {
    // const { customers } = props;

    // let selectedCustomers;

    // if (event.target.checked) {
    //   selectedCustomers = customers.data.map(customer => customer.id);
    // } else {
    //   selectedCustomers = [];
    // }

    // setSelectedCustomers(selectedCustomers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomers.indexOf(id);
    let newSelectedCustomers = [];

    if (selectedIndex === -1) {
      newSelectedCustomers = newSelectedCustomers.concat(selectedCustomers, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomers = newSelectedCustomers.concat(selectedCustomers.slice(1));
    } else if (selectedIndex === selectedCustomers.length - 1) {
      newSelectedCustomers = newSelectedCustomers.concat(selectedCustomers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomers = newSelectedCustomers.concat(
        selectedCustomers.slice(0, selectedIndex),
        selectedCustomers.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomers(newSelectedCustomers);
  };

  const handlePageChange = (event, page) => {
    getCustomers(rowsPerPage, page + 1);
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    getCustomers(event.target.value);
    setRowsPerPage(event.target.value);
  };


  if (isGet)
    return (
      <DataTable
        data={customers.data}
        columns={columns}
        count={customers.total}
        selectedData={selectedCustomers}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        page={page}
        handleRowClick={handleRowClick}
        handleSelectAll={handleSelectAll}
        handleSelectOne={handleSelectOne}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange} />
    );

  else {
    if (isLoading)
      return (
        <CircularProgress color="primary" size={100} className={classes.loading} />
      );
    else {
      return (
        <div className={classes.loadingError}>
          <Typography variant="h1">Connection Error</Typography>
          <img
            alt="Under development"
            className={classes.image}
            src="/images/undraw_page_not_found_su7k.svg"
          />
        </div>
      );
    }
  }
};

CustomersTable.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
};

export default CustomersTable;
