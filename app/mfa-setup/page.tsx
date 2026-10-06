"use client";

import AuthLayout from "@/components/AuthLayout";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function MfaSetup() {
    const router = useRouter();

    const [qrCode, setQrCode] = useState("");
    const [factorId, setFactorId] = useState("");
    const [codeValue, setCodeValue] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const setupMfa = async () => {
            const { data, error } = await supabase.auth.mfa.enroll({
                factorType: 'totp'
            });

            if (error) {
                setErrorMessage("No se pudo generar el código QR. " + error.message);
                return;
            }

            setFactorId(data.id);
            setQrCode(data.totp.qr_code);
        };

        setupMfa();
    }, []);

    const handleVerifySetup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        if (codeValue.length < 6) {
            setErrorMessage("El código debe tener 6 dígitos.");
            return;
        }

        setIsLoading(true);

        try {
            const challenge = await supabase.auth.mfa.challenge({ factorId });

            if (challenge.error) {
                throw challenge.error;
            }

            const verify = await supabase.auth.mfa.verify({
                factorId,
                challengeId: challenge.data.id,
                code: codeValue
            });

            if (verify.error) {
                setErrorMessage("Código incorrecto. Intenta de nuevo.");
            } else {
                setSuccessMessage("¡Doble factor activado con éxito! Tu cuenta ahora es segura.");
                setTimeout(() => {
                    router.push("/");
                }, 2000);
            }
        } catch (error) {
            setErrorMessage("Ocurrió un error al verificar el código.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout imageBg="/img/lamps/reno-ia2.png">
            <div className="md:row-start-1 md:row-end-7 flex flex-col justify-center items-center w-5/6 md:w-4/5 mx-auto text-center">
                <h1 className="text-3xl md:text-4xl text-amber-950 leading-tight font-(family-name:--font-merriweather)">Protege tu luz</h1>
                <span className="text-amber-950/70 mt-2 text-sm md:text-base">
                    Escanea este código QR con tu aplicación de autenticación de Google Authenticator para habilitar el doble factor.
                </span>

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

                <div className="my-6 p-4 bg-white border-2 border-stone-200 rounded-xl shadow-sm">
                    {qrCode ? (
                        <div dangerouslySetInnerHTML={{ __html: qrCode }} className="w-48 h-48" />
                    ) : (
                        <div className="w-48 h-48 flex items-center justify-center text-stone-400">
                            Cargando QR...
                        </div>
                    )}
                </div>

                <form className="flex flex-col w-full items-center" onSubmit={handleVerifySetup}>
                    <label htmlFor="mfa-code" className="text-amber-950/90 font-bold mb-2">
                        Ingresa el código de 6 dígitos de tu app
                    </label>
                    <input
                        type="number"
                        name="mfa-code"
                        id="mfa-code"
                        placeholder="123456"
                        required
                        value={codeValue}
                        onChange={(e) => setCodeValue(e.target.value)}
                        className="border border-stone-300 bg-stone-50 h-12 p-2.5 text-center w-48 text-xl tracking-[0.5em] placeholder:tracking-normal rounded-lg transition-all duration-200 focus:outline-none focus:border-orange-600 focus:shadow-md focus:shadow-orange-500/30"
                    />

                    <input
                        type="submit"
                        value={isLoading ? "Verificando..." : "Activar Doble Factor"}
                        disabled={isLoading}
                        className={`text-white rounded-lg h-10 w-full md:w-80 mt-6 font-bold transition-all duration-200 
                            ${isLoading ? 'bg-amber-900/50 cursor-not-allowed' : 'bg-amber-900 cursor-pointer hover:bg-amber-950 hover:-translate-y-1 hover:shadow-lg'}`}
                    />
                </form>
            </div>
        </AuthLayout>
    );
}