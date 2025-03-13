export default function Spinner({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-3",
    lg: "w-10 h-10 border-4",
  };

  return (
    <div
      className={`${sizeClasses[size]} border-gray-300 border-t-primary rounded-full animate-spin`}
    />
  );
}
