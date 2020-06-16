import Goodreads from "goodreads-api";

const api = new Goodreads({
  developerKey: process.env.GOODREADS_API_KEY,
  developerSecret: process.env.GOODREADS_API_SECRET,
});

export const login = async () => {
  try {
    const {
      requestToken,
      requestTokenSecret,
    } = await api.generateRequestToken();
    const loginURL = api.userLoginURL({ requestToken });
    return { requestToken, requestTokenSecret, loginURL };
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const accessToken = async ({ requestToken, requestTokenSecret }) => {
  try {
    const { accessToken, accessTokenSecret } = await api.generateAccessToken({
      requestToken,
      requestTokenSecret,
    });
    return { accessToken, accessTokenSecret };
  } catch (e) {
    throw e;
  }
};
