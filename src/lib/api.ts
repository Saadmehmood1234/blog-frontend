import { QueryType, CreateBlogPayload } from "./Types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchBlogs = async () => {
  const res = await fetch(`${API_URL}/api/v1/blogs`);
  return res.json();
};

export const fetchBlogBySlug = async (slug: string) => {
  const res = await fetch(`${API_URL}/api/v1/blogs/${slug}`);
  return res.json();
};
export const fetchBlogCategory = async () => {
  const res = await fetch(`${API_URL}/api/v1/categories`, {
    next: { revalidate: 60 },
  });
  return res.json();
};

export async function fetchBlogsByFilter(query: QueryType) {
  const res = await fetch(`${API_URL}/api/v1/blogs?${query}`);
  return res.json();
}

export async function fetchBlogCategoryBySlug(slug: string) {
  const res = await fetch(`${API_URL}/api/v1/categories/${slug}`);
  return res.json();
}

export async function createSubscriber(email: string) {
  const res = await fetch(`${API_URL}/api/v1/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email: email }),
  });
  return res.json();
}

export async function getSubscriber() {
  const res = await fetch(`${API_URL}/api/v1/subscribe`);
  return res.json();
}

export async function createBlogs(data: CreateBlogPayload) {
  const res = await fetch(`${API_URL}/api/v1/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create blog");
  }

  return res.json();
}

export async function fetchDashboardStats() {
  const res = await fetch(`${API_URL}/api/v1/analytics/dashboard-stats`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch analytics");
  }

  return res.json();
}
