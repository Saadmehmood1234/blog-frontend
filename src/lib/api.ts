import { QueryType, CreateBlogPayload, ApiResponse, SubscribeResponse, BlogType, Category, DashboardStats } from "./Types";
import safeJson from "./SafeJson";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchBlogs = async (): Promise<ApiResponse<BlogType[]>> => {
  const res = await fetch(`${API_URL}/api/v1/blogs`);
  const result = await safeJson<ApiResponse<BlogType[]>>(res);
  if (result) {
    return result;
  }
  return { data: [] };
};

export const fetchBlogBySlug = async (slug: string): Promise<ApiResponse<BlogType> | null> => {
  const res = await fetch(`${API_URL}/api/v1/blogs/${slug}`);
  return await safeJson<ApiResponse<BlogType>>(res);
};

export const fetchBlogCategory = async (): Promise<ApiResponse<Category[]>> => {
  const res = await fetch(`${API_URL}/api/v1/categories`, {
    next: { revalidate: 60 },
  });
  const result = await safeJson<ApiResponse<Category[]>>(res);
  if (result) {
    return result;
  }
  
  return { data: [] };
};

export async function fetchBlogsByFilter(query: QueryType): Promise<ApiResponse<BlogType[]>> {
  const res = await fetch(`${API_URL}/api/v1/blogs?${query}`);
  const result = await safeJson<ApiResponse<BlogType[]>>(res);
  if (result) {
    return result;
  }
  return { data: [] };
}

export async function fetchBlogCategoryBySlug(slug: string): Promise<ApiResponse<BlogType[]> | null> {
  const res = await fetch(`${API_URL}/api/v1/categories/${slug}`);
  return await safeJson<ApiResponse<BlogType[]>>(res);
}

export async function createSubscriber(email: string): Promise<SubscribeResponse | null> {
  const res = await fetch(`${API_URL}/api/v1/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email: email }),
  });
  return await safeJson<SubscribeResponse>(res);
}

export async function getSubscriber(): Promise<SubscribeResponse | null> {
  const res = await fetch(`${API_URL}/api/v1/subscribe`);
  return await safeJson<SubscribeResponse>(res);
}

export async function createBlogs(data: CreateBlogPayload): Promise<ApiResponse<BlogType> | null> {
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

  return await safeJson<ApiResponse<BlogType>>(res);
}

export async function fetchDashboardStats(): Promise<DashboardStats | null> {
  const res = await fetch(`${API_URL}/api/v1/analytics/dashboard-stats`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch analytics");
  }

  return await safeJson<DashboardStats>(res);
}
