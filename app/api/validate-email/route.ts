import { NextResponse } from 'next/server';
import dns from 'dns/promises';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();
        
        if (!email || !email.includes('@')) {
            return NextResponse.json({ valid: false, message: 'Estructura inválida' }, { status: 400 });
        }

        const domain = email.split('@')[1];
        
        const mxRecords = await dns.resolveMx(domain);
        
        if (mxRecords && mxRecords.length > 0) {
            return NextResponse.json({ valid: true });
        } else {
            return NextResponse.json({ valid: false, message: 'El dominio no recibe correos' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ valid: false, message: 'El dominio no existe' }, { status: 404 });
    }
}