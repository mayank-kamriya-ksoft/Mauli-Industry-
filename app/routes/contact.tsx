import type { Route } from "./+types/contact";
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { Header } from "~/components/header/header";
import { Footer } from "~/components/footer/footer";
import { dbService } from "~/lib/services/database";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { Textarea } from "~/components/ui/textarea/textarea";
import { Label } from "~/components/ui/label/label";
import { sendContactEmail } from "~/lib/services/email";
import styles from "./contact.module.css";

export async function loader() {
  const [company, pages] = await Promise.all([
    dbService.getCompanyInfo(),
    dbService.getPages(),
  ]);
  return { company, pages };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  const success = await sendContactEmail({ name, email, phone, subject, message });

  return { success };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact Us - Mauli Industries" },
    {
      name: "description",
      content: "Get in touch with Mauli Industries. Located in MIDC Waluj, Aurangabad, Maharashtra.",
    },
  ];
}

export default function Contact({ loaderData, actionData }: Route.ComponentProps) {
  const { company, pages } = loaderData;
  const contactPage = pages.find((p: any) => p.slug === 'contact' && p.status === 'published');

  return (
    <div className={styles.container}>
      <Header />

      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>{contactPage?.title || "Contact Us"}</h1>
        <p className={styles.heroSubtitle}>{contactPage?.excerpt || "We're Here to Help You"}</p>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <MapPin className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Our Location</h3>
            <div className={styles.cardContent}>
              <div className={styles.contactItem}>
                <MapPin className={styles.contactItemIcon} size={20} />
                <div>
                  <div>{company.address_line1}</div>
                  <div>{company.address_line2}</div>
                  <div>{company.address_country}</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <Phone className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Phone</h3>
            <div className={styles.cardContent}>
              <div className={styles.contactItem}>
                <Phone className={styles.contactItemIcon} size={20} />
                <a href={`tel:${company.phone}`} className={styles.link}>
                  {company.phone}
                </a>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <Mail className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Email</h3>
            <div className={styles.cardContent}>
              <div className={styles.contactItem}>
                <Mail className={styles.contactItemIcon} size={20} />
                <a href={`mailto:${company.email}`} className={styles.link}>
                  {company.email}
                </a>
              </div>
              <div className={styles.contactItem}>
                <Mail className={styles.contactItemIcon} size={20} />
                <span>sales@mauliindustries.co.in</span>
              </div>
              <div className={styles.contactItem}>
                <Mail className={styles.contactItemIcon} size={20} />
                <span>support@mauliindustries.co.in</span>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <Globe className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Website</h3>
            <div className={styles.cardContent}>
              <div className={styles.contactItem}>
                <Globe className={styles.contactItemIcon} size={20} />
                <a
                  href={`https://${company.website}`}
                  className={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {company.website}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.mapSection}>
        <div className={styles.mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.571898785329!2d75.2185814!3d19.85805890000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb9b6f7685a0ad%3A0x65adab68999f30ce!2sMauli%20Industries%20Plant%201!5e0!3m2!1sen!2sin!4v1767940684821!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mauli Industries Location"
          ></iframe>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Send Us a Message</h2>
          <p className={styles.formSubtitle}>Fill out the form below and we'll get back to you soon</p>
          
          <form className={styles.form} method="post">
            {actionData?.success && (
              <div style={{ padding: '1rem', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                Thank you! Your message has been sent successfully.
              </div>
            )}
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <Label htmlFor="name">Name *</Label>
                <Input id="name" name="name" required placeholder="Your name" />
              </div>
              
              <div className={styles.formGroup}>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" required placeholder="your.email@example.com" />
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" type="tel" placeholder="+91 1234567890" />
            </div>
            
            <div className={styles.formGroup}>
              <Label htmlFor="subject">Subject *</Label>
              <Input id="subject" name="subject" required placeholder="How can we help?" />
            </div>
            
            <div className={styles.formGroup}>
              <Label htmlFor="message">Message *</Label>
              <Textarea id="message" name="message" required placeholder="Tell us more about your requirements..." rows={6} />
            </div>
            
            <Button type="submit" className={styles.submitButton}>
              Send Message
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
