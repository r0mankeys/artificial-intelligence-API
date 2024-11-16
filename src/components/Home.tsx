// import { Button } from "../components/ui/button.tsx";
import Layout from '../components/Layout.tsx';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
      <Layout bottomMargin={24}>
            <h2 className="text-4xl lg:text-5xl p-2 font-extrabold text-center w-full max-w-readable mx-auto">Choose your weapon</h2>
            <section className="flex flex-col lg:flex-row flex-grow w-full justify-between gap-4 p-4 mt-4">
                <Link to="/api/face-finder" className='lg:w-half flex-grow flex-shrink rounded-md p-4 shadow hover:scale-101 hover:brightness-102 transition-transform ease-linear dark:bg-darkBox bg-lightBox'>
                    <article className='w-full h-full flex flex-col px-2'>
                        <h3 className='text-3xl font-semibold mb-4 underline'>Face Finder</h3>
                        <p className='w-fit mb-4'>Paste a link to an image and this AI model will detect all the human faces in it.</p>
                        <div className="flex flex-grow items-center py-2">
                            <img className='overflow-hidden object-fill rounded-md' src="../face-finder-img.png" alt="face finder image" />
                        </div>
                    </article>
                </Link>
                <Link to="/api/sumarai" className='lg:w-half flex-grow flex-shrink rounded-md p-4 shadow hover:scale-101 hover:brightness-102 transition-transform ease-linear dark:bg-darkBox bg-lightBox'>
                    <article className='w-full h-full flex flex-col px-2'>
                        <h3 className='text-3xl font-semibold mb-4 underline'>Sumarai</h3>
                        <p className='w-fit mb-4'>Paste some long winded text and this AI model will summarize it</p>
                        <div className="flex flex-grow items-center py-2">
                            <img className='overflow-hidden object-fill rounded-md' src="../sumarai-img.jpg" alt="face finder image" />
                        </div>
                    </article>
                </Link>
            </section>
      </Layout>
    )
  }
