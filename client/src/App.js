import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
// import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import Header from './components/Header';

const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});
// Temporary tailwind template for testing

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <TopBar />
          <div className="flex">
            <SideBar />
            <div className="w-full">
              <Header />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
