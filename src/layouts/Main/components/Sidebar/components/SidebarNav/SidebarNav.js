import React, { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button, colors } from '@material-ui/core';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'inline-block',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  },
  chileItem: {
    marginLeft: '30px',
  },
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const SidebarNav = props => {
  const { pages, className, ...rest } = props;
  const [collapsed, setCollapsed] = React.useState(true);
  const classes = useStyles();

  function toggleCollapse() {
    setCollapsed(prevValue => !prevValue);
  }
  function onClick(e) {
    if (Array.isArray(pages)) {
      e.preventDefault();
      toggleCollapse();
    }
  }

  let expandIcon;

  if (Array.isArray(pages) && pages.length) {
    expandIcon = !collapsed ? (
      <ExpandMoreIcon
        className={"sidebar-item-expand-arrow sidebar-item-expand-arrow-expanded"}
        style={{ marginLeft: 60, }}
      />
    ) : (
        <KeyboardArrowRightIcon className="sidebar-item-expand-arrow" style={{ marginLeft: 60, }} />
      );
  }

  return (
    <List
      {...rest}
      className={clsx(classes.root, className)}
    >
      {pages.map(page => (
        <React.Fragment key={page.title}>
          <ListItem
            className={classes.item}
            disableGutters
            key={page.title}
          >
            {Array.isArray(page.items) ? (
              <Button
                // activeClassName={classes.active}
                className={classes.button}
                onClick={onClick}
              >
                <div className={classes.icon}>{page.icon}</div>
                {page.title}
                {expandIcon}
              </Button>
            ) : (
                <Button
                  activeClassName={classes.active}
                  className={classes.button}
                  component={CustomRouterLink}
                  to={page.href}
                >
                  <div className={classes.icon}>{page.icon}</div>
                  {page.title}
                </Button>
              )}


            <Collapse in={!collapsed} timeout="auto" unmountOnExit>
              {Array.isArray(page.items) ? (
                <List disablePadding {...rest} className={classes.chileItem}>
                  {page.items.map((subItem) => (
                    <ListItem key={subItem.title} className={classes.item} disableGutters>
                      <Button
                        activeClassName={classes.active}
                        className={classes.button}
                        component={CustomRouterLink}
                        to={subItem.href}
                      >
                        <div className={classes.icon}>{subItem.icon}</div>
                        {subItem.title}
                      </Button>
                    </ListItem>
                  ))}
                </List>
              ) : null}
            </Collapse>
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default SidebarNav;
