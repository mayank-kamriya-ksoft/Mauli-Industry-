import { Link } from "react-router";
import { Header } from "~/components/header/header";
import { Footer } from "~/components/footer/footer";
import { dbService } from "~/lib/services/database";
import type { Route } from "./+types/products";
import styles from "./products.module.css";

export async function loader() {
  const products = await dbService.getProducts();
  return { products };
}

export function meta() {
  return [
    { title: "Our Products - Mauli Industries" },
    {
      name: "description",
      content: "Explore our comprehensive range of industrial products including shearing blades, gearboxes, hydraulic cylinders, and more.",
    },
  ];
}

export default function Products({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;

  return (
    <div className={styles.container}>
      <Header />

      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Our Products</h1>
        <p className={styles.heroSubtitle}>Precision Industrial Components for Steel & Rolling Mill Industries</p>
      </section>

      <section className={styles.section}>
        <div className={styles.productsGrid}>
          {products.length > 0 ? (
            products.map((product: any) => (
              <Link key={product.id} to={`/products/${product.id}`} className={styles.productCard}>
                <img src={product.image_url || ''} alt={product.name} className={styles.productImage} />
                <div className={styles.productContent}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDescription}>{product.description}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className={styles.noProducts}>No products available yet.</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
