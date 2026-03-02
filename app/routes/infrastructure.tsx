import { Header } from "~/components/header/header";
import { Footer } from "~/components/footer/footer";
import styles from "./infrastructure.module.css";

const machines = [
  { sr: 1, machine: "Lathe", range: "3 feet-9 Feet", qty: 11 },
  { sr: 2, machine: "Milling Machine", range: "Bed Size-Min-800X300X200mm to Max 1400X1800X750mm", qty: 3 },
  { sr: 3, machine: "Jib Boaring", range: "Bed Size-1400X1800X750mm", qty: 1 },
  { sr: 4, machine: "Cylindrical Grinding", range: "Chuck size-250mm", qty: 2 },
  { sr: 5, machine: "Gear Hobbing", range: "OD-400mm", qty: 2 },
  { sr: 6, machine: "Surface Grinding", range: "Bed Size-700X 800mm", qty: 2 },
  { sr: 7, machine: "Bench Grinding", range: 'Wheel Size-6"', qty: 1 },
  { sr: 8, machine: "Slotting Machine", range: "Stroke-150mm", qty: 1 },
  { sr: 9, machine: "VMC Machine", range: "Bench Size-500X800mm", qty: 2 },
  { sr: 10, machine: "VMC Machine", range: "Bench Size-400X600mm", qty: 2 },
  { sr: 11, machine: "CNC Machine", range: "Turret OD-180mm-TL240mm", qty: 2 },
];

export function meta() {
  return [
    { title: "Infrastructure - Mauli Industries" },
    { name: "description", content: "Tool Room Facilities and Design Infrastructure at Mauli Industries" },
  ];
}

export default function Infrastructure() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Infrastructure</h1>
            <p className={styles.heroSubtitle}>Our state-of-the-art manufacturing facilities</p>
          </div>
        </section>

        <section className={styles.content}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Tool Room Facilities</h2>
            <p className={styles.designLabel}>Design Facilities — Creo</p>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.thSr}>Sr.No.</th>
                    <th className={styles.thMachine}>Machine</th>
                    <th className={styles.thRange}>Range</th>
                    <th className={styles.thQty}>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {machines.map((m) => (
                    <tr key={m.sr}>
                      <td className={styles.tdCenter}>{m.sr}</td>
                      <td>{m.machine}</td>
                      <td>{m.range}</td>
                      <td className={styles.tdCenter}>{m.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
