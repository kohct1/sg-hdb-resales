// react
import { useState, useRef } from "react";

// components
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function SearchBar({ setSearch }: { setSearch: (search: string) => void }) {
    const [searchValue, setSearchValue] = useState<string>("");
    const buttonRef = useRef<HTMLButtonElement>(null);

    function handleClick() {
        buttonRef.current?.blur();
        setSearch(searchValue);
    }

    return (
        <div className="w-1/4 flex gap-4 max-lg:w-full">
            <Input value={searchValue} placeholder="Search Location" onChange={(e) => setSearchValue(e.target.value)} />
            <Button className="bg-black" onClick={handleClick}><svg className="fill-white" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg></Button>
        </div>
    )
}

export default SearchBar