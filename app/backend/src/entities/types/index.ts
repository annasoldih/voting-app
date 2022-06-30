export type LoginPayload = {
  email: string;
  password: string;
};

export type TokenPayload = {
  id: number;
  role: string;
  email: string;
};

export type UserLogin = {
  user: {
    id: number;
    email: string;
    username: string;
    role: string;
  };
  token: string;
};

export type CountResponse = {
  fields: {
    deliveryTag: number;
    redelivered: boolean;
    exchange: string;
    routingKey: number;
    messageCount: number;
  },
  properties: {
    headers: object;
  },
  content: {
    type: Buffer;
    data: number[];
  },
};

export type Votes = {
  id: number;

  name: string;

  count: number;
};
