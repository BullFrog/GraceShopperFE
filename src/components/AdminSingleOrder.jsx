import { useParams } from "react-router-dom"

const AdminSingleOrder = () => {
    const { orderId } = useParams();
    return (
        <div>{orderId}</div>
    )
}

export default AdminSingleOrder