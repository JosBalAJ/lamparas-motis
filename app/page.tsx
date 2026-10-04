"use client";

import Link from "next/link"

export default function Home() {
  return (
    <main className="bg-amber-900 min-h-screen flex justify-center items-center p-4 font-(family-name:--font-montserrat)">
      <div className="w-full max-w-6xl min-h-1 rounded-3xl flex flex-col md:flex-row bg-white overflow-hidden shadow-2xl">
        <div className="bg-orange-200 w-full h-64 md:w-1/2 md:h-auto bg-[url('/img/lamps/reno-ia2.png')] bg-cover bg-no-repeat bg-center flex flex-col items-start justify-between pb-4 md:pb-0 rounded-t-3xl md:rounded-l-3xl">
          <div className="grid grid-cols-[auto_1fr] gap-3 text-white mt-5 mx-5 md:ml-5 bg-black/60 rounded-xl p-2.5 items-center">
            <div className="w-20 h-20 bg-[url('/img/img-logo.jpg')] bg-cover bg-center rounded-xl"></div>
            <div className="flex flex-col justify-center font-['var(--font-merriweather)'] pr-2">
              <h1 className="text-4xl font-black">MOTIS</h1>
              <h2 className="text-2xl italic">Iluminación Artesanal</h2>
            </div>
          </div>
          <div className="text-white text-xl md:text-2xl mx-5 md:mr-12 mb-5 bg-black/45 rounded-xl p-3 font-(family-name:--font-merriweather)">
            <h1>Piezas únicas. Materiales nobles. Luz con historia.</h1>
          </div>
        </div>

        <div className="bg-white w-full md:w-1/2 h-full flex flex-col justify-between py-6 md:grid md:grid-cols-1 md:grid-rows-7 text-sm">
          <div className="md:row-start-1 md:row-end-2 flex justify-center md:justify-end items-center text-stone-500 mb-6 md:mb-0">
            <span className="text-orange-900/70">¿Aún no tienes cuenta?</span>
            <Link href="/register">
              <button type="button" className="bg-transparent border border-orange-300 py-2 px-4 rounded-full mx-5 cursor-pointer transition-all duration-200 text-amber-900 hover:bg-orange-300/50 hover:border-amber-900">Registrarse</button>
            </Link>
          </div>

          <div className="md:row-start-2 md:row-end-7 flex flex-col justify-center items-start w-5/6 md:w-4/5 mx-auto">
            <h1 className="text-3xl md:text-4xl text-amber-950 font-['var(--font-merriweather)'] leading-tight">Bienvenido de vuelta</h1>
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
                <button type="button" className="text-orange-800 cursor-pointer hover:underline">Olvidé mi contraseña</button>
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

          <div className="md:row-start-7 md:row-end-8 flex items-center justify-center md:justify-start w-4/5 mx-auto text-xs text-stone-400 gap-4 mt-8 md:mt-0">
            <span>@ 2026 Lámparas Motis</span>
            <Link href="/" className="hover:text-amber-900 transition-colors">Privacidad</Link>
            <Link href="/" className="hover:text-amber-900 transition-colors">Ayuda</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
