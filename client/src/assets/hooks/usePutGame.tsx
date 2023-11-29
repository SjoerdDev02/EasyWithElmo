import axios from "axios";

const usePutGame = () => {
    const putGame = async (id: number, title: string) => {
        try {
            const response = await axios.put(
                'http://localhost:8888/server/put?type=games', {
                    id: id,
                    title: title,
                }
            );

            return response.data;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return putGame;
}

export default usePutGame;