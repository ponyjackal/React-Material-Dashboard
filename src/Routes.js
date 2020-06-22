import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout, PrivateRouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  ScheduleBroadcast as ScheduleBroadcastView,
  Broadcasts as BroadcastsView,
  Customers as CustomersView,
  Chat as ChatView,
  AddCustomer as AddCustomerView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/schedule"
      />
      <PrivateRouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <PrivateRouteWithLayout
        component={ScheduleBroadcastView}
        exact
        layout={MainLayout}
        path="/schedule"
      />
      <PrivateRouteWithLayout
        component={BroadcastsView}
        exact
        layout={MainLayout}
        path="/broadcasts"
      />
      <PrivateRouteWithLayout
        component={CustomersView}
        exact
        layout={MainLayout}
        path="/customers"
      />
      <PrivateRouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <PrivateRouteWithLayout
        component={ChatView}
        exact
        layout={MainLayout}
        path="/chat"
      />
      <PrivateRouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <PrivateRouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <PrivateRouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <PrivateRouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <PrivateRouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={AddCustomerView}
        exact
        layout={MinimalLayout}
        path="/subscribe"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
