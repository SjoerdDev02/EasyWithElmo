import styles from "./MemGame.module.css";
import { GamePairType } from "../../types/GamePairType";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Board from "./Board/Board";
import useGetGame from "../../hooks/useGetGame";
import ScoreModal from "../../components/ScoreModal/ScoreModal";

const MemGame = () => {
    const [gamePairs, setGamePairs] = useState<GamePairType[]>();
    const [title, setTitle] = useState('');
    const [turns, setTurns] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const location = useLocation();
    const getGame = useGetGame();

    useEffect(() => {
        const fetchGamePairs = async () => {
          try {
            const { id, title } = await location.state;
            const data = await getGame(id);

            const pairPromises = data.map(async (pair: { value_one: number | string, value_two: number | string }, index: number) => {
                return { valueOne: pair.value_one, valueTwo: pair.value_two, matchId: index, matched: false };
            });

            const pairs = await Promise.all(pairPromises);

            setGamePairs(pairs);
            setTitle(title);
          } catch (error) {
              console.error('Error fetching game pairs:', error);
          }
        }

        fetchGamePairs();
    }, [location.state]);

    const handleTurn = () => {
        setTurns((prevAmount) => ++prevAmount);
    }

    const handleModal = () => {
        setShowModal(true);
    }

    return (
        <section className={styles.memGame}>
          <header role='banner'>
            <h1>Memory | {title}</h1>
            <h1>Turns: {turns}</h1>
          </header>
          {gamePairs && <Board pairs={gamePairs} onTurn={handleTurn} onModal={handleModal} />}
          {showModal && <ScoreModal score={`You needed ${turns} turns to complete the game.`} />}
        </section>
    );
};

export default MemGame;