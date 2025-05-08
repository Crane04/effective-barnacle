import api from "../helpers/axios";

const putRequest = async <T = any>(
  endpoint: string,
  data: Record<string, any>
) => {
  const response = await api.put<T>(endpoint, data);
  return response.data;
};

export default putRequest;
