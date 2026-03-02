import { Link } from "react-router";
import { Header } from "~/components/header/header";
import { Footer } from "~/components/footer/footer";
import { productCategories } from "~/data/products";
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

  // Merge API products with static data for images/descriptions
  const mergedProducts = products.map((apiProduct: any) => {
    const staticProduct = productCategories.find(p => p.id === apiProduct.id);
    return {
      id: apiProduct.id,
      name: apiProduct.name || staticProduct?.name || '',
      description: apiProduct.description || staticProduct?.description || '',
      imageUrl: apiProduct.image_url || apiProduct.imageUrl || staticProduct?.imageUrl || '',
    };
  });

  // Also include static products not in API
  const apiIds = new Set(products.map((p: any) => p.id));
  const staticOnly = productCategories
    .filter(p => !apiIds.has(p.id))
    .map(p => ({ id: p.id, name: p.name, description: p.description, imageUrl: p.imageUrl }));

  const allProducts = [...mergedProducts, ...staticOnly];

  return (
    <div className={styles.container}>
      <Header />

      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Our Products</h1>
        <p className={styles.heroSubtitle}>Precision Industrial Components for Steel & Rolling Mill Industries</p>
      </section>

      <section className={styles.section}>
        <div className={styles.productsGrid}>
          {allProducts.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`} className={styles.productCard}>
              <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
              <div className={styles.productContent}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDescription}>{product.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
