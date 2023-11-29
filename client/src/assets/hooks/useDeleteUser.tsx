import axios from "axios";
import useGetAllGames from "./useGetAllGames";
import useDeleteGame from "./useDeleteGame";
import { GameType } from "../types/GameType";

const useDeleteUser = () => {
    const getAllGames = useGetAllGames();
    const deleteGame = useDeleteGame();

    const deleteUser = async (id: number) => {
        try {
            const gameIds = await getAllGames(id);

            const deletedGames = gameIds.map(async (gameId: GameType) => {
                await deleteGame(gameId.id);
            });

            await Promise.all(deletedGames);

            const response = await axios.delete(`http://localhost:8888/server/delete?id=${id}&type=users`);
            
            return response;
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    return deleteUser;
}

export default useDeleteUser;