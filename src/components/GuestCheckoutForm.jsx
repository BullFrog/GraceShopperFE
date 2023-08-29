import { useState } from "react"
import { useNavigate } from "react-router-dom"

const GuestCheckoutForm = () => {
    //needs {cart} and {setCart} from props
    const navigate = useNavigate()

    const [guest, setGuest] = useState({
        name: "",
        email: "",
        address: ""
    })
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(guest)
        alert(`Order submitted: 
        ${guest.name}, ${guest.email}, ${guest.address}`)
        // setCart([])
        //navigate("/Product")
    }

    const handleChange = (event) => {
        setGuest((prevGuest) => ({
            ...prevGuest,
            [event.target.id]: event.target.value
        }))
    }

    return (
      <form onSubmit={handleSubmit} className="flex-col text-center mt-8">
        <div className="flex-col">
          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              required
              value={guest.name}
              onChange={handleChange}
              className="border-2 border-black rounded"
            ></input>
          </div>
          <div className="m-4">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="text"
              required
              value={guest.email}
              onChange={handleChange}
              className="border-2 border-black rounded"
            ></input>
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              id="address"
              type="text"
              required
              value={guest.address}
              onChange={handleChange}
              className="border-2 border-black rounded"
            ></input>
          </div>
        </div>
        <div>
          <button className="underline mt-2">Submit Order</button>
        </div>
      </form>
    );
}

export default GuestCheckoutForm