import 'date-fns';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import validate from 'validate.js';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import csc from 'country-state-city';
import states from './data';

import useActions from './../../lib/useActions';
import { addRequest, publishRequest } from './../../redux/broadcast/actions';
import { PublishDialog } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  card: {
    height: '100%',
  },
  inputField: {
    paddingtop: '10px',
    paddingBottom: '10px',
  },
  scheduleButton: {
    width: 100,
  },
  datTimePicker: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  }
}));

const schema = {
  name: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  message: {
    presence: { allowEmpty: false, message: 'is required' },
  }
};

const ScheduleBroadcast = props => {
  const { history } = props;
  const classes = useStyles();

  const isLoading = useSelector(({ loading }) => loading.BROADCAST_ADD);
  const isAdded = useSelector(({ broadcast }) => broadcast.isAdded);
  const current = useSelector(({ broadcast }) => broadcast.broadcast);
  const isPublishing = useSelector(({ loading }) => loading.BROADCAST_PUBLISH);
  const isPublished = useSelector(({ broadcast }) => broadcast.isPublished);

  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      name: '',
      dateTime: new Date(),
      state: {
        id: 0,
        value: '',
        label: ''
      },
      city: [],
      message: ''
    },
    touched: {},
    errors: {}
  });
  // const [values, setValues] = useState({
  //   name: '',
  //   dateTime: new Date(),
  //   state: {
  //     id: 0,
  //     value: '',
  //     label: ''
  //   },
  //   city: [],
  //   message: ''
  // });

  const [onAdd] = useActions(
    [addRequest],
    []
  );

  const [onPublish] = useActions(
    [publishRequest],
    []
  );


  useEffect(() => {
    if (isAdded && !isLoading) {
      // history.push("/broadcasts");
      setOpen(true);
    }
  }, [isAdded, isLoading]);

  useEffect(() => {
    console.log("isPublished", isPublished);
    if (isPublished && !isPublishing) {
      setOpen(false);
    }
  }, [isPublished, isPublishing]);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleClose = () => {
    setOpen(false);
  };

  const handlePublish = () => {
    if (current.id) {
      onPublish({
        id: current.id
      });
    }
  }

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };
  const handleDateChange = (date) => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        dateTime: date
      },
      touched: {
        ...formState.touched,
        dateTime: true
      }
    }));
  };

  const handleStateChange = (event, newValue) => {

    const state = newValue ? newValue : {
      id: '',
      value: '',
      label: ''
    };
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        state: state,
        city: []
      },
      touched: {
        ...formState.touched,
        state: true
      }
    }));
  }

  const handleCityChange = (event, newValue) => {
    const city = newValue ? newValue : [];
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        city: city
      },
      touched: {
        ...formState.touched,
        city: true
      }
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let dateTime = new Date();
    if (dateTime > formState.values.dateTime) {
      dateTime.setHours(dateTime.getHours(), dateTime.getMinutes() + 1, dateTime.getSeconds());
    }
    else {
      dateTime = formState.values.dateTime;
    }

    onAdd({
      ...formState.values,
      state: formState.values.state.value,
      dateTime: dateTime
    });
  }
  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <form
          autoComplete="off"
          noValidate
        >
          <CardHeader
            subheader="The information can be edited"
            title="Schedule Broadcasts"
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  error={hasError('name')}
                  fullWidth
                  helperText={
                    hasError('name') ? formState.errors.name[0] : null
                  }
                  label="Name"
                  margin="normal"
                  name="name"
                  onChange={handleChange}
                  required
                  value={formState.values.name}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-between">
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <KeyboardDatePicker
                        className={classes.datTimePicker}
                        margin="normal"
                        variant="outlined"
                        id="date-picker-dialog"
                        label="Date"
                        disablePast={true}
                        format="MM/dd/yyyy"
                        value={formState.values.dateTime}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <KeyboardTimePicker
                        className={classes.datTimePicker}
                        margin="normal"
                        variant="outlined"
                        id="time-picker"
                        label="Time"
                        value={formState.values.dateTime}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change time',
                        }}
                      />
                    </Grid>
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  options={states}
                  getOptionLabel={(option) => option.label}
                  value={formState.values.state}
                  onChange={handleStateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="State"
                      margin="normal"
                      variant="outlined"
                      className={classes.options}
                      InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                  )}
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <Autocomplete
                  multiple
                  id="free-solo-2-demo"
                  options={csc.getCitiesOfState(formState.values.state.id).map((option) => option.name)}
                  value={formState.values.city}
                  onChange={handleCityChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="City"
                      className={classes.options}
                      margin="normal"
                      variant="outlined"
                      InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                  )}
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  error={hasError('message')}
                  fullWidth
                  helperText={
                    hasError('message') ? formState.errors.message[0] : null
                  }
                  label="Message"
                  margin="normal"
                  name="message"
                  multiline
                  rows={4}
                  onChange={handleChange}
                  required
                  value={formState.values.messag}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              disabled={!formState.isValid}
              className={classes.scheduleButton}
              onClick={handleSubmit}
            >
              {isLoading
                ? <CircularProgress color="inherit" size={26} />
                : <>Schedule</>}
            </Button>
          </CardActions>
          <PublishDialog open={open} handleClose={handleClose} handlePublish={handlePublish} isPublishing={isPublishing} broadcast={current} />
        </form>
      </Card>
    </div>
  );
};

export default ScheduleBroadcast;
