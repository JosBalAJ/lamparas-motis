"use client";

import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";

export default function ForgotPassword() {
    return (
        <AuthLayout imageBg="/img/lamps/gato-ia.jpg">

            <div className="md:row-start-1 md:row-end-7 flex flex-col justify-center items-center w-5/6 md:w-4/5 mx-auto">
                <h1 className="text-3xl md:text-4xl text-amber-950 leading-tight font-(family-name:--font-merriweather)">Volvamos a encender la luz</h1>
                <span className="text-amber-950/70 mt-1">Enviaremos un código a tu correo electrónico para restablecer tu contraseña.</span>

                <form className="flex flex-col w-full" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="send-code" className="text-amber-950/90 font-bold mt-2 md:mt-5"><span className="text-2xl bg-amber-200 px-3.5 py-1 mr-2 rounded-full">1</span>Presiona el botón para recibir el código.</label>
                    <button type="button" className="bg-amber-900 text-white cursor-pointer rounded-lg h-10 w-40 my-3 mx-auto font-bold transition-all duration-200 hover:bg-amber-950 hover:-translate-y-1 hover:shadow-lg">Enviar código</button>
                    <label htmlFor="write-code" className="text-amber-950/90 font-bold mt-2 md:mt-5"><span className="text-2xl bg-amber-200 px-3 py-1 mr-2 rounded-full">2</span>Introduce el código que recibiste</label>
                    <input type="number" name="write-code" id="write-code" placeholder="XXX-XXX" required
                        className="border border-stone-300 bg-stone-50 h-10 p-2.5 text-center mt-2 w-40 mx-auto rounded-lg transition-all duration-200 placeholder:text-amber-900/50 focus:outline-none focus:border-orange-600 focus:shadow-md focus:shadow-orange-500/30 app"/>
                    <input type="submit" value="Confirmar" 
                        className="bg-amber-900 text-white cursor-pointer rounded-lg h-10 w-80 mx-auto mt-8 font-bold transition-all duration-200 hover:bg-amber-950 hover:-translate-y-1 hover:shadow-lg"/>
                </form>
                <Link href="/">
                    <button className="bg-transparent border border-orange-300 text-amber-950 cursor-pointer rounded-lg h-10 w-80 mx-auto mt-8 transition-all duration-200 hover:bg-amber-100 hover:shadow-lg hover:border-amber-900">Volver a iniciar sesión</button>
                </Link>
            </div>

        </AuthLayout>
    );
}