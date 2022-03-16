import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import dillon from '../../assets/images/Dillon-Floral-sm.png';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';






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
                onChange={handleChange}
            ></input>
            <input
                class="blurLogin blurLoginFocus"
                placeholder='Password'
                type='password'
                id='password'
                onChange={handleChange}
            />
            <button class="blurLogin blurBtn" type="submit">Login</button>
            {error ? (
                <div>
                    <p className="error-text">The provided credentials are incorrect</p>
                </div>
            ) : null}
        </form>
        // >
        //     <div id="imgDiv">
        //     </div>
        //     <form class="center" onSubmit={handleFormSubmit}>
        //         <div class="logInput">
        //             {/* <label htmlFor="email">Email address:</label>
        //                 <input
        //                     placeholder="youremail@test.com"
        //                     name="email"
        //                     type="email"
        //                     id="email"
        //                     onChange={handleChange}
        //                 /> */}
        //             <TextField label="Email" variant="outlined" style={{ width: '80%' }} />

        //         </div>
        //         <div class="logInput">
        //             {/* <label htmlFor="pwd">Password:</label>
        //                 <input
        //                     placeholder="******"
        //                     name="password"
        //                     type="password"
        //                     id="pwd"
        //                     onChange={handleChange}
        //                 /> */}
        //             <TextField label="Password" variant="outlined" style={{ width: '80%' }} />

        //         </div>
        //         {error ? (
        //             <div>
        //                 <p className="error-text">The provided credentials are incorrect</p>
        //             </div>
        //         ) : null}
        //         <div class="logInput">
        //             <button class="blurBtn" type="submit">Login</button>
        //         </div>
        //     </form>
        // </Grid>
    );
}

export default Login;