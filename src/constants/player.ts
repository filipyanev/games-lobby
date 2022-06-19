export type Player = {
  username: string;
  currency: string;
  balance: number;
};

export type GetPlayerPayload = {
  data: Player;
  errorMsg: string;
  successful: boolean;
};
