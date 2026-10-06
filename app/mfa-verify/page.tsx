"use client";

import AuthLayout from "@/components/AuthLayout";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function MfaVerify() {
    const router = useRouter();
    const [codeValue, setCodeValue] = useState("");
    const [factorId, setFactorId] = useState("");
    
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getFactor = async () => {
            const { data, error } = await supabase.auth.mfa.listFactors();
            
            if (error || !data.totp || data.totp.length === 0) {
                setErrorMessage("No se encontró configuración de Doble Factor.");
                return;
            }
            setFactorId(data.totp[0].id);
        };
        getFactor();
    }, []);

    const handleVerifyLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
        setIsLoading(true);

        try {
            const challenge = await supabase.auth.mfa.challenge({ factorId });
            if (challenge.error) throw challenge.error;

            const verify = await supabase.auth.mfa.verify({
                factorId,
                challengeId: challenge.data.id,
                code: codeValue
            });

            if (verify.error) {
                setErrorMessage("Código incorrecto o expirado. Intenta de nuevo.");
            } else {
                setSuccessMessage("¡Verificación exitosa! Accediendo a Lámparas Motis...");
                setTimeout(() => {
                    router.push("/dashboard");
                }, 1500);
            }
        } catch (error) {
            setErrorMessage("Ocurrió un error al verificar el código.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout imageBg="/img/lamps/colibri-mariposa-ia.png">
            <div className="md:row-start-1 md:row-end-7 flex flex-col justify-center items-center w-5/6 md:w-4/5 mx-auto text-center">
                <h1 className="text-3xl md:text-4xl text-amber-950 leading-tight font-(family-name:--font-merriweather)">Verificación en 2 pasos</h1>
                <span className="text-amber-950/70 mt-2 text-sm md:text-base">
                    Por tu seguridad, ingresa el código de 6 dígitos generado por tu aplicación de autenticación.
                </span>

                {errorMessage && (
                    <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mt-6 text-sm" role="alert">
                        <span className="block sm:inline">{errorMessage}</span>
                    </div>
                )}
                {successMessage && (
                    <div className="w-full bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mt-6 text-sm" role="alert">
                        <span className="block sm:inline">{successMessage}</span>
                    </div>
                )}

                <form className="flex flex-col w-full items-center mt-8" onSubmit={handleVerifyLogin}>
                    <input 
                        type="number" 
                        name="mfa-code" 
                        id="mfa-code" 
                        placeholder="123456" 
                        required
                        value={codeValue}
                        onChange={(e) => setCodeValue(e.target.value)}
                        className={`border bg-stone-50 h-12 p-2.5 text-center w-48 text-xl tracking-[0.5em] placeholder:tracking-normal rounded-lg transition-all duration-200 focus:outline-none focus:shadow-md focus:shadow-orange-500/30 ${errorMessage ? 'border-red-500 focus:border-red-500' : 'border-stone-300 focus:border-orange-600'}`}
                    />

                    <input 
                        type="submit" 
                        value={isLoading ? "Comprobando..." : "Acceder"} 
                        disabled={isLoading}
                        className={`text-white rounded-lg h-10 w-full md:w-80 mt-8 font-bold transition-all duration-200 
                            ${isLoading ? 'bg-amber-900/50 cursor-not-allowed' : 'bg-amber-900 cursor-pointer hover:bg-amber-950 hover:-translate-y-1 hover:shadow-lg'}`}
                    />
                </form>
            </div>
        </AuthLayout>
    );
}