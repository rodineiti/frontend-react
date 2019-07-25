import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Category from './components/Category/Category';
import Graphic from './components/Graphic/Graphic';
import { isLoggedIn } from './services/auth';
import BillPay from './components/BillPay/BillPay';
import BillReceive from './components/BillReceive/BillReceive';
import Report from './components/Report/Report';
import AddCategory from './components/Category/AddCategory';
import EditCategory from './components/Category/EditCategory';
import AddBillReceive from './components/BillReceive/AddBillReceive';
import EditBillReceive from './components/BillReceive/EditBillReceive';
import AddBillPay from './components/BillPay/AddBillPay';
import EditBillPay from './components/BillPay/EditBillPay';

function PrivateRoute({ component: Component, authenticated, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authenticated === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
        />
    )
}

function Routes(props) {
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/" authenticated={isLoggedIn()} component={Home} />

            <PrivateRoute exact path="/category" authenticated={isLoggedIn()} component={Category} />
            <PrivateRoute exact path="/category/add" authenticated={isLoggedIn()} component={AddCategory} />
            <PrivateRoute exact path="/category/edit/:id" authenticated={isLoggedIn()} component={EditCategory} />

            <PrivateRoute exact path="/billpay" authenticated={isLoggedIn()} component={BillPay} />
            <PrivateRoute exact path="/billpay/add" authenticated={isLoggedIn()} component={AddBillPay} />
            <PrivateRoute exact path="/billpay/edit/:id" authenticated={isLoggedIn()} component={EditBillPay} />

            <PrivateRoute exact path="/billreceive" authenticated={isLoggedIn()} component={BillReceive} />
            <PrivateRoute exact path="/billreceive/add" authenticated={isLoggedIn()} component={AddBillReceive} />
            <PrivateRoute exact path="/billreceive/edit/:id" authenticated={isLoggedIn()} component={EditBillReceive} />

            <PrivateRoute exact path="/report" authenticated={isLoggedIn()} component={Report} />
            <PrivateRoute exact path="/graphic" authenticated={isLoggedIn()} component={Graphic} />
            <Redirect from="*" to="/" />
        </Switch>
    )
}

export default Routes;