import Spinner from "./Spinner";

export default function Loading() {
  return (
    <div className="flex gap-2 min-h-screen items-center justify-center">
      <Spinner size="lg" />
      <Spinner size="lg" />
      <Spinner size="lg" />
      <Spinner size="lg" />
    </div>
  );
}
