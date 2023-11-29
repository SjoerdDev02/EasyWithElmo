import styles from './ScoreModal.module.css';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

function ScoreModal({ score }: { score: number | string }) {
    const navigate = useNavigate();

    const portalElement = document.getElementById('portal')!;

    return ReactDOM.createPortal(
        <div className={styles.backdrop}>
            <div className={styles.modal}>
                <h1>Good job! {score}</h1>
                <button className='btn' onClick={() => navigate('/games')}>Close Game</button>
            </div>
        </div>,
        portalElement
    );
}

export default ScoreModal;