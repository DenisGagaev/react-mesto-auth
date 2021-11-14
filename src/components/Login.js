import React from "react";

export default function Login({ onLogin }) {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!password || !email) {
      return;
    }
    onLogin({ email, password })
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h1 className="login__title">Вход</h1>
      <input autoComplete="on" className="login__email-input" placeholder="Email" id="email" name="email" type="email" value={email} onChange={handleChangeEmail} minLength="2" maxLength="40" required />
      <input autoComplete="on" className="login__password-input" placeholder="Пароль" id="password" name="password" type="password" value={password} onChange={handleChangePassword} minLength="2" maxLength="40" required />
      <button className="login__button" type="submit">Войти</button>
    </form>
  )
}