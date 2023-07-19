import { ReactNode } from 'react'
import { H4 } from '@/components/heading/H4'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

type BeforeAfterProps = {
  before: ReactNode
  after: ReactNode
}
export const BeforeAfter = ({ before, after }: BeforeAfterProps) => {
  return (
    <div className='flex justify-between max-w-lg'>
      <figure>
        <H4 title='Before' />
        {before}
      </figure>

      <div className='mt-24'>
        <ArrowLongRightIcon className='w-8 h-8' />
      </div>

      <figure>
        <H4 title='After' />
        {after}
      </figure>
    </div>
  )
}
