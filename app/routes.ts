import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("products", "routes/products.tsx"),
  route("products/:id", "routes/product-detail.tsx"),
  route("products/:id/:subId", "routes/sub-product-detail.tsx"),
  route("services", "routes/services.tsx"),
  route("clients", "routes/clients.tsx"),
  route("contact", "routes/contact.tsx"),
  route("admin", "routes/admin.tsx"), // Redirects to /admin/login
  route("admin/login", "routes/admin/login.tsx"),
  route("admin/dashboard", "routes/admin/dashboard.tsx"),
  // API Routes
  route("api/products", "routes/api/products.tsx"),
  route("api/products/:id", "routes/api/products.$id.tsx"),
  route("api/clients", "routes/api/clients.tsx"),
  route("api/clients/:id", "routes/api/clients.$id.tsx"),
  route("api/company", "routes/api/company.tsx"),
  route("api/pages", "routes/api/pages.tsx"),
  route("api/pages/:id", "routes/api/pages.$id.tsx"),
  route("api/auth/login", "routes/api/auth.login.tsx"),
  // Dynamic CMS pages (catch-all - must be last)
  route(":slug", "routes/page.tsx"),
] satisfies RouteConfig;
