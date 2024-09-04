import dynamic from "next/dynamic";

// components
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

function Home() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <nav className="w-3/4 h-28 flex justify-between items-center max-lg:flex-col max-lg:justify-center max-lg:gap-2">
        <h1 className="text-4xl text-black font-semibold max-lg:text-2xl">sg-hdb-resales</h1>
      </nav>
      <div className="w-full h-full flex flex-col items-center pb-14 max-lg:pb-4">
        <Map />
      </div>
    </div>
  );
}

export default Home
