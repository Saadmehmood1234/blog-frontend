import NoBlogs from "@/components/NoBlogs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <div className="grow flex items-center justify-center flex-col gap-4">
          <NoBlogs
            title="Blog not found"
            description="The article you&re looking for doesn&t exist."
          />
          <Link href="/">
            <Button className="cursor-pointer">Go Back</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
