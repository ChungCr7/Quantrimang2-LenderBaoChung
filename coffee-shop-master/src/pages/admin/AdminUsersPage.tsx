import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  mobileNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  profileImage: string;
  isEnable: boolean;
  role?: string;
}

const API = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [userType, setUserType] = useState<number>(1); // 1 = USER, 2 = ADMIN
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loggedUser = JSON.parse(localStorage.getItem("coffee-auth") || "{}");

  // ================================
  // 🔹 Load danh sách theo type
  // ================================
  useEffect(() => {
    fetchUsers(userType);
  }, [userType]);

  const fetchUsers = async (type: number) => {
    try {
      const token = loggedUser?.token;

      const res = await fetch(`${API}/api/admin/users?type=${type}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setUsers(Array.isArray(data) ? data : data.users || []);
    } catch {
      setMessage({ type: "error", text: "Không thể tải danh sách người dùng!" });
    }
  };

  // ================================
  // 🔹 Update trạng thái USER
  // ================================
  const updateStatus = async (id: number, status: boolean) => {
    try {
      const token = loggedUser?.token;

      const res = await fetch(`${API}/api/admin/users/${id}/status?status=${status}`, {
        method: "PUT",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!res.ok) throw new Error();

      setMessage({
        type: "success",
        text: status ? "✅ Đã kích hoạt tài khoản!" : "🔒 Đã khóa tài khoản!",
      });

      fetchUsers(userType);
    } catch {
      setMessage({ type: "error", text: "Không thể cập nhật trạng thái tài khoản!" });
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-6">
        
        {/* ================= Header ================= */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold text-gray-800">
            {userType === 1 ? "Danh Sách Người Dùng" : "Danh Sách Quản Trị Viên"}
          </h2>

          <select
            value={userType}
            onChange={(e) => setUserType(Number(e.target.value))}
            className="border px-3 py-2 rounded-lg text-gray-700"
          >
            <option value={1}>Người dùng</option>
            <option value={2}>Quản trị viên</option>
          </select>
        </div>

        {/* ================= Message ================= */}
        {message && (
          <div
            className={`text-center mb-4 font-semibold ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* ================= Table ================= */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border px-3 py-2">STT</th>
                <th className="border px-3 py-2">Hồ Sơ</th>
                <th className="border px-3 py-2">Tên</th>
                <th className="border px-3 py-2">Email</th>
                <th className="border px-3 py-2">Số Điện Thoại</th>
                <th className="border px-3 py-2">Địa Chỉ</th>
                <th className="border px-3 py-2">Trạng Thái</th>
                <th className="border px-3 py-2">Hành Động</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center text-gray-500 py-4">
                    Không có người dùng nào.
                  </td>
                </tr>
              ) : (
                users.map((u, index) => {
                  const isSelf = loggedUser?.id === u.id;
                  const isAdmin = userType === 2;

                  return (
                    <tr key={u.id} className="text-center border-t hover:bg-gray-50">
                      <td className="border px-3 py-2">{index + 1}</td>

                      {/* Avatar */}
                      <td className="border px-3 py-2">
                        <img
                          src={
                            u.profileImage?.startsWith("http")
                              ? u.profileImage
                              : `${API}/profile_img/${u.profileImage}`
                          }
                          alt="avatar"
                          className="w-16 h-16 rounded-full mx-auto border object-cover"
                          onError={(e) => (e.currentTarget.src = "/no-image.png")}
                        />
                      </td>

                      <td className="border px-3 py-2 font-medium">{u.name}</td>
                      <td className="border px-3 py-2">{u.email}</td>
                      <td className="border px-3 py-2">{u.mobileNumber}</td>

                      <td className="border px-3 py-2 text-sm text-gray-600">
                        {`${u.address}, ${u.city}, ${u.state}, ${u.pincode}`}
                      </td>

                      <td className="border px-3 py-2">
                        {u.isEnable ? (
                          <span className="text-green-600 font-semibold">Hoạt động</span>
                        ) : (
                          <span className="text-red-500 font-semibold">Bị khóa</span>
                        )}
                      </td>

                      {/* ================= Actions ================= */}
                      <td className="border px-3 py-2 space-x-2">
                        {/* ADMIN không được khóa ADMIN khác */}
                        {/* ADMIN không được khóa chính mình */}
                        <button
                          onClick={() => updateStatus(u.id, true)}
                          disabled={u.isEnable || isAdmin || isSelf}
                          className={`px-3 py-1 rounded-md text-white ${
                            u.isEnable || isAdmin || isSelf
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-blue-600 hover:bg-blue-700"
                          }`}
                        >
                          Kích hoạt
                        </button>

                        <button
                          onClick={() => updateStatus(u.id, false)}
                          disabled={!u.isEnable || isAdmin || isSelf}
                          className={`px-3 py-1 rounded-md text-white ${
                            !u.isEnable || isAdmin || isSelf
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-red-600 hover:bg-red-700"
                          }`}
                        >
                          Khóa
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
