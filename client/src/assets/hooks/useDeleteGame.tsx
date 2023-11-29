import axios from "axios";
import useDeleteGamePairs from "./useDeleteGamePairs";

const useDeleteGame = () => {
    const deleteGamePairs = useDeleteGamePairs();

    const deleteGame = async (id: number) => {
        try {
            const pairsResponse = await deleteGamePairs(id);

            const gameResponse = await axios.delete(`http://localhost:8888/server/delete?id=${id}&type=games&table=games`);
            
            return { game: gameResponse.data, pairs: pairsResponse.data };
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    return deleteGame;
}

export default useDeleteGame;