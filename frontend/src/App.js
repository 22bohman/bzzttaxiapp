import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./shared/Header/Header";


const App = () => {
    return (
        <BrowserRouter>
            <React.Fragment>
                <Header />
                <Switch>
                    <Route path="/" component={Home} exact />
                </Switch>
            </React.Fragment>
        </BrowserRouter>
    );
};



export default App;
