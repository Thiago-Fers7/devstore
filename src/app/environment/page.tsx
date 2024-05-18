import { Heading } from '@/components/heading'
import { env } from '@/env'

export default function EnvironmentPage() {
  const envMessage = env.NEXT_PUBLIC_ENVIRONMENT_MESSAGE

  return (
    <div className="h-screen w-screen grid place-items-center p-10">
      <Heading>{envMessage}</Heading>
    </div>
  )
}
