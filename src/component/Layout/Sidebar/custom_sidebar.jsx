import React, { useState } from 'react';

const Sidebar = () => {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      label: 'Home',
      children: [],
    },
    {
      id: 2,
      label: 'About',
      children: [],
    },
    {
      id: 3,
      label: 'Services',
      children: [
        {
          id: 31,
          label: 'Service 1',
          children: [],
        },
        {
          id: 32,
          label: 'Service 2',
          children: [
            {
              id: 321,
              label: 'Sub-service 1',
              children: [],
            },
            {
              id: 322,
              label: 'Sub-service 2',
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 4,
      label: 'Contact',
      children: [],
    },
  ]);

  const [openSubMenu, setOpenSubMenu] = useState(null);

  const handleSubMenuClick = (itemId) => {
    setOpenSubMenu(openSubMenu === itemId ? null : itemId);
  };

  const renderMenuItem = (menuItem) => (
    <div key={menuItem.id}>
      <div
        className={`menu-item ${menuItem.children.length > 0 ? 'has-children' : ''} ${
          openSubMenu === menuItem.id ? 'open' : ''
        }`}
        onClick={() => handleSubMenuClick(menuItem.id)}
      >
        {menuItem.label}
      </div>
      {menuItem.children.length > 0 && openSubMenu === menuItem.id && (
        <div className="sub-menu">
          {menuItem.children.map((child) => (
            <div key={child.id} className="menu-item">
              {child.label}
              {child.children.length > 0 && (
                <div className="sub-menu">
                  {child.children.map((subChild) => (
                    <div key={subChild.id} className="menu-item">
                      {subChild.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return <div className="sidebar">{menuItems.map((item) => renderMenuItem(item))}</div>;
};

export default Sidebar;
