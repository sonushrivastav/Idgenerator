import { useContext, useState } from "react";
import { AuthContext } from '../../context/AuthContext.jsx';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = async(e)=>{
   e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      console.log('Login failed. Please check your credentials.',err);
    }
  }


  return (
    <>
      <div className="w-full mt-20 mx-auto flex items-center justify-center">
          <form onSubmit={handleLogin} className="gap-6 p-4 w-[400px] rounded-lg bgGradient shadow-lg flex items-center justify-center flex-col">
            <h4 className="text-white font-bold text-lg ">Login</h4>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="border-none outline-none py-1 px-3 rounded-lg"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="border-none outline-none py-1 px-3 rounded-lg"

            />
            <button type="submit" className="bg-violet-500 rounded-lg w-[340px] py-1 px-3">Login</button>
            <span className="text-white">Not Registered yet? <a href="/signup" className="text-sky-500 hover:underline">Create an Account</a></span>
          </form>
      </div>
    </>
  );
};

export default Login;
