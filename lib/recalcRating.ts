import prisma from "@/lib/prisma";

export default async function recalcRating({
                                               cityId,
                                               countryId,
                                           }: {
    cityId?: number | null;
    countryId?: number | null;
}) {
    if (cityId) {
        const avg = await prisma.review.aggregate({
            where: {cityId},
            _avg: {rating: true},
        });

        await prisma.city.update({
            where: {id: cityId},
            data: {rating: avg._avg.rating || 0},
        });
    }

    if (countryId) {
        const avg = await prisma.review.aggregate({
            where: {countryId},
            _avg: {rating: true},
        });

        await prisma.country.update({
            where: {id: countryId},
            data: {rating: avg._avg.rating || 0},
        });
    }
}