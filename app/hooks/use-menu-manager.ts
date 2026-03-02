import { useState, useEffect } from "react";

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  type: "page" | "custom" | "external";
  order: number;
  parent?: string;
  cssClass?: string;
  openInNewTab?: boolean;
  enabled: boolean;
}

export interface Menu {
  id: string;
  name: string;
  location: "header" | "footer" | "mobile";
  items: MenuItem[];
}

const DEFAULT_MENUS: Menu[] = [
  {
    id: "main-menu",
    name: "Main Menu",
    location: "header",
    items: [
      { id: "menu-1", label: "Home", url: "/", type: "page", order: 1, enabled: true },
      { id: "menu-2", label: "About Us", url: "/about", type: "page", order: 2, enabled: true },
      { id: "menu-3", label: "Products", url: "/products", type: "page", order: 3, enabled: true },
      { id: "menu-3b", label: "Services", url: "/services", type: "page", order: 4, enabled: true },
      { id: "menu-6", label: "Infrastructure", url: "/infrastructure", type: "page", order: 5, enabled: true },
      { id: "menu-4", label: "Clients", url: "/clients", type: "page", order: 6, enabled: true },
      { id: "menu-5", label: "Contact", url: "/contact", type: "page", order: 7, enabled: true }
    ]
  },
  {
    id: "footer-menu",
    name: "Footer Menu",
    location: "footer",
    items: [
      { id: "footer-1", label: "Home", url: "/", type: "page", order: 1, enabled: true },
      { id: "footer-2", label: "About", url: "/about", type: "page", order: 2, enabled: true },
      { id: "footer-3", label: "Contact", url: "/contact", type: "page", order: 3, enabled: true }
    ]
  }
];

export function useMenuManager() {
  const [menus, setMenus] = useState<Menu[]>(DEFAULT_MENUS);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem("menus");
    if (stored) {
      try {
        const parsed: Menu[] = JSON.parse(stored);
        // Merge any new default menu items that don't exist in stored menus
        const merged = parsed.map(menu => {
          const defaultMenu = DEFAULT_MENUS.find(d => d.location === menu.location);
          if (!defaultMenu) return menu;
          const existingUrls = new Set(menu.items.map(i => i.url));
          const newItems = defaultMenu.items.filter(i => !existingUrls.has(i.url));
          if (newItems.length === 0) return menu;
          return { ...menu, items: [...menu.items, ...newItems] };
        });
        setMenus(merged);
        localStorage.setItem("menus", JSON.stringify(merged));
      } catch {
        setMenus(DEFAULT_MENUS);
      }
    }
  }, []);

  const saveMenus = (newMenus: Menu[]) => {
    setMenus(newMenus);
    localStorage.setItem("menus", JSON.stringify(newMenus));
  };

  const getMenuByLocation = (location: Menu["location"]) => {
    return menus.find(m => m.location === location);
  };

  const addMenuItem = (menuId: string, item: Omit<MenuItem, "id">) => {
    const newItem = {
      ...item,
      id: `menu-item-${Date.now()}`
    };
    
    saveMenus(menus.map(menu => {
      if (menu.id === menuId) {
        return {
          ...menu,
          items: [...menu.items, newItem]
        };
      }
      return menu;
    }));
  };

  const updateMenuItem = (menuId: string, itemId: string, updates: Partial<MenuItem>) => {
    saveMenus(menus.map(menu => {
      if (menu.id === menuId) {
        return {
          ...menu,
          items: menu.items.map(item => 
            item.id === itemId ? { ...item, ...updates } : item
          )
        };
      }
      return menu;
    }));
  };

  const deleteMenuItem = (menuId: string, itemId: string) => {
    saveMenus(menus.map(menu => {
      if (menu.id === menuId) {
        return {
          ...menu,
          items: menu.items.filter(item => item.id !== itemId)
        };
      }
      return menu;
    }));
  };

  const reorderMenuItems = (menuId: string, items: MenuItem[]) => {
    saveMenus(menus.map(menu => {
      if (menu.id === menuId) {
        return { ...menu, items };
      }
      return menu;
    }));
  };

  return {
    menus,
    getMenuByLocation,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    reorderMenuItems
  };
}
