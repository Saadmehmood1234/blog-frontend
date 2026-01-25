export interface CustomError {
  message: string;
  statusCode: number;
}
export interface View {
  blog: string;
  ip: string;
  userAgent: string;
  createdAt: Date;
}

export interface User {
  name: string;
  email: string;
  password: string;
  role: "admin";
}

// lib/types.ts
export interface Category {
  name: string;
  description?: string;
  slug: string;
  totalCategory?: number;
}

export interface BlogType {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: Category;
  tags: string[];
  views: number;
  isFeatured: boolean;
  createdAt: string;
  readTime: number;
}

export interface QueryType {
  title?: string;
  category?: string;
  isFeatured?: boolean;
  tags?: string[];
  readTime?: string;
  createdAt?: string;
  page?: number;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface CreateBlogPayload {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  featuredImage?: File | null;
  seoTitle?: string;
  seoDescription?: string;
  readTime: number;
  slug: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success?: boolean;
  message?: string;
}

export interface SubscribeResponse {
  success: boolean;
  message: string;
}

// Analytics Types
export interface TopBlog {
  _id: string;
  title: string;
  views: number;
}

export interface DailyView {
  _id: string;
  views: number;
}

export interface DashboardStats {
  totalBlogs: number;
  totalViews: number;
  totalCategory:number;
  topBlogs: TopBlog[];
  dailyViews: DailyView[];
}

export interface ResponseType {
  message: string;
  success: boolean;
}

export interface Subscriber {
  email: string;
  isVerified?: boolean;
  createdAt?: string;
}

export interface GetSubscriberResponse {
  success: boolean;
  message: string;
  data: Subscriber[];
}
