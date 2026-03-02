import { useParams, Link } from "react-router";
import { Header } from "~/components/header/header";
import { Footer } from "~/components/footer/footer";
import { ProductSidebar } from "~/components/product-sidebar/product-sidebar";
import { productCategories } from "~/data/products";
import { dbService } from "~/lib/services/database";
import { ArrowLeft } from "lucide-react";
import type { Route } from "./+types/sub-product-detail";
import styles from "./sub-product-detail.module.css";

export async function loader({ params }: Route.LoaderArgs) {
  // Use cached products - no extra API hit if already fetched
  const products = await dbService.getProducts();
  return { products, paramId: params.id, paramSubId: params.subId };
}

export function meta({ params }: { params: { id: string; subId: string } }) {
  const product = productCategories.find((p) => p.id === params.id);
  const sub = product?.subProducts?.find((s) => s.id === params.subId);
  return [
    { title: `${sub?.name || "Product"} - Mauli Industries` },
    {
      name: "description",
      content: sub?.description || "Product details from Mauli Industries",
    },
  ];
}

export default function SubProductDetail({ loaderData }: Route.ComponentProps) {
  const { paramId: id, paramSubId: subId } = loaderData;
  const product = productCategories.find((p) => p.id === id);
  const sub = product?.subProducts?.find((s) => s.id === subId);

  if (!product || !sub) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.notFound}>
          <h1>Product Not Found</h1>
          <p>The product you're looking for doesn't exist.</p>
          <Link to={product ? `/products/${product.id}` : "/products"} className={styles.backLink}>
            <ArrowLeft size={18} /> Back
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.pageLayout}>
        <ProductSidebar />

        <div className={styles.mainContent}>
          <section className={styles.hero}>
            <Link to={`/products/${product.id}`} className={styles.backLink}>
              <ArrowLeft size={18} /> Back to {product.name}
            </Link>
            <h1 className={styles.heroTitle}>{sub.name}</h1>
          </section>

          <section className={styles.content}>
            <div className={styles.descriptionSection}>
              <h2 className={styles.sectionTitle}>About This Product</h2>
              <p className={styles.description}>{sub.description}</p>
            </div>

            {sub.specs && sub.specs.length > 0 && (
              <div className={styles.specSection}>
                <h3 className={styles.sectionTitle}>Specifications</h3>
                <table className={styles.specTable}>
                  <thead>
                    <tr>
                      <th>Particular</th>
                      <th>Specifications</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sub.specs.map((row, i) => (
                      <tr key={i}>
                        <td>{row.Particular}</td>
                        <td>{row.Specifications}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className={styles.ctaSection}>
              <Link to="/contact" className={styles.ctaButton}>
                Get a Quote for {sub.name}
              </Link>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
