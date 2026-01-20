import Link from "next/link";
import { Button } from "./ui/button";

const SubscribeCard = () => {
  return (
    <>
      <div className="bg-primary text-primary-foreground rounded-xl p-6 shadow-lg shadow-primary/20">
        <h3 className="font-display font-bold text-lg mb-2">Weekly Digest</h3>
        <p className="text-primary-foreground/80 text-sm mb-4">
          Hand-picked articles delivered every Monday. No spam, ever.
        </p>
        <Link href="/subscribe">
          <Button className="w-full cursor-pointer bg-background text-foreground font-semibold py-2 rounded-lg text-sm hover:bg-background/90 transition-colors">
            Subscribe
          </Button>
        </Link>
      </div>
    </>
  );
};

export default SubscribeCard;
