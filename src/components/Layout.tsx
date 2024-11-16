import Navbar from "./Navbar";

interface LayoutProps {
    bottomMargin: number
    children: React.ReactNode;
}


export default function Layout({ children, bottomMargin }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col font-special">
            <Navbar />
            <main className={`flex flex-col flex-grow max-w-gutter w-full mx-auto mt-8 mb-20 md:mb-${bottomMargin} p-4 overflow-scroll`}>
                {children}
            </main>
        </div>
    )

}
