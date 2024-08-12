
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToastify} from "../context/ToastifyContext.jsx"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {showToastify} = useToastify()
  const [userIdCard, setUserIdCard] = useState(null);
  
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const response = await axios.get('http://localhost:8000/api/user/get-user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.user);
          const userIdCardResponse = await axios.get(
            `http://localhost:8000/api/userIdCard/user-id-card/${response.data.user._id}`,
            
          );
          setUserIdCard(userIdCardResponse.data);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
      setLoading(false);
    };
    checkUserLoggedIn();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/user/login', { email, password });
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      const userResponse = await axios.get('http://localhost:8000/api/user/get-user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUser(userResponse.data.user);
      showToastify("Logged in successfully!");
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      showToastify("Logged Failed!",error);
      throw error;

    }
  };

  const signup = async (name, email, password) => {
    try {
      await axios.post('http://localhost:8000/api/user/create-account', { name, email, password });
      showToastify("User Register successfully!");
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      showToastify("User Registration Failed!");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, userIdCard,login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


