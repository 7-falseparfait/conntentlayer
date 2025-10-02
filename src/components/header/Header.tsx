import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const headerLinks = ["Home", "Blog", "Single Post", "Pages"];

const Header = () => {
  return (
    <div className="flex items-center justify-between py-8">
      <Image src="/Logo.svg" alt="logo" width={122} height={28} />
      <div className="flex items-center gap-x-6">
        {headerLinks.map((link) => (
          <Link
            key={link}
            href={
              link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`
            }
            className="text-gray-600 hover:text-gray-900"
          >
            {link}
          </Link>
        ))}
      </div>
      <div className="relative flex items-center">
        <Input className="w-[180px] pl-3" placeholder="Search" />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
};

export default Header;
