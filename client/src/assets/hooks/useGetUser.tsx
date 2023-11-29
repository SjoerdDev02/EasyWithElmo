import axios from "axios";

const useGetUser = () => {
    const getUser = async (email: string, password: string) => {
        try {
            const response = await axios.get('http://localhost:8888/server/get?type=users', {
                params: {
                    email: email,
                    password: password,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return getUser;
}

export default useGetUser;