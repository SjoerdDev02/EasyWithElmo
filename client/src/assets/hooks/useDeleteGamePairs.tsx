import axios from "axios";

const useDeleteGamePairs = () => {
    const deleteGamePairs = async (game_id: number) => {
        try {
            const response = await axios.delete(`http://localhost:8888/server/delete?game_id=${game_id}&type=games&table=game_pairs`);
            
            return response.data;
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    return deleteGamePairs;
}

export default useDeleteGamePairs;