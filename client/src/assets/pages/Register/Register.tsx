import styles from './Register.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import { FieldValues, useForm } from 'react-hook-form';
import useGetUser from '../../hooks/useGetUser';
import usePostUser from '../../hooks/usePostUser';

const Register = () => {
    const [error, setError] = useState({ isError: false, message: '' });

    const navigate = useNavigate();
    const getUser = useGetUser();
    const postUser = usePostUser();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        reset,
    } = useForm();

    const onSubmit = async (data: FieldValues) => {
        const existingUser = await getUser(data.email, data.password);

        if (existingUser) {
            setError({ isError: true, message: `Almost there ${data.name}! E-mail already exists` });
            return;
        } else {
            const response = await postUser(data.name, data.email, data.password);

            if (response) {
                setError({ isError: false, message: `Congratulations ${data.name}! You successfully created an account` });
                reset();

                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setError({ isError: true, message: `Sorry ${data.name}! Something went wrong registering your account. Try again` });
                return;
            }
        }
    };

    return (
        <MainLayout>
        <section className={styles.registerContainer}>
            <h1>Register</h1>
            {error && <p style={{ color: error.isError ? 'red' : 'green' }}>{error.message}</p>}
            <form role='form' onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
                {errors.name && <p style={{ color: 'red' }}>{String(errors.name.message)}</p>}
                <label htmlFor='registerName'>Name</label>
                <input
                    type='text'
                    id='registerName'
                    placeholder='John'
                    {...register('name', {
                        required: 'Name is required',
                    })}
                />
            </div>
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
            {errors.confirmPassword && <p style={{ color: 'red' }}>{String(errors.confirmPassword.message)}</p>}
            <div className={styles.formBundle}>
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
                <div className={styles.formGroup}>
                <label htmlFor='registerConfirmPassword'>Password Confirm</label>
                <input
                    type='password'
                    id='registerConfirmPassword'
                    placeholder='********'
                    {...register('confirmPassword', {
                    required: 'Password confirmation is required',
                    validate: (value) =>
                        value === watch('password') || 'Passwords do not match',
                    })}
                />
                </div>
            </div>
            <button className='btn' type='submit' disabled={isSubmitting}>Create Account</button>
            </form>
            <p>Already have an account? <NavLink to='/login'>Login</NavLink></p>
        </section>
        <section className={styles.registerIntroductionContainer}>
            <h1>Craft and play custom games in a breeze</h1>
            <img style={{ height: '50vh' }} src='/images/full_elmo.svg' alt='Picture of elmo' />
        </section>
        </MainLayout>
    );
};

export default Register;