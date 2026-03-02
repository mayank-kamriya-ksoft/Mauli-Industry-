import type { Route } from "./+types/clients";
import { Header } from "~/components/header/header";
import { Footer } from "~/components/footer/footer";
import { dbService } from "~/lib/services/database";
import styles from "./clients.module.css";

export async function loader() {
  const clients = await dbService.getClients();
  return { clients };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Our Clients - Mauli Industries" },
    {
      name: "description",
      content: "Trusted by leading steel mills, pharmaceutical companies, and industrial manufacturers across India.",
    },
  ];
}

export default function Clients({ loaderData }: Route.ComponentProps) {
  const clients = [...loaderData.clients].sort((a: any, b: any) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className={styles.container}>
      <Header />

      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Our Valued Clients</h1>
        <p className={styles.heroSubtitle}>Building Trust Through Quality and Reliability</p>
      </section>

      <section className={styles.section}>
        <p className={styles.intro}>
          We are proud to serve leading companies across various industries in India. Our commitment to precision,
          quality, and timely delivery has earned us the trust of major steel mills, pharmaceutical companies, and
          industrial manufacturers nationwide.
        </p>

        <div className={styles.clientsGrid}>
          {clients.map((client: any) => (
            <div key={client.id} className={styles.clientCard}>
              <img src={client.logo_url || client.logoUrl} alt={client.name} className={styles.clientLogo} />
              <h3 className={styles.clientName}>{client.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
