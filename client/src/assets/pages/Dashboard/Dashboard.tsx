import styles from './Dashboard.module.css';
import { NavLink } from "react-router-dom";
import UserLayout from "../../layouts/UserLayout/UserLayout";

const Dashboard = () => {
    const backgroundImages = {
      phone: '/backgrounds/dashboard/dashboard-phone-bg.jpg',
      desktop: '/backgrounds/dashboard/dashboard-phone-bg.jpg',
    }

    const user = JSON.parse(sessionStorage.getItem('user')!);

    return (
        <UserLayout background={backgroundImages}>
            <h1 className={styles.dashboardTitle}>Hi {user.name}, would you like to explore a new game or check out your current game collection?</h1>
            <section className={styles.dashboardCardContainer}>
                <NavLink to='/create'>
                    <img src='/images/create_preview.png' alt='Preview of create page' />
                    <img src='/icons/overig/create_icon.svg' alt='Create icon' />
                    <h2>Create Game</h2>
                </NavLink>
                <NavLink to='/games'>
                    <img src='/images/games_preview.png' alt='Preview of games page' />
                    <img src='/icons/overig/games_icon.svg' alt='Games icon' />
                    <h2>Play Game</h2>
                </NavLink>
            </section>
        </UserLayout>
    );
}

export default Dashboard;