'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Chapter {
  id: number
  class: number
  subject: string
  chapter_num: number
  chapter_title: string
  pdf_url: string | null
}

export default function NCERTPage() {
  const [allChapters, setAllChapters] = useState<Chapter[]>([])
  const [selectedClass, setSelectedClass] = useState<number>(10)
  const [selectedSubject, setSelectedSubject] = useState<string>('Mathematics')
  const [subjects, setSubjects] = useState<string[]>([])
  const [filteredChapters, setFilteredChapters] = useState<Chapter[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('ncert').select('*').then(({ data }) => {
      if (data) setAllChapters(data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (allChapters.length) {
      const available = [...new Set(allChapters.filter(ch => ch.class === selectedClass).map(ch => ch.subject))]
      setSubjects(available)
      if (!available.includes(selectedSubject) && available.length) setSelectedSubject(available[0])
    }
  }, [selectedClass, allChapters])

  useEffect(() => {
    setFilteredChapters(allChapters.filter(ch => ch.class === selectedClass && ch.subject === selectedSubject))
  }, [selectedClass, selectedSubject, allChapters])

  if (loading) return <div className="p-8 text-center">Loading...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-2 text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-purple-600">Home</Link><span>›</span><span className="text-purple-600">NCERT</span>
      </div>
      <div className="bg-gradient-to-r from-green-800 to-green-600 text-white rounded-2xl p-6 mb-8">
        <h1 className="text-2xl font-bold">NCERT Solutions & Books</h1>
        <p className="text-green-100 mt-1">Class 1–12, all subjects – free.</p>
      </div>

      <div className="mb-6">
        <div className="font-semibold mb-2">Class Chunein</div>
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
          {Array.from({ length: 12 }, (_, i) => i + 1).map(cls => (
            <button key={cls} onClick={() => setSelectedClass(cls)} className={`py-2 px-3 rounded-lg text-sm font-medium ${selectedClass === cls ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}>
              {cls}
            </button>
          ))}
        </div>
      </div>

      {subjects.length > 0 && (
        <div className="mb-6">
          <div className="font-semibold mb-2">Subject</div>
          <div className="flex flex-wrap gap-2">
            {subjects.map(sub => (
              <button key={sub} onClick={() => setSelectedSubject(sub)} className={`px-4 py-1.5 rounded-full text-sm font-medium ${selectedSubject === sub ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}>
                {sub}
              </button>
            ))}
          </div>
        </div>
      )}

      {filteredChapters.map(ch => (
        <div key={ch.id} className="bg-white rounded-xl border p-4 mb-3 shadow-sm">
          <div className="font-bold text-lg">Chapter {ch.chapter_num}: {ch.chapter_title}</div>
          <div className="flex justify-between items-center mt-2">
            <Link href={`/chapter?class=${ch.class}&subject=${encodeURIComponent(ch.subject)}&chapter=${ch.chapter_num}`} className="text-purple-600 font-medium">
              View Solutions →
            </Link>
            {ch.pdf_url && <a href={ch.pdf_url} target="_blank" className="text-sm text-blue-600">📄 PDF</a>}
          </div>
        </div>
      ))}
    </div>
  )
}