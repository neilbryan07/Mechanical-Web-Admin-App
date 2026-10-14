import { pageRoutes } from "../../../contants";

export const privateRoutes = [
    {
        routes: '/app/dashboard',
        name: "dashboard",
        label: "Dashboard"
    },
    {
        routes: pageRoutes.APPOINTMENT,
        name: "repair",
        label: 'Repair Calendar',
        children: [
            {
                routes: pageRoutes.FOLLOWUPSTATE,
                name: "follow-up-list",
                label: "Follow-up List",
            },
        ]
    },
    // {
    //     name: "customer",
    //     label: "Customers",
    //     children: [
    //         {
    //             routes: pageRoutes.CUSTOMERCHECKIN,
    //             name: "check-in",
    //             label: "Checked-In",
    //         },

    //         {
    //             routes: pageRoutes.COMPLETEDJOBS,
    //             name: "completed-jobs",
    //             label: "Completed Jobs",
    //         },
    //     ]
    // },
    {
        routes: pageRoutes.FRANCHISE,
        name: 'franchise',
        label: 'Franchise Regions'
    },
    {
        routes: pageRoutes.SHOPACCOUNT,
        name: 'shop_accounts',
        label: 'Shop Accounts'
    },
    {
        routes: pageRoutes.USERS,
        name: 'users',
        label: 'Users'
    },
    {
        routes: pageRoutes.STORMS,
        name: 'storms',
        label: 'Storm Location'
    },
    {
        routes: pageRoutes.TECHNICIANS,
        name: "technician",
        label: "Technicians"
    },
    {
        // routes: pageRoutes.ESTIMATICSWORKFILES,
        name: "estimatics",
        label: "Estimatics",
        children: [
            {
                routes: pageRoutes.ESTIMATICSWORKFILES,
                name: "work-files",
                label: "Work Files"
            },
            {
                // routes: pageRoutes.INSURANCE,
                name: "assignments",
                label: "Assignments",
                children: [
                    {
                        routes: pageRoutes.INSURANCE,
                        name: "insurance-partner",
                        label: "Insurance Partner"
                    },
                    {
                        routes: pageRoutes.SHOP,
                        name: "shop",
                        label: "Shop"
                    }
                ]
            },
            {
                routes: pageRoutes.AUDITLIST,
                name: "audit-lists",
                label: "Audit Lists"
            },
        ]
    },
    {
        routes: pageRoutes.REPORTS,
        name: "reports",
        label: "Reports"
    },
    {
        routes: pageRoutes.SETTINGS,
        name: "settings",
        label: 'Settings and Configuration'
    },
]