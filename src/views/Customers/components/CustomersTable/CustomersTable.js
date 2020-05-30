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

const CustomersTable = props => {
  const { className, customers, title, ...rest } = props;

  const classes = useStyles();

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

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <MUIDataTable data={customers} columns={columns} />
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

CustomersTable.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default CustomersTable;
