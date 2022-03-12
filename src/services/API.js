export const getTokenFromAPI = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  return data.token;
};

export const getQuestions = async (token) => {
  let response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  let data = await response.json();
  if (data.results.length === 0) {
    localStorage.setItem('token', await getTokenFromAPI());
    const getToken = localStorage.getItem('token');
    response = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}`);
    data = await response.json();
    return data;
  }
  return data;
};
