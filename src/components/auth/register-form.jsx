"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegister } from "@/lib/api";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { toast } from "sonner";

export default function RegisterForm() {
  const router = useRouter();
  const registerMutation = useRegister();

  // Form states
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  // Validate form inputs
  const isFormValid = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Username validation
    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    setError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const response = await registerMutation.mutateAsync({
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });

      console.log("Registration successful:", response);
      toast.success("Registration successful!");
      router.push("/login"); // Redirect to login page
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if form is filled
  const isFormFilled =
    formData.email &&
    formData.username &&
    formData.password &&
    formData.confirmPassword &&
    !errors.email &&
    !errors.username &&
    !errors.password &&
    !errors.confirmPassword;

  return (
    <div className="w-full max-w-md">
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="space-y-2">
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-4 bg-white/10 rounded-lg placeholder:font-medium font-medium text-sm placeholder:text-sm focus:outline-none text-white"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Username */}
        <div className="space-y-2">
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-4 bg-white/10 rounded-lg placeholder:font-medium font-medium text-sm placeholder:text-sm focus:outline-none text-white"
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username}</p>
          )}
        </div>

        {/* Password */}
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

        {/* Confirm Password */}
        <div className="space-y-2 relative">
          <input
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full p-4 bg-white/10 rounded-lg placeholder:font-medium font-medium text-sm placeholder:text-sm focus:outline-none text-white"
          />
           <span
            onClick={toggleConfirmPasswordVisibility}
            className="absolute inset-y-2 top-0 right-4 flex items-center text-white cursor-pointer"
          >
            {!showConfirmPassword ? (
              <AiOutlineEyeInvisible size={20} color="#D6C59A" />
            ) : (
              <AiOutlineEye color="#D6C59A" size={20} />
            )}
          </span>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword}</p>
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
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </div>

        {/* Login Link */}
        <div className="text-center pt-8">
          <p className="text-sm text-white">
            Already have an account?{" "}
            <Link href="/login" className="text-gold hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
