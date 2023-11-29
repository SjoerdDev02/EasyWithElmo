import styles from './Login.module.css';
import { FieldValues, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import useGetUser from '../../hooks/useGetUser';

const Login = () => {
    const [error, setError] = useState({ isError: false, message: '' });
    const navigate = useNavigate();
    const getUser = useGetUser();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm();

    const onSubmit = async (data: FieldValues) => {
        try {
            const user = await getUser(data.email, data.password);
    
            if (user) {
                setError({ isError: false, message: 'Successfully logged in!' });
                sessionStorage.setItem('user', JSON.stringify(user));
                reset();
                navigate('/dashboard');
            } else {
                setError({ isError: true, message: 'Email and password combination is not correct. Try again' });
            }
        } catch (error) {
            setError({ isError: true, message: 'An error occurred. Please try again later.' });
        }
    };

    return (
        <MainLayout>
        <section className={styles.loginContainer}>
            <h1>Login</h1>
            {error && <p style={{ color: error.isError ? 'red' : 'green' }}>{error.message}</p>}
            <form role='form' onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
                {errors.email && <p style={{ color: 'red' }}>{String(errors.email.message)}</p>}
                <label htmlFor='registerEmail'>Email address</label>
                <input
                    type='email'
                    id='registerEmail'
                    placeholder='name@email.com'
                    {...register('email', {
                        required: 'Email is required',
                    })}
                />
            </div>
            {errors.password && <p style={{ color: 'red' }}>{String(errors.password.message)}</p>}
                <div className={styles.formGroup}>
                <label htmlFor='registerPassword'>Password</label>
                <input
                    type='password'
                    id='registerPassword'
                    placeholder='********'
                    {...register('password', {
                    required: 'Password is required',
                    minLength: {
                        value: 6,
                        message: 'Password must have at least 6 characters',
                    },
                    pattern: {
                        value: /^(?=.*[A-Z]).{6,}$/,
                        message: 'Password must contain at least one uppercase letter',
                    },
                    })}
                />
                </div>
            <button className='btn' type='submit' disabled={isSubmitting}>
                Login
            </button>
            </form>
            <p>Don't have an account? <NavLink to='/register'>Sign Up</NavLink></p>
        </section>
        <section className={styles.loginIntroductionContainer}>
            <h1>Craft and play custom games in a breeze</h1>
            <img style={{ height: '50vh' }} src='/images/full_elmo.svg' alt='Picture of elmo' />
        </section>
        </MainLayout>
    );
}

export default Login;