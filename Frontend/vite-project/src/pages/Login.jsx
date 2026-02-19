import React, { useState } from 'react';
import './Login.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      navigate("/"); // ✅ Already logged in → go to home
    }
  }, []);

  return (
    <div> {/* your login UI here */} </div>
  );
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   if (!validateForm()) {
  //     return;
  //   }

  //   setIsLoading(true);
    
  //   try {
  //     // Simulate API call
  //     await new Promise(resolve => setTimeout(resolve, 1500));
      
  //     // Handle successful login here
  //     console.log('Login successful:', formData);
      
  //     // You can redirect here or update app state
  //     // navigate('/dashboard');
      
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //     setErrors({ general: 'Login failed. Please try again.' });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  


  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsLoading(true);

  try {
    // Send login request to backend
  
//http://localhost:8989/api/user/login
// https://smart-care-v04m.onrender.com/api/user/login
    const response = await fetch("http://localhost:8989/api/user/login" , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // ✅ important for cookies
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      console.log("Login successful:", data);

      // ✅ Save token locally if you need frontend auth checks
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userName", data.user.firstName);

      alert("Login successful!");
      window.location.href = "/"; // redirect after login
    } else {
      setErrors({
        general: data.message || "Invalid credentials. Please try again.",
      });
    }
  } catch (error) {
    console.error("Login failed:", error);
    setErrors({ general: "Login failed. Please try again later." });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {errors.general && (
            <div className="error-message general-error">
              {errors.general}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
              autoComplete="email"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Remember me
            </label>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner">
                <div className="spinner"></div>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{' '}
            <a href="/signup" className="signup-link">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;