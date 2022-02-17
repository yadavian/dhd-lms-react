import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link
} from "react-router-dom";
import Report from './views/admin/Report';
import { Book } from './views/admin/Book';
import { Tbook } from './views/admin/Tbook';
import { UserBook } from './views/user/UserBook';
import { User } from './views/admin/User';
import { IssuedBook } from './views/admin/IssuedBook';
import { ReturnBook } from './views/admin/ReturnBook';
import { Admin } from './views/admin/Admin';
import { SelectBookToIssue } from './views/admin/SelectBookToIssue';
import { SelectUserForBook } from './views/admin/SelectUserForBook';
import { AdminLogin } from './views/admin/AdminLogin';
import { UserLogin } from './views/user/UserLogin';
import { UserIssuedBook } from './views/user/UserIssuedBook';
import { useSelector } from 'react-redux';

function App() {


  const login = useSelector((state) => state.login);
  const { userLogin, adminLogin } = login;

  return (
    <Router >
      <Switch>




        {userLogin ?
          <>
            <Route exact path="/" component={UserBook} />
            <Route exact path="/user-book" component={UserBook} />
            <Route exact path="/user-issued-book" component={UserIssuedBook} />
          </>
          :
          <Route exact path="/user-login" component={UserLogin} />

        }

        {adminLogin ?
          <>
            <Route exact path="/" component={Report} />
            <Route exact path="/book" component={Book} />
            <Route exact path="/tbook" component={Tbook} />
            <Route exact path="/user" component={User} />
            <Route exact path="/issued-book" component={IssuedBook} />
            <Route exact path="/select-book" component={SelectBookToIssue} />
            <Route exact path="/select-user" component={SelectUserForBook} />
            <Route exact path="/return-book" component={ReturnBook} />
            <Route exact path="/report" component={Report} />
            <Route exact path="/admin" component={Admin} />
          </> : <Route exact path="/admin-login" component={AdminLogin} />
        }

        <Route render={() => <Redirect to={userLogin ? { pathname: "/user-login" } : { pathname: "/admin-login" }} />} />
      </Switch>
    </Router>
  );
}

export default App;
