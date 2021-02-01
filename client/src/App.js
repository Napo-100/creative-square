import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../src/utils/auth";

import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
// import "./App.css";

import MasterFeed from "./pages/MasterFeed";
import FeaturedFeed from "./pages/FeaturedPosts";
import FollowFeed from "./pages/FollowFeed";
import SubscriptionFeed from "./pages/SubscriptionFeed";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import AddPost from "./pages/AddPost";
import SinglePost from "./pages/SinglePost"

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});
// Temporary tailwind template for testing

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          {/* <TopBar /> */}
          <div className="flex">
            <SideBar />
            <div className="w-full">
              {Auth.loggedIn() && <Header />}
              <Switch>
                {Auth.loggedIn() ? (
                  <Route exact path="/" component={FollowFeed} />
                ) : (
                  <Route exact path="/" component={MasterFeed} />
                )}
                <Route
                  exact
                  path="/subscriptions"
                  component={SubscriptionFeed}
                />
                <Route exact path="/masterfeed" component={MasterFeed} />
                <Route exact path="/featuredfeed" component={FeaturedFeed} />
                <Route exact path="/postform" component={AddPost} />
                <Route exact path="/post/:id" component={SinglePost} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
