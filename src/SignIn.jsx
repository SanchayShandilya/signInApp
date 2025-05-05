import React, { useState, useEffect } from 'react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordInput, setPasswordInput] = useState(null);
  const [emailInput, setEmailInput] = useState(null);
  const [signInButton, setSignInButton] = useState(null);

  // code to add focus on email
  useEffect(() => {
    if (emailInput) {
      emailInput.focus();
    }
  }, [emailInput]);

  useEffect(() => {
    const handleF11 = (e) => {
      if (e.key === 'F11') {
        e.preventDefault();
        emailInput?.focus();
      }
    };

    window.addEventListener('keydown', handleF11);
    return () => window.removeEventListener('keydown', handleF11);
  }, [emailInput]);

  useEffect(() => {
    const handleKey = (e) => {
      const isTab = e.key === 'Tab';
      const isF11 = e.key === 'F11';
      const isTyping = isTypingKey(e);
  
      if (!(isTab || isF11 || isTyping)) {
        e.preventDefault();
      }
    };
  
    const isTypingKey = (e) => {
      const tag = document.activeElement.tagName;
      const isInput = tag === 'INPUT' || tag === 'TEXTAREA';
  
      const allowedKeys = [
        'Backspace',
        'Delete',
        'Enter',
        ' ',
      ];
  
      const isPrintableChar = e.key.length === 1;
  
      return isInput && (isPrintableChar || allowedKeys.includes(e.key));
    };
  
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    const handleTabLoop = (e) => {
      if (e.key === 'Tab') {
        if (!e.shiftKey) {
          if (document.activeElement === emailInput) {
            e.preventDefault();
            signInButton?.focus();
          } 
          // else if (document.activeElement === passwordInput) {
          //   e.preventDefault();
          //   signInButton?.focus();
          // }
          else if (document.activeElement === signInButton) {
            e.preventDefault();
            emailInput?.focus();
          }
        } else {
          if (document.activeElement === emailInput) {
            e.preventDefault();
            signInButton?.focus();
          } else if (document.activeElement === signInButton) {
            e.preventDefault();
            emailInput?.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleTabLoop);
    return () => window.removeEventListener('keydown', handleTabLoop);
  }, [emailInput, signInButton]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;  
    }
    alert(`Email: ${email}\nPassword: ${password}`);
  };

  const isFormValid = email && password.length >= 8;

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit} className ="signin-form">
        <h2>Sign In</h2>
        <input
          ref={(input) => setEmailInput(input)}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          ref={(input) => setPasswordInput(input)} 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          tabIndex={-1}
        />
        <button 
          disabled={!isFormValid} 
          type="submit"
          ref={(btn) => setSignInButton(btn)}
         >Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
