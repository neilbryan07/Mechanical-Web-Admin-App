import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';

import { ReactComponent as Dashboard } from '../../assets/icons/Sidebar/Dashboard_2.svg';
import { ReactComponent as Appointment } from '../../assets/icons/Sidebar/Appointment Calendar.svg';
import { ReactComponent as Customers } from '../../assets/icons/Sidebar/Customers.svg';
import { ReactComponent as Franchise } from '../../assets/icons/Sidebar/Franchise Regions.svg';
import { ReactComponent as Technician } from '../../assets/icons/Sidebar/Technicians.svg';
import { ReactComponent as Estimatics } from '../../assets/icons/Sidebar/Estimatics.svg';
import { ReactComponent as Reports } from '../../assets/icons/Sidebar/Reports.svg';
import { ReactComponent as Settings } from '../../assets/icons/Sidebar/Settings and Config.svg';
import { ReactComponent as StormLocation } from '../../assets/icons/Sidebar/storm_location.svg';


const CustomIconLoader = ({ color, iconType }) => {
    const [svgContent, setSvgContent] = useState('');

    const icons = [
        {
            type: "dashboard",
            component: <Dashboard />
        },
        {
            type: "repair",
            component: <Appointment />
        },
        {
            type: "customer",
            component: <Customers />
        },
        {
            type: "franchise",
            component: <Franchise />
        },
        {
            type: "storms",
            component: <StormLocation />
        },
        {
            type: "shop_accounts",
            component: <Customers />
        },
        {
            type: "users",
            component: <Customers />
        },
        {
            type: "technician",
            component: <Technician />
        },
        {
            type: "franchise",
            component: <Franchise />
        },
        {
            type: "estimatics",
            component: <Estimatics />
        },
        {
            type: "reports",
            component: <Reports />
        },
        {
            type: "settings",
            component: <Settings />
        },
    ]

    const handleColorChange = () => {
        const selectedIcon = icons.find(x => x.type === iconType);

        if (selectedIcon) {
            const { component } = selectedIcon;

            const htmlString = ReactDOMServer.renderToString(component);
            let newSvgString = htmlString.replace(/stroke="[^"]*"/g, `stroke="${color}"`);
            newSvgString = newSvgString.replace(/<path[^>]*\sfill="[^"]*"/g, (match) => match.replace(/fill="[^"]*"/, `fill="${color}"`));

            setSvgContent(newSvgString);
        }
    };

    useEffect(() => {
        handleColorChange();
    }, [color]);

    return (
        <div dangerouslySetInnerHTML={{ __html: svgContent }} />
    );
};

export default CustomIconLoader;
