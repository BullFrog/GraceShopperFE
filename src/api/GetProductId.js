const API_URL = "http://localhost:3000/api";

const GetProductId = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export { GetProductId };
