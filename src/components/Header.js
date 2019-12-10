import React from "react";
import { NavLink } from 'react-router-dom'; 
import { FirebaseContext } from "../firebase";

function Header() {
  
  const { firebase, user } = React.useContext(FirebaseContext);

  return (
    <header className="header">
      <div className="flex">
        <img src="/logo.png" alt="Hooks News" className="logo"/>
        <NavLink to="/" className="header-title">Web News</NavLink>
        <NavLink to="/" className="header-link">New</NavLink>
        <div className="divider">|</div>
        <NavLink to="/top" className="header-link">Top</NavLink>
        <div className="divider">|</div>
        <NavLink to="/search" className="header-link">Search</NavLink>
        { user && <React.Fragment>
                    <div className="divider">|</div>
                    <NavLink to="/create" className="header-link">Submit</NavLink>
                  </React.Fragment>  
        }
      </div>

      { user 
          ? (
              <div className="flex"> 
                <div className="header-name">{user.displayName}</div>
                <div className="divider">|</div>
                <div className="header-button" onClick={(props) => firebase.logout()}>Logout</div>
              </div>
            )
          : (
              <div className="flex">
                <NavLink to="/login" className="header-link">Login</NavLink>
              </div>
            )
            
      }
      
    </header>
  )
}

export default Header;
