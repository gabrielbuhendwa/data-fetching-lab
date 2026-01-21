"use client";

import { FormState, createProduct } from "@/app/actions/products";
import { Submit } from "@/app/components/submit";
import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const initialState: FormState = {
    errors: {},
  };
  const hasSubmittedRef = useRef(false);

  const [state, formAction] = useActionState(createProduct, initialState);

  useEffect(() => {
    // Track if form was submitted
    if (state !== initialState) {
      hasSubmittedRef.current = true;
    }

    // Redirect to products page after successful creation (no errors and form was submitted)
    if (hasSubmittedRef.current && state && state.errors && Object.keys(state.errors).length === 0) {
      const timer = setTimeout(() => {
        router.push("/products-db");
        router.refresh();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [state, router, initialState]);

  return (
    <form action={formAction} className="p-4 space-y-4 max-w-96">
      <div>
        <label className="text-white">
          Title
          <input
            type="text"
            className="block w-full p-2 text-black border rounded"
            name="title"
          />
        </label>
        {state.errors?.title && (
          <p className="text-red-500">{state.errors.title}</p>
        )}
      </div>
      <div>
        <label className="text-white">
          Price
          <input
            type="number"
            className="block w-full p-2 text-black border rounded"
            name="price"
          />
        </label>
        {state.errors?.price && (
          <p className="text-red-500">{state.errors.price}</p>
        )}
      </div>
      <div>
        <label className="text-white">
          Description
          <textarea
            className="block w-full p-2 text-black border rounded"
            name="description"
          />
        </label>
        {state.errors?.description && (
          <p className="text-red-500">{state.errors.description}</p>
        )}
      </div>
      {/* <button
        type="submit"
        className="block w-full p-2 text-white bg-blue-500 rounded disabled:bg-gray-500"
        disabled={isPending}
      >
        Submit
      </button> */}
      <Submit />
    </form>
  );
}
