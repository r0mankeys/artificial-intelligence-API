import { Link } from "react-router-dom";
import ModeToggle from "./mode-toggle";

export default function Navbar() {
    return (
        <header className="flex items-center h-16 dark:bg-darkNav bg-slate-200 shadow-md py-8 px-8 sm:px-12 md:px-16">
            <nav className="flex items-center gap-8 justify-between w-full">
                <Link to="/">
                    <h1 className="font-black text-3xl">AI Models</h1>
                </Link>
                <ModeToggle />
            </nav>
        </header>
    )
}
