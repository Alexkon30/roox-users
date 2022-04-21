export interface UserInfoState {
    currentUser: UserInfo;
    isLoading: boolean;
    error: string | null;
    validateStats: {
      isValidName: boolean;
      isValidUsername: boolean;
      isValidEmail: boolean;
      isValidPhone: boolean;
      isValidWebsite: boolean;
      isValidStreet: boolean;
      isValidCity: boolean;
      isValidCode: boolean;
    };
  }

  export interface UsersState {
    users: User[];
    isLoading: boolean;
    error: string | null;
    sortedBy: 'name' | 'city';
  }

  export interface UserInfo {
    name: string;
    username: string;
    email: string;
    address: { street: string; city: string; zipcode: string };
    phone: string;
    website: string;
  }

  export interface User {
    id: number;
    name: string;
    address: {
      city: string;
    };
    company: {
      name: string;
    };
  }