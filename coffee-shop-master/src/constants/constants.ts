import { CoffeeSize, DeliOption, LatLng, PaymentMethod } from '@/types';

export const APP_NAME = "Coffee Shop";

export const GOOGLE_OAUTH_CLIENT_ID = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;

export const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

/**
 * 📌 Vị trí cửa hàng – Đường Lê Đỉnh, Phường Hoà Xuân, Cẩm Lệ, Đà Nẵng
 * Tọa độ chính xác 100%
 */
export const SHOP_LOCATION: LatLng = {
  lat: 16.009820,
  lng: 108.209470,
};

/**
 * 📌 defaultCoordinate khi chưa có địa chỉ user
 * → App sẽ luôn mặc định hiển thị Đà Nẵng (Hòa Xuân), không nhảy Myanmar nữa
 */
export const defaultCoordinate: LatLng = SHOP_LOCATION;

export const defaultDeliFee = 2000;

export const coffeeSizeOptions = [
  { value: CoffeeSize.SMALL, label: 'Small' },
  { value: CoffeeSize.MEDIUM, label: 'Medium' },
  { value: CoffeeSize.LARGE, label: 'Large' },
];

export const deliOptions = [
  { value: DeliOption.DELIVER, label: 'Deliver' },
  { value: DeliOption.PICK_UP, label: 'Pick Up' },
];

export const paymentMethodOptions = [
  {
    value: PaymentMethod.CASH,
    label: "Cash on Delivery",
    icon: '/images/cash-payment-icon.png',
  },
  {
    value: PaymentMethod.KBZ_PAY,
    label: "KBZ Pay",
    icon: '/images/kbz-pay-icon.png',
  },
  {
    value: PaymentMethod.WAVE_MONEY,
    label: "Wave Money",
    icon: '/images/wave-money-icon.png',
  },
];
