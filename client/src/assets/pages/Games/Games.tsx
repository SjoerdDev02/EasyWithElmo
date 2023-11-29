import styles from './Games.module.css';
import { GameType } from '../../types/GameType';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import UserLayout from "../../layouts/UserLayout/UserLayout";
import GameItem from './GameItem/GameItem';
import useGetAllGames from '../../hooks/useGetAllGames';
import useDeleteGame from '../../hooks/useDeleteGame';

const Games = () => {
    const [games, setGames] = useState<GameType[]>([]);
    const user = JSON.parse(sessionStorage.getItem('user')!);

    const getAllGames = useGetAllGames();
    const deleteGame = useDeleteGame();
    const navigate = useNavigate();

    const backgroundImages = {
        phone: '/backgrounds/games/games-phone-bg.jpg',
        desktop: '/backgrounds/games/games-phone-bg.jpg',
    }

    useEffect(() => {
        fetchGames();
    }, [user.id]);

    const fetchGames = async () => {
        const fetchedGames = await getAllGames(user.id);
        setGames(fetchedGames);
    }

    const handlePlayGame = (id: number, title: string) => {
        navigate('/memory', { state: { id: id, title: title } });
    }

    const handleChangeGame = (id: number, title: string) => {
        navigate('/create', { state: { id: id, title: title } });
    }

    const handleDeleteGame = async (id: number) => {
        await deleteGame(id);
        fetchGames();
    }

    return (
        <UserLayout background={backgroundImages}>
            <section className={styles.gamesContainer}>
                <header>
                    <h1>{user.name}'s games</h1>
                    <button type='button' onClick={() => navigate('/create')}>Create New Game</button>
                </header>
                <table>
                <tbody>
                    <tr className={styles.tableHeader}>
                        <td><h2>Name</h2></td>
                        <td><h2>Created At</h2></td>
                        <td></td>
                    </tr>
                    {games.length > 0 ? games.map((game, index) => (
                        <GameItem key={index} id={game.id} title={game.title} createdAt={game.created_at} onPlay={() => handlePlayGame(game.id, game.title)} onChange={() => handleChangeGame(game.id, game.title)} onDelete={() => handleDeleteGame(game.id)} />
                    ))
                    : <tr><td colSpan={3}><h3>You haven't made any games yet</h3></td></tr>}
                </tbody>
                </table>
            </section>
        </UserLayout>
    );
}

export default Games;