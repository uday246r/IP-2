import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { removeUser } from "../utils/userSlice";
import { BASE_URL} from "../utils/constants";

const NavBar = () => {
  const user = useSelector(store=> store.user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleLogOut = async() =>{
    try{
      await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true}
      );
      dispatch(removeUser());
      return Navigate("/signup");
    }
    catch(err){
      //Err logic may be redirect to error page
    }
  };
  return (
             <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">Waste Management Support System</Link>
  </div>
  <div className="flex-none gap-2">
   {user && (
     <div className="dropdown dropdown-end mx-5 flex ">
      <p className="px-4">Welcome, {user.firstName}</p>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="user photo"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to ="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><a>Schedule PickUp</a></li>
        <li><a>Settings</a></li>
        <li><a onClick={handleLogOut}>Logout</a></li>
      </ul>
    </div>
  )}
  </div>
</div>
  );
};

export default NavBar