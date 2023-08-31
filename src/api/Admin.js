const API_URL = "http://localhost:3000/api";

const adminLogin = async (username, password) => {
    try {
        const request = await fetch(`${API_URL}/admin/login`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const result = await request.json()
        return result
    } catch (error) {
        console.error(error)
    }
}

const getAdminProducts = async () => {
    console.log("work in progress")
}

const getAdminOrders = async () => {
    console.log("work in progress")
}

export {adminLogin, getAdminProducts, getAdminOrders}