import "dotenv/config";

export const usePromoCode = () => {


    const password = [
        process.env.NEXT_PROMO,
        process.env.NEXT_PROMO_RAMADAN,
        process.env.NEXT_PROMO_AID
    ];
    return password;
};