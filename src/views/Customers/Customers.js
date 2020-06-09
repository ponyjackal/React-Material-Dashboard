import React from 'react';
import { makeStyles } from '@material-ui/styles';

import { CustomersToolbar, CustomersTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  }
}));

const Customers = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CustomersToolbar />
      <div className={classes.content}>
        <CustomersTable title="Customers" />
      </div>
    </div>
  );
};

export default Customers;
