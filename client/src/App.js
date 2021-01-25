import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
// import "./App.css";

const client = new ApolloClient({
  uri: "/graphql",
});
// Temporary tailwind template for testing
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="m-10 border-2 border-gray-600">
          This is looking like a great project everyone! Let's crush it!
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
