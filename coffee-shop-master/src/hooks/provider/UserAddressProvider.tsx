import { useCallback, useMemo } from "react";
import { useLocalStorage } from "../useLocalStorage";
import UserAddressContext from "../context/UserAddressContext";
import { UserAddress } from "@/types";

const STORAGE_KEY = "coffee-auth";

type UserAddressProviderProps = {
  children: JSX.Element | JSX.Element[];
};

const UserAddressProvider = ({ children }: UserAddressProviderProps) => {
  // 📌 Lưu & load địa chỉ từ localStorage
  const [address, setAddress] = useLocalStorage<UserAddress | null>(
    STORAGE_KEY,
    null
  );

  // ==================================================
  // 🚀 Cập nhật địa chỉ
  // ==================================================
  const updateAddress = useCallback(
    (newAddr: UserAddress) => {
      setAddress(newAddr);
    },
    [setAddress]
  );

  // ==================================================
  // 🚮 Xóa địa chỉ
  // ==================================================
  const removeAddress = useCallback(() => {
    setAddress(null);
  }, [setAddress]);

  // ==================================================
  // 📦 Memo hóa giá trị context
  // ==================================================
  const value = useMemo(
    () => ({
      address,
      updateAddress,
      removeAddress,
    }),
    [address, updateAddress, removeAddress]
  );

  return (
    <UserAddressContext.Provider value={value}>
      {children}
    </UserAddressContext.Provider>
  );
};

export default UserAddressProvider;
