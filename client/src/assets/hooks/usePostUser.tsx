import axios from "axios";

const usePostUser = () => {
    const postUser = async (name: string, email: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:8888/server/post?type=users', {
                name: name,
                email: email,
                password: password,
            });

            return response.data;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return postUser;
}

export default usePostUser;