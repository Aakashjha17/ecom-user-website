import React, { useEffect, useState } from 'react';
import { getAllProducts} from '../../api';
import "./dashboard.css"

const Dashboard = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProductDetails();
    }, []);

    const fetchProductDetails = async () => {
        try {
            const response = await getAllProducts(); // Replace with your backend API endpoint
            console.log(response.data);
            if (response.data.length > 0) {
            console.log(true);
            setProducts(response.data);
            }
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

  return (
    <div>

        <div className="table-container">
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>ID</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product._id}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default Dashboard;