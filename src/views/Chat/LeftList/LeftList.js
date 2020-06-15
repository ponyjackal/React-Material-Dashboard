import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import {
    List,
    ListItem,
    Button,
    colors,
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import DraftsIcon from '@material-ui/icons/Drafts';
import DeleteIcon from '@material-ui/icons/Delete';

import { SearchInput } from 'components';

const useStyles = makeStyles(theme => ({
    root: {
        borderRight: '1px dotted',
    },
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
        border: "0.5px solid",
        margin: theme.spacing(2),
    },
    content: {
        marginTop: theme.spacing(2),
        textAlign: 'center',
        justifyContent: 'center',
    },
    list: {
        marginBottom: theme.spacing(2),
        height: '70vh',
        maxHeight: '70vh',
        overflow: 'auto',
    },
    active: {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
        padding: '10px 8px',
        justifyContent: 'space-around',
        textTransform: 'none',
        letterSpacing: 0,
        width: '100%',
        borderLeft: '5px solid',
        '& $icon': {
            color: theme.palette.primary.main
        }
    },
    button: {
        color: colors.blueGrey[800],
        padding: '10px 8px',
        justifyContent: 'space-around',
        textTransform: 'none',
        letterSpacing: 0,
        width: '100%',
        fontWeight: theme.typography.fontWeightMedium,
        "&:hover": {
            background: "#ccc"
        },
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
    unRead: {
        background: '#eee',
    },
    removeIcon: {
        color: theme.palette.error.main,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        marginRight: theme.spacing(1)
    }
}));

const visualizeNumber = (phoneNumberString) => {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return null
}

const LeftList = ({ onSelect, onRemove, selectedChat, data, status, className, ...rest }) => {

    const classes = useStyles();

    const [search, setSearch] = useState('');

    console.log("LeftList", selectedChat);

    const onChange = (event) => {
        const text = event.target.value;
        console.log(event.target.value);
        setSearch(text);
    }

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
                        onChange={onChange}
                    />
                </div>
                <List
                    className={classes.list}
                >
                    {data.map((conversation, key) => {
                        if (conversation.to.includes(search)) {
                            return (<React.Fragment key={conversation.id}>
                                <ListItem
                                    className={classes.item}
                                    disableGutters
                                    key={conversation.id}
                                >
                                    {selectedChat === key
                                        ? (<Button
                                            className={classes.active}
                                            onClick={() => onSelect(key)}
                                        >
                                            <div className={classes.icon}>{status[key] ? <DraftsIcon /> : <EmailIcon />}</div>
                                            {visualizeNumber(conversation.to)}
                                            <div className={classes.removeIcon} onClick={() => onRemove(key)}><DeleteIcon /></div>
                                        </Button>)
                                        : (<Button
                                            className={clsx(classes.button, !status[key] && classes.unRead)}
                                            onClick={() => onSelect(key)}
                                        >
                                            <div className={classes.icon}>{status[key] ? <DraftsIcon /> : <EmailIcon />}</div>
                                            {visualizeNumber(conversation.to)}
                                        </Button>)}
                                </ListItem>
                            </React.Fragment>)
                        }
                    })}
                </List>
            </div>
        </div >
    );

}

export default React.memo(LeftList);