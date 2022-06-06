import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useUserContext } from '../context/user_context';
import { useToggleContext } from '../context/toggle_context';
import { Loading } from './';

const Profile = () => {
  const {
    user,
    userEmail,
    deleteUser,
    updateUserDetails,
    isLoading,
    errorMsg,
    updateUserPassword,
  } = useUserContext();

  const { changePass, toggleChangePass, toggleDeleteModule, deleteModuleOpen } =
    useToggleContext();

  const [user_name, setUsername] = useState(user.name);
  const [email, setEmail] = useState(userEmail);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isPasswordSuccess, setIsPasswordSuccess] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isUserSuccess, setIsUserSuccess] = useState(false);
  const [isUserError, setIsUserError] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [isDeleteError, setIsDeleteError] = useState(false);

  let navigate = useNavigate();

  const setAllFalse = () => {
    setIsPasswordSuccess(false);
    setIsUserSuccess(false);
    setIsPasswordError(false);
    setIsUserError(false);
    setIsDeleteError(false);
    setIsDeleteSuccess(false);
  };

  const handleChange = (e) => {
    setAllFalse();
    let name = e.target.name;
    if (name === 'user_name') {
      setUsername(e.target.value);
    }
    if (name === 'email') {
      setEmail(e.target.value);
    }
    if (name === 'oldPassword') {
      setOldPassword(e.target.value);
    }
    if (name === 'newPassword') {
      setNewPassword(e.target.value);
    }
  };

  const handleTogglePassword = () => {
    setAllFalse();
    toggleChangePass();
  };

  const handleToggleModule = () => {
    setAllFalse();
    toggleDeleteModule();
  };

  const updateUser = async (e) => {
    setAllFalse();
    e.preventDefault();
    const user = await updateUserDetails(user_name, email);
    if (user) {
      setIsUserSuccess(true);
    } else {
      setIsUserError(true);
    }
  };

  const updatePassword = async (e) => {
    setAllFalse();
    e.preventDefault();
    const successMessage = await updateUserPassword(oldPassword, newPassword);
    if (successMessage) {
      setIsPasswordSuccess(true);
      toggleChangePass();
    } else {
      setIsPasswordError(true);
    }
  };

  const handleDelete = async () => {
    setAllFalse();
    const status = await deleteUser();
    if (status === 204) {
      setIsDeleteSuccess(true);
      toggleDeleteModule();
      navigate('/deleteUser');
    } else {
      setIsDeleteError(true);
      alert('Something went wrong. Click to be redirected to home page.');
      toggleDeleteModule();
      navigate('/');
    }
  };

  return (
    <Wrapper>
      <div className={deleteModuleOpen ? 'overlay show' : 'overlay'}></div>
      <h2>Profile info</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='section-container'>
          {isUserSuccess && (
            <h5 className='success-details'>Details updated!</h5>
          )}
          {isUserError && <h5 className='error-details'>{errorMsg}</h5>}
          <form method='put' className='user-info-form' onSubmit={updateUser}>
            <div className='row'>
              <label htmlFor='user_name'>Username</label>
              <input
                type='text'
                id='username'
                name='user_name'
                value={user_name}
                className='form-input'
                required
                onChange={handleChange}
              />
            </div>
            <div className='row'>
              <label htmlFor='user_name'>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                className='form-input'
                value={email}
                required
                onChange={handleChange}
              />
            </div>
            <button type='submit' className='form-btn' disabled={isLoading}>
              Save changes
            </button>
          </form>

          <button
            type='button'
            className='profile-btns'
            onClick={handleTogglePassword}
          >
            Change password
          </button>
          {isPasswordSuccess && (
            <h5 className='success-pass'>Password updated!</h5>
          )}
          {isPasswordError && <h5 className='error-pass'>{errorMsg}</h5>}
          {changePass && (
            <form
              action=''
              method='put'
              className='password-form'
              onSubmit={updatePassword}
            >
              <div className='row'>
                <input
                  type='password'
                  id='oldPassword'
                  name='oldPassword'
                  placeholder='Old password'
                  className='form-input'
                  required
                  onChange={handleChange}
                />
              </div>
              <div className='row'>
                <input
                  type='password'
                  id='newPassword'
                  name='newPassword'
                  placeholder='New password'
                  className='form-input'
                  required
                  onChange={handleChange}
                />
              </div>

              <button type='submit' className='form-btn' disabled={isLoading}>
                Save
              </button>
            </form>
          )}

          <button
            type='button'
            className='profile-btns'
            onClick={handleToggleModule}
          >
            Delete user
          </button>
          {deleteModuleOpen && (
            <div className='delete-module'>
              <>
                <h4>Delete {user.name}'s profile?</h4>
                <div className='delete-row'>
                  <button type='button' onClick={handleDelete}>
                    Yes
                  </button>
                  <button type='button' onClick={handleToggleModule}>
                    No
                  </button>
                </div>
              </>
            </div>
          )}
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  margin: 0;

  .overlay {
    position: fixed;
    display: none;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
    z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  }

  .show {
    display: block;
  }

  .section-container {
    max-width: 776px;
    margin: 0 auto;
    padding: 2rem 4rem;
  }
  h2 {
    text-align: center;
  }
  button {
    cursor: pointer;
  }
  .row {
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
  }
  .delete-row {
    display: flex;
    justify-content: space-evenly;
    margin: 1rem 0;
  }

  label,
  button {
    font-weight: 700;
  }

  h4,
  p {
    display: inline-block;
  }

  .form-input {
    width: 250px;
    padding: 0.5rem;
    background: #f7f9fa;
    border-radius: 5px;
    border-color: transparent;
  }

  .form-btn {
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: #252525;
    color: #e5ecd5;
    border-radius: 5px;
    font-weight: 400;
    cursor: pointer;
    display: block;
    margin: 4rem auto;
  }
  .form-btn:disabled {
    cursor: not-allowed;
  }

  .password-form .form-btn {
    margin: 2rem 0;
  }

  .profile-btns {
    display: block;
    margin: 1rem 0;
    background: none;
    border: none;
  }

  .delete-module {
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    background: #ffffff;
    transform: translate(50%, 50%);
    padding: 2rem 0;
    margin: 0 auto;
    width: 50vw;
    border: 4px solid #9e2a2b;
    border-radius: 5px;
    h4 {
      font-size: 1.25rem;
      display: block;
      text-align: center;
      margin-bottom: 3rem;
    }
    button {
      font-size: 1rem;
      padding: 0.5rem 0.75rem;
      background: #252525;
      color: #e5ecd5;
      border: transparent;
      border-radius: 5px;
      cursor: pointer;
      display: block;
    }
  }

  .loading {
    margin: 0 auto;
  }

  .success-pass {
    color: #70e000;
  }
  .error-pass {
    color: #9e2a2b;
  }
  .success-details {
    color: #70e000;
    text-align: center;
  }
  .error-details {
    color: #9e2a2b;
    text-align: center;
  }
`;

export default Profile;
