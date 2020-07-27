import React, { useContext } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { RouteWithLayout } from 'components';
import { Main as MainLayout, Minimal as MinimalLayout } from 'layouts';

import {
  Dashboard as DashboardView,
  UserList as UserListView,
  InspaceProductList as InspaceProductListView,
  LicensedProductList as LicensedProductListView,
  PcList as PcListView,
  ServerList as ServerListView,
  AccountList as AccountListView,
  Icons as IconsView,
  UserInfo as UserInfoView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView
} from 'views';

import { LoginContext } from 'contexts';

const Routes = props => {

  const loginContext = useContext(LoginContext);

  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <RouteWithLayout
        component={loginContext.isAuthenticated ? DashboardView : SignInView}
        exact
        layout={loginContext.isAuthenticated ? MainLayout : MinimalLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={loginContext.isAuthenticated ? InspaceProductListView : SignInView}
        exact
        layout={loginContext.isAuthenticated ? MainLayout : MinimalLayout}
        path="/inspace-products"
      />
      <RouteWithLayout
        component={loginContext.isAuthenticated ? LicensedProductListView : SignInView}
        exact
        layout={loginContext.isAuthenticated ? MainLayout : MinimalLayout}
        path="/licensed-products"
      />
      <RouteWithLayout
        component={loginContext.isAuthenticated ? PcListView : SignInView}
        exact
        layout={loginContext.isAuthenticated ? MainLayout : MinimalLayout}
        path="/pcs"
      />
      <RouteWithLayout
        component={loginContext.isAuthenticated ? ServerListView : SignInView}
        exact
        layout={loginContext.isAuthenticated ? MainLayout : MinimalLayout}
        path="/servers"
      />
      <RouteWithLayout
        component={loginContext.isAuthenticated ? AccountListView : SignInView}
        exact
        layout={loginContext.isAuthenticated ? MainLayout : MinimalLayout}
        path="/accounts"
      />
      <RouteWithLayout
        component={loginContext.isAuthenticated ? UserListView : SignInView}
        component={UserListView}
        exact
        layout={loginContext.isAuthenticated ? MainLayout : MinimalLayout}
        path="/users"
      />
      <RouteWithLayout
        component={loginContext.isAuthenticated ? IconsView : SignInView}
        exact
        layout={loginContext.isAuthenticated ? MainLayout : MinimalLayout}
        path="/icons"
      />
      <RouteWithLayout
        component={loginContext.isAuthenticated ? UserInfoView : SignInView}
        exact
        layout={loginContext.isAuthenticated ? MainLayout : MinimalLayout}
        path="/userInfo"
      />
      <RouteWithLayout
        component={loginContext.isAuthenticated ? SettingsView : SignInView}
        exact
        layout={loginContext.isAuthenticated ? MainLayout : MinimalLayout}
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
