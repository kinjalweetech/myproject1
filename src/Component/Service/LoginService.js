import axios from "axios";

export async function userLogin({ body: body }) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_URL}/v1/auth/login`,
        body
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }