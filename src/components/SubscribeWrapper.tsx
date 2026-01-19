import { Suspense } from 'react';
import Subscribe from './Subscribe';

export default function SubscribeWrapper() {
  return (
    <Suspense fallback={<div>Loading subscribe form...</div>}>
      <Subscribe isModel={false}/>
    </Suspense>
  );
}