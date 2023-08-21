import Loader from "@/components/Loader/Loader";

export default function LoadingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="absolute bottom-[75px] right-[20px] border border-boder rounded-md p-1">
        <Loader className="scale-50" />
      </div>
    </>
  );
}
