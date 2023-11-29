import styles from './GameItem.module.css';

type GameItemProps = {
    id: number,
    title: string,
    createdAt: string,
    onPlay: (id: number, title: string) => void,
    onChange: (id: number, title: string) => void,
    onDelete: (id: number) => void,
}

const GameItem = ({ id, title, createdAt, onPlay, onChange, onDelete }: GameItemProps) => {
    const handlePlay = () => {
        onPlay(id, title);
    }

    const handleDelete = () => {
        onDelete(id);
    }

    const handleChange = () => {
        onChange(id, title);
    }

    return (
        <tr className={styles.gameContainer}>
            <td><h2>{title}</h2></td>
            <td><h2>{createdAt.split(" ")[0]}</h2></td>
            <td><button className={styles.playBtn} onClick={handlePlay}>Play Game</button></td>
            <td><button className={styles.roundBtn} onClick={handleChange}><img src='/icons/overig/edit_icon.svg' alt='Edit icon' /></button></td>
            <td><button className={styles.roundBtn} onClick={handleDelete}><img src='/icons/overig/delete_icon.svg' alt='Delete icon' /></button></td>
        </tr>
    );
}

export default GameItem;