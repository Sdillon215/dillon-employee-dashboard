import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';
import dillon from '../../assets/images/Dillon-Floral-sm.png';







function Login(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await login({
                variables: { email: formState.email, password: formState.password },
            });
            const token = mutationResponse.data.login.token;
            Auth.login(token);
            console.log(token);
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <form class="formCard login-container" onSubmit={handleFormSubmit}>
            <img src={dillon} alt='dillon-logo' />
            <input
                class="blurLogin blurLoginFocus"
                placeholder='Email'
                type='email'
                id='email'
                name='email'
                value={formState.email}
                onChange={handleChange}
            ></input>
            <input
                class="blurLogin blurLoginFocus"
                placeholder='Password'
                type='password'
                id='password'
                name='password'
                value={formState.password}
                onChange={handleChange}
            />
            <button class="blurLogin blurBtn" type="submit">Login</button>
            {error ? (
                <div>
                    <p className="error-text">The provided credentials are incorrect</p>
                </div>
            ) : null}
        </form>
    );
}

export default Login;