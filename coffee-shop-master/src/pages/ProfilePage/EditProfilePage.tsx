import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import PageLoading from "@/components/shared/PageLoading";

const API = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export default function EditProfilePage() {
  const { user, token, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // --------------------------------------------------------
  // ⭐ Lấy thông tin user
  // --------------------------------------------------------
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${API}/api/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const u = data.user || data;

        setForm({
          name: u.name || "",
          mobileNumber: u.mobileNumber || "",
          email: u.email || "",
          address: u.address || "",
          city: u.city || "",
          state: u.state || "",
          pincode: u.pincode || "",
        });
      })
      .catch((err) => console.error("❌ Lỗi tải thông tin:", err));
  }, [token, navigate]);

  // --------------------------------------------------------
  // ⭐ Xử lý input
  // --------------------------------------------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --------------------------------------------------------
  // ⭐ Gửi request cập nhật
  // --------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) =>
      formData.append(key, value as string)
    );

    if (image) formData.append("img", image); // file gửi đúng key backend cần

    try {
      const res = await fetch(`${API}/api/user/profile/update`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Cập nhật thành công!");
        await refreshUser(); // nạp lại user

        setTimeout(() => navigate("/profile"), 1200);
      } else {
        setMessage(data.error || "Không thể cập nhật.");
      }
    } catch (err) {
      console.error("❌ Lỗi cập nhật:", err);
      setMessage("Lỗi kết nối máy chủ!");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  // --------------------------------------------------------
  // ⭐ Avatar hiện tại
  // --------------------------------------------------------
const currentAvatar = user.profileImage
  ? `${API}/profile_img/${user.profileImage}?v=${Date.now()}`
  : "/default-avatar.jpg";

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          Cập nhật thông tin tài khoản
        </h2>

        {message && (
          <p
            className={`text-center mb-4 font-medium ${
              message.includes("thành công") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* ⭐ Avatar + Preview */}
          <div className="flex flex-col items-center">
            <img
              src={preview || currentAvatar}
              alt="Avatar"
              className="w-28 h-28 rounded-full object-cover border shadow mb-3"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setImage(file);
                if (file) setPreview(URL.createObjectURL(file));
              }}
            />
          </div>

          {/* ⭐ Form dữ liệu */}
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Họ và tên"
            className="border p-3 rounded-lg w-full"
            required
          />

          <input
            name="mobileNumber"
            value={form.mobileNumber}
            onChange={handleChange}
            placeholder="Số điện thoại"
            className="border p-3 rounded-lg w-full"
          />

          <input
            name="email"
            value={form.email}
            disabled
            className="border p-3 rounded-lg w-full bg-gray-100 text-gray-500"
          />

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Địa chỉ"
            className="border p-3 rounded-lg w-full"
          />

          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Thành phố"
            className="border p-3 rounded-lg w-full"
          />

          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="Tỉnh / Quận"
            className="border p-3 rounded-lg w-full"
          />

          <input
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            placeholder="Mã bưu điện"
            className="border p-3 rounded-lg w-full"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all"
          >
            {loading ? "Đang cập nhật..." : "Lưu thay đổi"}
          </button>
        </form>
      </div>

      <PageLoading show={loading} />
    </div>
  );
}
