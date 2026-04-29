import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { getProducts, deleteProduct } from "../../services/productApi";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await getProducts();
      setProducts(data.data);
    } catch (error) {
      console.error("Error loading products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  // ✅ IMAGE RESOLVER
  const resolveImage = (img) => {
    if (!img) return "https://via.placeholder.com/100";
    if (img.startsWith("http")) return img;
    return `http://localhost:5000${img}`;
  };

  // ✅ PRICE RENDERER
  const renderPrice = (product) => {
    const hasDiscount =
      product.discountPercent > 0 && product.discountedPrice;

    if (hasDiscount) {
      return (
        <div className="flex items-center gap-2">
          <span className="line-through text-gray-400">
            ₹{product.price}
          </span>

          <span className="text-[#DD7A83] font-semibold">
            ₹{product.discountedPrice}
          </span>

          <span className="bg-black text-white text-xs px-2 py-0.5 rounded">
            {product.discountPercent}% OFF
          </span>
        </div>
      );
    }

    return <span>₹{product.discountedPrice || product.price}</span>;
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Manage Products 👗</h2>

        <Link to="/admin/products/add">
          <button className="bg-black text-white px-4 py-2 rounded-lg">
            + Add Product
          </button>
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[750px]">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Image</th>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-left">Stock</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-t">
                    <td className="p-2">
                      <img
                        src={resolveImage(product.images?.[0])}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>

                    <td className="p-2 font-medium">
                      {product.name}
                    </td>

                    {/* ✅ PRICE UI */}
                    <td className="p-2">
                      {renderPrice(product)}
                    </td>

                    <td className="p-2">
                      {product.stock}
                    </td>

                    <td className="p-2 flex gap-2 whitespace-nowrap">
                      <Link to={`/admin/products/edit/${product._id}`}>
                        <button className="px-3 py-1 border rounded hover:bg-gray-50">
                          Edit
                        </button>
                      </Link>

                      <button
                        onClick={() => handleDelete(product._id)}
                        className="px-3 py-1 border text-red-500 rounded hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProducts;