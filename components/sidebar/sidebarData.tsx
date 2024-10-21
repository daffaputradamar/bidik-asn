import { ArrowFatLineUp, CalendarDot, ChartBar, Clipboard, Exam, Gauge, Gift, GridFour, IdentificationCard, Invoice, List, ListChecks, Password, UserCheck, UsersThree } from "@phosphor-icons/react";

type SidebarSubItemType = {
    label: string;
    link?: string;
    isSoon?: boolean;
};

type SidebarItemType = {
    label: string;
    icon: JSX.Element;
    link?: string;
    isSoon?: boolean;
    items?: SidebarSubItemType[];
};

export type SidebarGroupType = {
    title: string;
    defaultOpen: boolean;
    items: SidebarItemType[];
};

export const adminSidebarItems: SidebarGroupType[] = [
    {
        title: "Dashboard",
        defaultOpen: true,
        items: [
            {
                link: "/",
                label: "Beranda",
                icon: <Gauge size={24} />,
            },
            {
                link: "/calendar",
                label: "Kalender",
                icon: <GridFour size={24} />,
            },
            {
                label: "List Harga Paket",
                icon: <ListChecks size={24} />,
            },
        ]
    },
    {
        title: "Konten Produk",
        defaultOpen: true,
        items: [
            {
                label: "Kelas Intensif",
                icon: <CalendarDot size={24} />,
            },
            {
                label: "Tryout",
                icon: <Clipboard size={24} />,
            },
            {
                label: "Materi",
                icon: <List size={24} />,
            }
        ]
    },
    {
        title: "User Management",
        defaultOpen: true,
        items: [
            {
                label: "Pencarian User",
                icon: <IdentificationCard size={24} />,
            },
            {
                label: "Aktivasi User",
                icon: <UserCheck size={24} />,
            },
            {
                label: "Reset Password",
                icon: <Password size={24} />,
            },
            {
                label: "Reset Invoice",
                icon: <Invoice size={24} />,
            },
            {
                label: "Reset Tryout Akbar",
                icon: <Exam size={24} />,
            },
            {
                label: "Upgrade Manual",
                icon: <ArrowFatLineUp size={24} />,
            }
        ]
    },
    {
        title: "Marketing",
        defaultOpen: true,
        items: [
            {
                label: "Pencarian User",
                icon: <IdentificationCard size={24} />,
            },
            {
                label: "Aktivasi User",
                icon: <UserCheck size={24} />,
            },
        ]
    },
    {
        title: "Admin",
        defaultOpen: true,
        items: [
            {
                label: "Kelola Anggota",
                icon: <UsersThree size={24} />
            }
        ]
    }
];

export const userSidebarItems : SidebarGroupType[] = [
    {
        title: "Dashboard",
        defaultOpen: true,
        items: [
            {
                link: "/",
                label: "Beranda",
                icon: <Gauge size={24} />,
            },
            {
                link: "/calendar",
                label: "Kalender",
                icon: <GridFour size={24} />,
            },
            {
                label: "List Harga Paket",
                icon: <ListChecks size={24} />,
            },
            {
                label: "Bimbel Saya",
                icon: <Gift size={24} />,
            },
            {
                label: "Nilai & Pembahasan",
                icon: <ChartBar size={24} />,
            }
        ]
    },
    {
        title: "PPPK",
        defaultOpen: true,
        items: [
            {
                label: "Kelas Intensif",
                icon: <CalendarDot size={24} />,
                isSoon: true
            },
            {
                label: "Tryout",
                icon: <Clipboard size={24} />,
            },
            {
                label: "Tryout Akbar",
                icon: <Clipboard size={24} />,
            }
        ]
    },
    {
        title: "SKB CPNS",
        defaultOpen: true,
        items: [
            {
                label: "Kelas Intensif",
                icon: <CalendarDot size={24} />,
                isSoon: true
            },
            {
                label: "Tryout",
                icon: <Clipboard size={24} />,
            },
            {
                label: "Tryout Akbar",
                icon: <Clipboard size={24} />,
            }
        ]
    },
    {
        title: "SKD CPNS",
        defaultOpen: false,
        items: [
            {
                label: "Kelas Intensif",
                icon: <CalendarDot size={24} />,
                isSoon: true
            },
            {
                label: "Tryout",
                icon: <Clipboard size={24} />,
            },
            {
                label: "Tryout Akbar",
                icon: <Clipboard size={24} />,
            },
            {
                label: "Materi",
                icon: <List size={24} />,
            }
        ]
    },
    {
        title: "CPNS Kedinasan",
        defaultOpen: false,
        items: [
            {
                label: "Kelas Intensif",
                icon: <CalendarDot size={24} />,
                isSoon: true
            },
            {
                label: "Tryout",
                icon: <Clipboard size={24} />,
            },
            {
                label: "Tryout Akbar",
                icon: <Clipboard size={24} />,
            }
        ]
    },
];