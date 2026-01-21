"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SearchForm({ initialQuery }: { initialQuery?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery || "");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      params.set("query", query.trim());
    } else {
      params.delete("query");
    }
    router.push(`/products-db?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded-lg shadow-md">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search products by title or description..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              router.push("/products-db");
            }}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
}
