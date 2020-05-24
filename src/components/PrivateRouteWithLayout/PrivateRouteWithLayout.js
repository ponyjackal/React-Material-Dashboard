import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const PrivateRouteWithLayout = props => {
    const { layout: Layout, component: Component, ...rest } = props;
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    console.log("isAuthenticated", isAuthenticated);

    return (
        <Route
            {...rest}
            render={matchProps => (
                isAuthenticated === true
                    ? <Layout>
                        <Component {...matchProps} />
                    </Layout>
                    : <Redirect to='/signin' />
            )}
        />
    );
};

PrivateRouteWithLayout.propTypes = {
    component: PropTypes.any.isRequired,
    layout: PropTypes.any.isRequired,
    path: PropTypes.string
};

export default PrivateRouteWithLayout;
