import type { LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/page";
import { Header } from "~/components/header/header";
import { Footer } from "~/components/footer/footer";
import { HtmlContent } from "~/components/html-content/html-content";
import { dbService } from "~/lib/services/database";
import styles from "./page.module.css";

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug;
  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }

  const page = await dbService.getPageBySlug(slug);
  if (!page) {
    throw new Response("Not Found", { status: 404 });
  }

  const company = await dbService.getCompanyInfo();
  return { page, company };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data?.page) {
    return [{ title: "Page Not Found" }];
  }
  return [
    { title: `${data.page.title} - Mauli Industries` },
    { name: "description", content: data.page.excerpt || data.page.title },
  ];
}

export default function DynamicPage({ loaderData }: Route.ComponentProps) {
  const { page, company } = loaderData;

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{page.title}</h1>
            {page.excerpt && <p className={styles.heroSubtitle}>{page.excerpt}</p>}
          </div>
        </section>
        <section className={styles.content}>
          <div className={styles.container}>
            <HtmlContent html={page.content} className={styles.htmlContent} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
