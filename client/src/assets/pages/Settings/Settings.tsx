import styles from './Settings.module.css';
import { FieldValues, useForm } from 'react-hook-form';
import { useState } from 'react';
import UserLayout from "../../layouts/UserLayout/UserLayout";
import SettingsModal from './SettingsModal/SettingsModal';
import PasswordForm from './PasswordForm/PasswordForm';
import usePutUser from '../../hooks/usePutUser';

const Settings = () => {
    const [error, setError] = useState({ isError: false, message: '' });
    const [showModal, setShowModal] = useState(false);

    const putUser = usePutUser();
    const user = JSON.parse(sessionStorage.getItem('user')!);

    const backgroundImages = {
        phone: '/backgrounds/settings/settings-phone-bg.jpg',
        desktop: '/backgrounds/settings/settings-desktop-bg.jpg',
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm();

    const handleDeleteModal = () => {
        setShowModal((prevValue) => !prevValue);
    }

    const onSubmit = async (data: FieldValues) => {
        try {
            await putUser(user.id, data.name, data.email, user.password);
            sessionStorage.setItem('user', JSON.stringify({ id: user.id, name: data.name, email: data.email, password: user.password }));

            setError({ isError: false, message: 'Changed your account settings successfull!' });
            reset();
        } catch (error) {
            setError({ isError: true, message: `Sorry ${user.name}! Changing your account settings went wrong. Try again` });
        }
    };

    return (
        <>
            <UserLayout background={backgroundImages}>
                <section className={styles.settingsContainer}>
                    <div className={styles.formContainer}>
                        <h1>Settings</h1>
                        {error && <p style={{ color: error.isError ? 'red' : 'green' }}>{error.message}</p>}
                        <form role='form' onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles.formGroup}>
                                {errors.name && <p style={{ color: 'red' }}>{String(errors.name.message)}</p>}
                                <label htmlFor='settingsName'>Name</label>
                                <input
                                    type='text'
                                    id='settingsName'
                                    placeholder='John'
                                    {...register('name', {
                                        required: 'Name is required',
                                    })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                {errors.email && <p style={{ color: 'red' }}>{String(errors.email.message)}</p>}
                                <label htmlFor='settingsEmail'>Email address</label>
                                <input
                                    type='email'
                                    id='settingsEmail'
                                    placeholder='name@email.com'
                                    {...register('email', {
                                        required: 'Email is required',
                                    })}
                                />
                            </div>
                            <button className='btn' type='submit' disabled={isSubmitting}>Submit Changes</button>
                        </form>
                        <PasswordForm />
                        <p>Do you want to delete your account? <span tabIndex={0} onClick={handleDeleteModal} onKeyUp={(event) => {event.key === 'Enter' && handleDeleteModal()}}>Delete</span></p>
                    </div>
                    <div className={styles.settingsIntroductionContainer}>
                        <h1>Craft and play custom games in a breeze</h1>
                        <img style={{ height: '50vh' }} src='/images/full_elmo.svg' alt='Picture of elmo' />
                    </div>
                </section>
            </UserLayout>
            {showModal && <SettingsModal onDeleteClick={handleDeleteModal} />}
        </>
    );
}

export default Settings;