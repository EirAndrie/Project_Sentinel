import { Search, Plus } from "lucide-react";

const SearchBar = ({ title, button }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="relative w-96">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder={`Search ${title}...`}
          className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm transition-colors"
        />
      </div>

      {button && (
        <button
          onClick={button.onClick}
          className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          {button.label}
        </button>
      )}
    </div>
  );
};

export default SearchBar;

/* USE CASE

<SearchBar
  title="Creators"
  button={{ label: "Add Creator", onClick: () => console.log("add") }}
/>

*/
