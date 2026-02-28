'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import SuccessConfetti from '@/components/SuccessConfetti';
import { Gamepad2, Trophy, RotateCcw } from 'lucide-react';

export default function SuccessPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <SuccessConfetti />

            {/* 배경 장식 */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', bounce: 0.5, duration: 1 }}
                className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl text-center shadow-2xl"
            >
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="mx-auto bg-gradient-to-tr from-yellow-400 to-amber-600 w-24 h-24 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/50 mb-6"
                >
                    <Trophy size={48} className="text-white fill-current" />
                </motion.div>

                <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 drop-shadow-sm mb-4">
                    미션 성공!
                </h1>

                <p className="text-lg text-slate-200 font-medium mb-8">
                    오늘의 10문제를 모두 완수했습니다. <br />
                    자랑스러운 보상을 획득하세요!
                </p>

                <div className="bg-indigo-900/50 border border-indigo-500/30 rounded-2xl p-6 mb-8 transform hover:scale-105 transition-transform cursor-default">
                    <div className="flex items-center justify-center gap-3 text-indigo-200 mb-2">
                        <Gamepad2 size={24} />
                        <span className="font-semibold text-lg">획득 포인트</span>
                    </div>
                    <div className="text-5xl font-black text-indigo-400 drop-shadow-md">
                        +30 min
                    </div>
                    <p className="text-indigo-300 text-sm mt-2">게임 시간 보너스!</p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push('/')}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-indigo-500 hover:from-indigo-600 to-purple-600 hover:to-purple-700 text-white font-bold rounded-2xl shadow-lg transition-all"
                >
                    <RotateCcw size={20} />
                    홈으로 돌아가기
                </motion.button>
            </motion.div>
        </div>
    );
}
