"use client";

import Link from "next/link"
import AuthLayout from "@/components/AuthLayout";

export default function Home() {
  return (
    <AuthLayout>

      <div className="md:row-start-1 md:row-end-2 flex justify-center md:justify-end items-center text-stone-500 mb-6 md:mb-0">
        <span className="text-orange-900/70">¿Aún no tienes cuenta?</span>
        <Link href="/register">
          <button type="button" className="bg-transparent border border-orange-300 py-2 px-4 rounded-full mx-5 cursor-pointer transition-all duration-200 text-amber-900 hover:bg-amber-100 hover:border-amber-900">Registrarse</button>
        </Link>
      </div>

      <div className="md:row-start-2 md:row-end-7 flex flex-col justify-center items-start w-5/6 md:w-4/5 mx-auto">
        <h1 className="text-3xl md:text-4xl text-amber-950 font-(family-name:--font-merriweather) leading-tight">Bienvenido de vuelta</h1>
        <span className="text-amber-950/70 mt-1">Accede a tu cuenta y explora piezas hechas para iluminar momentos</span>
        <form className="flex flex-col w-full" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="email" className="text-amber-950/90 font-bold mt-2 md:mt-5">Correo electrónico</label>
          <input type="email" name="email" id="email" placeholder="nombre@ejemplo.com" required
            className="border border-stone-300 bg-stone-50 h-10 p-2.5 mt-1 rounded-lg transition-all duration-200 placeholder:text-amber-900/50 focus:outline-none focus:border-orange-600 focus:shadow-md focus:shadow-orange-500/30" />
          <label htmlFor="password" className="text-amber-950/90 font-bold mt-4">Contraseña</label>
          <input type="password" name="password" id="password" placeholder="Tu contraseña" required
            className="border border-stone-300 bg-stone-50 h-10 p-2.5 mt-1 rounded-lg transition-all duration-200 placeholder:text-amber-900/50 focus:outline-none focus:border-orange-600 focus:shadow-md focus:shadow-orange-500/30" />
          <div className="flex justify-between my-4 text-sm">
            <div className="flex items-center gap-1 text-amber-950/70">
              <input type="checkbox" name="remember" id="remember" className="cursor-pointer accent-orange-600" />
              <label htmlFor="remember" className="cursor-pointer">Recordarme</label>
            </div>
            <Link href="/forgot-password">
              <button type="button" className="text-orange-800 cursor-pointer hover:underline">Olvidé mi contraseña</button>
            </Link>
          </div>
          <input type="submit" value="Iniciar Sesión"
            className="bg-amber-900 text-white cursor-pointer rounded-lg h-10 font-bold transition-all duration-200 hover:bg-amber-950 hover:-translate-y-1 hover:shadow-lg" />
        </form>

        <div className="flex w-full flex-row justify-between items-center text-stone-400 text-xs mt-6">
          <span className="h-0.5 w-1/4 md:w-25 bg-orange-600/20"></span>
          <p className="tracking-widest">HECHO CON CARIÑO</p>
          <span className="h-0.5 w-1/4 md:w-25 bg-orange-600/20"></span>
        </div>
      </div>

    </AuthLayout>
  );
}
