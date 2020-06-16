import Goodreads from "goodreads-api";

const api = new Goodreads({
  developerKey: process.env.GOODREADS_API_KEY,
  developerSecret: process.env.GOODREADS_API_SECRET,
});

export const searchBooks = async (query: string, page: number) => {
  try {
    const { totalPages, books } = await api.searchBooks({
      query,
      page,
    });
    return { totalPages, books };
  } catch (e) {
    console.error(e);
    throw e;
  }
};
