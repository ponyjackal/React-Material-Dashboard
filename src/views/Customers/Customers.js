import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { CustomersToolbar, CustomersTable } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Customers = () => {
  const classes = useStyles();

  const [customers] = useState(mockData);

  return (
    <div className={classes.root}>
      <CustomersToolbar />
      <div className={classes.content}>
        <CustomersTable customers={customers} title="Customers" />
      </div>
    </div>
  );
};

export default Customers;
