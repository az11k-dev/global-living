import {Suspense} from 'react';
import ReviewsPage from "@/app/reviews/ReviewsPage";

export default function ReviewPage() {
    return (
        <Suspense fallback={<div>Loading countries...</div>}>
            <ReviewsPage/>
        </Suspense>
    );
}
