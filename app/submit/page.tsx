import {Suspense} from 'react';
import Submit from "@/app/submit/SubmitReview";

export default function olma() {
    return (
        <Suspense fallback={<div>Loading countries...</div>}>
                <Submit/>
        </Suspense>
    );
}
