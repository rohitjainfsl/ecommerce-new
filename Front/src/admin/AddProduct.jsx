/* eslint-disable no-unused-vars */
import { useState } from "react";
import instance from "../axiosConfig";
import { useEcom } from "../Context/EcomProvider";

function AddProduct() {
  const { categories } = useEcom();
  const [form, setForm] = useState({
    title: "",
    brand: "",
    category: "",
    OriginalPrice: "",
    discountType: "%",
    discount: "",
    discountedPrice: "",
    image: "",
    description: "",
  });
  const [error, setError] = useState("");

  function handleDiscountPriceChange(e) {
    const a =
      form.discountType === "%"
        ? form.OriginalPrice - (e.target.value * form.OriginalPrice) / 100
        : form.OriginalPrice - e.target.value;

    setForm((form) => ({ ...form, discountedPrice: a }));
  }

  function handleChange(e) {
    if (e.target.name === "image") {
      setForm((form) => ({ ...form, image: e.target.files[0] }));
    } else {
      const { name, value } = e.target;
      setForm((form) => ({ ...form, [name]: value })); // [name] is a variable which can be anything like title, category and so on.
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("brand", form.brand);
      formData.append("category", form.category);
      formData.append("OriginalPrice", form.OriginalPrice);
      formData.append("discount", form.discount);
      formData.append("discountedPrice", form.discountedPrice);
      formData.append("image", form.image);
      formData.append("description", form.description);

      console.log(form);

      const response = await instance.post("/product/add", formData, {
        withCredentials: true,
      });
      console.log(response);
      setForm({
        title: "",
        brand: "",
        category: "",
        OriginalPrice: "",
        discount: "",
        discountedPrice: "",
        image: "",
        description: "",
      });
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-4">
      <div className="max-w-lg w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Add Product</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form
          action=""
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="flex flex-col gap-3 items-center justify-between space-y-6"
        >
          <input
            type="text"
            placeholder="Enter Product Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <input
            type="text"
            placeholder="Enter Product Brand"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="category"
            id=""
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="" selected disabled placeholder="Select Category">
              Select Category
            </option>
            {categories.map((category, index) => {
              return (
                <option value={category._id} key={index}>
                  {category.name}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            placeholder="Enter Product Usual Price"
            name="OriginalPrice"
            value={form.OriginalPrice}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex gap-4">
            <select
              name="discountType"
              id="discountType"
              value={form.discountType}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="%">In Percentage</option>
              <option value="inr">In Rupees</option>
            </select>
            <input
              type="text"
              name="discount"
              placeholder={
                form.discountType === "%"
                  ? "Discount in Percentage"
                  : "Discount in Rupees"
              }
              value={form.discount}
              onChange={handleChange}
              onBlur={handleDiscountPriceChange}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <input
            type="text"
            placeholder="Enter Product Discounted Price"
            name="discountedPrice"
            value={form.discountedPrice}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Enter Product Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
