/* eslint-disable no-useless-catch */
const API_URL = "http://localhost:3000/api";


async function LoginPerson(UserObj) {
  try {
    const response = await fetch(`${API_URL}/users/Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: UserObj.email,
        password: UserObj.password,
      }),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}

export {LoginPerson};