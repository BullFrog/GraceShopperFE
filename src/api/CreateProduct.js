/* eslint-disable no-useless-catch */
const API_URL = "http://localhost:3000/api";

async function createProduct(prodObj) {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prodObj),
    });
    const result = await response.json();
    console.log(result);
    console.log(prodObj);
    return result;
  } catch (error) {
    throw error;
  }
}

export {createProduct};