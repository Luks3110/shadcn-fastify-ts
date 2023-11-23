import { Skeleton } from './skeleton';

export const SkeletonRows = ({ quantity }: { quantity: number }) => {
  const skeletons = Array.from({ length: quantity }, (_, index) => (
    <div className="flex flex-row gap-x-3" key={index}>
      <Skeleton className="w-[20vw] h-[1rem] rounded-full" />
      <Skeleton className="w-[20vw] h-[1rem] rounded-full" />
      <Skeleton className="w-[20vw] h-[1rem] rounded-full" />
      <Skeleton className="w-[20vw] h-[1rem] rounded-full" />
    </div>
  ));

  return <div className="flex flex-col items-center gap-5">{skeletons}</div>;
};
