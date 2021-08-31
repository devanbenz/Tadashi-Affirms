const LoginForm = ({handleLogin, username, password, handleName, handlePass}) => {
    return (
        <div className='login'>
            <form onSubmit={handleLogin}>
                <div><input className='login-input' type='text' value={username} onChange={handleName}></input></div>
                <div><input className='login-input' type='password' value={password} onChange={handlePass}></input></div>
                <button className='login-btn' type='submit'>log in</button>
            </form>
        </div>
    )
}

export default LoginForm