import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';
import Logo from '../components/logo';
import lock from '../../public/asset/icons/lock.svg';

export const Route = createFileRoute('/forgotpassword')({
  component: () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleResetPassword = async (e) => {
      e.preventDefault();

      try {
        const response = await axios.post('http://localhost:5000/api/generateOTP', { email });

        if (response.status === 201 && response.data.msg === "A reset password code is sent to your email!") {
          setMessage(response.data.msg);
          setTimeout(() => {
            window.location.href = '/otp';
          }, 3000);
        } else {
          setError("Failed to send reset password instructions. Please try again.");
        }
      } catch (error) {
        console.error('Error:', error);
        setError("Failed to send reset password instructions. Please try again.");
      }
    };

    return (
      <div>
        <Logo />
        <div className='flex item-center justify-center pt-56'>
          <div className='w-[400px] h-[320px] flex items-center justify-center flex-col p-0'>
            <img src={lock} alt='Lock Icon' />
            <h1 className='text-3xl font-raleway pb-2 pt-8'>Forgot Password</h1>
            <p className='text-gray-400 text-sm w-56 text-center'>
              No worries, we’ll send you reset password instructions.
            </p>
            <form className='flex flex-col gap-6 w-full pt-8'>
              <input
                type='email'
                placeholder='Enter Your email'
                className='w-full placeholder:text-xs py-2 px-3 placeholder:text-gray-400 text-sm border h-10 rounded-md border-gray-600'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className='bg-slate-100 text-gray-400 text-xs rounded-md w-full h-10'
                onClick={handleResetPassword}
              >
                Reset Password
              </button>
            </form>
            {message && <p>{message}</p>}
            {error && <p className="text-red-500">{error}</p>}
            <a className='text-gray-400 text-xs pt-3' href='/login'>
              Back to Login
            </a>
          </div>
        </div>
      </div>
    );
  },
});
