export type NOTIFICATION_AUTH = {
  notifType: 'MAIL_SEND_FORGOT_PASSWORD' | 'MAIL_RESET_PASSWORD_SUCCESS';
  data: NOTIFICATION_AUTH_DATA;
};

export type NOTIFICATION_AUTH_DATA = {
  name: string;
  email: string;
  token?: string;
};

export type OrderData = {
  order_id: string;
};

export type NOTIFICATION_ORDER_SUCCESS = {
  data: OrderData;
};
