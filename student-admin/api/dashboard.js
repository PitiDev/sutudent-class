const Menu = [
    { header: "apps", policy: [404, 1, 2, 3] },
    {
        title: "home",
        group: "apps",
        icon: "far fa-home",
        name: "home",
        href: "/",
        policy: [404, 1, 2, 3]
    },
    {
        title: "admin",
        group: "apps",
        icon: "fal fa-user-shield",
        name: "admin",
        href: "/dashboard/admin",
        policy: [404]
    },
    {
        title: "teacher",
        group: "apps",
        icon: "fal fa-chalkboard-teacher",
        name: "teacher",
        href: "/dashboard/teacher",
        policy: [404, 1, 2, 3]
    },
    { divider: true },
    { header: "General", policy: [404, 1, 2, 3] },
    {
        title: "commission",
        group: "apps",
        icon: "fal fa-lira-sign",
        name: "commission",
        href: "/dashboard/commission",
        policy: [404, 1, 2, 3]
    },
    {
        title: "category",
        group: "apps",
        icon: "fal fa-list-alt",
        name: "category",
        href: "/dashboard/category",
        policy: [404, 1, 2, 3]
    },
    {
        title: "banner",
        group: "apps",
        icon: "fal fa-images",
        name: "banner",
        href: "/dashboard/banner",
        policy: [404, 1, 2, 3]
    },

    { divider: true },
    { header: "manage Course", policy: [404, 1, 2, 3] },

    {
        title: "courses",
        group: "apps",
        icon: "fab fa-youtube",
        name: "courses",
        href: "/dashboard/course",
        policy: [404, 1, 2, 3]
    },
    {
        title: "bank",
        group: "apps",
        icon: "fal fa-money-check-alt",
        name: "bank",
        href: "/dashboard/bank",
        policy: [404, 1, 2, 3]
    },
    {
        title: "status",
        group: "apps",
        icon: "fal fa-shield-check",
        name: "status",
        href: "/dashboard/status",
        policy: [404, 1, 2, 3]
    },
    { divider: true },
    { header: "utils", policy: [404, 1, 2, 3] },
    {
        title: "backup",
        group: "utils",
        icon: "far fa-database",
        name: "backup",
        href: "/dashboard/back_up",
        policy: [404, 1, 2, 3]
    },
    {
        title: "report",
        group: "utils",
        icon: "far fa-file-pdf",
        name: "report",
        href: "/dashboard/report",
        policy: [404, 1, 2, 3]
    },
    {
        title: "export",
        group: "utils",
        icon: "far fa-file-export",
        name: "export",
        href: "/dashboard/export",
        policy: [404, 1, 2, 3]
    },
    {
        title: "role",
        group: "utils",
        icon: "fal fa-user-shield",
        name: "setting",
        href: "/dashboard/role",
        policy: [404, 1, 2, 3]
    }
];
// reorder menu
Menu.forEach(item => {
    if (item.items) {
        item.items.sort((x, y) => {
            let textA = x.title.toUpperCase();
            let textB = y.title.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
    }
});

export default Menu;