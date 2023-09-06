/* eslint-disable no-useless-catch */
const API_URL = "http://localhost:3000/api";

async function RegisterPerson(UserObj) {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: UserObj.name,
        email: UserObj.email,
        password: UserObj.password,
        address: "address"
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
