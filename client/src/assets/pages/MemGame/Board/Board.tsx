import styles from "./Board.module.css";
import { CardType } from "../../../types/CardType";
import { useState, useEffect } from "react";
import Card from "../Card/Card";
import { GamePairType } from "../../../types/GamePairType";

const Board = ({ pairs, onTurn, onModal }: { pairs: GamePairType[], onTurn: () => void, onModal: () => void }) => {
    const [cards, setCards] = useState<CardType[]>([]);
    const [choiceOne, setChoiceOne] = useState<CardType | null>(null);
    const [choiceTwo, setChoiceTwo] = useState<CardType | null>(null);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        shuffleCards();
    }, []);

    const shuffleCards = () => {
        const shuffledCards: CardType[] = [
            ...pairs.map((card) => ({
              value: card.valueOne,
              matchId: card.matchId,
              id: Math.random(),
              matched: card.matched,
            })),
            ...pairs.map((card) => ({
              value: card.valueTwo,
              matchId: card.matchId,
              id: Math.random(),
              matched: card.matched,
            })),
        ].sort(() => Math.random() - 0.5);

        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffledCards);
    };

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);

            if (choiceOne.matchId === choiceTwo.matchId) {
                setCards((prevCards) => {
                  return prevCards.map((card) => {
                    if (card.matchId === choiceOne.matchId) {
                      return { ...card, matched: true };
                    } else {
                      return card;
                    }
                  });
                });
                resetTurn();
            } else {
                setTimeout(() => resetTurn(), 1000);
            }
        }
    }, [choiceOne, choiceTwo]);

    const handleChoice = (card: CardType) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };

    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setDisabled(false);
        onTurn();
        cards.filter((card) => card.matched === false).length <= 2 && onModal();
    };

    return (
        <>
            <main className={styles.board}>
                <div>
                  {cards.map((card) => (
                    <Card
                      key={card.id}
                      card={card}
                      handleChoice={handleChoice}
                      flipped={card === choiceOne || card === choiceTwo || card.matched}
                      disabled={disabled}
                    />
                  ))}
                </div>
            </main>
            <div className={styles.brownEdge}></div>
            <div className={styles.boardShadow}></div>
        </>
    );
};

export default Board;