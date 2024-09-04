"use client"

// react
import { useState } from "react";

//next
import dynamic from "next/dynamic";
import SearchBar from "@/components/SearchBar";

// components
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

function Home() {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <nav className="w-3/4 h-28 flex justify-between items-center max-lg:flex-col max-lg:justify-center max-lg:gap-2">
        <h1 className="text-4xl text-black font-semibold max-lg:text-2xl">sg-hdb-resales</h1>
        <SearchBar setSearch={setSearch} />
      </nav>
      <div className="w-full h-full flex flex-col items-center pb-14 max-lg:pb-4">
        <Map search={search} setSearch={setSearch} />
      </div>
    </div>
  );
}

export default Home
