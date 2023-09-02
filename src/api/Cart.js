const API_URL = "http://localhost:3000/api";
//should receive a { quantity: N } object, the id from product, and user's token
const addItemToCart = async (productId, quantity, token) => {
    try {
        const request = await fetch(`${API_URL}/cart/${productId}`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                quantity: quantity
        })
        });
        const result = await request.json()
        console.log(result)
        return result 
    } catch (error) {
        console.error(error)
    }
}

//should receive a { quantity: N } object, the id from the cart item, and user's token
const updateCartItem = async (id, quantity, token) => {
    console.log(id, quantity, token);
    try {
      const request = await fetch(`${API_URL}/cart/item/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            quantity: quantity
        }),
      });
      const result = await request.json();
      console.log(result);
      return result
    } catch (error) {
      console.error(error);
    }
}
//removes single item from cart, only requires id of the cart item and user's token
const removeFromCart = async (id, token) => {
    try {
        const request = await fetch(`${API_URL}/cart/item/${id}`, {
            method: "DELETE",
            headers: {
                'Content-type': "application/json",
                'Authorization': `Bearer ${token}`,
            }
        });
        const result = await request.json()
        return result
    } catch (error) {
        console.error(error)
    }
}

//clears cart by user request, or after purchase
const clearCart = async (token) => {
  try {
    const request = await fetch(`${API_URL}/cart`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    });
    const result = await request.json();
    return result
  } catch (error) {
    console.error(error);
  }
};

//get logged in user's cart
const getUserCart = async (token) => {
    try {
        const request = await fetch(`${API_URL}/users/me/cart`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const result = await request.json();
        return result
    } catch (error) {
        console.error(error)
    }
}

export {addItemToCart, updateCartItem, removeFromCart, clearCart, getUserCart}