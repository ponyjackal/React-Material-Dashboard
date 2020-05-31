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
      await jsonData.forEach((element, index) => {
        if (index) {
          //Split csv file data by comma so that we will have column data
          const elementRaw = element.split(',');
          if (element) {
            let phone_number = elementRaw[18] ? elementRaw[18].replace(/\D/g, '') : "";
            let first_name = elementRaw[3] ? elementRaw[3].replace(/[^a-zA-Z]/g, '') : "";
            let last_name = elementRaw[4] ? elementRaw[4].replace(/[^a-zA-Z]/g, '') : "";
            let city = elementRaw[13] ? elementRaw[13].replace(/[^a-zA-Z]/g, '') : "";
            let state = elementRaw[14] ? elementRaw[14].replace(/[^a-zA-Z]/g, '') : "";
            if (phone_number.charAt(0) == 1) {
              phone_number = phone_number.substr(1);
            }
            let param = {
              'email': elementRaw[2],
              'first_name': elementRaw[3],
              'last_name': elementRaw[4],
              'city': elementRaw[13],
              'state': elementRaw[14],
              'phone_number': phone_number ? phone_number : ""
            }
            data.push(param);
          }
        }
      });
      onImport(data);
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
        <Button >Add User</Button>
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
