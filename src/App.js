import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import React from 'react';
import { connect } from 'react-redux'
import { selectCurrentUser} from "./redux/user/user.selectors";

import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import SigningPage from "./pages/signing/signing.component";
import { createStructuredSelector } from "reselect";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth)
    //
    //     userRef.onSnapshot(snapshot => {
    //       setCurrentUser({
    //           id: snapshot.id,
    //           ...snapshot.data()
    //       })
    //     })
    //   } else {
    //     setCurrentUser(userAuth);
    //   }
    // });
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

export default connect(mapStateToProps)(App);
