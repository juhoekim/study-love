import { motion } from 'framer-motion';

interface ProgressBarProps {
    current: number;
    total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
    const progressPercentage = (current / total) * 100;

    return (
        <div className="w-full max-w-lg mx-auto mb-8">
            <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                    오늘의 미션 진도율
                </span>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
                    {current} / {total}
                </span>
            </div>
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                <motion.div
                    className="h-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 rounded-full shadow-md"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                />
            </div>
            {current === total && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-green-500 font-semibold mt-2 text-sm"
                >
                    마지막 문제입니다! 파이팅! 🎉
                </motion.p>
            )}
        </div>
    );
}
