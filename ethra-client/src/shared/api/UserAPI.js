import axios from "util/api/axiosConfig";

export const signin = async (user) => {
  const { email, password, type } = user;

  const body = {
    role: type,
    email,
    password,
  };

  return await axios.post(`${type}/login/`, body);
};

export const signup = async (accountType, accountData) => {
  try {
    return axios.post(`${accountType}/signup/`, accountData);
  }catch(err){
    return Error();
  }
};

// todo: update user

// todo: delete user

