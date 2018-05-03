import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import App from './App';
import SearchPage from './pages/SearchPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import RestaurantPage from './pages/RestaurantPage';
import AddRestaurantPage from './pages/AddRestaurantPage';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <App>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/restaurant" component={AddRestaurantPage} />
            <Route exact path="/restaurant/:id" component={RestaurantPage} />
            <Route exact path="/search/:keyword" component={SearchPage} />
          </Switch>
        </App>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
