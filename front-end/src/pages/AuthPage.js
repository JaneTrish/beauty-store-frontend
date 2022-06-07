import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.svg';
import { useUserContext } from '../context/user_context';
import { Link } from 'react-router-dom';
import { useCartContext } from '../context/cart_context';

const AuthPage = () => {
  const { register, flipForms, loginUser, registerUser, errorMsg, isLoading } =
    useUserContext();
  const { createCart } = useCartContext();
  const [user_name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authSuccess, setAuthSuccess] = useState(false);

  let navigate = useNavigate();

  const handleClick = () => flipForms();

  const handleChange = (e) => {
    let name = e.target.name;
    if (name === 'user_name') {
      setUsername(e.target.value);
    }
    if (name === 'email') {
      setEmail(e.target.value);
    }
    if (name === 'password') {
      setPassword(e.target.value);
    }
  };

  const login = async (e, { email, password }) => {
    e.preventDefault();
    const user = await loginUser({ email, password });
    if (user) {
      setAuthSuccess(true);
      await createCart();
      navigate(-1);
      setAuthSuccess(false);
    }
  };

  const reg = async (e, { user_name, email, password }) => {
    e.preventDefault();
    const user = await registerUser({ user_name, email, password });
    if (user) {
      setAuthSuccess(true);
      await createCart();
      navigate(-1);
      setAuthSuccess(false);
    }
  };

  if (register) {
    return (
      <Wrapper className='section'>
        <div className='form-container'>
          <Link to='/'>
            <img src={logo} alt='beauty store logo' />
          </Link>
          {isLoading ? (
            <div className='loading'></div>
          ) : (
            <>
              <form
                method='post'
                className='auth-form'
                onSubmit={(e) => reg(e, { user_name, email, password })}
              >
                {errorMsg && <h5 className='error-msg'>{errorMsg}</h5>}
                {authSuccess && (
                  <h5 className='success-msg'>
                    Registration successful. Redirecting...
                  </h5>
                )}
                <div className='label-input'>
                  <label htmlFor='user_name'>Username </label>
                  <input
                    type='text'
                    id='user_name'
                    name='user_name'
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className='label-input'>
                  <label htmlFor='email'>Email </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className='label-input'>
                  <label htmlFor='password'>Password </label>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    required
                    onChange={handleChange}
                  />
                </div>
                <button
                  type='submit'
                  className='submit-btn'
                  disabled={isLoading}
                >
                  Sign Up
                </button>
              </form>
              <p>
                Already have an account?
                <button
                  type='button'
                  className='register-btn'
                  onClick={handleClick}
                >
                  Sign In
                </button>
              </p>
            </>
          )}
        </div>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper className='section'>
        <div className='form-container'>
          <Link to='/'>
            <img src={logo} alt='beauty store logo' />
          </Link>
          {isLoading ? (
            <div className='loading'></div>
          ) : (
            <>
              <form
                method='post'
                className='auth-form'
                onSubmit={(e) => login(e, { email, password })}
              >
                {errorMsg && <h5 className='error-msg'>{errorMsg}</h5>}
                {authSuccess && (
                  <h5 className='success-msg'>
                    Login successful. Redirecting...
                  </h5>
                )}
                <div className='label-input'>
                  <label htmlFor='email'>Email </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className='label-input'>
                  <label htmlFor='password'>Password </label>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    required
                    onChange={handleChange}
                  />
                </div>
                <button
                  type='submit'
                  className='submit-btn'
                  disabled={isLoading}
                >
                  Sign In
                </button>
              </form>
              <p>
                Don't have an account?
                <button
                  type='button'
                  className='register-btn'
                  onClick={handleClick}
                >
                  Sign Up
                </button>
              </p>
            </>
          )}
        </div>
      </Wrapper>
    );
  }
};

const Wrapper = styled.main`
  height: 100vh;
  width: 100%;

  .loading{
    margin: 4rem auto;
  }


  .form-container {
    width: 310px;
    height: auto;
    margin: 1rem auto;
    border: 2px solid;
    border-radius: 10px;
    background: #252525;


  .auth-form {
    margin-top: 2rem;
  }

  .label-input{ 
    width: 100%;
    margin: 1rem 2rem;  
  }

  p{
    color: #f7f9f1; 
    text-align: center;
  }

  .submit-btn {
    display: block;
    width: 100px;
    margin:   2.5rem auto;
    border: none;
    padding: 0.5rem;
    background: #d3dfb8;
    cursor: pointer;
    border-radius: 5px;
  }

  .submit-btn:disabled{
    cursor: not-allowed;
  }

  .register-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: #d3dfb8;
    margin-left: 0.5rem;
  }

  label {
    display: block;
    color: #f7f9f1;
  }

  input {
    display: block;
    background: #f7f9f1;
    width: 80%;
    height: 30px;
  }

  img {
    width: 115px;
    display: block;
    margin: 0 auto;
  }

  .error-msg{
    color: #bf0603;
    text-align:center;
  }

  .success-msg{
    color: #70e000;
    text-align: center;
  }
`;

export default AuthPage;
