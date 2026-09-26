import React, { useState, useContext } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SignIn = ({ setMode }) => {
  const [formData, setFormData] = useState({});
  const { Authdispatch, UserSignIn } = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      if (formData?.email && formData?.password) {
        const logindata = await UserSignIn(formData);

        if (logindata === 404) {
          toast.error('User does not exist', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          });
        } else if (logindata === 401) {
          toast.error('Wrong Password', {
            position: 'top-center',
            autoClose: 3000,
            theme: 'light',
            transition: Bounce,
          });
        }

        Authdispatch({
          type: 'SIGN_IN',
          payload: logindata.data,
        });

        if (logindata.status === 200) {
          toast.success('Sign In Successful', {
            position: 'top-center',
            autoClose: 3000,
            theme: 'light',
            transition: Bounce,
          });
          setTimeout(() => router.push('/pages/Home'), 3000);
        }
      } else {
        toast.warn('Please fill out the form', {
          position: 'top-center',
          autoClose: 3000,
          theme: 'light',
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error('Login Error:', error);
      toast.error('An error occurred. Please try again.', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'light',
        transition: Bounce,
      });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className='d-flex align-items-center justify-content-center mr-5'
    style={{width:"600px",height:"48vh"}}><h1 className='align-self-center'>"Your thoughts are here. Log in to access them."</h1></div>
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%', borderRadius: '20px' }}>
        <h2 className="text-center mb-4">Sign In</h2>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control focus-ring focus-ring-secondary border border-secondary"
            id="floatingEmail"
            placeholder="Email"
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            required
          />
          <label htmlFor="floatingEmail">Email</label>
        </div>

        <div className="form-floating mb-4">
          <input
            type="password"
            className="form-control focus-ring focus-ring-secondary border border-secondary"
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button
          className="btn btn-dark align-self-center"
          onClick={handleSubmit}
          style={{ borderRadius: '6px',width:"120px",height:"50px" }}
        >
          Sign In
        </button>

        <div className="text-center mt-3 ">
          <button
            className="btn btn-link link-body-emphasis link-offset-2 link-underline-opacity-0 link-underline-opacity-75-hover"
            onClick={() => setMode('signup')}
          >
            Don't have an account? Sign Up!
          </button>
        </div>
      </div>
    </div>
  );
};
