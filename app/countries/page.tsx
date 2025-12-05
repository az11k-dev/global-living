import { Suspense } from 'react';
import BrowseCountriesContent from './BrowseCountriesContent';

export default function BrowseCountriesPage() {
  return (
    <Suspense fallback={<div>Loading countries...</div>}>
      <BrowseCountriesContent />
    </Suspense>
  );
}
