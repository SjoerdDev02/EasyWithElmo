import axios from "axios";
import { PairType } from "../types/PairType";
import usePostGamePairs from "./usePostGamePairs";

const usePostGame = () => {
    const postGamePairs = usePostGamePairs();

    const postGame = async (title: string, values: PairType[]) => {
        try {
            const user = await JSON.parse(sessionStorage.getItem('user')!);

            const gameResponse = await axios.post(
                'http://localhost:8888/server/post?type=games&table=games',
                {
                  user_id: user.id,
                  title: title,
                }
            );

            const gameId = gameResponse.data.id;

            await postGamePairs(gameId, values);

            return 'Game successfully posted!';
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return postGame;
}

export default usePostGame;