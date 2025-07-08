import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  links: {
    url: string | null
    label: string
    active: boolean
  }[]
}

export default function Pagination({ links }: PaginationProps) {
  return (
    <div className="flex justify-end mt-6 gap-2 flex-wrap">
      {links.map((link, idx) => {
        const label = link.label.replace("&laquo;", "«").replace("&raquo;", "»")
        return (
          <Button
            key={idx}
            size="sm"
            variant={link.active ? "default" : "outline"}
            asChild
            disabled={!link.url}
          >
            <Link href={link.url || "#"} dangerouslySetInnerHTML={{ __html: label }} />
          </Button>
        )
      })}
    </div>
  )
}
