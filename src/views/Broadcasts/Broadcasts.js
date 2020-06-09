import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Tabs,
    Tab,
    Box,
    Typography,
    CircularProgress
} from '@material-ui/core';
import PropTypes from 'prop-types';

import { BroadcastsTable } from './components';
import useActions from './../../lib/useActions';
import { getRequest } from './../../redux/broadcast/actions';


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
        marginTop: theme.spacing(2),
        textAlign: 'center',
    },
    loading: {
        display: 'inline-block',
        marginTop: 100,
        marginBottom: 100,
    },
    table_root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    app_bar: {
        fontSize: '30px'
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

const Broadcasts = () => {
    const classes = useStyles();

    const isLoading = useSelector(({ loading }) => loading.BROADCAST_GET);
    const isGet = useSelector(({ broadcast }) => broadcast.isGet);
    const broadcasts = useSelector(({ broadcast }) => broadcast.broadcasts);

    const [onGet] = useActions(
        [getRequest],
        []
    );

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        onGet();
    }, [onGet]);

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                {isLoading
                    ? <CircularProgress color="primary" size={100} className={classes.loading} />
                    : isGet
                        ? (<div className={classes.table_root}>
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
                                <BroadcastsTable broadcasts={broadcasts.draft} title="Draft" />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <BroadcastsTable broadcasts={broadcasts.scheduled} title="Scheduled" />
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <BroadcastsTable broadcasts={broadcasts.sent} title="Sent" />
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                <BroadcastsTable broadcasts={broadcasts.archived} title="Archived" />
                            </TabPanel>
                        </div>)
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
}

export default Broadcasts;