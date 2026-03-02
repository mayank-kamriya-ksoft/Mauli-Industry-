import type { Route } from "./+types/home";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Header } from "~/components/header/header";
import { Footer } from "~/components/footer/footer";
import { Button } from "~/components/ui/button/button";
import { dbService } from "~/lib/services/database";
import { extractTextFromHtml } from "~/utils/html-utils";
import styles from "./home.module.css";

export async function loader() {
  const [products, company, pages] = await Promise.all([
    dbService.getProducts(),
    dbService.getCompanyInfo(),
    dbService.getPages(),
  ]);
  
  return { products, company, pages };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mauli Industries - Precision Engineering for Steel & Rolling Mill Industries" },
    {
      name: "description",
      content:
        "ISO 9001:2015 certified precision tool room specializing in machining solutions for rolling mill and steel industry. 20+ years of experience.",
    },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { products, company, pages } = loaderData;
  const featuredProducts = products.slice(0, 6);
  
  const homePage = pages.find((p: any) => p.slug === 'home' && p.status === 'published');

  return (
    <div className={styles.container}>
      <Header />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{homePage?.title || "Precision Engineering for Steel, Pharmaceutical, Automotive, and Food Processing."}</h1>
          <p className={styles.heroDescription}>
            {homePage?.content ? extractTextFromHtml(homePage.content) : "With 20+ years of experience, we deliver reliable, high-quality industrial components tailored to your requirements. From design to delivery, we are your trusted partner in precision manufacturing."}
          </p>
          <div className={styles.heroButtons}>
            <Button asChild size="lg">
              <Link to="/products">
                Explore Products <ArrowRight size={20} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Featured Products & Services</h2>
        <div className={styles.productsGrid}>
          {featuredProducts.map((product: any) => (
            <div key={product.id} className={styles.productCard}>
              <img src={product.image_url || product.imageUrl || product.image} alt={product.name} className={styles.productImage} />
              <div className={styles.productContent}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDescription}>{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.aboutSection}>
        <div className={styles.aboutContent}>
          <h2 className={styles.sectionTitle}>About {company.name}</h2>
          <p className={styles.aboutText}>
            {company.description}
          </p>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>20+</div>
              <div className={styles.statLabel}>Years of Experience</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>100+</div>
              <div className={styles.statLabel}>Satisfied Clients</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>14+</div>
              <div className={styles.statLabel}>Product Categories</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
