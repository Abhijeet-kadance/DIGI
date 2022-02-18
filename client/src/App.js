import './App.css';
import Signin from './pages/Signin';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import SideBar from './pages/SideBar';

// import Appointment from './pages/Appointment';
import './components/Navbar.css';
import './components/nav.js';
import Welcome from './pages/Welcome';
import Signup from './pages/Signup';
import DocSignUp from './pages/DocSignUp';
import DocSignin from './pages/DocSignin';
import DoctorDashboard from './pages/DoctorDashboard';
import Settings from './pages/Settings';
import ViewDocInfo from './pages/ViewDocInfo';
import ForgotPassword from './components/ForgotPassword';


function App() {
  const [isAuthorized, setIsAuthorized] = useState(false)

  return (
    <div className="App">

      <Router>
        <Switch>
          <div className="container">
            <Route path='/' exact render={() => {
              return (isAuthorized ? <SideBar authorized={isAuthorized} setIsAuthorized={setIsAuthorized} /> :
                <Signin setIsAuthorized={setIsAuthorized} />)
            }} />
            <Route path='/signup' component={Signup} />
            <Route path='/docsignin' render={() => {
              return (isAuthorized ? <DoctorDashboard authorized={isAuthorized} setIsAuthorized={setIsAuthorized} /> :
                <DocSignin setIsAuthorized={setIsAuthorized} />)
            }} />
            <Route path='/forgotpassword' component={ForgotPassword} />
            <Route path='/docsignup' component={DocSignUp} />
            {/* <Route path='/docdashboard' component={()=>{return <DoctorDashboard authorized={isAuthorized}/>}} />
        */}

          </div>
        </Switch>
      </Router>
    </div>

  );
}

export default App;
