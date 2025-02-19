import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { promo } = await req.json(); // Récupérer le code promo envoyé par le client
        const token = process.env.PROMO_TOKEN; // Ton token sécurisé (non exposé au client)

        const response = await fetch("http://localhost:4000/api/promo", {
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (data.includes(promo)) {
            return NextResponse.json({ valid: true });
        }

        return NextResponse.json({ valid: false }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
