import { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";

const API = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export default function AdminAddProductPage() {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    ingredients: "",
    category: "",
    priceSmall: "",
    priceMedium: "",
    priceLarge: "",
    discount: "",
    stock: "",
    active: "true",
  });

  // 🧩 Lấy token
  const getToken = () => {
    const saved = localStorage.getItem("coffee-auth");
    return saved ? JSON.parse(saved).token : null;
  };

  // 🔹 Load Categories
  useEffect(() => {
    const token = getToken();
    if (!token) return;

    fetch(`${API}/api/admin/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch(() =>
        setMessage({ type: "error", text: "Không thể tải danh mục sản phẩm!" })
      );
  }, []);

  // 🔹 Cập nhật Form Input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Ảnh preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
  };

  // 🔹 Submit thêm sản phẩm
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();

    if (!token) {
      setMessage({ type: "error", text: "Token không tồn tại, vui lòng đăng nhập lại!" });
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));

    // 🔥 Backend yêu cầu key là "file"
    if (file) formData.append("file", file);

    try {
      const res = await fetch(`${API}/api/admin/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.status === 403) throw new Error("Bạn không có quyền thêm sản phẩm!");
      if (!res.ok) throw new Error("Không thể thêm sản phẩm!");

      setMessage({ type: "success", text: "🎉 Thêm sản phẩm thành công!" });
      setForm({
        title: "",
        description: "",
        ingredients: "",
        category: "",
        priceSmall: "",
        priceMedium: "",
        priceLarge: "",
        discount: "",
        stock: "",
        active: "true",
      });

      setFile(null);
      setPreview(null);
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Lỗi hệ thống!" });
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-200">

        <h2 className="text-center text-3xl font-bold mb-6 text-gray-800 flex items-center justify-center gap-2">
          <PlusCircle className="w-6 h-6 text-blue-600" /> Thêm Sản Phẩm Mới
        </h2>

        {message && (
          <p
            className={`text-center mb-5 font-semibold ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Tên sản phẩm */}
          <div>
            <label className="font-medium text-gray-700">Tên sản phẩm</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          {/* Mô tả */}
          <div>
            <label className="font-medium text-gray-700">Mô tả</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          {/* Thành phần */}
          <div>
            <label className="font-medium text-gray-700">Thành phần</label>
            <textarea
              name="ingredients"
              value={form.ingredients}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          {/* Danh mục */}
          <div>
            <label className="font-medium text-gray-700">Danh mục</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 mt-1"
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Giá size */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: "priceSmall", label: "Giá Size S" },
              { name: "priceMedium", label: "Giá Size M" },
              { name: "priceLarge", label: "Giá Size L" },
            ].map(({ name, label }) => (
              <div key={name}>
                <label className="font-medium text-gray-700">{label}</label>
                <input
                  type="number"
                  name={name}
                  value={(form as any)[name]}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />
              </div>
            ))}
          </div>

          {/* Giảm giá */}
          <div>
            <label className="font-medium text-gray-700">Giảm giá (%)</label>
            <input
              type="number"
              name="discount"
              value={form.discount}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          {/* Tồn kho + Ảnh */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium text-gray-700">Tồn kho</label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="font-medium text-gray-700">Hình ảnh</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border px-2 py-2 rounded-lg mt-1"
              />
              {preview && (
                <img
                  src={preview}
                  className="w-28 h-28 rounded-lg object-cover border mt-2"
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Thêm sản phẩm
          </button>
        </form>
      </div>
    </section>
  );
}
