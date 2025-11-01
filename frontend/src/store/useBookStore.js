import { create } from "zustand";
import axios from "axios";

import toast from "react-hot-toast";

// base url will be dynamic depending on the environment
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const useBookStore = create((set, get) => ({
  books: [],
  loading: false,
  error: null,
  currentBook: null,



   // form state
  formData: {
    name: "",
    price: "",
    image: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ formData: { name: "", price: "", image: "" } }),



  addBook: async (e) => {
    e.preventDefault();
    set({ loading: true });

    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/books`, formData);
      await get().fetchBooks();
      get().resetForm();
      toast.success("Book added successfully");
      document.getElementById("add_book_modal").close();
    } catch (error) {
      console.log("Error in addBook function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },


  fetchBooks: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${BASE_URL}/api/books`);
      set({ books: response.data.data || response.data, loading: false, error: null });
    } catch (err) {
      console.error("Fetch error:", err);
      if (err.response?.status === 429)
        set({ error: "Rate limit exceeded", books: [], loading: false });
      else
        set({ error: "Something went wrong", books: [], loading: false });
    }
  },


  deleteBook: async (id) => {
    console.log("deleteBook function called", id);
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/books/${id}`);
      set((prev) => ({ books: prev.books.filter((book) => book.id !== id) }));
      toast.success("Book deleted successfully");
    } catch (error) {
      console.log("Error in deleteBook function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },


  fetchBook: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/books/${id}`);
      set({
        currentBook: response.data.data,
        formData: response.data.data,
        error: null,
      });
    } catch (error) {
      console.log("Error in fetchBook function", error);
      set({ error: "Something went wrong", currentBook: null });
    } finally {
      set({ loading: false });
    }
  },

  updateBook: async (id) => {
    set({ loading: true });
    try {
      const { formData } = get();
      const response = await axios.put(`${BASE_URL}/api/books/${id}`, formData);
      set({ currentProduct: response.data.data });
      toast.success("Book updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.log("Error in updateProduct function", error);
    } finally {
      set({ loading: false });
    }
  },




}));
