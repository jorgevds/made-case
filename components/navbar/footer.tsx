import Link from "next/link";

export const Footer = () => (
    <footer className="bg-slate-950 text-white flex-grow border-t-2 border-red-500 py-12">
        <article className="flex w-4/5 m-auto">
            <Link href={"/"}>
                <p className="text-2xl font-normal pt-3">Velo</p>
            </Link>
        </article>
    </footer>
);
