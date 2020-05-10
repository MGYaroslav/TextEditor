import axios from "axios";

export const getSynonyms = (query) => {
  const baseUrl = "https://api.datamuse.com/words";

  return axios
    .get(`${baseUrl}?ml=${query}`)
    .then((res) => {
      return res.data.slice(0, 5).map((synonim) => synonim.word);
    })
    .catch((error) => console.log(error));
};
