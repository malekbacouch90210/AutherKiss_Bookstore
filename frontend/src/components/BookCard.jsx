import { EditIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { useBookStore } from "../store/useBookStore";

function BookCard({ book }) {
  const { deleteBook } = useBookStore();

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      {/* BOOK IMAGE */}
      <figure className="relative pt-[56.25%]">
        <img
          src={book.image}
          alt={book.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        {/* BOOK INFO */}
        <h2 className="card-title text-lg font-semibold">{book.name}</h2>
        <p className="text-2xl font-bold text-primary">${Number(book.price).toFixed(2)}</p>

        {/* CARD ACTIONS */}
        <div className="card-actions justify-end mt-4">
          <Link to={`/book/${book.id}`} className="btn btn-sm btn-info btn-outline">
            <EditIcon className="size-4" />
          </Link>

          <button
            className="btn btn-sm btn-error btn-outline"
            onClick={() => deleteBook(book.id)}
          >
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default BookCard;
