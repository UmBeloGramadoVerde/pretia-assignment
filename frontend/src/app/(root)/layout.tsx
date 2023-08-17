import Footer from "@/components/Footer/Footer";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("@/components/Header/Header"), { ssr: false });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="p-5 pb-[100px]">{children}</div>
      <div className="fixed bottom-0 w-full">
        <Footer />
      </div>
    </>
  );
}
