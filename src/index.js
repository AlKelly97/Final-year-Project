import React from 'react';
import ReactDOM from 'react-dom';
//import { Route, BrowserRouter as Router } from 'react-router-dom'

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter as Router } from 'react-router-dom'

// Importing AWS Amplify Dependancies
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import Posts from './Posts'
import Content from './Content'
import News from './News'

Amplify.configure(awsExports);

const routing =(
    
  <Router>
      <div>
          <Route path="/" exact component={App} />
          <Route path={"/Posts"} component={Posts} />
          <Route path={"/Content/:account"} component={Content} />
          <Route path={"/News"} component={News} />


      </div>
      

  </Router>
)


ReactDOM.render(
  routing,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();