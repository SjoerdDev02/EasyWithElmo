import styles from './Home.module.css';
import { NavLink } from 'react-router-dom';
import MainLayout from "../../layouts/MainLayout/MainLayout";

const Home = () => {
    return (
        <MainLayout>
            <section className={styles.homeContainer}>
                <h1>How It Works</h1>
                <div className={styles.cards}>
                    <article>
                        <img src='/images/create_preview.png' alt='Preview of create page' />
                        <img src='/icons/overig/create_icon_white.svg' alt='Create icon' />
                        <h3>Create games in minutes</h3>
                    </article>
                    <article>
                        <img src='/images/games_preview.png' alt='Preview of games page' />
                        <img src='/icons/overig/choose_icon_white.svg' alt='Choose icon' />
                        <h3>Choose your favourite game</h3>
                    </article>
                    <article>
                        <img src='/images/play_preview.png' alt='Preview of the game' />
                        <img src='/icons/overig/games_icon_white.svg' alt='Play icon' />
                        <h3>Play your self-made game</h3>
                    </article>
                </div>
                <NavLink to='/register' className='btn'>Start Today</NavLink>
            </section>
        </MainLayout>
    );
}

export default Home;