import { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { createProduct } from "../../services/productApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddProduct = () => {
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

  const sizeOptions = ["S", "M", "L", "XL"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleSize = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

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

  const removeColor = (color) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((c) => c !== color),
    }));
    toast(`Removed ${color}`, { icon: "🗑️" });
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

      await createProduct(form);

      toast.success("Product created successfully 👗✨");

      navigate("/admin/products");

    } catch (error) {
      console.error("Create failed", error);
      toast.error(
        error.response?.data?.message || "Create product failed"
      );
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-lg sm:text-xl font-bold mb-6 text-gray-800">
        Add New Product 👗
      </h2>

      <form onSubmit={handleSubmit} className="grid gap-3 max-w-lg">

        <input
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          className="border border-[#E3BFC3] focus:border-[#DD7A83]
                     outline-none p-3 rounded-xl"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="border border-[#E3BFC3] focus:border-[#DD7A83]
                     outline-none p-3 rounded-xl"
        />

        <input
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="border border-[#E3BFC3] focus:border-[#DD7A83]
                     outline-none p-3 rounded-xl"
        />

        <input
          name="discountPercent"
          placeholder="Discount % (optional)"
          onChange={handleChange}
          className="border border-[#E3BFC3] focus:border-[#DD7A83]
                     outline-none p-3 rounded-xl"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border border-[#E3BFC3] focus:border-[#DD7A83]
                     outline-none p-3 rounded-xl bg-white"
        >
          <option value="tops">Tops</option>
          <option value="dress">Dress</option>
          <option value="kurti">Kurti</option>
          <option value="suits">Suits</option>
          <option value="other">Other</option>
        </select>

        {/* Sizes */}
        <div>
          <p className="text-sm font-semibold text-gray-700">
            Available Sizes
          </p>

          <div className="flex gap-2 flex-wrap mt-1">
            {sizeOptions.map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-3 py-1 rounded-xl border text-sm transition ${
                  formData.sizes.includes(size)
                    ? "bg-[#DD7A83] text-white border-[#DD7A83]"
                    : "border-[#DD7A83] text-[#DD7A83]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <p className="text-sm font-semibold text-gray-700">
            Available Colors
          </p>

          <input
            placeholder="Type color & press Enter"
            onKeyDown={handleColorKeyDown}
            className="border border-[#E3BFC3] focus:border-[#DD7A83]
                       outline-none p-3 rounded-xl w-full"
          />

          <div className="flex gap-2 flex-wrap mt-2">
            {formData.colors.map((color) => (
              <span
                key={color}
                className="text-xs px-3 py-1 bg-gray-100 rounded-full flex items-center gap-2"
              >
                {color}
                <button
                  type="button"
                  onClick={() => removeColor(color)}
                  className="text-red-500 font-bold"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        <input
          name="stock"
          placeholder="Stock"
          onChange={handleChange}
          className="border border-[#E3BFC3] focus:border-[#DD7A83]
                     outline-none p-3 rounded-xl"
        />

        <input
          name="images"
          placeholder="Image URL"
          onChange={handleChange}
          className="border border-[#E3BFC3] focus:border-[#DD7A83]
                     outline-none p-3 rounded-xl"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFormData({
              ...formData,
              imageFile: e.target.files[0],
            })
          }
        />

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) =>
            setFormData({
              ...formData,
              imageFiles: e.target.files,
            })
          }
        />

        <button
          className="bg-[#DD7A83] hover:bg-[#c9656e]
                     text-white py-2.5 rounded-xl
                     shadow-md transition"
        >
          Create Product
        </button>

      </form>
    </AdminLayout>
  );
};

export default AddProduct;