import Link from "next/link";

export const Header = () => (
    <header className="border-b-2 border-red-500">
        <nav className="flex items-center w-4/5 h-16 m-auto ">
            <Link href={"/"}>
                <h1 className="text-4xl font-normal">Velo</h1>
            </Link>
        </nav>
    </header>
);
