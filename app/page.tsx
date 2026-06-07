'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { BookOpen, Users, Award, Sparkles, MessageCircle, Bell, TrendingUp } from 'lucide-react'

interface Chapter {
  id: number
  class: number
  subject: string
  chapter_num: number
  chapter_title: string
  pdf_url: string | null
}

export default function Home() {
  const [trending, setTrending] = useState<Chapter[]>([])
  const [totalChapters, setTotalChapters] = useState(0)
  const [totalClasses, setTotalClasses] = useState(0)
  const [totalSubjects, setTotalSubjects] = useState(0)

  useEffect(() => {
    supabase.from('ncert').select('*').then(({ data }) => {
      if (data) {
        setTrending(data.slice(0, 4))
        setTotalChapters(data.length)
        setTotalClasses(new Set(data.map(c => c.class)).size)
        setTotalSubjects(new Set(data.map(c => c.subject)).size)
      }
    })
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-pink-50 to-white py-20 px-4">
        <div className="absolute top-0 -right-32 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium text-orange-700 shadow-sm mb-6">
            <Sparkles size={16} className="text-orange-500" />
            India’s Most Loved Study Platform – 100% Free
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            Padhai Ki <span className="gradient-text">Sahi Raah</span> Dhundho
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto mt-4">
            NCERT Solutions, CBSE Papers, State Boards, Sarkari Naukri – ek jagah, free, Hindi + English.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link href="/ncert" className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105">
              Explore NCERT
            </Link>
            <Link href="/sarkari-naukri" className="border border-gray-300 bg-white px-8 py-3 rounded-full font-semibold text-gray-800 hover:bg-gray-50 transition">
              सरकारी नौकरी देखें
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-5 text-center shadow-sm card-hover">
            <BookOpen className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-3xl font-black">{totalChapters}+</div>
            <div className="text-sm text-gray-600">NCERT Chapters</div>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-5 text-center card-hover">
            <Users className="w-8 h-8 text-pink-600 mx-auto mb-2" />
            <div className="text-3xl font-black">{totalClasses}</div>
            <div className="text-sm text-gray-600">Classes Covered</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 text-center card-hover">
            <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-3xl font-black">{totalSubjects}</div>
            <div className="text-sm text-gray-600">Subjects</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5 text-center card-hover">
            <Sparkles className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-3xl font-black">100%</div>
            <div className="text-sm text-gray-600">Bilkul Free</div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { name: 'NCERT Solutions', icon: '📗', color: 'from-green-400 to-emerald-500', href: '/ncert' },
            { name: 'CBSE Papers', icon: '📘', color: 'from-blue-400 to-cyan-500', href: '/cbse' },
            { name: 'Results Live', icon: '🏆', color: 'from-yellow-400 to-amber-500', href: '/results' },
            { name: 'Sarkari Naukri', icon: '💼', color: 'from-indigo-400 to-purple-500', href: '/sarkari-naukri' },
            { name: 'ICSE / ISC', icon: '📙', color: 'from-pink-400 to-rose-500', href: '/icse' },
            { name: 'Worksheets', icon: '📋', color: 'from-teal-400 to-emerald-500', href: '/worksheets' },
            { name: 'Career Guide', icon: '🎓', color: 'from-orange-400 to-red-500', href: '/career' },
            { name: 'Study Tools', icon: '🛠️', color: 'from-violet-400 to-fuchsia-500', href: '/tools' },
          ].map(card => (
            <Link key={card.name} href={card.href}>
              <div className={`bg-gradient-to-br ${card.color} p-0.5 rounded-2xl shadow-md card-hover`}>
                <div className="bg-white rounded-2xl p-4 h-full flex flex-col items-center text-center">
                  <div className="text-4xl mb-2">{card.icon}</div>
                  <div className="font-bold text-gray-800">{card.name}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Trending + Sidebar */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-black flex items-center gap-2">
                <TrendingUp size={24} className="text-orange-500" />
                Trending This Week
              </h2>
              <Link href="/ncert" className="text-orange-500 text-sm font-semibold">Sab Dekhein →</Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {trending.map(ch => (
                <Link key={ch.id} href={`/chapter?class=${ch.class}&subject=${encodeURIComponent(ch.subject)}&chapter=${ch.chapter_num}`}>
                  <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm card-hover">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold px-2 py-1 rounded-full bg-orange-100 text-orange-700">NCERT Class {ch.class}</span>
                        <h3 className="font-bold mt-2">{ch.chapter_title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{ch.subject}</p>
                      </div>
                      <span className="text-2xl">📄</span>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs text-gray-400">Chapter {ch.chapter_num}</span>
                      <span className="text-orange-500 text-sm font-medium">Read →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24">
            <div className="flex items-center gap-2 border-b pb-3">
              <Bell className="w-5 h-5 text-orange-500" />
              <h3 className="font-bold text-lg">Latest Updates</h3>
              <span className="ml-auto text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
            </div>
            <div className="mt-3 space-y-3">
              <div className="p-2 rounded-xl hover:bg-orange-50 transition">
                <p className="font-medium">Bihar Board Class 10 Result Declared</p>
                <span className="text-xs text-red-500">🔴 Just now</span>
              </div>
              <div className="p-2 rounded-xl hover:bg-orange-50 transition">
                <p className="font-medium">JEE Mains 2026 Registration Open</p>
                <span className="text-xs text-gray-400">5 hours ago</span>
              </div>
              <div className="p-2 rounded-xl hover:bg-orange-50 transition">
                <p className="font-medium">NCERT New Textbooks 2025-26 Released</p>
                <span className="text-xs text-gray-400">Yesterday</span>
              </div>
            </div>
            <Link href="/news" className="block mt-4 text-center text-orange-500 text-sm font-medium">सभी News →</Link>
          </div>
        </div>

        {/* WhatsApp & Newsletter */}
        <div className="grid md:grid-cols-2 gap-6 mt-16">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageCircle size={40} className="bg-white/20 p-2 rounded-full" />
              <div>
                <h4 className="font-bold">Share on WhatsApp</h4>
                <p className="text-sm opacity-90">Apne dosto ke saath share karo</p>
              </div>
            </div>
            <button onClick={() => window.open('https://wa.me/?text=VidyaPath - Free Study Portal: https://vidyapath.in')} className="bg-white text-green-700 px-5 py-2 rounded-full font-semibold shadow-md">
              Share Now
            </button>
          </div>
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
            <h4 className="font-bold flex items-center gap-2"><Bell size={18} /> Free Alerts Subscribe</h4>
            <p className="text-sm text-white/80 mt-1">Result dates, new jobs – seedha inbox mein</p>
            <div className="flex gap-2 mt-3">
              <input type="email" placeholder="Your email" className="flex-1 px-4 py-2 rounded-full text-gray-800 outline-none" />
              <button className="bg-orange-500 px-5 py-2 rounded-full font-semibold hover:bg-orange-600">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}