'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { generateDailyProblems, MathProblem } from '@/lib/mathProblems';
import ProgressBar from '@/components/ProgressBar';
import MathProblemCard from '@/components/MathProblemCard';
import HintSystem from '@/components/HintSystem';
import AnswerInput from '@/components/AnswerInput';
import { motion, AnimatePresence } from 'framer-motion';
import { Home } from 'lucide-react';

function PlayContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const userType = (searchParams.get('user') as 'son' | 'daughter') || 'son';

    const [problems, setProblems] = useState<MathProblem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    useEffect(() => {
        // 클라이언트 마운트 시 문제 생성
        setProblems(generateDailyProblems(userType));
    }, [userType]);

    if (problems.length === 0) {
        return (
            <div className="flex bg-slate-50 dark:bg-slate-900 justify-center items-center min-h-screen">
                <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const currentProblem = problems[currentIndex];

    const handleAnswerSubmit = (answer: string) => {
        // 띄어쓰기 제거나 포맷 일치 검사 (간단하게 등호 체크)
        const isAnswerCorrect = answer === currentProblem.answer;

        setIsCorrect(isAnswerCorrect);

        if (isAnswerCorrect) {
            setTimeout(() => {
                if (currentIndex < problems.length - 1) {
                    setCurrentIndex(prev => prev + 1);
                    setIsCorrect(null);
                } else {
                    // 모든 문제를 다 풂
                    router.push('/success');
                }
            }, 1500); // 정답 표출 후 1.5초 대기
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center pt-12 px-4 sm:px-6 relative">
            <button
                onClick={() => router.push('/')}
                className="absolute top-4 left-4 p-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800"
                title="메인 페이지로 이동"
            >
                <Home className="w-5 h-5" />
                <span className="text-sm font-medium hidden sm:inline">메인으로</span>
            </button>

            <ProgressBar current={currentIndex} total={problems.length} />

            <div className="w-full mt-4 flex-grow max-w-lg">
                <AnimatePresence mode="wait">
                    <MathProblemCard key={currentProblem.id} question={currentProblem.question}>
                        <HintSystem hints={currentProblem.hints} />
                        <AnswerInput onSubmit={handleAnswerSubmit} isCorrect={isCorrect} />
                    </MathProblemCard>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default function PlayPage() {
    return (
        <Suspense fallback={
            <div className="flex bg-slate-50 dark:bg-slate-900 justify-center items-center min-h-screen">
                <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <PlayContent />
        </Suspense>
    );
}
