import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.scss";
import { useCookies } from "react-cookie";

const Navbar = ({
  logout,
  register,
  verifiedUser = false,
  auth = null,
  name = "",
}) => {
  const [cookies, setCookie, removeCookies] = useCookies([]);
  const Username = cookies.username;
  return (
    <nav className="navbar w-full h-[10vh] overflow-hidden">
      <Link to="/" className="logo">
        Quill
        <span className="text-slate-500">Hub</span>
      </Link>
      <div className="nav-links">
        {verifiedUser && (
          <>
            <span className="user">User: {Username}</span>
            <Link to="/create" className="nav-link">
              Create blog
            </Link>
            <Link to="/login" onClick={() => logout()} className="nav-link">
              Logout
            </Link>
          </>
        )}
        {!verifiedUser && !auth && (
          <>
            <Link to="/" className="nav-link">
              Home
            </Link>
            {name && (
              <Link to="/login" onClick={() => logout()} className="nav-link">
                <span>Logout ({name})</span>
              </Link>
            )}
            {!name && (
              <Link to="/register" onClick={register} className="nav-link">
                <span>Register</span>
              </Link>
            )}
          </>
        )}
        {auth && (
          <>
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/login" onClick={() => logout()} className="nav-link">
              Login
            </Link>
            <Link to="/register" onClick={register} className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
