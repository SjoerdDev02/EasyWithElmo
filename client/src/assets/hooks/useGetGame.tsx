import axios from "axios";

const useGetGame = () => {
    const getGame = async (id: number) => {
        try {
            const pairsResponse = await axios.get(
                'http://localhost:8888/server/get?type=games&table=game_pairs&amount=one', {
                    params: {
                        game_id: id,
                    }
                }
            );

            return pairsResponse.data;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return getGame;
}

export default useGetGame;