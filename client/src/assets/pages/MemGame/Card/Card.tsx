import styles from "./Card.module.css";
import { CardType } from "../../../types/CardType";

const Card = ({
    card,
    handleChoice,
    flipped,
    disabled,
}: {
    card: CardType;
    handleChoice: (card: CardType) => void;
    flipped: boolean;
    disabled: boolean;
}) => {
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);
        }
    };

    return (
        <article className={styles.card}>
            <div className={flipped ? styles.flipped : ""}>
                <div className={styles.front}>
                    <h2>{card.value}</h2>
                </div>
                <div className={styles.back} tabIndex={0} onClick={handleClick} onKeyUp={(event) => {event.key === 'Enter' && handleClick()}}>
                    <img src="/images/elmo_head.svg" alt="cover" />
                </div>
            </div>
        </article>
    );
};

export default Card;
