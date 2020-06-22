import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  CircularProgress
} from '@material-ui/core';
import ReactFileReader from 'react-file-reader';

import useActions from './../../../../lib/useActions';
import { importRequest } from './../../../../redux/customer/actions';


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
  const [onImport] = useActions(
    [importRequest],
    []
  );

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
            let city = elementRaw[city_index] ? elementRaw[city_index].replace(/[^a-zA-Z]/g, '') : "";
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
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
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
