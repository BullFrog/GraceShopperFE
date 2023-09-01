import { useParams } from "react-router-dom"

const AdminSingleOrder = () => {
    const { orderId } = useParams
    return (
        console.log("in progress")
    )
}

export default AdminSingleOrder