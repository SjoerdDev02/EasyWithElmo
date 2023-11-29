import styles from './MainLayout.module.css';
import { useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { NavLink } from "react-router-dom"

const MainLayout = ({ children }: { children: ReactNode }) => {
    const location = useLocation();

    return (
        <section className={styles.mainLayoutContainer}>
            <div className={styles.mainLayoutWrapper}>
                <nav className={styles.mainNavigation}>
                        <div className={styles.left} style={{ backgroundColor: location.pathname === '/login' || location.pathname === '/register' ? 'var(--yellow)' : 'transparent'}}>
                            <NavLink to='/'><h1>EasyWithElmo</h1></NavLink>
                        </div>
                        <div className={styles.right}>
                            <NavLink to='/login' className={`${styles.navItem} ${location.pathname === '/login' && styles.active}`}>Login</NavLink>
                            <NavLink to='/register' className={`${styles.navItem} ${location.pathname === '/register' && styles.active}`}>Register</NavLink>
                        </div>
                </nav>
                <main className={styles.mainLayout}>
                    {children}
                </main>
            </div>
        </section>
    );
}

export default MainLayout;