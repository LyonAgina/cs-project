"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {authClient} from "@/lib/auth-client"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function Page() {
  const {data: session} = authClient.useSession()
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <Button className="mt-2">Button</Button>
        </div>
            <Avatar>
      <AvatarImage src= {session?.user.image} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
      <AvatarBadge className="bg-green-600 dark:bg-green-800" />
    </Avatar>
        <div className="font-mono text-xs text-muted-foreground">
          {session?.user.name}
        </div>
        <Badge className="w-max">{session?.user.role}</Badge>
        
      </div>
    </div>
  )
}


