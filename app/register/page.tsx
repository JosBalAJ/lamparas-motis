"use client";

import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Register() {
    // Estados Visibilidad de Contraseñas
    const [showPassword, setPasswordVisibility] = useState(false);
    const [showConfirmPass, setConfirmPassVisibility] = useState(false);

    //Estados de Valores
    const [nameValue, setNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [confirmPassValue, setConfirmPassValue] = useState("");

    //Estados de Interfaz
    const [errorPassMessage, setPassErrorMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccesMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPassErrorMessage("");
        setErrorMessage("");
        setSuccesMessage("");

        if (passwordValue !== confirmPassValue) {
            setPassErrorMessage("Las contraseñas no coinciden. Por favor, verifícalas.");
            return;
        }
        if (passwordValue.length < 8) {
            setPassErrorMessage("La contraseña debe tener al menos 8 caracteres.");
            return;
        } else if (!/[A-Z]/.test(passwordValue)) {
            setPassErrorMessage("La contraseña debe incluir al menos una letra mayúscula.")
            return;
        } else if (!/[a-z]/.test(passwordValue)) {
            setPassErrorMessage("La contraseña debe incluir al menos una letra minúscula.")
            return;
        } else if (!/[0-9]/.test(passwordValue)) {
            setPassErrorMessage("La contraseña debe inlcuir al menos un número.")
            return;
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue)) {
            setPassErrorMessage("La contraseña debe incluir al menos un caracter especial.")
            return;
        }
        setIsLoading(true);

        try {
            const domainResponse = await fetch('/api/validate-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailValue })
            });
            const domainData = await domainResponse.json();

            if (!domainData.valid) {
                setErrorMessage(`Error de correo: ${domainData.message}. Usa un dominio válido.`);
                setIsLoading(false);
                return;
            }

            const { data, error } = await supabase.auth.signUp({
                email: emailValue,
                password: passwordValue,
                options: {
                    data: {
                        full_name: nameValue,
                    }
                }
            });

            if (error) {
                setErrorMessage(error.message);
            } else {
                setSuccesMessage("¡Cuenta creada con éxito!");
                setNameValue("");
                setEmailValue("");
                setPasswordValue("");
                setConfirmPassValue("");
            }
        } catch (error) {
            setErrorMessage("Ocurrió un error inesperado al conectar con el servidor.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout imageBg="/img/lamps/colibri-mariposa-ia.png">

            <div className="md:row-start-1 md:row-end-2 flex justify-center md:justify-end items-center text-stone-500 mb-6 md:mb-0">
                <span className="text-orange-900/70">¿Ya tienes cuenta?</span>
                <Link href="/">
                    <button className="bg-transparent border border-orange-300 py-2 px-4 rounded-full mx-5 cursor-pointer transition-all duration-200 text-amber-900 hover:bg-amber-100 hover:border-amber-900">Iniciar Sesión</button>
                </Link>
            </div>

            <div className="md:row-start-2 md:row-end-7 flex flex-col justify-center items-start w-5/6 md:w-4/5 mx-auto">
                <h1 className="text-3xl md:text-4xl text-amber-950 font-(family-name:--font-merriweather) leading-tight">Únete a Motis</h1>
                <span className="text-amber-950/70 mt-1">Crea tu cuenta para obtener tu lámpara ideal.</span>

                {errorPassMessage && (
                    <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mt-4" role="alert">
                        <span className="block sm:inline">{errorPassMessage}</span>
                    </div>
                )}
                {errorMessage && (
                    <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mt-4" role="alert">
                        <span className="block sm:inline">{errorMessage}</span>
                    </div>
                )}
                {successMessage && (
                    <div className="w-full bg-green-100 border border-green-400 text-gray-700 px-4 py-3 rounded-lg relative mt-4 text-sm" role="alert">
                        <span className="block sm:inline">{successMessage}</span>
                    </div>
                )}

                <form className="flex flex-col w-full" onSubmit={handleRegisterSubmit}>
                    <label htmlFor="name" className="text-amber-950/90 font-bold mt-2 md:mt-3">Nombre completo</label>
                    <input type="text" name="name" id="name" placeholder="Tu nombre" required value={nameValue} onChange={(e) => setNameValue(e.target.value)}
                        className="border border-stone-300 bg-stone-50 h-10 p-2.5 mt-1 rounded-lg transition-all duration-200 placeholder:text-amber-900/50 focus:outline-none focus:border-orange-600 focus:shadow-md focus:shadow-orange-500/30" />
                    <label htmlFor="email" className="text-amber-950/90 font-bold mt-2 md:mt-3">Correo electrónico</label>
                    <input type="email" name="email" id="email" placeholder="nombre@ejemplo.com" required value={emailValue} onChange={(e) => setEmailValue(e.target.value)}
                        className="border border-stone-300 bg-stone-50 h-10 p-2.5 mt-1 rounded-lg transition-all duration-200 placeholder:text-amber-900/50 focus:outline-none focus:border-orange-600 focus:shadow-md focus:shadow-orange-500/30" />
                    <label htmlFor="password" className="text-amber-950/90 font-bold mt-2 md:mt-3">Contraseña</label>
                    <div className="relative mt-1 w-full">
                        <input type={showPassword ? "text" : "password"} name="password" id="password" placeholder="Crea una contraseña segura" required value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)}
                            className={`border bg-stone-50 h-10 p-2.5 pr-10 w-full mt-1 rounded-lg transition-all duration-200 placeholder:text-amber-900/50 focus:outline-none focus:shadow-md focus:shadow-orange-500/30 ${errorPassMessage ? 'border-red-500 focus:border-red-500' : 'border-stone-300 focus:border-orange-600'}`} />
                        <button type="button" onClick={() => setPasswordVisibility(!showPassword)}
                            className="absolute right-3 top-6/11 -translate-y-1/2 text-amber-950/50 hover:text-amber-900 transition-colors focus:outline-none">
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <label htmlFor="confirm" className="text-amber-950/90 font-bold mt-2 md:mt-3">Confirmar contraseña</label>
                    <div className="relative mt-1 w-full">
                        <input type={showConfirmPass ? "text" : "password"} name="confirm" id="confirm" placeholder="Escribe de nuevo tu contraseña" required value={confirmPassValue} onChange={(e) => setConfirmPassValue(e.target.value)}
                            className={`border bg-stone-50 h-10 p-2.5 pr-10 w-full mt-1 rounded-lg transition-all duration-200 placeholder:text-amber-900/50 focus:outline-none focus:shadow-md focus:shadow-orange-500/30 ${errorPassMessage ? 'border-red-500 focus:border-red-500' : 'border-stone-300 focus:border-orange-600'}`} />
                        <button type="button" onClick={() => setConfirmPassVisibility(!showConfirmPass)}
                            className="absolute right-3 top-6/11 -translate-y-1/2 text-amber-950/50 hover:text-amber-900 transition-colors focus:outline-none">
                            {showConfirmPass ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <input type="submit" value={isLoading ? "Creando cuenta..." : "Crear cuenta"} disabled={isLoading}
                        className={`text-white rounded-lg h-10 font-bold transition-all duration-200 mt-6 ${isLoading ? 'bg-amber-900/50 cursor-not-allowed' : 'bg-amber-900 cursor-pointer hover:bg-amber-950 hover:-translate-y-1 hover:shadow-lg'}`} />
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