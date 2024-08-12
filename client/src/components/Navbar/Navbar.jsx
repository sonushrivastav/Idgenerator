import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  console.log(user);
  
  return (
    <nav className="headerCOntainer">
      <h1 className="toastifyTitle">UserId</h1>
      {user && (
        <button 
          onClick={logout} 
          className="text-lg text-white"
        >
          LogOut
        </button>
      )}
    </nav>
  )
}

export default Navbar
