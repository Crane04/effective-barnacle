import api from "../helpers/axios";

const postRequest = async <T = any>(
  endpoint: string,
  data: Record<string, any>
) => {
  const response = await api.post<T>(endpoint, data);
  return response.data;
};

export default postRequest;
