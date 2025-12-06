import {Suspense} from 'react';
import BrowseCitiesContent from './BrowseCitiesContent';

export default function BrowseCitiesPage() {
    return (
        <Suspense fallback={<div>Loading cities...</div>}>
            <BrowseCitiesContent/>
        </Suspense>
    );
}
