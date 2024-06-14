import React, { useState, ChangeEvent } from "react";
import axios from "axios";

const OTPInput: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
    }
  };

  const handleSubmit = async () => {
    console.log("Submitting OTP:", otp);
    try {
      const response = await axios.post("http://localhost:5000/api/verifyOTP", {
        code: otp,
      });

    

      if (response.status === 201) {
        setMessage(response.data.msg);
        
        // Redirect to the new password page
        console.log("Redirecting to /setNewPassword");
        window.location.href = "/setNewPassword";
       
      } else {
        setMessage(response.data.msg);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error verifying OTP");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-80 h-96 gap-4 flex flex-col">
        <h2 className="w-full h-10 font-ralewa font-bold text-3xl text-center bg-gradient-to-r text-transparent bg-clip-text from-teal-500 to-purple-900">
          Enter OTP
        </h2>
        <h5 className="w-full text-center font-urbanist font-normal text-base text-gray-400">
          Please enter the verification code we sent to your email
        </h5>
        <div className="flex justify-center mb-4 w-80">
          <input
            className="w-48 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            name="otp"
            maxLength={6}
            value={otp}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSubmit} className="bg-teal-500 text-white w-full text-sm px-4 py-2 rounded-lg">
          Verify OTP
        </button>
        {message && <p className="text-red-500 mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default OTPInput;
