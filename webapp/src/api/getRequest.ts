import api from "../helpers/axios";

const getRequest = async <T = any>(endpoint: string) => {
  const response = await api.get<T>(endpoint);
  return response.data;
};

export default getRequest;
