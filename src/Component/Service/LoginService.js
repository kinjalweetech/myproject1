// import axios from "axios";

// export async function userLogin({ body: body }) {
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_LOCAL_URL}/auth/login`,
//         body
//       );
//       return response.data;
     
      
//     } catch (error) {
//       throw error;
//     }
//   }

import axios from "axios";

export async function userLogin(body) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/auth/login`, body);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Login failed. Please try again.";
    }
}
