import { Suspense } from 'react'
import ChapterContent from './ChapterContent'

export default function ChapterPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading chapter...</div>}>
      <ChapterContent />
    </Suspense>
  )
}