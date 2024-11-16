import { useState, useRef, useEffect } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { User } from "lucide-react";
import { Image } from "lucide-react";
import { Frown } from "lucide-react";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import type { BoundingBox, Status, DivCoords } from "../lib/types";
import { detectFace } from "../APIutils";
import { calculateFacePosition } from "../lib/utils";

const formSchema = z.object({
    imageUrl: z.string().url({ message: "Please enter a valid URL" })
});

export default function FaceFinder() {
    const [divCoords, setDivCoords] = useState<Array<DivCoords>>([]);
    const [data, setData] = useState<Array<BoundingBox> | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [status, setStatus] = useState<Status>("idle");    
    const imageRef = useRef<HTMLImageElement>(null);

    const form = useForm<z.infer<typeof formSchema>>({ // To manage form state and validation
        resolver: zodResolver(formSchema), // Use zod to validate the form
        defaultValues: { // State for the form
            imageUrl: "",
        }
    });
    
    function onSubmit(value: z.infer<typeof formSchema>) {
        setStatus("loading");
        setImageUrl(value.imageUrl);
        detectFace(value.imageUrl as string)
            .then((result) => {
                if (result instanceof Error) {
                    throw result;
                } else {
                    setData(result || null);
                    setStatus("success");
                }
            })
            .catch((error) => {
                setStatus("error");
                return error;
            });
        return;
    }

    function handleImageLoad() {
        if (imageRef.current && data) {
            const image = imageRef.current;
                const coords: Array<DivCoords> = []
                data.map((box) => {
                    const faceCoords = calculateFacePosition(box, image);
                    coords.push(faceCoords);
                });
                setDivCoords(coords);
        } else {
            console.error("Image element not found");
        }
        return;
    }

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on mount
    }, [])

    return (
        <Layout bottomMargin={24}>
                <Link to="/" className="w-fit">
                    <Button>
                        <ArrowLeft size={16} />
                        <span className="block">Go back home</span>
                    </Button>
                </Link>
            <section className="flex-grow flex flex-col my-4">
                <div className="w-full mb-4 lg:mb-8 p-4">
                    <h2 className="text-center text-3xl mb-2 font-extrabold underline ">Face Finder</h2>
                    <p className="text-center italic mt-4">Paste an image url below, and watch the AI detect all of the human faces</p>
                </div>
                <article className="w-half mx-auto mb-8">
                    <Form {...form}>
                        <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col items-start lg:flex-row relative justify-between lg:items-center gap-4 w-full"
                        >
                        <FormField
                            name="imageUrl"
                            control={form.control}
                            render={({ field, fieldState }) => ( // Get fieldState to show error messages
                            <FormItem className="flex-grow w-full">
                                <FormControl>
                                <Input {...field} className={`${fieldState.error ? "dark:border-red-400 border-red-500" : "dark:border-slate-500"}`} placeholder="Image URL..." />
                                </FormControl>
                                {fieldState.error && (
                                <p className="absolute text-red-500 dark:text-red-400 text-sm top-24 lg:top-10 select-none">{fieldState.error.message}</p>
                                )}
                            </FormItem>
                            )}
                        />
                        <Button variant="secondary" className="flex-shrink-0 w-full lg:w-fit border dark:border-lightBox border-darkBox" type="submit">Detect</Button>
                        </form>
                    </Form>
                </article>
                <div className={`lg:w-gutter lg:mx-auto flex-grow rounded-lg aspect-video flex items-center justify-center mt-8 lg:mt-4 shadow-lg img-border ${status === "loading" ? "animate-pulse dark:bg-slate-700 bg-slate-300" : ""}`}>
                    {status === "idle" && (<User size={128} opacity={"50%"} />)}
                    {status === "loading" && (<Image size={128} opacity={"50%"} />)}
                    {status === "error" && (
                        <div className="flex flex-col items-center">
                            <Frown size={128} opacity={"50%"} />
                            <p className="text-center text-sm w-gutter mt-4">Sorry, we couldn&apos;t load the image, please try another one or try again</p>
                        </div>
                    )
                    }
                    {status === "success" && data && 
                    (
                        <div className="relative">
                            <img ref={imageRef} onLoad={() => handleImageLoad()} src={imageUrl}></img> 
                                {divCoords.map((coords, index) => (
                                    <div key={index} className="absolute detected-face" style={{ top: coords.top, left: coords.left, right: coords.right, bottom: coords.bottom }}></div>
                                ))} 
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    )
}
