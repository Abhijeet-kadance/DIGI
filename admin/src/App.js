import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import AdminLogin from './pages/AdminLogin';
import { useState } from 'react';

function App() {
    const [isAuthorized, setIsAuthorized] = useState(false)
  

  return (
    <>
      <Router>
        <Switch>
          <div className="container">
          {/* <Route path='/' exact component={()=>{return <AdminLogin setIsAuthorized={setIsAuthorized}/>}} /> */}
          <Route path='/admin' exact render={()=>{return( isAuthorized? <Navbar authorized={isAuthorized} setIsAuthorized={setIsAuthorized}/>: <AdminLogin setIsAuthorized={setIsAuthorized}/>)}} />
          {/* <Route path='/nav' exact component={()=>{return <Navbar authorized={isAuthorized}/>}} /> */}
          </div>
        </Switch>
      </Router>
    </>
  );
}

export default App;
