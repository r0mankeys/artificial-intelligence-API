import { useEffect, useState } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Loader2 } from "lucide-react"
import { Frown } from "lucide-react";
import { Copy } from "lucide-react";
import { Check } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import type { Status, SummaryObjectSucces, CopyBtnStatus  } from "../lib/types";
import { summarizeText } from "../APIutils";

const content = "Awaiting input...";

const formSchema = z.object({
    text: z.string().trim().min(20, { message: "Please enter at least 20 characters" })
});

export default function Sumarai() {
    const [data, setData] = useState<string | null>(null);
    const [status, setStatus] = useState<Status>("idle");
    const [copyStatus, setCopyStatus] = useState<CopyBtnStatus>("idle");

    const form = useForm<z.infer<typeof formSchema>>({ // To manage form state and validation
        resolver: zodResolver(formSchema), // Use zod to validate the form
        defaultValues: { // State for the form
            text: "",
        }
    });

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on mount
    }, [])

   function onSubmit(value: z.infer<typeof formSchema>) {
        setStatus("loading");
        summarizeText(value.text as string)
            .then((result) => {
                if (result instanceof Error) {
                    throw result;
                } else {
                    const summaryResult = result as SummaryObjectSucces;
                    setData(summaryResult.summary_text);
                    setStatus("success");
                    console.log(result);
                }
            })
            .catch((error) => {
                setStatus("error");
                console.error(error);
                return error;
            });
        return;
   } 

   async function handleCopyBtn() {
         await navigator.clipboard.writeText(data as string);
         setCopyStatus("copied");
         setTimeout(() => {
              setCopyStatus("idle");
         }, 1500);
   }

    return (
        <Layout bottomMargin={24}>
                <Link to="/" className="w-fit">
                    <Button>
                        <ArrowLeft size={16} />
                        <span className="block">Go back home</span>
                    </Button>
                </Link>
            <section className="flex flex-col flex-grow my-4 px-4 pb-4">
                <div className="w-full mb-6 lg:mb-8 p-4">
                    <h2 className="text-center text-3xl mb-2 font-extrabold underline ">Sumarai</h2>
                    <p className="text-center italic mt-4">Paste or type in some text and watch the AI model spit out a summary</p>
                </div>
                <article className="flex flex-col md:flex-row flex-grow gap-4">
                    <Form {...form}>
                        <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col flex-grow min-w-halfWithPadding ronded-md relative"
                        >
                        <FormField
                        name="text"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea {...field} className={`flex-grow rounded-md min-h-96 p-4 shadow ${fieldState.error ? "dark:border-red-400 border-red-500" : "dark:border-slate-700"}`} placeholder="Type something..." />
                                </FormControl>
                                {fieldState.error && <p className="text-red-500 dark:text-red-400 text-sm absolute top-[-35px]">{fieldState.error.message}</p>}
                            </FormItem>
                        )}
                        />
                            <Button variant="secondary" className="w-fit self-center md:self-start justify-self-center mt-4 flex-shrink border dark:border-lightBox border-darkBox" type="submit">Summarize</Button>
                        </form>
                    </Form>
                    <div className="relative flex flex-grow min-w-half rounded-md p-4 img-border shadow">
                        {status === "idle" && (<span className="text-wrap mx-auto self-center opacity-40 select-none">{content}</span>)}
                        {status === "loading" && (
                            <div className="flex flex-row gap-2 self-center mx-auto opacity-40 select-none">
                                <span className="inline-block">Loading</span> <Loader2 className="animate-spin" />
                            </div>
                        )}
                        {status === "error" && (
                            <div className="flex flex-col self-center items-center justify-center mx-auto">
                                <Frown size={32}  />
                                <span className="inline-block text-center text-sm w-gutter mt-2">Sorry, we couldn&apos;t summarize the text, please try again</span>
                            </div>
                        )}
                        {status === "success" && data && (
                            <span>{data}</span>
                        )}
                        <div className={`absolute flex flex-row items-center gap-2 bottom-2 right-2 z-front trnasition-all ease-linear ${status !== "success" ? "cursor-not-allowed" : ""}`}>
                        {copyStatus === "idle" && (
                        <Button disabled={status !== "success"} onClick={handleCopyBtn} variant="ghost">
                            <Copy size={16} />
                        </Button>
                        )}
                        {copyStatus === "copied" && (
                            <>
                                <span className="inline-block p-2 rounded-md bg-accent">Copied</span>
                                <Button variant="ghost" className="bg-accent">
                                    <Check size={16} className="text-green-600 dark:text-green-500" />
                                </Button>
                            </>
                        )}
                        </div>
                    </div>
                </article>
            </section>
        </Layout>
    )
}
