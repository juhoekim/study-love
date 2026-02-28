import { useState, KeyboardEvent, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

interface AnswerInputProps {
    onSubmit: (answer: string) => void;
    isCorrect: boolean | null;
}

export default function AnswerInput({ onSubmit, isCorrect }: AnswerInputProps) {
    const [value, setValue] = useState('');

    // isCorrect 렌더링에 따라 입력폼 초기화 또는 잠금 처리
    useEffect(() => {
        if (isCorrect === null) {
            setValue('');
        }
    }, [isCorrect]);

    const handleSubmit = () => {
        if (value.trim() === '') return;
        onSubmit(value.trim());
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const isWrong = isCorrect === false;
    const isCorrectState = isCorrect === true;

    return (
        <div className="w-full mt-6">
            <div className="relative flex items-center justify-center max-w-sm mx-auto">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isCorrectState}
                    placeholder="정답을 입력하세요"
                    className={`w-full py-4 pl-6 pr-14 text-center text-xl font-bold bg-white dark:bg-slate-800 border-2 rounded-2xl shadow-sm focus:outline-none transition-all placeholder:text-gray-400 placeholder:font-normal placeholder:text-base ${isWrong
                        ? 'border-red-400 focus:border-red-500 text-red-600 bg-red-50 focus:ring-4 focus:ring-red-100'
                        : isCorrectState
                            ? 'border-green-400 text-green-600 bg-green-50'
                            : 'border-slate-200 dark:border-slate-600 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 text-slate-800 dark:text-slate-100'
                        }`}
                />

                {!isCorrectState && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSubmit}
                        disabled={value.trim() === ''}
                        className={`absolute right-2 p-2 rounded-xl text-white transition-colors ${value.trim() === '' ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600 shadow-md'
                            }`}
                    >
                        <Send size={20} className="ml-1" />
                    </motion.button>
                )}
            </div>

            <div className="h-6 mt-2 text-center">
                {isWrong && (
                    <motion.p
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-red-500 font-semibold"
                    >
                        앗, 틀렸어요. 힌트를 확인하고 다시 도전해볼까요? 💪
                    </motion.p>
                )}
                {isCorrectState && (
                    <motion.p
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-green-500 font-semibold"
                    >
                        정답입니다! 너무 잘했어요! ⭐
                    </motion.p>
                )}
            </div>
        </div>
    );
}
