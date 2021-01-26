import React from "react";
import Auth from '../utils/auth';

const Home = () => {
  const loggedIn = Auth.loggedIn();
  return (
    <main>
      <div className="">
        {loggedIn && (
          <div className="col-12 mb-3">
            You are Logged in
          </div>
        )}

        {!loggedIn &&(
          <div>
            You need to log in
            </div>
        )}
      </div>
    </main>
  );

};

export default Home;
