import styles from './SettingsModal.module.css';
import ReactDOM from 'react-dom';
import { useRef, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDeleteUser from '../../../hooks/useDeleteUser';

function SettingsModal({ onDeleteClick }: { onDeleteClick: () => void }) {
    const [error, setError] = useState({ isError: false, message: '' });

    const navigate = useNavigate();
    const deleteUser = useDeleteUser();

    const portalElement = document.getElementById('portal')!;
    const modalRef = useRef<HTMLDivElement>(null);

    const handleBackdropClick = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalRef.current && event.target === event.currentTarget) {
            onDeleteClick();
        }
    }, [onDeleteClick]);

    const handleDelete = async () => {
        try {
            const activeUser = await JSON.parse(sessionStorage.getItem('user')!);
            await deleteUser(activeUser.id);

            setError({ isError: false, message: 'Successfully deleted your account' });
            sessionStorage.removeItem('user');

            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            setError({ isError: true, message: 'Deleting account went wrong. Try again' });
        }
    };

    return ReactDOM.createPortal(
        <div className={styles.backdrop} onClick={handleBackdropClick}>
            <div ref={modalRef} className={styles.modal}>
                <h1>Do you really want to delete your account?</h1>
                {error && <p>{error.message}</p>}
                <div>
                    <button className='btn' onClick={handleDelete}>Yes</button>
                    <button className='btn' onClick={onDeleteClick}>No</button>
                </div>
            </div>
        </div>,
        portalElement
    );
}

export default SettingsModal;