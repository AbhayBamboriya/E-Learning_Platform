import React, { useState } from "react";
import { createAccount, login, signout } from "../Redux/Slices/AuthSlice.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSigninData({
      ...signinData,
      [name]: value,
    });
  }

  async function signin(e) {
    e.preventDefault();

    if (!signinData.email || !signinData.password) {
      toast.error("Please fill all the details");
      return;
    }

    const response = await dispatch(login(signinData));
    if (response?.payload?.success) {
      toast.success("User Logged Successfully");
    }
  }

  return (
    <div
      id="loginModal"
      className="fixed inset-0 bg-gray-600 bg-opacity-50 hidden overflow-y-auto h-full w-full"
      onClick={(e) => {
        if (e.target.id === "loginModal")
          document.getElementById("loginModal").classList.add("hidden");
      }}
    >
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="text-lg font-medium text-gray-900">
              Login to EduVerse
            </h3>
            <button
              className="text-gray-400 hover:text-gray-500"
              onClick={() =>
                document.getElementById("loginModal").classList.add("hidden")
              }
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={signin} className="space-y-4 p-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                id="email"
                onChange={handleUserInput}
                value={signinData.email}
                name="email"
              />
              <p className="mt-1 text-xs text-gray-500">
                We'll never share your email with anyone else.
              </p>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                value={signinData.password}
                name="password"
                onChange={handleUserInput}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                id="password"
              />
            </div>
            <div className="flex justify-between pt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Login
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={() =>
                  document.getElementById("loginModal").classList.add("hidden")
                }
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function logout() {
    const res = await dispatch(signout());
  }

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a
              className="flex-shrink-0 flex items-center text-xl font-bold text-white"
              href="#"
            >
              <span className="text-red-500">Edu</span>Verse
            </a>
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <a
                className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-800"
                href="#"
              >
                Home
              </a>
              <a
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                href="#"
              >
                About
              </a>
              <div className="relative group">
                <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none">
                  Topics
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                  <div className="border-t border-gray-100"></div>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </a>
                </div>
              </div>
              <a
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                href="#"
              >
                Contact Us
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex md:w-80">
              <input
                className="w-full rounded-l-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                placeholder="Search"
              />
              <button className="rounded-r-md bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700">
                Search
              </button>
            </div>
            <div className="flex items-center space-x-2">
              {isLoggedIn ? (
                <button
                  className="bg-red-600 hover:bg-red-700 text-white py-1.5 px-3 rounded-md"
                  onClick={logout}
                >
                  Logout
                </button>
              ) : (
                <button
                  className="bg-red-600 hover:bg-red-700 text-white py-1.5 px-3 rounded-md"
                  onClick={() =>
                    document
                      .getElementById("loginModal")
                      .classList.remove("hidden")
                  }
                >
                  Login
                </button>
              )}
              {!isLoggedIn && (
                <button
                  className="bg-green-600 hover:bg-green-700 text-white py-1.5 px-3 rounded-md"
                  onClick={() =>
                    document
                      .getElementById("signupModal")
                      .classList.remove("hidden")
                  }
                >
                  SignUp
                </button>
              )}

              {isLoggedIn && (
                <>
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white py-1.5 px-3 rounded-md"
                    onClick={() => navigate("/askDoubt")}
                  >
                    Ask Doubt
                  </button>
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white py-1.5 px-3 rounded-md"
                    onClick={() => navigate("/allDoubts")}
                  >
                    All Doubts
                  </button>
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white py-1.5 px-3 rounded-md"
                    onClick={() => navigate("/resource")}
                  >
                    Resources
                  </button>
                </>
              )}

              {role === "teacher" && (
                <button
                  className="bg-green-600 hover:bg-green-700 text-white py-1.5 px-3 rounded-md"
                  onClick={() => navigate("/upload")}
                >
                  Upload Resources
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Signup = () => {
  const dispatch = useDispatch();
  const [signupData, setSignupData] = useState({
    Name: "",
    email: "",
    password: "",
    role: "",
    confirmPassword: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  }

  async function createNewAccount(e) {
    e.preventDefault();

    if (
      !signupData.email ||
      !signupData.Name ||
      !signupData.password ||
      !signupData.confirmPassword ||
      !signupData.role
    ) {
      toast.error("Please fill all the details");
      return;
    }

    const response = await dispatch(createAccount(signupData));
    if (response?.payload?.success) {
      toast.success("User Registered Successfully");
    }
  }

  return (
    <div
      id="signupModal"
      className="fixed inset-0 bg-gray-600 bg-opacity-50 hidden overflow-y-auto h-full w-full"
      onClick={(e) => {
        if (e.target.id === "signupModal")
          document.getElementById("signupModal").classList.add("hidden");
      }}
    >
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="text-lg font-medium text-gray-900">
              Create your EduVerse Account
            </h3>
            <button
              className="text-gray-400 hover:text-gray-500"
              onClick={() =>
                document.getElementById("signupModal").classList.add("hidden")
              }
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={createNewAccount} className="space-y-4 p-4">
            <div>
              <label
                htmlFor="Name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                id="Name"
                name="Name"
                value={signupData.Name}
                onChange={handleUserInput}
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                id="role"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                name="role"
                value={signupData.role}
                onChange={handleUserInput}
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="signup-email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                id="signup-email"
                name="email"
                value={signupData.email}
                onChange={handleUserInput}
              />
              <p className="mt-1 text-xs text-gray-500">
                We'll never share your email with anyone else.
              </p>
            </div>

            <div>
              <label
                htmlFor="signup-password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                id="signup-password"
                name="password"
                value={signupData.password}
                onChange={handleUserInput}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                id="confirmPassword"
                name="confirmPassword"
                value={signupData.confirmPassword}
                onChange={handleUserInput}
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Sign Up
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={() =>
                  document.getElementById("signupModal").classList.add("hidden")
                }
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Carousel = () => {
  return (
    <div className="relative">
      <div className="carousel-inner">
        <div className="relative">
          <img
            src="/assets/img6.avif"
            className="w-full h-96 object-cover"
            alt="EduVerse Banner"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
            <h2 className="text-4xl font-bold mb-2">Welcome to EduVerse</h2>
            <p className="text-xl mb-6">
              Technology, Development, and Learning Resources
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p>© 2023–2025 EduVerse, Inc. All rights reserved.</p>
          <a href="#" className="text-blue-400 hover:text-blue-300">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
};

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Carousel />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* First Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <img
                src="/assets/img2.avif"
                className="w-full h-48 object-cover"
                alt="Course"
              />
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold mb-2">
                  Data Structures & Algorithms
                </h3>
                <p className="text-gray-600">
                  Master the fundamentals of DSA with practical exercises and
                  real-world examples.
                </p>
              </div>
              <div className="px-6 pb-6 flex justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                  Explore
                </button>
              </div>
            </div>

            {/* Second Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <img
                src="/assets/img3.avif"
                className="w-full h-48 object-cover"
                alt="Course"
              />
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold mb-2">
                  Full Stack Development
                </h3>
                <p className="text-gray-600">
                  Learn end-to-end web development with modern frameworks and
                  best practices.
                </p>
              </div>
              <div className="px-6 pb-6 flex justify-center">
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                  Explore
                </button>
              </div>
            </div>

            {/* Third Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <img
                src="/assets/frontend.avif"
                className="w-full h-48 object-cover"
                alt="Course"
              />
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold mb-2">
                  AI & Machine Learning
                </h3>
                <p className="text-gray-600">
                  Discover the power of AI with hands-on projects and
                  comprehensive tutorials.
                </p>
              </div>
              <div className="px-6 pb-6 flex justify-center">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Login />
      <Signup />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Main;
