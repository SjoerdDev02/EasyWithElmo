import axios from "axios";

const usePutUser = () => {
    const putUser = async (id: number, name: string, email: string, password: string) => {
        try {
            const response = await axios.put(`http://localhost:8888/server/put?id=${id}&type=users`, {
                name: name,
                email: email,
                password: password,
            });

            return response.data;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return putUser;
}

export default usePutUser;