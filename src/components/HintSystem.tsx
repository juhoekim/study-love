import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ChevronRight } from 'lucide-react';

interface HintSystemProps {
    hints: string[];
}

export default function HintSystem({ hints }: HintSystemProps) {
    const [visibleHints, setVisibleHints] = useState<number>(0);

    // 문제가 바뀔 때(hints 배열이 바뀔 때) 힌트 초기화
    useEffect(() => {
        setVisibleHints(0);
    }, [hints]);

    const handleShowHint = () => {
        if (visibleHints < hints.length) {
            setVisibleHints(prev => prev + 1);
        }
    };

    return (
        <div className="w-full mt-6 flex flex-col items-center">
            {visibleHints < hints.length && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShowHint}
                    className="flex items-center gap-2 px-6 py-3 bg-amber-100 hover:bg-amber-200 text-amber-800 font-semibold rounded-full shadow-sm transition-colors mb-4"
                >
                    <Lightbulb size={20} className="text-amber-500" />
                    힌트 보기 ({visibleHints}/{hints.length})
                </motion.button>
            )}

            <div className="w-full space-y-3">
                <AnimatePresence>
                    {hints.slice(0, visibleHints).map((hint, index) => {
                        const parts = hint.split(/(\w+\^\w+)/g);
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: -10, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex items-start gap-4 shadow-sm"
                            >
                                <div className="flex-shrink-0 mt-1">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-400 text-white text-xs font-bold shadow-inner">
                                        {index + 1}
                                    </span>
                                </div>
                                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                                    {parts.map((part, pIndex) => {
                                        if (part.includes('^')) {
                                            const [base, exp] = part.split('^');
                                            return (
                                                <span key={pIndex}>
                                                    {base}<sup>{exp}</sup>
                                                </span>
                                            );
                                        }
                                        return <span key={pIndex}>{part}</span>;
                                    })}
                                </p>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
