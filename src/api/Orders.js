const API_URL = "http://localhost:3000/api";

//array of [products] and user's token
const createOrder = async (products, token) => {
    try {
        const request = await fetch(`${API_URL}/orders`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                products
        })
        })
        const result = await request.json()
        console.log(result)
        return result
    } catch (error) {
        console.error(error)
    }
}

//needs orderId and uesr's token
const getOrderById = async (orderId, token) => {
    try {
        const request = await fetch(`${API_URL}/orders/${orderId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await request.json()
        console.log(result)
    } catch (error) {
        console.error(error)
    }
}

//needs user's token
const getUserOrders = async (token) => {
    try {
        const request = await fetch(`${API_URL}/users/me/orders`, {
            headers: {
                'ContentType': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await request.json()
        console.log(result)
        return result
    } catch (error) {
        console.error(error)
    }
}

export {createOrder, getOrderById, getUserOrders}