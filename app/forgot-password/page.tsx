"use client";

import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
    const router = useRouter();

    // Estados para los valores de los inputs
    const [emailValue, setEmailValue] = useState("");
    const [codeValue, setCodeValue] = useState("");
    const [newPasswordValue, setNewPasswordValue] = useState("");

    // Estados de interfaz
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoadingCode, setIsLoadingCode] = useState(false);
    const [isLoadingConfirm, setIsLoadingConfirm] = useState(false);

    const handleSendCode = async () => {
        setErrorMessage("");
        setSuccessMessage("");

        if (!emailValue) {
            setErrorMessage("Por favor, ingresa tu correo primero.");
            return;
        }

        setIsLoadingCode(true);
        const { error } = await supabase.auth.resetPasswordForEmail(emailValue);

        if (error) {
            setErrorMessage("No pudimos enviar el código. Verifica que el correo sea correcto.");
        } else {
            setSuccessMessage("¡Código enviado! Revisa tu bandeja de entrada o spam.");
        }
        setIsLoadingCode(false);
    };

    const handleConfirmSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        if (!codeValue || !newPasswordValue) {
            setErrorMessage("Por favor, ingresa el código y tu nueva contraseña.");
            return;
        }

        if (newPasswordValue.length < 8) {
            setErrorMessage("La nueva contraseña debe tener al menos 8 caracteres.");
            return;
        } else if (!/[A-Z]/.test(newPasswordValue)) {
            setErrorMessage("La nueva contraseña debe incluir al menos una letra mayúscula.")
            return;
        } else if (!/[a-z]/.test(newPasswordValue)) {
            setErrorMessage("La nueva contraseña debe incluir al menos una letra minúscula.")
            return;
        } else if (!/[0-9]/.test(newPasswordValue)) {
            setErrorMessage("La nueva contraseña debe inlcuir al menos un número.")
            return;
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPasswordValue)) {
            setErrorMessage("La nueva contraseña debe incluir al menos un caracter especial.")
            return;
        }

        setIsLoadingConfirm(true);

        try {
            const { data, error: verifyError } = await supabase.auth.verifyOtp({
                email: emailValue,
                token: codeValue,
                type: 'recovery',
            });

            if (verifyError) {
                setErrorMessage("El código es incorrecto o ha expirado.");
                setIsLoadingConfirm(false);
                return;
            }

            const { error: updateError } = await supabase.auth.updateUser({
                password: newPasswordValue
            });

            if (updateError) {
                setErrorMessage(updateError.message);
            } else {
                setSuccessMessage("¡Luz encendida! Contraseña actualizada con éxito. Redirigiendo...");
                setTimeout(() => {
                    router.push("/");
                }, 2000);
            }
        } catch (error) {
            setErrorMessage("Ocurrió un error inesperado al conectar con el servidor.");
        } finally {
            setIsLoadingConfirm(false);
        }
    };

    return (
        <AuthLayout imageBg="/img/lamps/gato-ia.jpg">

            <div className="md:row-start-1 md:row-end-7 flex flex-col justify-center items-center w-5/6 md:w-4/5 mx-auto">
                <h1 className="text-3xl md:text-4xl text-amber-950 leading-tight font-(family-name:--font-merriweather) text-center">Volvamos a encender la luz</h1>
                <span className="text-amber-950/70 mt-2 text-center text-sm md:text-base">Enviaremos un código a tu correo electrónico para restablecer tu contraseña.</span>

                {errorMessage && (
                    <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mt-4 text-sm" role="alert">
                        <span className="block sm:inline">{errorMessage}</span>
                    </div>
                )}
                {successMessage && (
                    <div className="w-full bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mt-4 text-sm" role="alert">
                        <span className="block sm:inline">{successMessage}</span>
                    </div>
                )}

                <form className="flex flex-col w-full mt-2" onSubmit={handleConfirmSubmit}>
                    <label htmlFor="email" className="text-amber-950/90 font-bold mt-4">
                        <span className="text-xl bg-amber-200 px-3 py-0.5 mr-2 rounded-full">1</span>
                        Ingresa tu correo
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="nombre@ejemplo.com"
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        className="border border-stone-300 bg-stone-50 h-10 p-2.5 mt-2 rounded-lg transition-all duration-200 focus:outline-none focus:border-orange-600 focus:shadow-md focus:shadow-orange-500/30 w-full"
                    />

                    <button
                        type="button"
                        onClick={handleSendCode}
                        disabled={isLoadingCode}
                        className={`text-white rounded-lg h-10 w-40 my-4 mx-auto font-bold transition-all duration-200 
                            ${isLoadingCode ? 'bg-amber-900/50 cursor-not-allowed' : 'bg-amber-900 cursor-pointer hover:bg-amber-950 hover:-translate-y-1 hover:shadow-lg'}`}
                    >
                        {isLoadingCode ? "Enviando..." : "Enviar código"}
                    </button>

                    <label htmlFor="write-code" className="text-amber-950/90 font-bold mt-2 border-t border-stone-200 pt-6">
                        <span className="text-xl bg-amber-200 px-3 py-0.5 mr-2 rounded-full">2</span>
                        Introduce el código y tu nueva contraseña
                    </label>

                    <div className="flex flex-col md:flex-row gap-4 mt-2">
                        <input
                            type="text"
                            name="write-code"
                            id="write-code"
                            placeholder="XXX-XXX"
                            required
                            value={codeValue}
                            onChange={(e) => setCodeValue(e.target.value)}
                            className="border border-stone-300 bg-stone-50 h-10 p-2.5 text-center md:w-1/3 rounded-lg transition-all duration-200 tracking-widest placeholder:tracking-normal focus:outline-none focus:border-orange-600 focus:shadow-md focus:shadow-orange-500/30"
                        />
                        <input
                            type="password"
                            name="new-password"
                            id="new-password"
                            placeholder="Nueva contraseña"
                            required
                            value={newPasswordValue}
                            onChange={(e) => setNewPasswordValue(e.target.value)}
                            className="border border-stone-300 bg-stone-50 h-10 p-2.5 md:w-2/3 rounded-lg transition-all duration-200 focus:outline-none focus:border-orange-600 focus:shadow-md focus:shadow-orange-500/30"
                        />
                    </div>

                    <input
                        type="submit"
                        value={isLoadingConfirm ? "Procesando..." : "Confirmar y cambiar"}
                        disabled={isLoadingConfirm}
                        className={`text-white rounded-lg h-10 w-full md:w-80 mx-auto mt-8 font-bold transition-all duration-200 
                            ${isLoadingConfirm ? 'bg-amber-900/50 cursor-not-allowed' : 'bg-amber-900 cursor-pointer hover:bg-amber-950 hover:-translate-y-1 hover:shadow-lg'}`}
                    />
                </form>

                <Link href="/">
                    <button type="button" className="bg-transparent border border-orange-300 text-amber-950 cursor-pointer rounded-lg h-10 w-full md:w-80 mx-auto mt-4 transition-all duration-200 hover:bg-amber-100 hover:shadow-lg hover:border-amber-900">
                        Volver a iniciar sesión
                    </button>
                </Link>
            </div>

        </AuthLayout>
    );
}