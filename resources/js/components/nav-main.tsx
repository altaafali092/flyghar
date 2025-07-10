"use client"

import { useEffect, useState } from "react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight } from "lucide-react"
import { usePage, Link } from "@inertiajs/react"
import { NavItem } from "@/types"

export function NavMain({ items, label }: { items: NavItem[]; label: string }) {
  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => (
          <RecursiveNavItem key={index} item={item} depth={0} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

function RecursiveNavItem({ item, depth }: { item: NavItem; depth: number }) {
  const [open, setOpen] = useState(false)
  const hasChildren = item.items && item.items.length > 0
  const Icon = item.icon
  const page = usePage()

  const isActive =
    page.url === item.href ||
    page.url.startsWith(item.href + "/") ||
    (hasChildren && item.items?.some(child => page.url.startsWith(child.href)))

  useEffect(() => {
    if (isActive && hasChildren) setOpen(true)
  }, [isActive, hasChildren])

  const baseClasses =
    "text-sm px-3 py-1.5 rounded-md transition-colors duration-150 flex items-center gap-2 w-full text-left"
  const activeClasses = "bg-muted text-primary font-medium"
  const hoverClasses = "text-muted-foreground hover:bg-muted hover:text-primary"

  const paddingLeft = `${depth * 16 + 12}px`

  if (!hasChildren) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild tooltip={{ children: item.title }}>
          <Link
            href={item.href}
            className={`${baseClasses} ${isActive ? activeClasses : hoverClasses}`}
            style={{ paddingLeft }}
            prefetch
          >
            {Icon && <Icon className="w-4 h-4 shrink-0" />}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <SidebarMenuItem>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            asChild
            tooltip={{ children: item.title }}
            className={`${baseClasses} ${isActive ? activeClasses : hoverClasses}`}
            style={{ paddingLeft }}
          >
            <button>
              <div className="flex items-center gap-2 w-full justify-between">
                <span className="flex items-center gap-2">
                  {Icon && <Icon className="w-4 h-4 shrink-0" />}
                  <span>{item.title}</span>
                </span>
                {open ? (
                  <ChevronDown className="w-4 h-4 shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 shrink-0" />
                )}
              </div>
            </button>
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-1 space-y-1">
          {item.items!.map((child, idx) => (
            <RecursiveNavItem key={idx} item={child} depth={depth + 1} />
          ))}
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}
