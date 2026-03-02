import { Link, useParams } from "react-router";
import { Header } from "~/components/header/header";
import { Footer } from "~/components/footer/footer";
import { ProductSidebar } from "~/components/product-sidebar/product-sidebar";
import { productCategories } from "~/data/products";
import { dbService } from "~/lib/services/database";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Route } from "./+types/product-detail";
import styles from "./product-detail.module.css";

export async function loader({ params }: Route.LoaderArgs) {
  const products = await dbService.getProducts();
  return { products, paramId: params.id };
}

export function meta({ params }: { params: { id: string } }) {
  const product = productCategories.find((p) => p.id === params.id);
  return [
    { title: `${product?.name || "Product"} - Mauli Industries` },
    {
      name: "description",
      content: product?.description || "Product details from Mauli Industries",
    },
  ];
}

export default function ProductDetail({ loaderData }: Route.ComponentProps) {
  const { products, paramId } = loaderData;
  const id = paramId;

  // Find from API products, merge with static for specs/subProducts
  const staticProduct = productCategories.find((p) => p.id === id);
  const apiProduct = products.find((p: any) => p.id === id);

  const product = staticProduct
    ? {
        ...staticProduct,
        name: apiProduct?.name || staticProduct.name,
        description: apiProduct?.description || staticProduct.description,
        imageUrl: (apiProduct as any)?.image_url || (apiProduct as any)?.imageUrl || staticProduct.imageUrl,
      }
    : apiProduct
    ? {
        id: apiProduct.id,
        name: apiProduct.name,
        description: apiProduct.description || "",
        imageUrl: (apiProduct as any).image_url || (apiProduct as any).imageUrl || "",
      }
    : null;

  if (!product) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.notFound}>
          <h1>Product Not Found</h1>
          <p>The product you're looking for doesn't exist.</p>
          <Link to="/products" className={styles.backLink}>
            <ArrowLeft size={18} /> Back to Products
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
            <Link to="/products" className={styles.backLink}>
              <ArrowLeft size={18} /> Back to Products
            </Link>
            <h1 className={styles.heroTitle}>{product.name}</h1>
          </section>

          <section className={styles.content}>
            <div className={styles.productLayout}>
              <div className={styles.imageSection}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className={styles.productImage}
                />
              </div>

              <div className={styles.infoSection}>
                <h2 className={styles.aboutTitle}>About This Product</h2>
                <p className={styles.description}>{product.description}</p>

                {(product as any).specs && (product as any).specs.length > 0 && (
                  <div className={styles.mainSpecSection}>
                    <h3 className={styles.specSectionTitle}>Specifications</h3>
                    <table className={styles.specTable}>
                      <thead>
                        <tr>
                          <th>Particular</th>
                          <th>Specifications</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(product as any).specs.map((row: any, i: number) => (
                          <tr key={i}>
                            <td>{row.Particular}</td>
                            <td>{row.Specifications}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {(product as any).subProducts && (product as any).subProducts.length > 0 && (
              <div className={styles.subProductsSection}>
                <h2 className={styles.subProductsTitle}>
                  Product Range & Variants
                </h2>
                <div className={styles.subProductsGrid}>
                  {(product as any).subProducts.map((sub: any, i: number) => (
                    <Link
                      key={sub.id}
                      to={`/products/${product.id}/${sub.id}`}
                      className={styles.subProductCard}
                    >
                      <span className={styles.subProductNumber}>{i + 1}</span>
                      <div className={styles.subProductInfo}>
                        <span className={styles.subProductName}>{sub.name}</span>
                        <p className={styles.subProductDesc}>{sub.description}</p>
                      </div>
                      <span className={styles.expandIcon}>
                        <ArrowRight size={20} />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
