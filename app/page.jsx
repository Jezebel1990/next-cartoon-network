/**

Renders a Next.js page component that displays a grid of character avatars with links to individual character pages.
@component
@returns {JSX.Element} The rendered page component.
*/

"use client"

import { Container } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { getAllCharacters } from '@/lib/characters'
import { motion, useSpring, useTime, useTransform } from "framer-motion"
import { useEffect, useState } from 'react'

export default function Page() {
  const [data, setData] = useState(null)
  const time = useTime()

  const rotate = useTransform(time, [0, 3000], [0, 360], {
    clamp: false,
  })

  const rotatingBg = useTransform(rotate, (r) => {
    return `conic-gradient(from ${r}deg, #ff4545, #00ff99, #006aff, #ff0095, #ff4545)`
  })

  const pulse = useSpring(0, { damping: 0, mass: 5, stiffness: 10 })
  const pulsingBg = useTransform(pulse, (r) => {
    return `scale(${1 + r / 100})`  
  })

  useEffect(() => {
    pulse.set(10)
    const fetchData = async () => {
      const charactersData = await getAllCharacters()
      setData(charactersData)
    }
    fetchData()
  }, [pulse])

  return (
    <main>
      <Container className="grid grid-cols-2 gap-1 py-5 md:grid-cols-3 lg:grid-cols-4">
        {data?.characters?.map(item => {
          return (
            <Link
              href={`/characters/${item.slug}`}
              key={item.name}
              className="overflow-hidden"
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-md"
                  style={{
                    background: rotatingBg,
                    zIndex: -1,
                    borderRadius: 'inherit',
                    scale: pulsingBg,
                  }}
                />
                <div className="p-[4px] overflow-hidden rounded-md">
                  <Image
                    src={item.avatar}
                    alt=""
                    className="transition-all duration-500 hover:scale-110 hover:-rotate-2 rounded-md"
                    width={500}
                    height={500}
                  />
                </div>
              </div>
            </Link>
          )
        })}
      </Container>
    </main>
  )
}
