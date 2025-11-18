export type ICredentials = {
  userName: string;
  password: string;
}

export type ILoginResponse = {
  isSuccess: boolean;
  message: string;
  data: {
    jwtToken: string;
      userId: string;
    user: {
      userId: string;
      userName: string;
      role: string;
    };
  };
}