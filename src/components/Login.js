import React, { useState } from "react";
// import { useHistory } from 'react-router-dom';

export default function Login({ onLogin }) {
  const initialData = {
    email: '',
    password: '',
  }

  const [profileData, setProfileData] = useState(initialData);
  // const [message, setMessage] = useState('');
  // const history = useHistory();

  // useEffect(() => {
  //   if (localStorage.getItem('jwt')) {
  //     history.push('/');
  //   }
  // }, [history])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfileData(profileData => ({
      ...profileData,
      [name]: value
    }));
  };

  // const resetForm = () => {
  //   setProfileData(initialData);
  //   setMessage('');
  // }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!profileData.password || !profileData.email) {
      return;
    }

    onLogin(profileData)
    // .then(resetForm)
    // .then(() => history.push('/cards'))
    // .catch(err => setMessage(err.message || 'Что-то пошло не так'))
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h1 className="login__title">Вход</h1>
      <input className="login__email-input" placeholder="Email" id="email" name="email" type="email" value={profileData.email} onChange={handleChange} minLength="2" maxLength="40" required />
      <input className="login__password-input" placeholder="Пароль" id="password" name="password" type="password" value={profileData.password} onChange={handleChange} minLength="2" maxLength="40" required />
      <button className="login__button" type="submit">Войти</button>
    </form>
  )
}