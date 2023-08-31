const API_URL = "http://localhost:3000/api";

const GetAllProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export {GetAllProducts};