import { Bell, User } from "lucide-react";

const Header = ({ title, user }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
      <div className="flex items-center text-gray-800">
        <h1 className="font-semibold text-lg">{title}</h1>
      </div>

      <div className="flex items-center space-x-6">
        <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
          2 active
        </span>
        <button className="relative text-gray-400 hover:text-gray-600">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <div className="flex items-center space-x-2 border-l border-gray-200 pl-6 cursor-pointer">
          <div className="w-8 h-8 bg-gray-100 rounded-full border border-gray-200 flex items-center justify-center">
            <User className="w-4 h-4 text-gray-500" />
          </div>
          <span className="text-sm font-medium text-gray-700">
            {user || "Agent Li"}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
