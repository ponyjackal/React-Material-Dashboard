import React from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import {
    List,
    ListItem,
    Button,
    colors,
} from '@material-ui/core';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import MarkunreadIcon from '@material-ui/icons/Markunread';

import { SearchInput } from 'components';

const useStyles = makeStyles(theme => ({
    root: {},
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(1)
    },
    spacer: {
        flexGrow: 1
    },
    importButton: {
        marginRight: theme.spacing(1)
    },
    exportButton: {
        marginRight: theme.spacing(1)
    },
    searchInput: {
        marginRight: theme.spacing(1)
    },
    content: {
        marginTop: theme.spacing(2),
        textAlign: 'center',
        justifyContent: 'center',
    },
    list: {
        marginBottom: theme.spacing(2),

    },
    active: {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
        justifyContent: 'center',
        '& $icon': {
            color: theme.palette.primary.main
        }
    },
    button: {
        color: colors.blueGrey[800],
        padding: '10px 8px',
        justifyContent: 'center',
        textTransform: 'none',
        letterSpacing: 0,
        width: '100%',
        fontWeight: theme.typography.fontWeightMedium
    },
    item: {
        display: 'inline-block',
        paddingTop: 0,
        paddingBottom: 0
    },
    icon: {
        color: theme.palette.icon,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        marginRight: theme.spacing(1)
    },
}));

const visualizeNumber = (phoneNumberString) => {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return null
}

const LeftList = ({ setSelectedChat, selectedChat, data, className, ...rest }) => {

    const classes = useStyles();

    console.log("LeftList", selectedChat);

    return (
        <div
            {...rest}
            className={clsx(classes.root, className)}
        >
            <div className={classes.content}>
                <div className={classes.row}>
                    <SearchInput
                        className={classes.searchInput}
                        placeholder="Search user"
                    />
                </div>
                <List
                    className={classes.list}
                >
                    {Object.keys(data).map(key => (
                        <React.Fragment key={data[key].id}>
                            <ListItem
                                className={classes.item}
                                disableGutters
                                key={data[key].id}
                            >
                                {selectedChat === key
                                    ? (<Button
                                        className={classes.active}
                                        onClick={() => setSelectedChat(key)}
                                    >
                                        <div className={classes.icon}>{data[key].id}</div>
                                        {visualizeNumber(data[key].to)}
                                    </Button>)
                                    : (<Button
                                        className={classes.button}
                                        onClick={() => setSelectedChat(key)}
                                    >
                                        <div className={classes.icon}>{data[key].id}</div>
                                        {visualizeNumber(data[key].to)}
                                    </Button>)}
                            </ListItem>
                        </React.Fragment>
                    ))}
                </List>
            </div>
        </div >
    );

}

export default React.memo(LeftList);