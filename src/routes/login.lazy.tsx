import { createLazyFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useSession } from "../hooks/useSession";
import axiosInst from '../services/api/axiosInst';
import Logo from "../components/logo";

export const Route = createLazyFileRoute("/login")({
  component: () => <Login />,
});

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setSession } = useSession();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function(event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  }; 

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = formData;
    try {
      const response = await axiosInst.post("api/login", {
        email,
        password,
      });

      const { data } = response;
      if (data.status === 404) {
        setError(data.message);
        setSuccess("");
      } else {
        const { _id, username, role} = data.data;
        setSuccess(data.msg);

        localStorage.setItem('user', JSON.stringify({ _id, username, role }));
        

        const user = localStorage.getItem("user");
        if (user) {
          const userData = JSON.parse(user);
          const roleId = userData.role._id;
          const isFirstLogin = userData.role.isFirst;

          if (!isFirstLogin) {
            if (roleId === "66374bd0fdfae8633a05d11e") {
              window.location.href = "/adminDashboard";
            } else {
              window.location.href = "/userDashboard";
            }
          } else {
            window.location.href = '/resetPassword';
          }
        } else {
          setError("Failed to retrieve user data.");
        }
      }
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message || "An error occurred while logging in.");
      } else {
        setError("An error occurred while logging in.");
      }
      setSuccess("");
      setTimeout(() => {
        setError("");
      }, 8000);
    }
  };

  return (
    <div> 
      <Logo />
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="w-80 h-96 gap-4 flex flex-col">
          <h1 className="w-full h-10 font-ralewa font-bold text-3xl text-center bg-gradient-to-r text-transparent bg-clip-text from-teal-500 to-purple-900">
            Login
          </h1>
          <h3 className="w-full text-center font-urbanist font-normal text-base text-gray-400">
            Sign in to your account.
          </h3>
          {error && <p className="text-red-500 font-semibold ">{error}</p>}
          {success && <p className="text-green-500 font-semibold">{success}</p>}
          <form onSubmit={handleLogin} className="gap-4 flex flex-col">
            <input
              id="email"
              name="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter Your Email"
              className="w-full h-10 rounded-md border p-2 bg-white border-gray-300 placeholder:text-xs"
            />
            <div className="relative">
              <input
                id="password"
                name="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter Your Password"
                className="w-full h-10 rounded-md border p-4 bg-white border-gray-300 placeholder:text-xs"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
              >
                <img 
                  src={isPasswordVisible ? "/asset/icons/visible.png" : "/asset/icons/not-visible.png"} 
                  alt={isPasswordVisible ? "Hide Password" : "Show Password"} 
                  className="w-5 h-5"
                />
              </button>
            </div>
            <div>
              <a className='text-xs text-gray-500 items-end' href="/forgotpassword">Forgot Password?</a>
            </div>
            <button type="submit" className="bg-teal-500 text-white h-10 rounded-md">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
