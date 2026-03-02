import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  LogOut,
  Mail,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Plus,
  Save,
  X,
  BarChart3,
  Globe,
  Building,
  FileText,
  Clock,
  Search,
  Palette,
  LayoutGrid,
  Menu,
  ChevronDown,
  ChevronRight,
  Paintbrush,
  Image,
  Code,
} from "lucide-react";
import { useCmsDataApi as useCmsData } from "../../hooks/use-cms-data-api";
import { Button } from "../../components/ui/button/button";
import { Input } from "../../components/ui/input/input";
import { Textarea } from "../../components/ui/textarea/textarea";
import { Card } from "../../components/ui/card/card";
import { RichTextEditor } from "../../components/ui/rich-text-editor/rich-text-editor";
import { AppearanceSettings } from "../../components/admin/appearance-settings";
import { SettingsPanel } from "../../components/admin/settings-panel";
import { ImageUpload } from "../../components/admin/image-upload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs/tabs";
import { Badge } from "../../components/ui/badge/badge";
import styles from "./dashboard.module.css";

type View = "overview" | "company" | "products" | "clients" | "pages" | "appearance-identity" | "appearance-themes" | "appearance-menus" | "appearance-widgets" | "settings";

export default function Dashboard() {
  const navigate = useNavigate();
  const { company, products, clients, pages, updateCompany, updateProduct, updateClient, deleteProduct, deleteClient, addProduct, addClient, updatePage, addPage, deletePage } = useCmsData();
  
  const [activeView, setActiveView] = useState<View>("overview");
  const [editingCompany, setEditingCompany] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const [addingProduct, setAddingProduct] = useState(false);
  const [addingClient, setAddingClient] = useState(false);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [addingPage, setAddingPage] = useState(false);
  const [pageSearchQuery, setPageSearchQuery] = useState("");
  const [appearanceExpanded, setAppearanceExpanded] = useState(false);

  const [companyForm, setCompanyForm] = useState(company);
  const [productForm, setProductForm] = useState({ name: "", description: "", image: "", category: "" });
  const [clientForm, setClientForm] = useState({ name: "", logo: "" });
  const [pageForm, setPageForm] = useState({ 
    title: "", 
    slug: "", 
    content: "", 
    status: "draft" as "published" | "draft",
    author: "Admin",
    featured_image: "",
    excerpt: ""
  });

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  const handleSaveCompany = () => {
    updateCompany(companyForm);
    setEditingCompany(false);
  };

  const handleSaveProduct = (id: string) => {
    updateProduct(id, productForm);
    setEditingProductId(null);
    setProductForm({ name: "", description: "", image: "", category: "" });
  };

  const handleAddProduct = () => {
    addProduct(productForm);
    setAddingProduct(false);
    setProductForm({ name: "", description: "", image: "", category: "" });
  };

  const handleSaveClient = (id: string) => {
    updateClient(id, clientForm);
    setEditingClientId(null);
    setClientForm({ name: "", logo: "" });
  };

  const handleAddClient = () => {
    addClient(clientForm);
    setAddingClient(false);
    setClientForm({ name: "", logo: "" });
  };

  const handleSavePage = (id: string) => {
    updatePage(id, pageForm);
    setEditingPageId(null);
    setPageForm({ title: "", slug: "", content: "", status: "draft", author: "Admin", featured_image: "", excerpt: "" });
  };

  const handleAddPage = () => {
    addPage(pageForm);
    setAddingPage(false);
    setPageForm({ title: "", slug: "", content: "", status: "draft", author: "Admin", featured_image: "", excerpt: "" });
  };

  const stats = [
    { label: "Total Products", value: products.length, icon: Package, color: "blue" },
    { label: "Total Clients", value: clients.length, icon: Users, color: "green" },
    { label: "Total Pages", value: pages.length, icon: FileText, color: "purple" },
    { label: "Inquiries", value: "12", icon: Mail, color: "orange" },
  ];

  const menuItems = [
    { id: "overview" as View, label: "Dashboard", icon: LayoutDashboard },
    { id: "pages" as View, label: "Pages", icon: FileText },
    { id: "company" as View, label: "Company Info", icon: Building },
    { id: "products" as View, label: "Products", icon: Package },
    { id: "clients" as View, label: "Clients", icon: Users },
  ];

  const appearanceItems = [
    { id: "appearance-identity" as View, label: "Site Identity", icon: Globe },
    { id: "appearance-themes" as View, label: "Themes", icon: Paintbrush },
    { id: "appearance-menus" as View, label: "Menus", icon: Menu },
    { id: "appearance-widgets" as View, label: "Widgets", icon: LayoutGrid },
  ];

  const filteredPages = pages.filter(p => p.title.toLowerCase().includes(pageSearchQuery.toLowerCase()));

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h1 className={styles.logo}>Mauli CMS</h1>
          <p className={styles.tagline}>Content Management</p>
        </div>

        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`${styles.navItem} ${activeView === item.id ? styles.navItemActive : ""}`}
              onClick={() => setActiveView(item.id)}
            >
              <item.icon className={styles.navIcon} />
              <span>{item.label}</span>
            </button>
          ))}

          {/* Appearance Submenu */}
          <div className={styles.navGroup}>
            <button
              className={`${styles.navItem} ${appearanceExpanded ? styles.navItemExpanded : ""} ${activeView.startsWith('appearance') ? styles.navItemActive : ""}`}
              onClick={() => setAppearanceExpanded(!appearanceExpanded)}
            >
              <Palette className={styles.navIcon} />
              <span>Appearance</span>
              {appearanceExpanded ? (
                <ChevronDown className={styles.navChevron} />
              ) : (
                <ChevronRight className={styles.navChevron} />
              )}
            </button>
            {appearanceExpanded && (
              <div className={styles.navSubmenu}>
                {appearanceItems.map((item) => (
                  <button
                    key={item.id}
                    className={`${styles.navSubItem} ${activeView === item.id ? styles.navSubItemActive : ""}`}
                    onClick={() => setActiveView(item.id)}
                  >
                    <item.icon className={styles.navIcon} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className={`${styles.navItem} ${activeView === "settings" ? styles.navItemActive : ""}`}
            onClick={() => setActiveView("settings")}
          >
            <Settings className={styles.navIcon} />
            <span>Settings</span>
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut className={styles.navIcon} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <header className={styles.header}>
          <div>
            <h2 className={styles.pageTitle}>
              {activeView === "overview" && "Dashboard"}
              {activeView === "pages" && "Pages"}
              {activeView === "company" && "Company Info"}
              {activeView === "products" && "Products"}
              {activeView === "clients" && "Clients"}
              {activeView === "appearance-identity" && "Site Identity"}
              {activeView === "appearance-themes" && "Themes"}
              {activeView === "appearance-menus" && "Menus"}
              {activeView === "appearance-widgets" && "Widgets"}
              {activeView === "settings" && "Settings"}
            </h2>
            <p className={styles.pageSubtitle}>Manage your website content</p>
          </div>
          <div className={styles.headerActions}>
            <Link to="/" target="_blank" className={styles.viewSiteBtn}>
              <Globe size={16} />
              View Site
            </Link>
          </div>
        </header>

        <div className={styles.content}>
          {/* Overview */}
          {activeView === "overview" && (
            <div className={styles.overview}>
              <div className={styles.statsGrid}>
                {stats.map((stat) => (
                  <Card key={stat.label} className={styles.statCard}>
                    <div className={styles.statIcon} data-color={stat.color}>
                      <stat.icon size={24} />
                    </div>
                    <div className={styles.statContent}>
                      <p className={styles.statLabel}>{stat.label}</p>
                      <p className={styles.statValue}>{stat.value}</p>
                    </div>
                  </Card>
                ))}
              </div>

              <div className={styles.dashboardGrid}>
                {/* Quick Actions */}
                <Card className={styles.quickActions}>
                  <h3 className={styles.cardTitle}>Quick Actions</h3>
                  <div className={styles.actionsList}>
                    <button className={styles.actionBtn} onClick={() => { setActiveView("products"); setAddingProduct(true); }}>
                      <Plus size={20} />
                      Add New Product
                    </button>
                    <button className={styles.actionBtn} onClick={() => { setActiveView("clients"); setAddingClient(true); setClientForm({ name: "", logo: "" }); }}>
                      <Plus size={20} />
                      Add New Client
                    </button>
                    <button className={styles.actionBtn} onClick={() => { setActiveView("pages"); setAddingPage(true); }}>
                      <Plus size={20} />
                      Add New Page
                    </button>
                    <button className={styles.actionBtn} onClick={() => { setActiveView("company"); setEditingCompany(true); }}>
                      <Edit size={20} />
                      Edit Company Info
                    </button>
                  </div>
                </Card>

                {/* Recent Activity */}
                <Card className={styles.recentActivity}>
                  <h3 className={styles.cardTitle}>Recent Activity</h3>
                  <div className={styles.activityList}>
                    <div className={styles.activityItem}>
                      <div className={styles.activityIcon} data-type="edit">
                        <Edit size={16} />
                      </div>
                      <div className={styles.activityContent}>
                        <p className={styles.activityText}>Updated company information</p>
                        <p className={styles.activityTime}>2 hours ago</p>
                      </div>
                    </div>
                    <div className={styles.activityItem}>
                      <div className={styles.activityIcon} data-type="add">
                        <Plus size={16} />
                      </div>
                      <div className={styles.activityContent}>
                        <p className={styles.activityText}>Added new product</p>
                        <p className={styles.activityTime}>5 hours ago</p>
                      </div>
                    </div>
                    <div className={styles.activityItem}>
                      <div className={styles.activityIcon} data-type="view">
                        <Eye size={16} />
                      </div>
                      <div className={styles.activityContent}>
                        <p className={styles.activityText}>Site viewed 150 times</p>
                        <p className={styles.activityTime}>Today</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Site Health */}
                <Card className={styles.siteHealth}>
                  <h3 className={styles.cardTitle}>Site Health</h3>
                  <div className={styles.healthMetrics}>
                    <div className={styles.healthItem}>
                      <div className={styles.healthIndicator} data-status="good"></div>
                      <span>Performance</span>
                      <Badge variant="secondary">Good</Badge>
                    </div>
                    <div className={styles.healthItem}>
                      <div className={styles.healthIndicator} data-status="good"></div>
                      <span>Security</span>
                      <Badge variant="secondary">Secure</Badge>
                    </div>
                    <div className={styles.healthItem}>
                      <div className={styles.healthIndicator} data-status="good"></div>
                      <span>SEO</span>
                      <Badge variant="secondary">Optimized</Badge>
                    </div>
                  </div>
                </Card>

                {/* Analytics Overview */}
                <Card className={styles.analytics}>
                  <h3 className={styles.cardTitle}>Analytics Overview</h3>
                  <div className={styles.analyticsGrid}>
                    <div className={styles.analyticsItem}>
                      <TrendingUp size={20} className={styles.analyticsIcon} />
                      <div>
                        <p className={styles.analyticsValue}>+24%</p>
                        <p className={styles.analyticsLabel}>Traffic Growth</p>
                      </div>
                    </div>
                    <div className={styles.analyticsItem}>
                      <BarChart3 size={20} className={styles.analyticsIcon} />
                      <div>
                        <p className={styles.analyticsValue}>3.2min</p>
                        <p className={styles.analyticsLabel}>Avg. Session</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Company Info */}
          {activeView === "company" && (
            <div className={styles.section}>
              <Card className={styles.editCard}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>Company Information</h3>
                  {!editingCompany && (
                    <Button onClick={() => { setEditingCompany(true); setCompanyForm(company); }}>
                      <Edit size={16} />
                      Edit
                    </Button>
                  )}
                </div>

                {editingCompany ? (
                  <div className={styles.form}>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label>Company Name</label>
                        <Input
                          value={companyForm.name}
                          onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Tagline</label>
                        <Input
                          value={companyForm.tagline}
                          onChange={(e) => setCompanyForm({ ...companyForm, tagline: e.target.value })}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Email</label>
                        <Input
                          type="email"
                          value={companyForm.email}
                          onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Phone</label>
                        <Input
                          value={companyForm.phone}
                          onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                        />
                      </div>
                      <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                        <label>Description</label>
                        <Textarea
                          value={companyForm.description}
                          onChange={(e) => setCompanyForm({ ...companyForm, description: e.target.value })}
                          rows={4}
                        />
                      </div>
                      <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                        <label>Address</label>
                        <Textarea
                          value={companyForm.address}
                          onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                          rows={2}
                        />
                      </div>
                    </div>
                    <div className={styles.formActions}>
                      <Button onClick={handleSaveCompany}>
                        <Save size={16} />
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setEditingCompany(false)}>
                        <X size={16} />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.infoDisplay}>
                    <div className={styles.infoGrid}>
                      <div className={styles.infoItem}>
                        <label>Company Name</label>
                        <p>{company.name}</p>
                      </div>
                      <div className={styles.infoItem}>
                        <label>Tagline</label>
                        <p>{company.tagline}</p>
                      </div>
                      <div className={styles.infoItem}>
                        <label>Email</label>
                        <p>{company.email}</p>
                      </div>
                      <div className={styles.infoItem}>
                        <label>Phone</label>
                        <p>{company.phone}</p>
                      </div>
                      <div className={styles.infoItem} style={{ gridColumn: "1 / -1" }}>
                        <label>Description</label>
                        <p>{company.description}</p>
                      </div>
                      <div className={styles.infoItem} style={{ gridColumn: "1 / -1" }}>
                        <label>Address</label>
                        <p>{company.address}</p>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          )}

          {/* Products */}
          {activeView === "products" && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3>Products & Services ({products.length})</h3>
                <Button onClick={() => { setAddingProduct(true); setProductForm({ name: "", description: "", image: "", category: "" }); }}>
                  <Plus size={16} />
                  Add Product
                </Button>
              </div>

              {addingProduct && (
                <Card className={styles.editCard} style={{ marginBottom: "var(--space-4)" }}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Add New Product</h3>
                  </div>
                  <div className={styles.form}>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label>Product Name</label>
                        <Input
                          value={productForm.name}
                          onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Category</label>
                        <Input
                          value={productForm.category}
                          onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                        />
                      </div>
                      <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                        <label>Description</label>
                        <Textarea
                          value={productForm.description}
                          onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                          rows={3}
                        />
                      </div>
                      <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                        <ImageUpload
                          label="Product Image"
                          value={productForm.image}
                          onChange={(url) => setProductForm({ ...productForm, image: url })}
                          folder="mauli-cms/products"
                        />
                      </div>
                    </div>
                    <div className={styles.formActions}>
                      <Button onClick={handleAddProduct}>
                        <Save size={16} />
                        Add Product
                      </Button>
                      <Button variant="outline" onClick={() => setAddingProduct(false)}>
                        <X size={16} />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              <div className={styles.itemsGrid}>
                {products.map((product: { id: string; name: string; description: string; image: string; category: string }) => (
                  <Card key={product.id} className={styles.itemCard}>
                    {editingProductId === product.id ? (
                      <div className={styles.form}>
                        <div className={styles.formGroup}>
                          <label>Name</label>
                          <Input
                            value={productForm.name}
                            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label>Category</label>
                          <Input
                            value={productForm.category}
                            onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label>Description</label>
                          <Textarea
                            value={productForm.description}
                            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                            rows={3}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <ImageUpload
                            label="Product Image"
                            value={productForm.image}
                            onChange={(url) => setProductForm({ ...productForm, image: url })}
                            folder="mauli-cms/products"
                          />
                        </div>
                        <div className={styles.formActions}>
                          <Button size="sm" onClick={() => handleSaveProduct(product.id)}>
                            <Save size={14} />
                            Save
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingProductId(null)}>
                            <X size={14} />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {product.image && (
                          <img src={product.image} alt={product.name} className={styles.itemImage} />
                        )}
                        <div className={styles.itemContent}>
                          <h4 className={styles.itemTitle}>{product.name}</h4>
                          <Badge variant="secondary">{product.category}</Badge>
                          <p className={styles.itemDescription}>{product.description}</p>
                        </div>
                        <div className={styles.itemActions}>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingProductId(product.id);
                              setProductForm(product);
                            }}
                          >
                            <Edit size={14} />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteProduct(product.id)}
                          >
                            <Trash2 size={14} />
                            Delete
                          </Button>
                        </div>
                      </>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Clients */}
          {activeView === "clients" && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3>Clients ({clients.length})</h3>
                <Button onClick={() => { setAddingClient(true); setClientForm({ name: "", logo: "" }); }}>
                  <Plus size={16} />
                  Add Client
                </Button>
              </div>

              {addingClient && (
                <Card className={styles.editCard} style={{ marginBottom: "var(--space-4)" }}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Add New Client</h3>
                  </div>
                  <div className={styles.form}>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label>Client Name</label>
                        <Input
                          value={clientForm.name}
                          onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                        />
                      </div>
                      <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                        <ImageUpload
                          label="Client Logo"
                          value={clientForm.logo}
                          onChange={(url) => setClientForm({ ...clientForm, logo: url })}
                          folder="mauli-cms/clients"
                        />
                      </div>
                    </div>
                    <div className={styles.formActions}>
                      <Button onClick={handleAddClient}>
                        <Save size={16} />
                        Add Client
                      </Button>
                      <Button variant="outline" onClick={() => setAddingClient(false)}>
                        <X size={16} />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              <div className={styles.itemsGrid}>
                {clients.map((client) => (
                  <Card key={client.id} className={styles.itemCard}>
                    {editingClientId === client.id ? (
                      <div className={styles.form}>
                        <div className={styles.formGroup}>
                          <label>Name</label>
                          <Input
                            value={clientForm.name}
                            onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <ImageUpload
                            label="Client Logo"
                            value={clientForm.logo}
                            onChange={(url) => setClientForm({ ...clientForm, logo: url })}
                            folder="mauli-cms/clients"
                          />
                        </div>
                        <div className={styles.formActions}>
                          <Button size="sm" onClick={() => handleSaveClient(client.id)}>
                            <Save size={14} />
                            Save
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingClientId(null)}>
                            <X size={14} />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {client.logoUrl && (
                          <img src={client.logoUrl} alt={client.name} className={styles.clientLogo} />
                        )}
                        <div className={styles.itemContent}>
                          <h4 className={styles.itemTitle}>{client.name}</h4>
                        </div>
                        <div className={styles.itemActions}>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingClientId(client.id);
                              setClientForm({ name: client.name, logo: client.logoUrl });
                            }}
                          >
                            <Edit size={14} />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteClient(client.id)}
                          >
                            <Trash2 size={14} />
                            Delete
                          </Button>
                        </div>
                      </>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Pages - WordPress Style */}
          {activeView === "pages" && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <div>
                  <h3>Pages</h3>
                  <p className={styles.sectionSubtitle}>Manage your website content</p>
                </div>
                <Button onClick={() => { setAddingPage(true); setPageForm({ title: "", slug: "", content: "", status: "draft", author: "Admin", featured_image: "", excerpt: "" }); }}>
                  <Plus size={16} />
                  Add New Page
                </Button>
              </div>

              {addingPage && (
                <Card className={styles.editCard} style={{ marginBottom: "var(--space-4)" }}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>Add New Page</h3>
                  </div>
                  <div className={styles.form}>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label>Page Title</label>
                        <Input
                          value={pageForm.title}
                          onChange={(e) => {
                            const title = e.target.value;
                            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                            setPageForm({ ...pageForm, title, slug });
                          }}
                          placeholder="Enter page title"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Slug (URL)</label>
                        <Input
                          value={pageForm.slug}
                          onChange={(e) => setPageForm({ ...pageForm, slug: e.target.value })}
                          placeholder="page-url-slug"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Status</label>
                        <select 
                          value={pageForm.status}
                          onChange={(e) => setPageForm({ ...pageForm, status: e.target.value as "published" | "draft" })}
                          className={styles.select}
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                        </select>
                      </div>
                      <div className={styles.formGroup}>
                        <ImageUpload
                          label="Featured Image"
                          value={pageForm.featured_image}
                          onChange={(url) => setPageForm({ ...pageForm, featured_image: url })}
                          folder="mauli-cms/pages"
                        />
                      </div>
                      <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                        <label>Excerpt</label>
                        <Textarea
                          value={pageForm.excerpt}
                          onChange={(e) => setPageForm({ ...pageForm, excerpt: e.target.value })}
                          rows={2}
                          placeholder="Short description of the page"
                        />
                      </div>
                      <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                        <label>Content</label>
                        <RichTextEditor
                          content={pageForm.content}
                          onChange={(content) => setPageForm({ ...pageForm, content })}
                          placeholder="Enter page content..."
                        />
                      </div>
                    </div>
                    <div className={styles.formActions}>
                      <Button onClick={handleAddPage}>
                        <Save size={16} />
                        Create Page
                      </Button>
                      <Button variant="outline" onClick={() => setAddingPage(false)}>
                        <X size={16} />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* WordPress-style Pages Table */}
              <Card className={styles.pagesTableCard}>
                <div className={styles.tableControls}>
                  <div className={styles.bulkActions}>
                    <select className={styles.select}>
                      <option value="">Bulk Actions</option>
                      <option value="delete">Move to Trash</option>
                      <option value="publish">Publish</option>
                      <option value="draft">Move to Draft</option>
                    </select>
                    <Button variant="outline" size="sm">Apply</Button>
                  </div>
                  <div className={styles.searchBox}>
                    <Search size={18} className={styles.searchIcon} />
                    <Input 
                      placeholder="Search pages..."
                      value={pageSearchQuery}
                      onChange={(e) => setPageSearchQuery(e.target.value)}
                      className={styles.searchInput}
                    />
                  </div>
                </div>

                <div className={styles.pagesTable}>
                  <div className={styles.tableHeader}>
                    <div className={styles.tableRow}>
                      <div className={styles.tableCellCheckbox}>
                        <input type="checkbox" />
                      </div>
                      <div className={styles.tableCell}>Title</div>
                      <div className={styles.tableCell}>Author</div>
                      <div className={styles.tableCell}>Status</div>
                      <div className={styles.tableCell}>Last Updated</div>
                    </div>
                  </div>
                  <div className={styles.tableBody}>
                    {filteredPages.length === 0 ? (
                      <div className={styles.emptyState}>
                        <FileText size={48} />
                        <p>No pages found</p>
                        <Button onClick={() => { setAddingPage(true); setPageForm({ title: "", slug: "", content: "", status: "draft", author: "Admin", featured_image: "", excerpt: "" }); }}>
                          <Plus size={16} />
                          Create Your First Page
                        </Button>
                      </div>
                    ) : (
                      filteredPages.map((page) => (
                        <div key={page.id} className={styles.tableRow}>
                          {editingPageId === page.id ? (
                            <Card style={{ gridColumn: "1 / -1", padding: "var(--space-4)" }}>
                              <div className={styles.form}>
                                <div className={styles.formGrid}>
                                  <div className={styles.formGroup}>
                                    <label>Title</label>
                                    <Input
                                      value={pageForm.title}
                                      onChange={(e) => {
                                        const title = e.target.value;
                                        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                        setPageForm({ ...pageForm, title, slug });
                                      }}
                                    />
                                  </div>
                                  <div className={styles.formGroup}>
                                    <label>Slug</label>
                                    <Input
                                      value={pageForm.slug}
                                      onChange={(e) => setPageForm({ ...pageForm, slug: e.target.value })}
                                    />
                                  </div>
                                  <div className={styles.formGroup}>
                                    <label>Status</label>
                                    <select 
                                      value={pageForm.status}
                                      onChange={(e) => setPageForm({ ...pageForm, status: e.target.value as "published" | "draft" })}
                                      className={styles.select}
                                    >
                                      <option value="draft">Draft</option>
                                      <option value="published">Published</option>
                                    </select>
                                  </div>
                                  <div className={styles.formGroup}>
                                    <ImageUpload
                                      label="Featured Image"
                                      value={pageForm.featured_image}
                                      onChange={(url) => setPageForm({ ...pageForm, featured_image: url })}
                                      folder="mauli-cms/pages"
                                    />
                                  </div>
                                  <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                                    <label>Excerpt</label>
                                    <Textarea
                                      value={pageForm.excerpt}
                                      onChange={(e) => setPageForm({ ...pageForm, excerpt: e.target.value })}
                                      rows={2}
                                    />
                                  </div>
                                  <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                                    <label>Content</label>
                                    <RichTextEditor
                                      content={pageForm.content}
                                      onChange={(content) => setPageForm({ ...pageForm, content })}
                                    />
                                  </div>
                                </div>
                                <div className={styles.formActions}>
                                  <Button size="sm" onClick={() => handleSavePage(page.id)}>
                                    <Save size={14} />
                                    Save
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => setEditingPageId(null)}>
                                    <X size={14} />
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ) : (
                            <>
                              <div className={styles.tableCellCheckbox}>
                                <input type="checkbox" />
                              </div>
                              <div className={styles.tableCell}>
                                <div className={styles.pageTitleCell}>
                                  <div className={styles.pageTitleWrapper}>
                                    <FileText size={16} className={styles.pageIcon} />
                                    <div>
                                      <div className={styles.pageTitle}>{page.title}</div>
                                      <div className={styles.pageSlug}>/{page.slug}</div>
                                    </div>
                                  </div>
                                  <div className={styles.rowActions}>
                                    <button 
                                      className={styles.rowActionBtn}
                                      onClick={() => {
                                        setEditingPageId(page.id);
                                        setPageForm({
                                          title: page.title,
                                          slug: page.slug,
                                          content: page.content,
                                          status: page.status,
                                          author: page.author,
                                          featured_image: page.featured_image || "",
                                          excerpt: page.excerpt || ""
                                        });
                                      }}
                                    >
                                      Edit
                                    </button>
                                    <span className={styles.rowActionSeparator}>|</span>
                                    <button className={styles.rowActionBtn}>Quick Edit</button>
                                    <span className={styles.rowActionSeparator}>|</span>
                                    <button 
                                      className={`${styles.rowActionBtn} ${styles.rowActionBtnDanger}`}
                                      onClick={() => deletePage(page.id)}
                                    >
                                      Trash
                                    </button>
                                    <span className={styles.rowActionSeparator}>|</span>
                                    <Link to={`/${page.slug}`} target="_blank" className={styles.rowActionBtn}>
                                      View
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              <div className={styles.tableCell}>{page.author}</div>
                              <div className={styles.tableCell}>
                                <Badge variant={page.status === "published" ? "default" : "secondary"}>
                                  {page.status === "published" ? "Published" : "Draft"}
                                </Badge>
                              </div>
                              <div className={styles.tableCell}>
                                <div className={styles.dateCell}>
                                  <Clock size={14} />
                                  {new Date(page.updatedAt).toLocaleDateString()}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className={styles.tablePagination}>
                  <p className={styles.paginationText}>
                    {filteredPages.length} {filteredPages.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </Card>
            </div>
          )}

          {/* Appearance Sections */}
          {(activeView === "appearance-identity" || activeView === "appearance-themes" || activeView === "appearance-menus" || activeView === "appearance-widgets") && (
            <AppearanceSettings initialSection={activeView.replace('appearance-', '')} />
          )}

          {/* Settings */}
          {activeView === "settings" && (
            <SettingsPanel />
          )}
        </div>
      </main>
    </div>
  );
}
