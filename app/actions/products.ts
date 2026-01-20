"use server";

import { revalidatePath } from "next/cache";
import { deleteProduct, updateProduct } from "@/app/prisma-db";

export type FormState = {
  errors?: {
    title?: string;
    price?: string;
    description?: string;
  };
};

export async function removeProduct(id: number) {
  try {
    await deleteProduct(id);
    revalidatePath("/products-db");
  } catch (error) {
    console.error("Error removing product:", error);
    throw error;
  }
}

export async function editProduct(
  id: number,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const title = formData.get("title")?.toString().trim();
  const price = formData.get("price")?.toString();
  const description = formData.get("description")?.toString().trim();

  const errors: FormState["errors"] = {};

  if (!title || title.length === 0) {
    errors.title = "Title is required";
  }

  if (!price || price.length === 0) {
    errors.price = "Price is required";
  } else {
    const priceNum = Number(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      errors.price = "Price must be a positive number";
    }
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    await updateProduct(
      id,
      title!,
      Number(price!),
      description ?? null
    );
    revalidatePath("/products-db");
    revalidatePath(`/products-db/${id}`);
    return { errors: {} };
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      errors: {
        title: "Failed to update product. Please try again.",
      },
    };
  }
}
