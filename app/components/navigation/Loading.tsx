interface LoadingProps extends React.PropsWithChildren {
  loading: boolean;
  what?: string;
  error?: string | null;
};

export default function Loading({
  loading,
  what,
  error,
  children,
}: LoadingProps) {
  if (loading)
    return (
      <div className="flex justify-center text-deluge text-xl md:text-2xl mt-10">Loading {what}...</div>
    );
  if (error)
    return <div className="flex justify-center text-falu-red text-xl md:text-2xl mt-10">{error}</div>;
  return <>{children}</>;
}
