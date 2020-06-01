import 'date-fns';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
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
import { addRequest } from './../../redux/broadcast/actions';

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

const ScheduleBroadcast = props => {
  const { history } = props;
  const classes = useStyles();

  const isLoading = useSelector(({ loading }) => loading.BROADCAST_ADD);
  const isAdded = useSelector(({ broadcast }) => broadcast.isAdded);
  const [onAdd] = useActions(
    [addRequest],
    []
  );

  const [values, setValues] = useState({
    name: '',
    dateTime: new Date(),
    state: {
      id: 0,
      value: '',
      label: ''
    },
    city: '',
    message: ''
  });

  // useEffect(() => {
  //   if (isAdded) {
  //     history.push("/broadcasts");
  //   }
  // }, [isAdded]);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const handleDateChange = (date) => {
    setValues({
      ...values,
      dateTime: date
    });
  };

  const handleStateChange = (event, newValue) => {

    const state = newValue ? newValue : {
      id: '',
      value: '',
      label: ''
    };

    setValues({
      ...values,
      state: state
    });

  }

  const handleCityChange = (event, newValue) => {
    const city = newValue ? newValue : "";
    setValues({
      ...values,
      city: city
    });
  }

  const handleSubmit = () => {
    console.log(values);
    onAdd({
      ...values,
      state: values.state.value
    });
  }

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
                  fullWidth
                  label="Name"
                  margin="normal"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
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
                        label="Date picker dialog"
                        format="MM/dd/yyyy"
                        value={values.dateTime}
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
                        label="Time picker"
                        value={values.dateTime}
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
                  value={values.state}
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
                  freeSolo
                  id="free-solo-2-demo"
                  options={csc.getCitiesOfState(values.state.id).map((option) => option.name)}
                  value={values.city}
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
                  fullWidth
                  label="Message"
                  margin="normal"
                  name="message"
                  multiline
                  rows={4}
                  onChange={handleChange}
                  required
                  value={values.messag}
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
              className={classes.scheduleButton}
              onClick={() => handleSubmit()}
            >
              {isLoading
                ? <CircularProgress color="inherit" size={26} />
                : <>Schedule</>}
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
};

export default ScheduleBroadcast;
