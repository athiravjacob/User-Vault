import React, { useState } from 'react';
import toast from 'react-hot-toast'
import {postSignIn} from '../api/auth'
import { useFormik } from 'formik';
import { signinSchema } from '../utility/validateForm'
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { login } from '../redux/slices/authSlice';

function SignInForm({ changeForm }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
         
        },
        validationSchema: signinSchema,  
        onSubmit: async (values) => {
          try {
            const response = await postSignIn(values);
            const { token, user } = response.data
            console.log(response)
            if (user) {
              if (user.role === 'user') {
                dispatch(login({ token, user }))
                navigate("/user/profile")
              } else {
                dispatch(login({ token, user }))
                navigate("/admin/dashboard")
             }
              
              
            }
            
            toast.success(response.data.message || 'Signin  successful!');
            formik.resetForm();  // Reset form fields after successful submission
          } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || 'Signin failed');
          }
        },
      });

  return (
    <form className="space-y-6" onSubmit={formik.handleSubmit}>
      

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
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-mono text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign In
        </button>
      </div>

      <p className="mt-2 text-center text-sm text-gray-600">
        New to user vault?{' '}
        <span onClick={changeForm} className="font-medium text-green-600 hover:text-green-900 cursor-pointer">
          Sign up 
        </span>
      </p>
    </form>);
}

export default SignInForm;

