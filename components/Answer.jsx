/**
Renders a component that displays a list of answer options for a quiz question.
@component
@param {Object} props - The component props.
@param {Array} props.answers - An array of answer options.
@param {string} props.questionId - The ID of the quiz question.
@returns {JSX.Element} The rendered component.
*/
'use client'

import { useEffect, useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { FiRepeat } from 'react-icons/fi';
import { BiError } from 'react-icons/bi';
import { FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const Answer = ({ answers, questionId }) => {
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let subscribed = true;
    if (selected) {
      setLoading(true);
      fetch(`/api/quiz/answer/${questionId}`)
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (subscribed) {
            setData(data);
          }
        });
    }
    return () => {
      console.log('cancelled!');
      subscribed = false;
    };
  }, [questionId, selected]);

  const getImageProps = () => {
    if (data && selected) {
      return data.correct === selected 
        ? { src: "/correct.png", width: 300, height: 300, message: "Congratulations! The day was saved thanks to you." } 
        : { src: "/wrong.png", width: 200, height: 200, message: "Oh no, try again!" };
    }
    return { src: "/quiz.png", width: 400, height: 400, message: "Make your choice!" };
  };

  const { src, width, height, message } = getImageProps();

  const sparkleVariants = {
    initial: { opacity: 0, scale: 0.3, x: 0, y: 0 },
    animate: {
      opacity: [0, 1, 0],
      scale: [0.2, 0.6, 0.2],
      x: ["0%", "20%", "-15%"],
      y: ["0%", "-20%", "15%"],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 0.5,
      },
    },
  };

  return (
    <>
      <ul className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {answers.map((item) => {
          const isLoading = selected === item && loading;
          const isWrong = selected === item && data && data?.correct !== selected;
          const isCorrect = data?.correct === item;

          return (
            <li key={item}>
              <button
                disabled={data || loading}
                onClick={() => setSelected(item)}
                className={cn(
                  'p-2 rounded-md items-center justify-between w-full flex text-gray-200 text-sm font-semibold disabled:cursor-not-allowed transition-all',
                  isLoading && 'animate-pulse',
                  isCorrect ? 'bg-slate-800' : isWrong ? 'bg-red-700' : 'bg-slate-800',
                  isCorrect && 'outline outline-green-500',
                )}
              >
                {item}
                {isCorrect && <FaCheck />}
                {isWrong && <BiError />}
              </button>
            </li>
          );
        })}
      </ul>
      {data?.random && (
        <Link
          href={`/quiz/${data.random}`}
          className="flex items-center gap-1 text-cyan-400"
        >
          <FiRepeat className="mt-1 text-gray-300" />
          Do it again
        </Link>
      )}
      <motion.div 
      variants={sparkleVariants}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.03, 1], opacity: [1, 0.6, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex flex-col items-center justify-center mt-6 text-center">
      
        {message && (
          <motion.p
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1], opacity: [1, 0.8, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="mt-4 mb-6 text-base md:text-lg font-normal text-gray-400 text-center whitespace-normal px-4"
          >
            {message}
          </motion.p>
        )}
        <div className="relative w-full h-96 md:h-auto">
        <Image src={src} alt="" width={width} height={height}
         className="object-cover w-full h-full"
         />
        </div>
      </motion.div>
    </>
  );
};
