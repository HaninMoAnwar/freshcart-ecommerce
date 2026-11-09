import { Review } from "@/interfaces/products.interface";

interface RatingBreakdown {
  stars: number;
  count: number;
  percentage: string; // Ready to be passed to Tailwind "width: percentage"
}


export function currencyHandler(price: number) {

    return new Intl.NumberFormat(
        "de-DE", { style: "currency", currency: "EGP" })
        .format(
            price,
        )
}
export function salePrecentageHandler(originalPrice:number, newPrice:number){
    
    return -((1 - (newPrice /originalPrice)) *100).toFixed(0);
}

export function calculateReviewStats(reviews: Review[]): RatingBreakdown[] {
    const totalReviews = reviews.length;

    // 1. Return safe defaults if there are no reviews yet to avoid division by zero
    if (totalReviews === 0) {
        return [5, 4, 3, 2, 1].map(stars => ({ stars, count: 0, percentage: "0%" }))
        ;
    }

    // 2. Initialize a dictionary count map for stars 1 to 5
    const countMap: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let totalRatingSum = 0;

    // 3. Loop through all reviews to aggregate totals
    reviews.forEach((item) => {
        const r = item.rating;
        if (r >= 1 && r <= 5) {
            countMap[r] += 1;
            totalRatingSum += r;
        }
    });// 4. Calculate the general average rating score
    const averageRating = (totalRatingSum / totalReviews).toFixed(1);

    // 5. Build the final ordered array breakdown from 5 stars down to 1 star
    const breakdown: RatingBreakdown[] = [5, 4, 3, 2, 1].map((stars) => {
        const count = countMap[stars];
        const percentage = `${((count / totalReviews) * 100).toFixed(0)}%`;

        return {
            stars,
            count,
            percentage
        };
    });

    return breakdown;
}