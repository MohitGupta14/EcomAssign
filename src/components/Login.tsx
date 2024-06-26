import { api } from '@component/utils/api';
import React, { useState } from 'react';
import Content from './Content';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm: React.FC<{ setLogin: (value: boolean) => void }> = ({ setLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userFound, setUserFound] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const loginUser = api.post.login.useMutation({
    onSuccess: (data) => {
      console.log("User logged in:", data);
      setUserFound(true);
    },
    onError: () => {
      alert("Error logging in: Check your email and password");
    }
  });

  const handleLogin = async () => {
    try {
      const newUser = await loginUser.mutateAsync({
        email: email,
        password: password
      });
      console.log("User created successfully:", newUser);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div>
      {userFound ? (
        <Content />
      ) : (
        <div className="flex justify-center items-center p-4 md:p-8">
          <div className="bg-white rounded-xl border border-gray-300 p-4 md:p-8 shadow-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
            <h2 className="text-xl md:text-2xl text-center font-medium mb-4">Login to your account</h2>
            <form className='px-2 md:px-8'>
              <div className="mb-2 md:mb-4">
                <label htmlFor="email" className="block text-gray-700 font-light mb-1 md:mb-2">Email</label>
                <input type="email" id="email" name="email" placeholder='Enter' className="border border-gray-300 rounded-md p-2 w-full" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mb-4 md:mb-8">
                <label htmlFor="password" className="block text-gray-700 font-light mb-1 md:mb-2">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} id="password" placeholder='Enter' name="password" className="border border-gray-300 rounded-md p-2 w-full pr-10" onChange={(e) => setPassword(e.target.value)} />
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {showPassword ? (
                      <FaEyeSlash onClick={() => setShowPassword(false)} className="text-gray-500 cursor-pointer" />
                    ) : (
                      <FaEye onClick={() => setShowPassword(true)} className="text-gray-500 cursor-pointer" />
                    )}
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <button type="button" className="bg-black text-white font-medium py-2 px-4 rounded-md w-full" onClick={handleLogin}>Login</button>
              </div>
            </form>
            <div className='flex-wrap'>
              <h2 className="text-sm md:text-base text-center justify-center font-light mt-4 md:mt-8 mb-8 md:mb-20 flex">Not Registered ?
                <button className="text-gray-900 ml-1 md:ml-2 font-medium" onClick={() => setLogin(false)}>SIGN UP</button>
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
