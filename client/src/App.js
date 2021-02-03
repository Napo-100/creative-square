import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../src/utils/auth";

import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
// import "./App.css";

import MasterFeed from "./pages/MasterFeed";
import MasterFeed2 from "./pages/MasterFeed2";
import FeaturedFeed from "./pages/FeaturedPosts";
import HomeFeed from "./pages/HomeFeed";
import FollowFeed from "./pages/FollowFeed";
import FinishProfile from "./pages/FinishProfile"
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
            <SideBar/>
            <div className="w-full">
              {Auth.loggedIn() && <Header />}
              <Switch>
                <Route
                  exact
                  path="/subscriptions"
                  component={SubscriptionFeed}
                />
                <Route exact path="/" component={MasterFeed} />
                <Route exact path="/masterfeed2" component={MasterFeed2} />
                <Route exact path="/featuredfeed" component={FeaturedFeed} />
                <Route exact path="/homefeed" component={HomeFeed} />
                <Route exact path="/following" component={FollowFeed} />
                <Route exact path="/postform" component={AddPost} />
                <Route exact path="/finishprofile" component={FinishProfile} />
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
