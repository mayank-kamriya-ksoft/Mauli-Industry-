import { createContext, useContext, type ReactNode } from "react";
import { companyInfo } from "~/data/company";

const DEFAULT_COMPANY = companyInfo;

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

interface AppContextType {
  company: typeof DEFAULT_COMPANY;
  menus: Menu[];
  getMenuByLocation: (location: Menu["location"]) => Menu | undefined;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const getMenuByLocation = (location: Menu["location"]) => {
    return DEFAULT_MENUS.find(m => m.location === location);
  };

  return (
    <AppContext.Provider value={{ 
      company: DEFAULT_COMPANY, 
      menus: DEFAULT_MENUS,
      getMenuByLocation 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    return {
      company: DEFAULT_COMPANY,
      menus: DEFAULT_MENUS,
      getMenuByLocation: (location: Menu["location"]) => DEFAULT_MENUS.find(m => m.location === location)
    };
  }
  return context;
}
