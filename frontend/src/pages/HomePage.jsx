import { useEffect } from "react";
import { useBookStore } from "../store/useBookStore";
import { PlusCircleIcon, RefreshCwIcon } from "lucide-react";
import BookCard from "../components/BookCard";
import AddBookModal from "../components/AddBookModal";

function HomePage() {
  const { books, loading, error, fetchBooks } = useBookStore();

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  console.log("books", books);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <button
          className="btn btn-primary"
          onClick={() =>
            document.getElementById("add_book_modal").showModal()
          }
        >
          <PlusCircleIcon className="size-5 mr-2" />
          Add Book
        </button>

        <button className="btn btn-ghost btn-circle" onClick={fetchBooks}>
          <RefreshCwIcon className="size-5" />
        </button>
      </div>

      <AddBookModal />

      {error && <div className="alert alert-error mb-8">{error}</div>}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </main>
  );
}

export default HomePage;

