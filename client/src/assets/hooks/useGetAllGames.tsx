import axios from "axios";

const useGetAllGames = () => {
    const getAllGames = async (user_id: number) => {
        try {
            const gameResponse = await axios.get(
                'http://localhost:8888/server/get?type=games&table=games&amount=more', {
                    params: {
                        user_id: user_id,
                    }
                }
            );

            const data = await gameResponse.data;

            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return getAllGames;
}

export default useGetAllGames;