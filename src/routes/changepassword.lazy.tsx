import { useState } from 'react';
import axios from 'axios';
import UserName from '../components/UserName';
import SideBar2 from '../components/SideBar2';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/changepassword')({
  component: () => {
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [isOldPasswordVisible, setIsOldPasswordVisible] = useState<boolean>(false);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState<boolean>(false);

    const validatePassword = (oldPassword: string, newPassword: string): string[] => {
      const errors: string[] = [];
      if (newPassword.length < 8) {
        errors.push('Minimum 8 characters');
      }
      if (!/[A-Z]/.test(newPassword)) {
        errors.push('At least one uppercase letter');
      }
      if (!/[a-z]/.test(newPassword)) {
        errors.push('At least one lowercase letter');
      }
      if (!/[0-9]/.test(newPassword)) {
        errors.push('At least one number');
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
        errors.push('At least one symbol');
      }
      if (oldPassword === newPassword) {
        errors.push('New password cannot be the same as the old password');
      }
      return errors;
    };

    const handleChangePassword = async () => {
      const errors = validatePassword(oldPassword, newPassword);
      setValidationErrors(errors);
      if (errors.length > 0) {
        return; // If there are validation errors, do not proceed
      }

      try {
        const response = await axios.put(
          'http://localhost:5000/api/change-password',
          { oldPassword, newPassword },
          {
            withCredentials: true, // Ensure cookies are sent with the request
          }
        );

        if (response.status === 201) {
          console.log(response.data.msg); // Log success message
          alert("Password changed successfully.");
        }
      } catch (error) {
        if (error.response) {
          console.error('Error:', error.response.data.message); // Handle errors returned by the server
        } else {
          console.error('Network error:', error);
        }
      }
    };

    const toggleOldPasswordVisibility = () => {
      setIsOldPasswordVisible((prevState) => !prevState);
    };

    const toggleNewPasswordVisibility = () => {
      setIsNewPasswordVisible((prevState) => !prevState);
    };

    return (
      <div>
        <UserName />
        <SideBar2 />
        <div className="flex item-center justify-center pt-56">
          <div className="w-[400px] h-[380px] flex items-center justify-center flex-col gap-4 p-0">
            <h1 className="text-3xl font-raleway bg-gradient-to-r text-transparent bg-clip-text from-teal-500 to-purple-900">
              Change Password
            </h1>
            <p className="text-gray-600 text-sm">Enter a new password for your account</p>
            <div className="relative w-full">
              <input
                type={isOldPasswordVisible ? 'text' : 'password'}
                placeholder="Old password"
                className="w-full placeholder:text-xs py-2 px-3 placeholder:text-gray-600 text-sm border h-12 rounded-md border-gray-600"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={toggleOldPasswordVisibility}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
              >
                <img 
                  src={isOldPasswordVisible ? "/asset/icons/visible.png" : "/asset/icons/not-visible.png"} 
                  alt={isOldPasswordVisible ? "Hide Password" : "Show Password"} 
                  className="w-5 h-5"
                />
              </button>
            </div>
            <div className="relative w-full">
              <input
                type={isNewPasswordVisible ? 'text' : 'password'}
                placeholder="Enter a new password"
                className="w-full placeholder:text-xs py-2 px-3 placeholder:text-gray-600 text-sm border rounded-md h-12 border-gray-600"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={toggleNewPasswordVisibility}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
              >
                <img 
                  src={isNewPasswordVisible ? "/asset/icons/visible.png" : "/asset/icons/not-visible.png"} 
                  alt={isNewPasswordVisible ? "Hide Password" : "Show Password"} 
                  className="w-5 h-5"
                />
              </button>
            </div>
            <div className='text-xs text-gray-400 text-left w-full pl-2 pr-8'>
              {validationErrors.length > 0 && (
                <ul className='list-disc list-inside'>
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
            </div>
            <button
              className="mt-2 bg-teal-500 rounded-md w-full h-12"
              onClick={handleChangePassword}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    );
  },
});
