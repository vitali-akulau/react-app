import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import React from 'react';
import { connect } from 'react-redux'
import { selectCurrentUser} from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import SigningPage from "./pages/signing/signing.component";
import { createStructuredSelector } from "reselect";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props;

    checkUserSession()
  };

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  };

  render() {
    return (
        <div className="App">
          <Header />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/signing'
              render={() => this.props.currentUser ? (<Redirect to="/" />) : (<SigningPage />)}
            />
            <Route exact path='/checkout' component={CheckoutPage} />
          </Switch>
        </div>
    );
  }
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
