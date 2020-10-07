import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  CircularProgress,
  TextField,
  Typography
} from '@material-ui/core';
import ReactFileReader from 'react-file-reader';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CountUp from 'react-countup';

import { states, cities } from './../../../../data';

import useActions from './../../../../lib/useActions';
import { importRequest, getRequest } from './../../../../redux/customer/actions';


const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    width: 100
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  filterItem: {
    marginRight: 20,
    minWidth: 200,
  },
  searchResult: {
    fontSize: 20,
    marginLeft: 20,
  }
}));

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}


const CustomersToolbar = props => {
  const classes = useStyles();
  const { className, ...rest } = props;

  const isLoading = useSelector(({ loading }) => loading.CUSTOMER_IMPORT);
  const isSearching = useSelector(({ loading }) => loading.CUSTOMER_GET);
  const isGet = useSelector(({ customer }) => customer.isGet);
  const customers = useSelector(({ customer }) => customer.customers);
  const [onImport] = useActions(
    [importRequest],
    []
  );

  const [onGet] = useActions(
    [getRequest],
    []
  );

  const getCustomers = (targetState, targetCity, rowPerPage = 10, page = 1) => {
    onGet({ targetState, targetCity, rowPerPage, page });
  }

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
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

  /** 
   * Function to upload file
  */
  const handleUploadedFiles = files => {
    var reader = new FileReader();
    reader.onload = async (e) => {
      //Split csv file data by new line so that we can skip first row which is header
      let jsonData = reader.result.split('\n');
      let data = [];
      let email_index;
      let phone_index;
      let first_name_index;
      let last_name_index;
      let city_index;
      let state_index;
      await jsonData.forEach((element, index) => {

        if (index) {
          //Split csv file data by comma so that we will have column data
          const elementRaw = element.split(',');
          if (element) {
            let email = validateEmail(elementRaw[email_index]) ? elementRaw[email_index] : "";
            let phone_number = elementRaw[phone_index] ? elementRaw[phone_index].replace(/\D/g, '') : "";
            let first_name = elementRaw[first_name_index] ? elementRaw[first_name_index].replace(/[^a-zA-Z]/g, '') : "";
            let last_name = elementRaw[last_name_index] ? elementRaw[last_name_index].replace(/[^a-zA-Z]/g, '') : "";
            let city = elementRaw[city_index] ? elementRaw[city_index].replace(/[^a-zA-Z\s\.']/g, '') : "";
            let state = elementRaw[state_index] ? elementRaw[state_index].replace(/[^a-zA-Z]/g, '') : "";
            if (phone_number.charAt(0) === 1) {
              phone_number = phone_number.substr(1);
            }
            if (phone_number || email) {
              let param = {
                'email': email,
                'first_name': first_name,
                'last_name': last_name,
                'city': city,
                'state': state,
                'phone_number': phone_number
              }
              data.push(param);
            }
          }
        }
        else {
          const elementRaw = element.split(',');
          elementRaw.forEach((item, index) => {
            let value = item.toLowerCase();
            if (value.includes('email')) {
              email_index = index;
            }
            else if (value.includes('phone')) {
              phone_index = index;
            }
            else if (value.includes('first') && value.includes('name')) {
              first_name_index = index;
            }
            else if (value.includes('last') && value.includes('name')) {
              last_name_index = index;
            }
            else if (value.includes('state')) {
              state_index = index;
            }
            else if (value.includes('city')) {
              city_index = index;
            }
          });
        }
      });
      while (data.length > 0) {
        const chunk = data.splice(0, 10000);
        console.log("data", chunk);
        await onImport(chunk);
      }
    }
    reader.readAsText(files[0]);
  }

  const handleSubmit = () => {
    getCustomers(formState.values.state.value, formState.values.city);
  }

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

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <div className={classes.filterContainer}>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            options={states}
            getOptionLabel={(option) => option.label}
            value={formState.values.state}
            onChange={handleStateChange}
            className={classes.filterItem}
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
          <Autocomplete
            multiple
            id="free-solo-2-demo"
            options={formState.values.state ? cities[formState.values.state.label] : []}
            getOptionLabel={(option) => option}
            value={formState.values.city}
            onChange={handleCityChange}
            className={classes.filterItem}
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
          <Button
            className={classes.importButton}
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >{isSearching
            ? <CircularProgress color="inherit" size={26} />
            : <>Search</>}</Button>
          {isSearching
            ? <Typography className={classes.searchResult}><CountUp delay={2} start={0} end={100000} /> customers</Typography>
            : isGet ? <Typography className={classes.searchResult}><CountUp delay={2} start={100000} end={customers.total} /> customers</Typography> : <></>}
        </div>
        <span className={classes.spacer} />
        <Button >Add Customer</Button>
        <ReactFileReader handleFiles={handleUploadedFiles} fileTypes={'.csv'}>
          <Button
            className={classes.importButton}
            color="primary"
            variant="contained"
          >
            {isLoading
              ? <CircularProgress color="inherit" size={26} />
              : <>Import</>}
          </Button>
        </ReactFileReader>
      </div>
    </div>
  );
};

CustomersToolbar.propTypes = {
  className: PropTypes.string
};

export default CustomersToolbar;
