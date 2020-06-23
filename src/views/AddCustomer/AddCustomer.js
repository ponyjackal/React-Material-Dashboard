import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  TextField,
  Link,
  Typography,
  CircularProgress,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';

import { addRequest } from './../../redux/customer/actions';
import useActions from './../../lib/useActions';

const schema = {
  firstname: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128,
    }
  },
  lastname: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
  phone: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 10,
      maximum: 10
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  city: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
  state: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 2
    }
  },
  isAgree: {
    equality: "true"
  },
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    // paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  subscribeButton: {
    margin: theme.spacing(2, 0)
  },
}));

const AddCustomer = props => {
  const { history } = props;
  const classes = useStyles();

  const isAdded = useSelector(({ customer }) => customer.isAdded);
  const isAdding = useSelector(({ loading }) => loading.CUSTOMER_ADD);
  const [onSubscribe] = useActions(
    [addRequest],
    []
  );

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      true: true,
      isAgree: false,
    },
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));

    console.log(formState.errors);
  }, [formState.values]);

  // useEffect(() => {
  //   if (token) {
  //     history.push('/');
  //     try {
  //       localStorage.setItem('token', token);
  //     } catch (e) {
  //       console.log('localStorage is not working');
  //     }
  //   }
  // }, [history, token]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSubscribe = event => {
    event.preventDefault();
    console.log(formState.values);
    onSubscribe({
      first_name: formState.values.firstname,
      last_name: formState.values.lastname,
      email: formState.values.email,
      phone_number: formState.values.phone,
      state: formState.values.state,
      city: formState.values.city,
    });
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography
                className={classes.quoteText}
                variant="h1"
              >
                FRUIT TRUCK DELIVERY ORDERS & RESERVATIONS
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              {/* <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton> */}
            </div>
            <div className={classes.contentBody}>
              {!isAdded ?
                <form
                  className={classes.form}
                  onSubmit={handleSubscribe}
                >
                  <Typography
                    className={classes.title}
                    variant="h2"
                  >
                    GET TEXT MESSAGE UPDATES FROM THE FRUIT TRUCK
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                  >
                    When you're dealing with fresh fruit, you're also dealing with Mother Nature.
                    This means that there will be times when we have to adjust our delivery schedule.
                    Join our text message list for news and updates about deliveries in your community.
                  </Typography>
                  <Grid
                    container
                    spacing={3}
                  >
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        className={classes.textField}
                        error={hasError('firstname')}
                        fullWidth
                        helperText={
                          hasError('firstname') ? formState.errors.firstname[0] : null
                        }
                        label="First Name"
                        name="firstname"
                        onChange={handleChange}
                        type="text"
                        value={formState.values.firstname || ''}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        className={classes.textField}
                        error={hasError('lastname')}
                        fullWidth
                        helperText={
                          hasError('lastname') ? formState.errors.lastname[0] : null
                        }
                        label="Last Name"
                        name="lastname"
                        onChange={handleChange}
                        type="lastname"
                        value={formState.values.lastname || ''}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        className={classes.textField}
                        error={hasError('phone')}
                        fullWidth
                        helperText={
                          hasError('phone') ? formState.errors.phone[0] : null
                        }
                        label="Phone (Format:7015551212)"
                        name="phone"
                        onChange={handleChange}
                        type="text"
                        value={formState.values.phone || ''}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        className={classes.textField}
                        error={hasError('email')}
                        fullWidth
                        helperText={
                          hasError('email') ? formState.errors.email[0] : null
                        }
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        type="email"
                        value={formState.values.email || ''}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        className={classes.textField}
                        error={hasError('city')}
                        fullWidth
                        helperText={
                          hasError('city') ? formState.errors.city[0] : null
                        }
                        label="Delivery City"
                        name="city"
                        onChange={handleChange}
                        type="text"
                        value={formState.values.city || ''}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        className={classes.textField}
                        error={hasError('state')}
                        fullWidth
                        helperText={
                          hasError('state') ? formState.errors.state[0] : null
                        }
                        label="Delivery State"
                        name="state"
                        onChange={handleChange}
                        type="state"
                        value={formState.values.state || ''}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={12}
                      xs={12}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formState.values.isAgree || false}
                            onChange={handleChange}
                            name="isAgree"
                            color="primary"
                          />
                        }
                        label="I agree to the terms & conditions and 'opt in' to receive test messages from The Fruit Truck. "
                      />
                    </Grid>
                  </Grid>

                  <Button
                    className={classes.subscribeButton}
                    color="primary"
                    disabled={!formState.isValid}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {isAdding
                      ? <CircularProgress color="inherit" size={26} />
                      : <>Subscribe</>}
                  </Button>
                </form>
                : <form
                  className={classes.form}
                  onSubmit={handleSubscribe}
                >
                  <Typography
                    className={classes.title}
                    variant="h2"
                  >
                    THANK YOU!
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                  >
                    You will now receive text message notifications from The Fruit Truck.
                  </Typography>
                  <Button
                    className={classes.subscribeButton}
                    color="primary"
                    fullWidth
                    size="large"
                    variant="contained"
                    onClick={() => {
                      window.location = "https://www.myfruittruck.com/"
                    }}
                  >
                    go to home
                </Button>
                </form>}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

AddCustomer.propTypes = {
  history: PropTypes.object
};

export default withRouter(AddCustomer);
