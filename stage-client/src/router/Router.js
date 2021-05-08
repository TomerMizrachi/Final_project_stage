import React, { lazy, Suspense } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';

import ErrorBoundary from '@router/ErrorBoundary';
import { OpenRoutes, PublicRoutes, PrivateRoutes } from '@router/Routes';

import PublicRoute from '@router/PublicRoute';
import PrivateRoute from '@router/PrivateRoute';

import Loader from '@components/utility/Loader/Loader';

function AllRoutes() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Router>
          <Switch>
            {OpenRoutes.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact} component={route.component} />
            ))}
            {PublicRoutes.map((route, index) => (
              <PublicRoute key={index} path={route.path} exact={route.exact} component={route.component} />
            ))}
            {PrivateRoutes.map((route, index) => (
              <PrivateRoute key="private-route-{index}" path={route.path} exact={route.exact} component={route.component} />
            ))}
            <Route component={lazy(() => import('@containers/404/404'))} />
          </Switch>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}

export default AllRoutes;