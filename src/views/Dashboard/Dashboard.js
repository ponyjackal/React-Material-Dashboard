import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  CircularProgress,
  Typography
} from '@material-ui/core';

import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  LatestOrders,
} from './components';

import useActions from './../../lib/useActions';
import { getRequest } from './../../redux/dashboard/actions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
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

const Dashboard = () => {
  const classes = useStyles();

  const isLoading = useSelector(({ loading }) => loading.DASHBOARD_GET);
  const isGet = useSelector(({ dashboard }) => dashboard.isGet);
  const data = useSelector(({ dashboard }) => dashboard.data);

  const [onGet] = useActions(
    [getRequest],
    []
  );

  useEffect(() => {
    onGet();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {isGet
          ? (<Grid
            container
            spacing={4}
          >
            <Grid
              item
              lg={6}
              sm={6}
              xl={6}
              xs={12}
            >
              <Budget totalCost={data.approx_cost} />
            </Grid>
            <Grid
              item
              lg={6}
              sm={6}
              xl={6}
              xs={12}
            >
              <TotalUsers totalCustomer={data.customer_count} />
            </Grid>
            <Grid
              item
              lg={6}
              sm={6}
              xl={6}
              xs={12}
            >
              <TasksProgress />
            </Grid>
            <Grid
              item
              lg={6}
              sm={6}
              xl={6}
              xs={12}
            >
              <TotalProfit totalBoardcasts={data.broadcasts_count} />
            </Grid>
            {/* <Grid
                item
                lg={8}
                md={12}
                xl={9}
                xs={12}
              >
                <LatestSales />
              </Grid>
              <Grid
                item
                lg={4}
                md={6}
                xl={3}
                xs={12}
              >
                <UsersByDevice />
              </Grid>
              <Grid
                item
                lg={4}
                md={6}
                xl={3}
                xs={12}
              >
                <LatestProducts />
              </Grid>
              <Grid
                item
                lg={8}
                md={12}
                xl={9}
                xs={12}
              >
                <LatestOrders />
              </Grid> */}
          </Grid>) :
          isLoading
            ? <CircularProgress color="primary" size={100} className={classes.loading} />
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

export default Dashboard;
