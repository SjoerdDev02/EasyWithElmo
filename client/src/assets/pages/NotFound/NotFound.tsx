import styles from "./NotFound.module.css";
import { NavLink } from "react-router-dom";

const NotFound = () => {
    return (
        <main className={styles.notFound}>
            <section>
                <div>
                    <h1>EasyWithElmo</h1>
                    <h2>Page not found</h2>
                    <p>Sorry, we couldn't find the page you were looking for. Check your spelling and otherwise use the button to go to the Homepage</p>
                    <NavLink to='/' className='btn'>Go to the Homepage</NavLink>
                </div>
                <div>
                    <img style={{ width: '400px', height: '400px' }} src='/images/full_elmo.svg' alt='Image of Elmo' />
                </div>
            </section>
        </main>
    );
}

export default NotFound;