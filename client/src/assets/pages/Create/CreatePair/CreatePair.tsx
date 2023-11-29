import { useState } from 'react';
import styles from './CreatePair.module.css';

type CreatePairProps = {
    id: number,
    valueOne: number | string,
    valueTwo: number | string,
    onDelete: (index: number) => void,
    onChange: (index: number, valueOne: number | string, valueTwo: number | string) => void,
}

const CreatePair = ({ id, valueOne, valueTwo, onDelete, onChange }: CreatePairProps) => {
    const [values, setValues] = useState({ valueOne: valueOne, valueTwo: valueTwo });

    const handleDelete = () => {
        onDelete(id);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setValues(prevValues => ({
            ...prevValues,
            [name === `valOne${id}` ? 'valueOne' : 'valueTwo']: value,
        }));
    };

    const handleBlur = () => {
        onChange(id, values.valueOne, values.valueTwo);
    }

    return (
        <article className={styles.createPairContainer}>
            <input
            type='text'
            name={`valOne${id}`}
            value={values.valueOne}
            placeholder='Pair value one'
            onChange={handleChange}
            onBlur={handleBlur}
            />
            <input
            type='text'
            name={`valTwo${id}`}
            value={values.valueTwo}
            placeholder='Pair value two'
            onChange={handleChange}
            onBlur={handleBlur}
            />
            <button type='button' onClick={handleDelete}><img src='/icons/overig/delete_icon.svg' alt='Delete icon' /></button>
        </article>
    );
}

export default CreatePair;