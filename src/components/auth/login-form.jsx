"use client";

import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useLogin } from "@/lib/api";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const loginMutation = useLogin();

  const [formData, setFormData] = useState({
    emailOrUsername: "", 
    email: "", 
    username: "", 
    password: "",
  });
  const [errors, setErrors] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Check if form is valid
  const isFormValid = () => {
    const newErrors = {};

    // Email/Username validation
    if (!formData.emailOrUsername) {
      newErrors.emailOrUsername = "Email or Username is required";
    } else if (formData.emailOrUsername.length < 3) {
      newErrors.emailOrUsername =
        "Email or Username must be at least 3 characters";
    }

    // Simple email check just for @ symbol
    if (formData.emailOrUsername.includes("@")) {
      if (!formData.emailOrUsername.includes(".")) {
        newErrors.emailOrUsername = "Please enter a valid email";
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Updated handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();

    if (name === "emailOrUsername") {
      // Update email and username based on whether @ is present
      if (trimmedValue.includes("@")) {
        setFormData((prev) => ({
          ...prev,
          emailOrUsername: trimmedValue,
          email: trimmedValue,
          username: "", 
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          emailOrUsername: trimmedValue,
          username: trimmedValue,
          email: "", 
        }));
      }
    } else {
      // Handle password field
      setFormData((prev) => ({
        ...prev,
        [name]: trimmedValue,
      }));
    }

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    setError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const response = await loginMutation.mutateAsync({
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });

      const { access_token } = response;

      if (access_token) {
        Cookies.set("TokenX", access_token, {
          sameSite: "Strict",
          secure: true,
          path: "/",
        });
        router.push("/profile");
      } else {
        throw new Error("Token not found in response");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormFilled =
    formData.emailOrUsername &&
    formData.password &&
    !errors.emailOrUsername &&
    !errors.password;

  return (
    <div className="w-full max-w-md">
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email or Username */}
        <div className="space-y-2">
          <input
            name="emailOrUsername"
            type="text"
            value={formData.emailOrUsername}
            onChange={handleChange}
            placeholder="Enter Username/Email"
            className="w-full p-4 bg-white/10 rounded-lg placeholder:font-medium font-medium text-sm placeholder:text-sm focus:outline-none text-white"
          />
          {errors.emailOrUsername && (
            <p className="text-sm text-red-500">{errors.emailOrUsername}</p>
          )}
        </div>

        {/* Password with Eye Toggle */}
        <div className="space-y-2 relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-4 bg-white/10 rounded-lg placeholder:font-medium font-medium text-sm placeholder:text-sm focus:outline-none text-white"
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute inset-y-2 top-0 right-4 flex items-center text-white cursor-pointer"
          >
            {!showPassword ? (
              <AiOutlineEyeInvisible size={20} color="#D6C59A" />
            ) : (
              <AiOutlineEye color="#D6C59A" size={20} />
            )}
          </span>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="relative">
          {isFormFilled && !isSubmitting && (
            <div className="absolute -bottom-2 inset-x-0 h-full rounded-xl bg-gradient-to-r from-teal-400 to-blue-500 opacity-50 blur-md transform translate-y-2" />
          )}
          <button
            type="submit"
            disabled={!isFormFilled || isSubmitting}
            className={`relative w-full py-3 px-6 rounded-xl transition-all duration-200 font-semibold text-lg
              ${
                isFormFilled
                  ? `bg-gradient-to-r from-teal-400 to-blue-500 text-white ${
                      isSubmitting
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:opacity-90"
                    }`
                  : "bg-gradient-to-r from-teal-400 to-blue-500 text-white opacity-50 cursor-not-allowed"
              }
            `}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </div>

        {/* Register Link */}
        <div className="text-center pt-8">
          <p className="text-sm text-white">
            No account?{" "}
            <Link href="/register" className="text-gold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
