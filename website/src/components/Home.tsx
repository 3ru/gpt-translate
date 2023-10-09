import Link from 'next/link'
import Image from 'next/image'

export const Home = () => {
  return (
    <div
      className={[
        'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 lg:pt-32 text-center',
        'min-h-[calc(100vh-14.5rem)]',
      ].join(' ')}
    >
      <h1 className='mx-auto max-w-5xl font-display text-5xl font-medium tracking-tight text-slate-100 dark:text-slate-200 sm:text-7xl drop-shadow-2xl'>
        Code&apos;s{' '}
        <span className='relative whitespace-nowrap text-transparent bg-clip-text bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-sky-500 to-emerald-400'>
          Universal.
        </span>
        <br />
        Shouldn&apos;t Your
        <span className='relative whitespace-nowrap text-transparent bg-clip-text bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-400 to-rose-500'>
          {' Docs '}
        </span>
        Be?
      </h1>
      <p className='mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-200 dark:text-slate-300 drop-shadow-2xl'>
        Break language barriers with AI. GPT-Translate turns your docs into a
        multilingual masterpiece, effortlessly catering to developers worldwide.
      </p>
      <div className='mt-10 flex justify-center gap-x-6'>
        <Link
          href='/docs/overview/getting-started'
          className='rounded-xl bg-sky-50 dark:bg-gray-800 px-6 py-3 font-semibold text-sky-600 dark:text-sky-100 shadow-sm hover:opacity-80'
        >
          Get Started
        </Link>
      </div>
      <Image
        src='/book-world.png'
        alt='earth image'
        className='absolute inset-0 mt-0 object-cover -z-10 w-full h-full filter brightness-90 dark:brightness-50 blur-sm dark:blur-0'
        fill
      />
    </div>
  )
}
