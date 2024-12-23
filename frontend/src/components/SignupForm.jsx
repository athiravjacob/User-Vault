import React, { useState } from 'react';
import SignUp from '../pages/SignUp';
import toast from 'react-hot-toast'
import postSignup from '../api/auth'
import { useFormik } from 'formik';
import {signupSchema} from '../utility/validateForm'
function SignUpForm() {
    const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        },
        validationSchema: signupSchema,  // Apply Yup schema for validation
        onSubmit: async (values) => {
          try {
            // Handle form submission
            const response = await postSignup(values);
            toast.success(response.data.message || 'Signup successful!');
            formik.resetForm();  // Reset form fields after successful submission
          } catch (error) {
            toast.error(error.response?.data?.message || 'Signup failed');
          }
        },
      });

  return (
    <form className="space-y-6" onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="name" className="text-start block text-sm font-mono text-gray-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500 text-sm">{formik.errors.name}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className="text-start block text-sm font-mono text-gray-700">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="password" className="text-start block text-sm font-mono text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="text-start block text-sm font-mono text-gray-700">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
        ) : null}
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-mono text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign up
        </button>
      </div>

      <p className="mt-2 text-center text-sm text-gray-600">
        Already a user?{' '}
        <a href="#" className="font-medium text-green-600 hover:text-green-900">
          Sign in
        </a>
      </p>
    </form>);
}

export default SignUpForm;

