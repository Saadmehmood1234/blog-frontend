import { QueryType } from "@/types/Types";

export default function generateQuery(filter: QueryType) {
  const params = new URLSearchParams();

  Object.entries(filter).forEach(([key, val]) => {
    if (
      val === "" ||
      val === undefined ||
      (Array.isArray(val) && val.length === 0)
    ) {
      return;
    }
    if (Array.isArray(val)) {
      params.append(key, val.join(","));
    } else {
      params.append(key, String(val));
    }
  });

  return params.toString();
}
