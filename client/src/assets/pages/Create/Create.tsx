import styles from './Create.module.css';
import { useState, useEffect } from 'react';
import UserLayout from '../../layouts/UserLayout/UserLayout';
import CreatePair from './CreatePair/CreatePair';
import { useLocation, useNavigate } from 'react-router';
import { PairType } from '../../types/PairType';
import usePostGame from '../../hooks/usePostGame';
import useGetGame from '../../hooks/useGetGame';
import useDeleteGamePairs from '../../hooks/useDeleteGamePairs';
import usePostGamePairs from '../../hooks/usePostGamePairs';
import usePutGame from '../../hooks/usePutGame';

const Create = () => {
    const [editMode, setEditMode] = useState<{ edit: boolean, game_id: null | number, title: null | string }>({ edit: false, game_id: null, title: null });
    const [title, setTitle] = useState('');
    const [pairs, setPairs] = useState<PairType[]>([]);
    const [error, setError] = useState<null | string>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const postGame = usePostGame();
    const postGamePairs = usePostGamePairs();
    const getGame = useGetGame();
    const deleteGamePairs = useDeleteGamePairs();
    const putGame = usePutGame();

    const backgroundImages = {
        phone: '/backgrounds/create/create-phone-bg.jpg',
        desktop: '/backgrounds/create/create-phone-bg.jpg',
    }

    useEffect(() => {
        if (location.state) {
            const fetchGame = async () => {
                setEditMode({ edit: true, game_id: location.state.id, title: location.state.title });
                setTitle(location.state.title);

                const data = await getGame(location.state.id);
                const pairsArr = await data.map((dataPair: { id: number, game_id: number, value_one: string, value_two: string }) => ({
                    valueOne: dataPair.value_one,
                    valueTwo: dataPair.value_two
                }));                  
                setPairs(pairsArr);

            }
    
            fetchGame();
        } else {
            setPairs([{ valueOne: '', valueTwo: '' }]);
        }
    }, [location.state]);    

    const handleAddPair = () => {
        setPairs((prevPairs) => [...prevPairs, { valueOne: '', valueTwo: '' }]);
    }

    const handleDeletePair = (index: number) => {
        setPairs((prevPairs) => prevPairs.filter((pair, i) => i !== index));
    }

    const handleChangePair = (index: number, valueOne: number | string, valueTwo: number | string) => {
        setPairs((prevPairs) => {
            const updatedPairs = [...prevPairs];
    
            updatedPairs[index] = {
                valueOne: valueOne,
                valueTwo: valueTwo,
            };
    
            return updatedPairs;
        });
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);

        if (!title) {
            setError('Game title is required');
            setIsSubmitting(false);
            return;
        }
        pairs.forEach((pair) => {
            if (!pair.valueOne || !pair.valueTwo) {
                setError('Complete the required input fields. Either provide the necessary information or remove the pair');
            }
            setIsSubmitting(false);
            return;
        });

        let response;

        if (editMode.edit) {
            response = await deleteGamePairs(editMode.game_id!);
            response = await postGamePairs(editMode.game_id!, pairs);
            response = await putGame(editMode.game_id!, title);
        } else {
            response = await postGame(title, pairs);
        }

        if (response) {
            setError(null);
            setPairs([{ valueOne: '', valueTwo: '' }]);

            navigate('/games');
        } else {
            setError('Something went wrong registering your account. Try again');
            return;
        }
    }

    return (
      <UserLayout background={backgroundImages}>
          <form className={styles.createForm} onSubmit={handleSubmit}>
            <header>
                <div className={styles.inputGroup}>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <input
                        type='text'
                        name='title'
                        value={title}
                        placeholder='Game title'
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <button type='button' onClick={handleAddPair}><img src='/icons/overig/add_icon.svg' alt='Add icon' /></button>
            </header>
            <article>
                {pairs.map((pair, index) => (
                    <CreatePair key={index} id={index} valueOne={pair.valueOne} valueTwo={pair.valueTwo} onDelete={() => handleDeletePair(index)} onChange={(index, valueOne, valueTwo) => handleChangePair(index, valueOne, valueTwo)} />
                ))}
            </article>
            <div>
                <button className='btn' type='submit' disabled={isSubmitting}>Save Game</button>
            </div>
          </form>
      </UserLayout>
    );
}

export default Create;