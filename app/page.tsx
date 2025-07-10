import Header from "@/components/trangChu/header/page";
import Contents from "@/components/trangChu/content/page";
import Header2 from "@/components/trangChu/header2/page";
export default function Home() {
  return (
    <main className="p8 space-y-4">
      <div className="grid grid-cols-1 grid-rows-[60px_40px_1fr] md:grid-rows-[60px_40px_1fr] overflow-auto bg-white text-black font-bold h-screen z-50">
        <div className="row-start-1 md:row-start-1 bg-white sticky top-0 z-40">
          <Header />
        </div>
        <div className="row-start-2 md:row-start-2 bg-[rgb(185,241,228)] sticky top-[60px] z-50">
          <Header2 />
        </div>
        <div className="row-start-3 md:row-start-3 bg-white">
          <Contents />
        </div>
      </div>
    </main>
  );
}
