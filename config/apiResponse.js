const apiResponse = (
  type,
  success,
  code,
  message,
  data,
  // response
) => {
  return {
    type,
    success,
    code,
    message,
    data,
  };
};
export default apiResponse;
