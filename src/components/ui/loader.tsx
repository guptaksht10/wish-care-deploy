import { Loader2 } from "lucide-react"

export function Loader({ text }: { text?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 text-muted-foreground">
      <Loader2 className="h-5 w-5 animate-spin text-purple-600" />
      {text && <span>{text}</span>}
    </div>
  )
}
