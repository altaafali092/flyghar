import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "@inertiajs/react"
import { LayoutGrid, Users2Icon, LucideUserSquare2, Plus, UserCheck, UserPlus, UserCheck2Icon, UserCircle, Logs, Minus, ReceiptIndianRupee, FilePlus2, PlusCircleIcon, BadgeIndianRupee, FileSpreadsheetIcon, MusicIcon, FileAxis3D, Mail, MailPlus, MessageCircle, CalendarPlus, PhoneCall, Settings2, Cog, Wrench, LaptopMinimalCheck, LaptopMinimal, Receipt, ReceiptText, LucideUser2, UserCogIcon } from "lucide-react"
import AppLogo from "./app-logo"
import { NavUser } from "@/components/nav-user"
import { NavMain } from "@/components/nav-main"
import { type NavItem } from "@/types"

const mainNavItems: NavItem[] = [
    {
        title: "Dashboard",
        href: route("dashboard"),
        icon: LayoutGrid,
    },
    {
        title: "Students",
        href: "#",
        icon: Users2Icon,
        items: [
            {
                title: "Inquiries",
                href: '#',
                icon: Plus,
                items: [
                    {
                        title: "New Inquiry",
                        href: "#",
                        icon: UserPlus
                    },
                    {
                        title: "All Inquiries",
                        href: "#",
                        icon: UserCheck2Icon
                    },
                ]
            },
            {
                title: "Our Students",
                href: '#',
                icon: UserCheck,
                items: [
                    {
                        title: "New Student",
                        href: "#",
                        icon: UserPlus
                    },
                    {
                        title: "All Students",
                        href: "#",
                        icon: UserCircle
                    },
                ]
            },

        ],
    },
    {
        title: "Students Activity",
        href: '#',
        icon: Logs,
        items: [
            {
                title: "General Pack",
                href: "#",
                icon: Minus
            },
            {
                title: "Miscellaneous Pack",
                href: "#",
                icon: Minus
            },
        ]
    },
]


const accountNavItems: NavItem[] = [
    {
        title: "Bills",
        href: '#',
        icon: ReceiptIndianRupee,
        items: [
            {
                title: "New Bill",
                href: route("staff.index"),
                icon: PlusCircleIcon,
            },
            {
                title: "All Bills",
                href: '#',
                icon: BadgeIndianRupee,
            }
        ]
    },
    {
        title: "Voucher Entry",
        href: route("staff.index"),
        icon: FilePlus2,
    },

]
const reportNavItems: NavItem[] = [
    {
        title: "Student Reports",
        href: '#',
        icon: FileSpreadsheetIcon,
        items: [
            {
                title: "All Reports of Student",
                href: route("staff.index"),
                icon: Minus,
            },
            {
                title: "Due Report",
                href: '#',
                icon: BadgeIndianRupee
            }
        ]
    },
    {
        title: "Account Report",
        href: route("staff.index"),
        icon: FileAxis3D,
        items: [
            {
                title: 'Sub Ledger Report',
                href: route("staff.index"),
                icon: Minus
            },
            {
                title: 'Ledger Report',
                href: route("staff.index"),
                icon: Minus
            },
            {
                title: 'Trial Balance Report',
                href: route("staff.index"),
                icon: Minus
            },
            {
                title: 'Profit & Loss Report',
                href: route("staff.index"),
                icon: Minus
            }
        ]
    },

]

const managementNavItems: NavItem[] = [
    {
        title: "SMS-Mail",
        href: '#',
        icon: Mail,
        items: [
            {
                title: 'Send New SMS',
                href: '#',
                icon: MailPlus
            },
            {
                title: 'All Messages',
                href: '#',
                icon: MessageCircle
            }
        ]
    },
    {
        title: "Staff",
        href: route("staff.index"),
        icon: LucideUser2,
    },
    {
        title: "Important Contact",
        href: route("staff.index"),
        icon: PhoneCall,
    },
    {
        title: "One Time Setting",
        href: '#',
        icon: Cog,
        items: [
            {
                title: 'Fee Package',
                href: '#',
                icon: PlusCircleIcon
            },
            {
                title: 'Shift',
                href: '#',
                icon: PlusCircleIcon
            },
            {
                title: 'Ward',
                href: '#',
                icon: PlusCircleIcon
            },
            {
                title: 'Contact Group',
                href: '#',
                icon: PlusCircleIcon
            },
            {
                title: 'Payment Method',
                href: '#',
                icon: PlusCircleIcon
            },
            {
                title: 'Organization',
                href: '#',
                icon: PlusCircleIcon
            },
        ]
    },
    {
        title: 'Account Setting',
        href: '#',
        icon: Wrench,
        items: [
            {
                title: 'Main Head',
                href: '#',
                icon: PlusCircleIcon
            },
            {
                title: 'Ledger Head',
                href: '#',
                icon: PlusCircleIcon
            },
            {
                title: 'Sub Ledger Head',
                href: '#',
                icon: PlusCircleIcon
            },
            {
                title: 'Openning Balance',
                href: '#',
                icon: PlusCircleIcon
            },
        ]
    }, {
        title: 'Our Goods',
        href: '#',
        icon: LaptopMinimal,
        items: [
            {
                title: "Goods",
                href: '#',
                icon: ReceiptText
            },
            {
                title: "Goods Group",
                href: '#',
                icon: PlusCircleIcon
            }
        ]
    }
    , {
        title: 'Role & Permission',
        href: '#',
        icon: UserCogIcon,
        items: [
            {
                title: "Role",
                href: route('role.index'),
                icon: ReceiptText
            },
            {
                title: "Permissions",
                href: route('permission.index'),
                icon: PlusCircleIcon
            }
        ]
    }
]

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="overflow-y-auto scrollbar-hide">
                <NavMain items={mainNavItems} label="Platform" />
                <NavMain items={accountNavItems} label="Account" />
                <NavMain items={reportNavItems} label="Reports" />
                <NavMain items={managementNavItems} label="Other" />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}
