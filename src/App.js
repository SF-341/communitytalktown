import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthProvider } from './components/Auth'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import Covidapi from './components/Covidapi'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import ResetPass from './components/ResetPass'


// Redux 
import { Provider } from 'react-redux'
import store from './redux/store'


function App() {

  return (
    <AuthProvider>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/covidapi" component={Covidapi} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/resetpass" component={ResetPass} />

          </Switch>
        </Router>
      </Provider>
    </AuthProvider>
  );
}

export default App;
