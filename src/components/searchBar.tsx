"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SearchBar = ({ placeholder }: { placeholder: string }) => {
  //e: React.FormEvent<HTMLFormElement>

  const searchParams = useSearchParams();
  //const search = searchParams.get("search") || "";
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = /*useDebouncedCallback(*/ (term: string) => {
    let params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search", term);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  //console.log(searchParams);

  return (
    <>
      <form className="flex w-full md:w-1/2 lg:w-1/3 mb-2 px-5 text-black">
        <input
          type="text"
          placeholder={placeholder}
          defaultValue={searchParams.get("search")?.toString()}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full border p-2 rounded-lg"
        />
      </form>
    </>
  );
};

export default SearchBar;
