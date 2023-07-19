import { Card as NextraCard } from 'nextra/components'

export const Card = (cardProps: Parameters<typeof NextraCard>[0]) => {
  return (
    <div className='my-4'>
      <NextraCard {...cardProps} />
    </div>
  )
}
