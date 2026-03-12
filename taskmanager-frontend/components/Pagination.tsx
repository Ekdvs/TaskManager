"use client";

interface Props {
  page: number;
  setPage: (p: number) => void;
  totalPages: number;
}

export default function Pagination({ page, setPage, totalPages }: Props) {
  return (
    <div className="flex justify-center mt-6 gap-2">
      <button
        onClick={() => setPage(Math.max(0, page - 1))}
        disabled={page === 0}
        className="px-3 py-1 bg-white border rounded hover:bg-gray-100 disabled:opacity-50"
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 py-1 border rounded ${i === page ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"}`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
        disabled={page === totalPages - 1}
        className="px-3 py-1 bg-white border rounded hover:bg-gray-100 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}