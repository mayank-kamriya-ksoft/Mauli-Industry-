import { Link } from "react-router";
import { MapPin, Phone, Mail } from "lucide-react";
import { useAppContext } from "~/context/app-context";
import styles from "./footer.module.css";

const DEFAULT_WIDGETS = [
  {
    id: "widget-1",
    area: "footer-1",
    type: "text",
    title: "About Us",
    content: { text: "Leading manufacturer of precision industrial components since 1995." },
    order: 1,
    enabled: true
  },
  {
    id: "widget-2",
    area: "footer-2",
    type: "links",
    title: "Quick Links",
    content: {
      links: [
        { label: "Home", url: "/" },
        { label: "About Us", url: "/about" },
        { label: "Products", url: "/products" },
        { label: "Services", url: "/services" },
        { label: "Clients", url: "/clients" },
        { label: "Contact", url: "/contact" },
        { label: "Infrastructure", url: "/infrastructure" }
      ]
    },
    order: 1,
    enabled: true
  },
  {
    id: "widget-3",
    area: "footer-3",
    type: "contact",
    title: "Contact Information",
    content: {
      contactItems: [
        { icon: "MapPin", text: "MIDC Waluj, Aurangabad, Maharashtra, India" },
        { icon: "Phone", text: "+91 240 2551234" },
        { icon: "Mail", text: "info@mauliindustries.co.in" }
      ]
    },
    order: 1,
    enabled: true
  }
];

const iconMap: Record<string, any> = { MapPin, Phone, Mail };

export function Footer() {
  const { company } = useAppContext();
  
  const getWidgetsByArea = (area: string) => DEFAULT_WIDGETS.filter(w => w.area === area && w.enabled);
  
  const footer1Widgets = getWidgetsByArea("footer-1");
  const footer2Widgets = getWidgetsByArea("footer-2");
  const footer3Widgets = getWidgetsByArea("footer-3");
  const footer4Widgets = getWidgetsByArea("footer-4");
  
  const renderWidget = (widget: any) => {
    switch (widget.type) {
      case "text":
        return (
          <div className={styles.section} key={widget.id}>
            <h3 className={styles.title}>{widget.title}</h3>
            <p className={styles.text}>{widget.content.text}</p>
          </div>
        );
      
      case "html":
        return (
          <div className={styles.section} key={widget.id}>
            <h3 className={styles.title}>{widget.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: widget.content.html }} />
          </div>
        );
      
      case "links":
        return (
          <div className={styles.section} key={widget.id}>
            <h3 className={styles.title}>{widget.title}</h3>
            <ul className={styles.linkList}>
              {widget.content.links?.map((link: any, i: number) => (
                <li key={i}>
                  <Link to={link.url} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      
      case "contact":
        return (
          <div className={styles.section} key={widget.id}>
            <h3 className={styles.title}>{widget.title}</h3>
            {widget.content.contactItems?.map((item: any, i: number) => {
              const IconComponent = iconMap[item.icon] || Mail;
              return (
                <div key={i} className={styles.contactItem}>
                  <IconComponent className={styles.contactIcon} size={20} />
                  <div>{item.text}</div>
                </div>
              );
            })}
          </div>
        );
      
      case "social":
        return (
          <div className={styles.section} key={widget.id}>
            <h3 className={styles.title}>{widget.title}</h3>
            <div className={styles.socialLinks}>
              {widget.content.socialLinks?.map((link: any, i: number) => {
                const IconComponent = iconMap[link.platform] || Mail;
                return (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {footer1Widgets.length > 0 && footer1Widgets.map(renderWidget)}
          {footer2Widgets.length > 0 && footer2Widgets.map(renderWidget)}
          {footer3Widgets.length > 0 && footer3Widgets.map(renderWidget)}
          {footer4Widgets.length > 0 && footer4Widgets.map(renderWidget)}
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>© 2026 {company.name}. All rights reserved.</p>
          <p className={styles.credit}>
            Designed & Developed by{" "}
            <a
              href="https://ksoftsolution.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.creditLink}
            >
              KSoft Solution
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
