'use client';

import { useRouter } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
import { PlayCircle, Brain, Target, Star } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' } }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">

      {/* 배경 장식 원형들 */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-200 dark:bg-indigo-900/40 rounded-full blur-2xl opacity-60"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-200 dark:bg-purple-900/40 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-indigo-100 dark:border-indigo-800/30 rounded-full opacity-50"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="z-10 w-full max-w-lg flex flex-col items-center text-center"
      >
        <motion.div variants={itemVariants} className="w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-3xl rotate-12 flex items-center justify-center shadow-xl mb-8 border-4 border-white dark:border-slate-800">
          <Brain size={48} className="text-white -rotate-12" />
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl font-extrabold text-slate-800 dark:text-slate-100 mb-4 tracking-tight drop-shadow-sm">
          오늘의 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">수학 미션</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-lg text-slate-600 dark:text-slate-400 mb-10 font-medium">
          하루 10문제만 풀면 특별한 보상이 기다리고 있어요! 🎮
        </motion.p>

        <motion.div variants={itemVariants} className="w-full grid grid-cols-2 gap-4 mb-10">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center hover:shadow-md transition-shadow">
            <Target className="text-rose-500 mb-2" size={28} />
            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">오늘의 목표</div>
            <div className="text-xl font-bold text-slate-800 dark:text-slate-200">10 문제</div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center hover:shadow-md transition-shadow">
            <Star className="text-amber-500 mb-2" size={28} />
            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">완료 보상</div>
            <div className="text-xl font-bold text-slate-800 dark:text-slate-200">게임 30분</div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="w-full flex flex-col sm:flex-row gap-4 mt-2">
          <button
            onClick={() => router.push('/play?user=son')}
            className="flex-1 px-4 py-5 bg-gradient-to-r from-blue-500 hover:from-blue-600 to-indigo-500 hover:to-indigo-600 text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 drop-shadow active:scale-95"
          >
            👦 수한 (중2 수학)
          </button>

          <button
            onClick={() => router.push('/play?user=daughter')}
            className="flex-1 px-4 py-5 bg-gradient-to-r from-pink-400 hover:from-pink-500 to-rose-400 hover:to-rose-500 text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 drop-shadow active:scale-95"
          >
            👧 지유 (초6 수학)
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
