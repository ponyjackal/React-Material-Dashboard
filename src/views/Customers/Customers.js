import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  CircularProgress,
  Typography
} from '@material-ui/core';

import { CustomersToolbar, CustomersTable } from './components';
import useActions from './../../lib/useActions';
import { getRequest } from './../../redux/customer/actions';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
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

const Customers = () => {
  const classes = useStyles();

  const isLoading = useSelector(({ loading }) => loading.CUSTOMER_GET);
  const isGet = useSelector(({ customer }) => customer.isGet);
  const customers = useSelector(({ customer }) => customer.customers);

  const [onGet] = useActions(
    [getRequest],
    []
  );

  useEffect(() => {
    onGet();
  }, []);

  return (
    <div className={classes.root}>
      <CustomersToolbar />
      <div className={classes.content}>
        {isLoading
          ? <CircularProgress color="primary" size={100} className={classes.loading} />
          : isGet
            ? <CustomersTable customers={customers} title="Customers" />
            : <div className={classes.loadingError}>
              <Typography variant="h1">Connection Error</Typography>
              <img
                alt="Under development"
                className={classes.image}
                src="/images/undraw_page_not_found_su7k.svg"
              />
            </div>}
      </div>
    </div>
  );
};

export default Customers;
