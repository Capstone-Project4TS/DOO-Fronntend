import { createLazyFileRoute } from '@tanstack/react-router'
import OTPInput from '../components/OTPInput'
import { useEffect } from 'react';
import Logo from '../components/logo';

export const Route = createLazyFileRoute('/otp')({
  component: () => {
  

    return <div>
      <Logo/>
      <OTPInput />
    </div> ;
  }
});
