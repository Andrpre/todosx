import { Skeleton } from "./skeleton";

const Loader = () => {
  const NUMBER_ROWS = 5;

  return (
    <div className="space-y-4">
      {Array.from({ length: NUMBER_ROWS }).map((_, index) => (
        <Skeleton key={index} className="h-5 w-full rounded-md bg-gray-100" />
      ))}
    </div>
  );
};

export default Loader;
