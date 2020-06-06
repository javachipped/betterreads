import axios from "axios";
import Goodreads from "goodreads-api";

const api = new Goodreads({ developerKey: process.env.GOODREADS_API_KEY });

export const getBooks = async () => {
  const books = await api.getBooks();
  return books;
};
