import styles from './UserLayout.module.css';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { DashboardIcon, CreateIcon, GamesIcon, SettingsIcon, LogoutIcon } from './NavigationIcons';

type BackgroundProps = {
    phone: string,
    desktop: string,
}

const destroySession = () => {
    sessionStorage.removeItem('user');
}

const UserLayout = ({ children, background }: { children: React.ReactNode, background: BackgroundProps }) => {
    const location = useLocation();

    const root = document.documentElement;
    root.style.setProperty('--backgroundImg-phone', `url(${background.phone})`);
    root.style.setProperty('--backgroundImg-desktop', `url(${background.desktop})`);

    return (
        <section className={styles.userLayoutContainer}>
            <nav>
                <NavLink to='/dashboard' className={`${styles.navItem} ${location.pathname === '/dashboard' && styles.active}`}><DashboardIcon /></NavLink>
                <NavLink to='/create' className={`${styles.navItem} ${location.pathname === '/create' && styles.active}`}><CreateIcon /></NavLink>
                <NavLink to='/games' className={`${styles.navItem} ${location.pathname === '/games' && styles.active}`}><GamesIcon /></NavLink>
                <NavLink to='/settings' className={`${styles.navItem} ${location.pathname === '/settings' && styles.active}`}><SettingsIcon /></NavLink>
                <NavLink to='/' onClick={destroySession} className={styles.navItem}><LogoutIcon /></NavLink>
            </nav>
            <main>{children}</main>
        </section>
    );
}

export default UserLayout;