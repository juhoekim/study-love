import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MathProblemCardProps {
    question: string;
    children: ReactNode; // HintSystem 및 AnswerInput을 받기 위함
}

export default function MathProblemCard({ question, children }: MathProblemCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="w-full max-w-lg mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden"
        >
            <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 p-8 text-center text-white relative flex justify-center items-center min-h-[220px]">
                {/* 장식용 원 */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full mix-blend-overlay"></div>
                    <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-white rounded-full mix-blend-overlay"></div>
                </div>

                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-md z-10 break-keep">
                    {question}
                </h2>
            </div>

            <div className="p-6 md:p-8 bg-white dark:bg-slate-900 flex flex-col items-center">
                {children}
            </div>
        </motion.div>
    );
}
