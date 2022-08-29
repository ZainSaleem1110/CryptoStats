export interface UserInfoResponsefromApi {
  success: boolean;
  user: UserInfo;
}

export interface UserInfo {
  address: string;
  createdAt: string;
  id: string;
  profileImage: string | null;
  updatedAt: string;
  username: string | null;
}

export interface UserInfoEditable {
  username: string | null;
  description?: null | string;
  profileImage?: string | null;
}

export interface User {
  userInfo: UserInfo;

  userToken: {
    token: string;
  };
}

export interface UserAdmin {
  userToken: {
    token: string;
  }; 
}

export interface UserPage {
  success: boolean;
  pageCount: number;
  datas: UserInfo[];
}

export interface UserReponse {
  sucess: boolean;
  user: UserInfo;
}