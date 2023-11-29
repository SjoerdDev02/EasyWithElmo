import styles from './PasswordForm.module.css';
import { useForm, FieldValues } from 'react-hook-form';
import { useState } from "react";
import usePutUser from '../../../hooks/usePutUser';

const PasswordForm = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isSucces, setIsSucces] = useState(false);

    const putUser = usePutUser();
    const user= JSON.parse(sessionStorage.getItem('user')!);

    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        watch,
        reset,
    } = useForm();

    async function onSubmit(data: FieldValues) {
        await putUser(user.id, user.name, user.email, data.newPassword);
        sessionStorage.setItem('user', JSON.stringify({ id: user.id, name: user.name, email: user.email, password: data.newPassword }));
        
        reset();

        setIsSucces(true);
        setTimeout(() => {
            setIsCollapsed(true);
        }, 2000);
    }

    const collapseForm = () => {
        if (isCollapsed) {
            setIsSucces(false);
        }
        setIsCollapsed((previousValue) => !previousValue);
    };

    return (
        <article className={styles.passwordFormContainer}>
            <header onClick={collapseForm}>
                <h3>Change password?</h3>
                <button><i>&#9662;</i></button>
            </header>
            {isSucces && <p>Changing password succeeded!</p>}
            {!isCollapsed && (
                <form role="form" onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.inputGroup}>
                        {errors.oldPassword && <p style={{ color: 'red' }}>{String(errors.oldPassword.message)}</p>}
                        <label htmlFor="oldPassword">Old password</label>
                        <input
                            type="password"
                            id="oldPassword"
                            placeholder="********"
                            {...register("oldPassword", {
                              required: "Old password is required",
                              validate: (value) =>
                                value === user.password || "Old password is wrong",
                            })}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        {errors.newPassword && <p style={{ color: 'red' }}>{String(errors.newPassword.message)}</p>}
                        <label htmlFor="newPassword">New password</label>
                        <input
                            type="password"
                            id="newPassword"
                            placeholder="********"
                            {...register("newPassword", {
                                required: "New password is required",
                                minLength: {
                                    value: 6,
                                    message: "New password must have at least 6 characters",
                                },
                                pattern: {
                                    value: /^(?=.*[A-Z]).{6,}$/,
                                    message:
                                        "New password must contain at least one uppercase letter",
                                },
                                validate: (value) =>
                                value !== watch("oldPassword") ||
                                "New password must be different",
                            })}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        {errors.confirmPassword && (
                            <p style={{ color: 'red' }}>{String(errors.confirmPassword.message)}</p>
                        )}
                        <label htmlFor="confirmPassword">Confirm new password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="********"
                            {...register("confirmPassword", {
                                required: "Password confirmation is required",
                                validate: (value) =>
                                    value === watch("newPassword") || "Passwords do not match",
                            })}
                        />
                    </div>
                    <button className='btn' disabled={isSubmitting}>Save Password</button>
                </form>
            )}
        </article>
    );
};

export default PasswordForm;