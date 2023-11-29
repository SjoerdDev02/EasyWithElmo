import axios from "axios";
import { PairType } from "../types/PairType";

const usePostGamePairs = () => {
    const postGamePairs = async (game_id: number, values: PairType[]) => {
        try {
            const pairPromises = values.map(async (pair) => {
                try {
                    await axios.post('http://localhost:8888/server/post?type=games&table=game_pairs', {
                            game_id: game_id,
                            value_one: pair.valueOne,
                            value_two: pair.valueTwo,
                    });
                } catch (error) {
                    console.error('Error posting pair:', error);
                }
            });
    
            await Promise.all(pairPromises);
    
            return 'Game successfully posted!';
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return postGamePairs;
}

export default usePostGamePairs;