"use client";

import { Label } from "@radix-ui/react-label";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Input } from "../ui/input";
import { generateSlug } from "@/lib/GenerateSlug";
import toast from "react-hot-toast";
import { createCategory } from "@/lib/api";
import { Button } from "../ui/button";
import { X } from "lucide-react";

type CreateCategoryProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const CreateCategory = ({ setIsOpen }: CreateCategoryProps) => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
    slug: "",
  });
  const [loading, setLoading] = useState(false);

  const handleCategory = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      form.append("name", category.name);
      form.append("description", category.description);
      form.append("slug", generateSlug(category.name));

      await createCategory(form);
      toast.success("Category Created!");
      setCategory({ name: "", description: "", slug: "" });
      setIsOpen(false);
    } catch {
      toast.error("Error in Creating the Category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-background p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Create Category</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1 cursor-pointer hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleCategory} className="space-y-4">
          <div className="flex flex-col gap-1">
            <Label>Category Name</Label>
            <Input
              value={category.name}
              required
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
              placeholder="Name..."
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label>Category Description</Label>
            <Input
              value={category.description}
              required
              onChange={(e) =>
                setCategory({ ...category, description: e.target.value })
              }
              placeholder="Description..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button className="cursor-pointer" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
