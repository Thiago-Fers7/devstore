'use client'

import { Skeleton } from '@/components/skeleton'
import { ResultsMessage } from './results-messages'
import { Suspense } from 'react'

export default function Loading() {
  return (
    <div className="flex flex-col gap-4">
      <Suspense fallback={null}>
        <ResultsMessage />
      </Suspense>

      <div className="grid grid-cols-3 gap-6">
        {new Array(6).fill(null).map((_, index) => (
          <Skeleton key={index} className="h-[430px]" />
        ))}
      </div>
    </div>
  )
}
