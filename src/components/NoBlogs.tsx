import React from "react";
type NoBlogType = {
  title: string;
  description: string;
};
const NoBlogs = ({ title, description }: NoBlogType) => {
  return (
    <div className="col-span-2 text-center space-y-2 text-muted-foreground">
      <h1 className="text-2xl text-primary font-bold font-display">{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default NoBlogs;
