import React, { useState, useContext } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import { Bounce, toast } from 'react-toastify';

export const SignUp = ({ setMode }) => {
  const [formData, setFormData] = useState({});
  const { UserSignUp } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (formData?.username && formData?.email && formData?.password && formData?.confirmPassword) {
        if (formData.password === formData.confirmPassword) {
          const status = await UserSignUp(formData);

          if (status === 200) {
            toast.success('SignUp successful', { position: 'top-center', autoClose: 3000, theme: 'light', transition: Bounce });
            setTimeout(() => setMode('signin'), 3000);
          }
        } else {
          toast.error("Passwords don't match", { position: 'top-center', autoClose: 5000, theme: 'light', transition: Bounce });
        }
      } else {
        toast.error('Please fill out the form', { position: 'top-center', autoClose: 5000, theme: 'light', transition: Bounce });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
          <div className='d-flex align-items-center justify-content-center mr-5'
    style={{width:"600px",height:"48vh"}}><h1 className='align-self-center'>"Create an account and never lose an idea."</h1></div>
      <div className="card p-4 shadow-lg" style={{ maxWidth: '500px', borderRadius: '20px' }}>
        <h2 className="text-center mb-4">Create Account</h2>

        <form onSubmit={handleSubmit}>
          {['username', 'email', 'password', 'confirmPassword'].map((field, idx) => (
            <div className="form-floating mb-3" key={idx}>
              <input
                type={field.includes('password') ? 'password' : 'text'}
                className="form-control focus-ring focus-ring-dark border border-dark"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                onChange={(e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }))}
                required
              />
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            </div>
          ))}

          <label className="form-label">Profile Picture</label>
          <input
            type="file"
            className="form-control mb-3"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                const fileReader = new FileReader();
                fileReader.onload = (event) => setFormData((prev) => ({ ...prev, ProfilePicture: event.target.result }));
                fileReader.readAsDataURL(e.target.files[0]);
              }
            }}
          />

          {formData.ProfilePicture && (
            <div className="text-center mb-3">
              <img
                src={formData.ProfilePicture}
                alt="Profile"
                className="rounded-circle"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
            </div>
          )}

          <button type="submit" className="btn btn-dark w-100 mb-3">Sign Up</button>

          <button
            type="button"
            className="btn btn-outline-secondary w-100"
            onClick={() => setMode('signin')}
          >
            Already have an account? Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
