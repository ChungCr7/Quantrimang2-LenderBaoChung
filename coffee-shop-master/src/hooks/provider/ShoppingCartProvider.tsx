import React, { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { CartItem, DeliOption, PaymentMethod } from "@/types";
import ShoppingCartContext from "../context/ShoppingCartContext";

interface ShoppingCartProviderProps {
  children: ReactNode;
}

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [deliOption, setDeliOption] = useState<DeliOption>(DeliOption.DELIVER);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CASH);
  const [subTotal, setSubTotal] = useState(0);
  const [deliFee, setDeliFee] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  // =======================
  // ⭐ FIX TOKEN + USER ID
  // =======================
  const getAuth = () => {
    try {
      const stored = localStorage.getItem("coffee-auth");
      if (!stored) return { token: null, userId: null };

      const parsed = JSON.parse(stored);

      return {
        token: parsed?.token ?? parsed?.user?.token ?? null,
        userId: parsed?.user?.id ?? parsed?.id ?? null,
      };
    } catch (err) {
      console.error("❌ Error parsing auth:", err);
      return { token: null, userId: null };
    }
  };

  // =======================
  // 🛒 FETCH CART
  // =======================
  const fetchCart = useCallback(async () => {
    const { token } = getAuth();
    if (!token) return; // ❌ KHÔNG CRASH

    try {
      const res = await fetch(`${API_BASE}/api/user/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) return;

      const data = await res.json();

      setItems(data.carts || []);
      setItemCount((data.carts || []).length);

      const subtotal = data.totalOrderPrice || 0;
      setSubTotal(subtotal);

      const fee = deliOption === DeliOption.DELIVER ? 15000 : 0;
      setDeliFee(fee);

      setTotalPayment(subtotal + fee);
    } catch (err) {
      console.error("❌ fetchCart error:", err);
    }
  }, [deliOption]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // =======================
  // 🛒 ADD TO CART
  // =======================
  const addToCart = async (productId: number, size: string = "medium") => {
    const { token, userId } = getAuth();
    if (!token || !userId) {
      alert("Bạn phải đăng nhập trước!");
      return;
    }

    try {
      await fetch(
        `${API_BASE}/api/user/add-cart?pid=${productId}&uid=${userId}&size=${size}`,
        { method: "POST", headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (err) {
      console.error("❌ addToCart error:", err);
    }
  };

  // =======================
  // 🔁 UPDATE QUANTITY
  // =======================
  const updateQuantity = async (symbol: "in" | "de", cartId: number) => {
    const { token } = getAuth();
    if (!token) return;

    try {
      await fetch(
        `${API_BASE}/api/user/cart/update?sy=${symbol}&cid=${cartId}`,
        { method: "PUT", headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (err) {
      console.error("❌ updateQuantity error:", err);
    }
  };

  // =======================
  // ❌ REMOVE ITEM
  // =======================
  const removeFromCart = async (cartId: number) => {
    const { token } = getAuth();
    if (!token) return;

    try {
      await fetch(`${API_BASE}/api/user/cart/delete?cid=${cartId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      console.error("❌ removeFromCart error:", err);
    }
  };

  // =======================
  // 🧹 CLEAR CART
  // =======================
  const clearCart = useCallback(async () => {
    const { token } = getAuth();
    if (!token) return;

    try {
      await fetch(`${API_BASE}/api/user/cart/clear`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      console.error("❌ clearCart error:", err);
    }
  }, [fetchCart]);

  // =======================
  // 🚚 DELIVERY OPTION
  // =======================
  const updateDeliOption = useCallback((value: DeliOption) => {
    setDeliOption(value);
    setDeliFee(value === DeliOption.DELIVER ? 15000 : 0);
  }, []);

  // =======================
  // 💳 PAYMENT
  // =======================
  const updatePaymentMethod = useCallback((value: PaymentMethod) => {
    setPaymentMethod(value);
  }, []);

  // =======================
  // 📦 CONTEXT VALUE
  // =======================
  const value = useMemo(
    () => ({
      items,
      itemCount,
      addToCart,
      updateQuantity,
      removeFromCart,
      deliOption,
      updateDeliOption,
      subTotal,
      deliFee,
      totalPayment,
      paymentMethod,
      updatePaymentMethod,
      clearCart,
      fetchCart,
    }),
    [
      items,
      itemCount,
      deliOption,
      paymentMethod,
      subTotal,
      deliFee,
      totalPayment,
      clearCart,
      fetchCart,
    ]
  );

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
