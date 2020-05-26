import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Tabs,
    Tab,
    Box,
    Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { BroadcastsTable } from './components';
import mockData from './data';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3),
        height: '100%',
        width: '100%'
    },
    content: {
        marginTop: theme.spacing(2)
    },
    loding_content: {
        textAlign: 'center'
    },
    loading_progress: {
        position: 'absolute',
        top: '50%'
    },
    table_root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    app_bar: {
        fontSize: '30px'
    }
}));

const Broadcasts = () => {
    const classes = useStyles();

    const [broadcasts] = useState(mockData);

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <div className={classes.table_root}>
                    <AppBar position="static" color="default" className={classes.app_bar}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="on"
                            indicatorColor="primary"
                            textColor="primary"
                            aria-label="scrollable force tabs example">
                            <Tab label="Draft" {...a11yProps(0)} />
                            <Tab label="Scheduled" {...a11yProps(1)} />
                            <Tab label="Sent" {...a11yProps(2)} />
                            <Tab label="Archived" {...a11yProps(3)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <BroadcastsTable broadcasts={broadcasts} title="Draft" />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <BroadcastsTable broadcasts={broadcasts} title="Scheduled" />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <BroadcastsTable broadcasts={broadcasts} title="Sent" />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <BroadcastsTable broadcasts={broadcasts} title="Archived" />
                    </TabPanel>
                </div>

            </div>
        </div>
    );
}

export default Broadcasts;