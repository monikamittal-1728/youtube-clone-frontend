import { SiYoutube } from "react-icons/si";
import { Link } from "react-router-dom";
import { useState } from "react";

const SigninPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-[#f0f4f9] dark:bg-[#1e1e1f]">
      <div className="w-full max-w-4xl bg-white dark:bg-[#282828] rounded-[28px] px-8 py-10 shadow-sm">

        <div className="flex flex-col md:flex-row gap-12">

          {/* LEFT */}
          <div className="md:w-2/5">
            <div className="flex items-center gap-2 mb-8">
              <SiYoutube className="text-red-600 text-4xl" />
              <span className="text-2xl font-medium text-[#202124] dark:text-white">
                YouTube
              </span>
            </div>

            <h1 className="text-[40px] leading-tight font-normal text-[#202124] dark:text-white mb-4">
              Sign in
            </h1>

            <p className="text-[#5f6368] dark:text-gray-400 text-base">
              to continue to YouTube
            </p>
          </div>

          {/* RIGHT */}
          <div className="md:w-3/5">

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="
                  w-full
                  h-14
                  px-4
                  rounded-xl
                  border
                  border-gray-300
                  dark:border-gray-600
                  bg-white
                  dark:bg-[#282828]
                  text-[#202124]
                  dark:text-white
                  outline-none
                  focus:border-[#1a73e8]
                "
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="
                  w-full
                  h-14
                  px-4
                  rounded-xl
                  border
                  border-gray-300
                  dark:border-gray-600
                  bg-white
                  dark:bg-[#282828]
                  text-[#202124]
                  dark:text-white
                  outline-none
                  focus:border-[#1a73e8]
                "
                required
              />

              <div className="text-right">
                <button
                  type="button"
                  className="text-[#1a73e8] text-sm font-medium hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="
                  w-full
                  h-11
                  bg-[#1a73e8]
                  hover:bg-[#1765cc]
                  text-white
                  rounded-full
                  font-medium
                  transition-colors
                "
              >
                Sign In
              </button>

            </form>

            <div className="mt-6 text-center">
              <span className="text-[#5f6368] dark:text-gray-400">
                Don't have an account?
              </span>

              <Link
                to="/register"
                className="ml-2 text-[#1a73e8] font-medium hover:underline"
              >
                Create account
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default SigninPage;