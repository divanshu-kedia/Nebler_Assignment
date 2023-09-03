export const responseFormatter = (payload, message: string = 'Success') => {
  return {
    data: payload,
    message: message,
  };
};
