/**
Renders a Next.js page component that displays a quiz introduction with an image and a link to start the quiz.
@component
@returns {JSX.Element} The rendered page component.
*/

"use client"

import { Container } from '@/components';
import Image from 'next/image';
import Link from 'next/link';
import { endpoint } from '@/utils/endpoint';
import { TbArrowBigRightFilled } from 'react-icons/tb';
import { motion } from 'framer-motion';

export async function getRandomQuizQuestion() {
  const data = await fetch(`${endpoint}/quiz/random`, { cache: 'no-store' });

  if (!data.ok) {
    throw new Error('Failed to fetch data');
  }

  return data.json();
}

export default async function Page() {
  const data = await getRandomQuizQuestion();

  const sparkleVariants = {
    initial: { opacity: 0, scale: 0.3, x: 0, y: 0 },
    animate: {
      opacity: [0, 1, 0],
      scale: [0.3, 0.8, 0.3],
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
      <Container
        as="main"
        className="flex flex-col gap-5 py-5 md:flex-row-reverse md:justify-between"
      >
        <div className="relative overflow-hidden rounded-2xl">
          <div className="md:w-[24rem]">
            <Image src="/wallpaper.jpg" alt="" width={700} height={700} />
          </div>
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent md:bg-gradient-to-r"></div>
        </div>

        <div className="md:w-[50%] flex flex-col gap-5">
          <h1 className="text-2xl font-semibold text-white">Cartoon Network Quiz</h1>
          <p className="text-sm leading-6 text-gray-300">
            Do you like Cartoon Network? Test how much you know about the world of Cartoon Network! From classic characters to unforgettable episodes.
          </p>
          <Link
            href={`/quiz/${data.randomQuestion}`}
            className="flex items-center justify-center gap-1 px-5 py-4 font-semibold text-fuchsia-500 transition-colors rounded-md outline duration-600 hover:bg-fuchsia-950"
          >
            <TbArrowBigRightFilled className="text-lg" />
            Take a Quiz Now!
          </Link>
        </div>
      </Container>

      <div className="relative flex items-center justify-center mt-4">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1], opacity: [1, 0.8, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/classics.png" alt="Brilhante" width={500} height={200} />
        </motion.div>

        {[...Array(15)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-0.5 h-0.5 rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            variants={sparkleVariants}
            initial="initial"
            animate="animate"
          />
        ))}
      </div>
    </>
  );
}
