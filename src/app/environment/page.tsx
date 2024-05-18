import { Heading } from '@/components/heading'
import { Text } from '@/components/text'
import { env } from '@/env'
import Link from 'next/link'

export default function EnvironmentPage() {
  const envMessage = env.NEXT_PUBLIC_ENVIRONMENT_MESSAGE
  const envAPIURL = env.NEXT_PUBLIC_API_BASE_URL

  return (
    <div className="h-screen w-screen grid place-items-center p-10">
      <div className="flex flex-col gap-2">
        <Heading className="text-green-400">{envMessage}</Heading>
        <Link href={envAPIURL}>
          <Text>{envAPIURL}</Text>
        </Link>
        <Link href={`${envAPIURL}/api/products`}>
          <Text>{`${envAPIURL}/api/products`}</Text>
        </Link>
      </div>
    </div>
  )
}
