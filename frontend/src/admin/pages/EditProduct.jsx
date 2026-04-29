import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import { getProductById, updateProduct } from "../../services/productApi";
import toast from "react-hot-toast";

const sizeOptions = ["S", "M", "L", "XL"];

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountPercent: "",
    category: "kurti",
    stock: "",
    images: "",
    sizes: [],
    colors: [],
    imageFile: null,
    imageFiles: [],
  });

  const [loading, setLoading] = useState(true);

  // ✅ LOAD PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await getProductById(id);
        const product = data.data;

        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          discountPercent: product.discountPercent || 0,
          category: product.category,
          stock: product.stock,
          images: product.images?.[0] || "",
          sizes: product.sizes || [],
          colors: product.colors || [],
          imageFile: null,
          imageFiles: [],
        });

      } catch (error) {
        console.error("Error loading product", error);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ VALIDATION
  const validateForm = () => {
    if (!formData.name.trim()) return "Product name is required";
    if (!formData.description.trim()) return "Description is required";

    if (!formData.price) return "Price is required";
    if (Number(formData.price) <= 0) return "Invalid price";

    if (!formData.stock) return "Stock is required";
    if (Number(formData.stock) < 0) return "Invalid stock";

    if (
      formData.discountPercent &&
      (Number(formData.discountPercent) < 0 ||
        Number(formData.discountPercent) > 90)
    )
      return "Discount must be between 0–90%";

    return null;
  };

  // ✅ SIZE TOGGLE
  const toggleSize = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  // ✅ COLOR ADD
  const handleColorKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.target.value.trim();

      if (!value) return;

      if (!formData.colors.includes(value)) {
        setFormData((prev) => ({
          ...prev,
          colors: [...prev.colors, value],
        }));
        toast.success(`Color "${value}" added`);
      }

      e.target.value = "";
    }
  };

  // ✅ REMOVE COLOR
  const removeColor = (color) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((c) => c !== color),
    }));
    toast(`Removed ${color}`, { icon: "🗑️" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const form = new FormData();

      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("price", Number(formData.price));
      form.append(
        "discountPercent",
        Number(formData.discountPercent || 0)
      );
      form.append("category", formData.category);
      form.append("stock", Number(formData.stock));

      formData.sizes.forEach((size) => form.append("sizes", size));
      formData.colors.forEach((color) => form.append("colors", color));

      if (formData.images) {
        form.append("images", formData.images);
      }

      if (formData.imageFile) {
        form.append("images", formData.imageFile);
      }

      if (formData.imageFiles.length > 0) {
        Array.from(formData.imageFiles).forEach((file) => {
          form.append("images", file);
        });
      }

      await updateProduct(id, form);

      toast.success("Product updated successfully ✨");

      navigate("/admin/products");

    } catch (error) {
      console.error("Update failed", error);
      toast.error(
        error.response?.data?.message || "Update failed"
      );
    }
  };

  if (loading)
    return (
      <AdminLayout>
        <p className="text-gray-600 text-sm sm:text-base p-4">
          Loading...
        </p>
      </AdminLayout>
    );

  return (
    <AdminLayout>

      {/* ✅ CSS RESTORED */}
      <style>{`
        .input {
          width: 100%;
          border: 1px solid #E3BFC3;
          padding: 10px 12px;
          border-radius: 10px;
          font-size: 14px;
          outline: none;
          transition: 0.25s;
        }

        .input:focus {
          border-color: #DD7A83;
          box-shadow: 0 0 0 2px rgba(221,122,131,0.15);
        }

        .size-btn {
          padding: 5px 14px;
          border-radius: 999px;
          border: 1px solid #DD7A83;
          font-size: 13px;
          color: #DD7A83;
          background: white;
          transition: 0.25s;
        }

        .size-btn:hover {
          background: #fdf2f4;
        }

        .size-btn.active {
          background: #DD7A83;
          color: white;
        }

        .color-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid #DD7A83;
          font-size: 12px;
          color: #DD7A83;
          background: #fff;
        }

        .color-pill button {
          background: none;
          border: none;
          cursor: pointer;
          color: #999;
        }

        .color-pill button:hover {
          color: red;
        }

        .btn-primary {
          margin-top: 10px;
          background: #DD7A83;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 10px;
          font-size: 14px;
          cursor: pointer;
          transition: 0.25s;
        }

        .btn-primary:hover {
          background: #c9656e;
        }
      `}</style>

      <div className="flex justify-center">
        <div className="w-full max-w-lg">

          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 text-gray-800">
            Edit Product ✏️
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid gap-2 sm:gap-3 bg-white/80 backdrop-blur-md border border-[#E3BFC3] rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-sm"
          >

            <input name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" className="input" />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows={4} className="input" />
            <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="input" />
            <input name="discountPercent" value={formData.discountPercent} onChange={handleChange} placeholder="Discount %" className="input" />
            <input name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" className="input" />
            <input name="images" value={formData.images} onChange={handleChange} placeholder="Image URL" className="input" />

            <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, imageFile: e.target.files[0] })} />
            <input type="file" accept="image/*" multiple onChange={(e) => setFormData({ ...formData, imageFiles: e.target.files })} />

            <div>
              <p className="text-sm font-semibold text-gray-700">Available Sizes</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {sizeOptions.map((size) => (
                  <button type="button" key={size} onClick={() => toggleSize(size)} className={`size-btn ${formData.sizes.includes(size) ? "active" : ""}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700">Available Colors</p>
              <input placeholder="Type color & press Enter" onKeyDown={handleColorKeyDown} className="input" />

              <div className="flex flex-wrap gap-2 mt-2">
                {formData.colors.map((color) => (
                  <span key={color} className="color-pill">
                    {color}
                    <button type="button" onClick={() => removeColor(color)}>✕</button>
                  </span>
                ))}
              </div>
            </div>

            <button className="btn-primary">Update Product</button>

          </form>
        </div>
      </div>

    </AdminLayout>
  );
};

export default EditProduct;