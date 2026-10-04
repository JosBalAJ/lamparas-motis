import Link from 'next/link';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <main className='bg-amber-900 min-h-screen flex justify-center items-center p-4 font-(family-name:--font-montserrat)'>
            <div className='w-full max-w-6xl min-h-1 rounded-3xl flex flex-col md:flex-row bg-white overflow-hidden shadow-2xl'>
                <div className="bg-orange-200 w-full h-64 md:w-1/2 md:h-auto bg-[url('/img/lamps/reno-ia2.png')] bg-cover bg-center bg-no-repeat flex flex-col items-start justify-between pb-4 md:pb-0 rounded-t-3xl md:rounded-l-3xl">
                    <div className="grid grid-cols-[auto_1fr] gap-3 text-white mt-5 mx-5 md:ml-5 bg-black/60 rounded-xl p-2.5 items-center">
                        <div className="w-20 h-20 bg-[url('/img/img-logo.jpg')] bg-cover bg-center rounded-xl"></div>
                        <div className="flex flex-col justify-center font-(family-name:--font-merriweather) pr-2">
                            <h1 className='text-4xl font-black'>MOTIS</h1>
                            <h2 className='text-2xl italic'>Iluminación Artesanal</h2>
                        </div>
                    </div>
                    <div className="text-white text-xl md:text-2xl md:mr-12 mb-5 ml-5 bg-black/45 rounded-xl p-3 font-(family-name:--font-merriweather)">
                        <h1>Piezas únicas. Materiales nobles. Luz con historia.</h1>
                    </div>
                </div>

                <div className="bg-white w-full md:w-1/2 h-full flex flex-col justify-between py-6 md:grid md:grid-cols-1 md:grid-rows-7 text-sm">
                    
                    { children }

                    <div className="md:row-start-7 md:row-end-8 flex items-center justify-center md:justify-start w-4/5 mx-auto text-xs text-stone-400 gap-4 mt-8 md:mt-0">
                        <span>@ 2026 Lámparas Motis</span>
                        <Link href="/" className='hover:text-amber-900 transition-colors'>Privacidad</Link>
                        <Link href="/" className='hover:text-amber-900 transition-colors'>Ayuda</Link>
                    </div>

                </div>
            </div>
        </main>
    );
}