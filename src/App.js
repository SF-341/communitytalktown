import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthProvider } from './components/Auth'
import Home from './components/page/Home'
import Dashboard from './components/page/Dashboard'
import LogIn from './components/page/LogIn'
import SignUp from './components/page/SignUp'
import Navbar from './components/Navbar'
import Profile from './components/page/Profile'
import ResetPass from './components/page/ResetPass'
import Contact from './components/page/Contact'


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
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/resetpass" component={ResetPass} />
            <Route exact path="/contact" component={Contact} />

          </Switch>
        </Router>
      </Provider>
    </AuthProvider>
  );
}

export default App;
