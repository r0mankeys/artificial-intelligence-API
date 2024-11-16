import Layout from "./Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

export default function NotFound() {
    return (
        <Layout bottomMargin={24}>
            <section className="w-fit mx-auto my-auto flex flex-col items-center justify-center">
                <h1 className="font-black text-4xl text-center select-none my-4">404 | Page Not Found</h1>
                <Link to="/" className="mt-4">
                    <Button>
                        <ArrowLeft size={16} />
                        <span className="block">Go back home</span>
                    </Button>
                </Link>
            </section>
        </Layout>
    )
}
