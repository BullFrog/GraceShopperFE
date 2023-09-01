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

const getAdminProducts = async (token) => {
    try {
        const request = await fetch(`${API_URL}/admin/products`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await request.json()
        return result
    } catch (error) {
        console.error(error)
    }
}

const getAdminSingleProduct = async (token, productId) => {
     try {
       const request = await fetch(`${API_URL}/admin/products/${productId}`, {
         headers: {
           "Content-type": "application/json",
           'Authorization': `Bearer ${token}`,
         },
       });
       const result = await request.json();
       return result;
     } catch (error) {
       console.error(error);
     }
}
 
const createProduct = async (token, newProduct) => {
     try {
       const request = await fetch(`${API_URL}/admin/products`, {
        method: "POST", 
        headers: {
           "Content-type": "application/json",
           'Authorization': `Bearer ${token}`,
         },
         body: JSON.stringify({
            newProduct
        })
       });
       const result = await request.json();
       return result;
     } catch (error) {
       console.error(error);
     }
}

const cycleCountProduct = async (token, productId, count) => {
     try {
       const request = await fetch(`${API_URL}/admin/products/count/${productId}`, {
        method: "PATCH", 
        headers: {
           "Content-type": "application/json",
           'Authorization': `Bearer ${token}`,
         },
         body: JSON.stringify({
            count: count
         })
       });
       const result = await request.json();
       return result;
     } catch (error) {
       console.error(error);
     }
}

const deactivateProduct = async (token, productId) => {
    try {
      const request = await fetch(`${API_URL}/admin/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const result = await request.json();
      return result;
    } catch (error) {
      console.error(error);
    }
}

const updateProduct = async (token, productId, updatedProduct) => {
   try {
     const request = await fetch(
       `${API_URL}/admin/products/${productId}`,
       {
         method: "PATCH",
         headers: {
           "Content-type": "application/json",
           'Authorization': `Bearer ${token}`,
         },
         body: JSON.stringify({
           updatedProduct
         }),
       }
     );
     const result = await request.json();
     return result;
   } catch (error) {
     console.error(error);
   }
}

const getAdminOrders = async (token) => {
  try {
    const request = await fetch(`${API_URL}/admin/orders`, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const result = await request.json()
    return result
  } catch (error) {
    console.log(error)
  }
};

const getAdminSingleOrder = async (token, orderId) => {
    try {
      const request = await fetch(`${API_URL}/admin/orders/${orderId}`, {
        headers: {
          "Content-type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      });
      const result = await request.json();
      return result;
    } catch (error) {
      console.log(error);
    }
}

const updateOrderStatus = async (token, orderId, orderStatus) => {
    try {
      const request = await fetch(`${API_URL}/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            status: orderStatus
        })
      });
      const result = await request.json();
      return result;
    } catch (error) {
      console.log(error);
    }
}

export {adminLogin, getAdminProducts, getAdminOrders, createProduct, getAdminSingleProduct, getAdminSingleOrder, updateOrderStatus, cycleCountProduct, deactivateProduct, updateProduct}