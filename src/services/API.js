export const getTokenFromAPI = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  console.log(data.token);
  return data.token;
};

export const getQuestions = async (param) => param;
