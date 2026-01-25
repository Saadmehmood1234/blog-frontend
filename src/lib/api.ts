import {
  QueryType,
  ApiResponse,
  SubscribeResponse,
  BlogType,
  Category,
  DashboardStats,
  ResponseType,
  GetSubscriberResponse,
} from "@/types/Types";
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

export const fetchBlogBySlug = async (
  slug: string,
): Promise<ApiResponse<BlogType> | null> => {
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

export async function fetchBlogsByFilter(
  query: QueryType,
): Promise<ApiResponse<BlogType[]>> {
  const res = await fetch(`${API_URL}/api/v1/blogs?${query}`);
  const result = await safeJson<ApiResponse<BlogType[]>>(res);
  if (result) {
    return result;
  }
  return { data: [] };
}

export async function fetchBlogCategoryBySlug(
  slug: string,
): Promise<ApiResponse<BlogType[]> | null> {
  const res = await fetch(`${API_URL}/api/v1/categories/${slug}`);
  return await safeJson<ApiResponse<BlogType[]>>(res);
}

export async function createSubscriber(
  email: string,
): Promise<SubscribeResponse | null> {
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

export async function fetchSubscriber(): Promise<GetSubscriberResponse | null> {
  const res = await fetch(`${API_URL}/api/v1/subscribe`);
  const result = await safeJson<GetSubscriberResponse>(res);

  return result ?? null;
}

export async function createBlogs(
  data: FormData,
): Promise<ApiResponse<BlogType> | null> {
  for (const [key, value] of data.entries()) {
    console.log(key, value);
  }

  const res = await fetch(`${API_URL}/api/v1/blogs`, {
    method: "POST",
    credentials: "include",
    body: data,
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
console.log("Response", res)
  // if (!res.ok) {
  //   throw new Error("Failed to fetch analytics");
  // }

  return await safeJson<DashboardStats>(res);
}

export async function logout() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/signout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );
  if (!res.ok) {
    throw new Error("Failed to logout");
  }
  return await safeJson<ResponseType>(res);
}

export async function deleteBlog(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );
  if (!res.ok) {
    throw new Error("Error in deleting the blog");
  }
  return await safeJson<ResponseType>(res);
}

export async function createCategory(
  data: FormData,
): Promise<ApiResponse<Category> | null> {
  for (const [key, value] of data.entries()) {
    console.log(key, value);
  }

  const res = await fetch(`${API_URL}/api/v1/categories`, {
    method: "POST",
    credentials: "include",
    body: data,
  });

  if (!res.ok) {
    throw new Error("Failed to create Category");
  }

  return await safeJson<ApiResponse<Category>>(res);
}


export async function deleteCategory(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );
  if (!res.ok) {
    throw new Error("Error in deleting the blog");
  }
  return await safeJson<ResponseType>(res);
}