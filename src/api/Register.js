/* eslint-disable no-useless-catch */
const API_URL = "http://localhost:3000/api";

async function RegisterPerson(UserObj) {
  try {
    const response = await fetch(`${API_URL}/users/Register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: UserObj.username,
        email: UserObj.email,
        password: UserObj.password,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
}

export {RegisterPerson};
