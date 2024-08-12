import { useContext, useState } from "react"
import { AuthContext } from '../../context/AuthContext.jsx';

const SignUp = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const { signup } = useContext(AuthContext);

    const handleSignup = async(e)=>{
        e.preventDefault();
        try {
          await signup(name, email, password);
        } catch (err) {
          console.log('Signup failed. Please try again.',err);
        }
    }
  return (
    <>
              <div className="w-full mt-20 mx-auto flex items-center justify-center">
          <form onSubmit={handleSignup} className="gap-6 p-4 w-[400px] rounded-lg bgGradient shadow-lg flex items-center justify-center flex-col">
            <h4 className="text-white font-bold text-lg ">SignUp</h4>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-none outline-none py-1 px-3 rounded-lg"
              placeholder="Enter Name"/>
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
            <button type="submit" className="bg-violet-500 rounded-lg w-[340px] py-1 px-3">Register</button>
            <span className="text-white">Have an Account? <a href="/login" className="text-sky-500 hover:underline">Sign in</a></span>

          </form>
        </div>
    </>
  )
}

export default SignUp
