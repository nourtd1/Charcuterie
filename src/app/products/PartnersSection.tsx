import Image from "next/image";

type Partner = { name: string; logo: string; url?: string };

const partners: Partner[] = [
  { name: "Virunga Origins", logo: "/assets/images/logo/logo.png", url: "https://virungaorigins.com" },
  { name: "Africa Global Logistics (AGL)", logo: "/assets/images/logo/logo.png", url: "https://www.agl.com" },
  { name: "DHL Express RDC", logo: "/assets/images/logo/logo.png", url: "https://www.dhl.com/cd-en/home.html" },
  { name: "Hôtel Ihusi Goma", logo: "/assets/images/logo/logo.png", url: undefined },
  { name: "Lac Kivu Lodge", logo: "/assets/images/logo/logo.png", url: undefined },
];

export default function PartnersSection() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary">Ils nous font confiance</h2>
          <p className="text-muted-foreground mt-2">Des partenaires exigeants qui partagent nos standards de qualité.</p>
        </div>
        <ul role="list" className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
          {partners.map((p, idx) => (
            <li key={idx} className="flex items-center justify-center">
              <div className="flex h-16 w-full items-center justify-center rounded-xl border border-border/40 bg-card/60 backdrop-blur-md p-3 shadow-sm">
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Visiter le site de ${p.name}`} className="inline-flex">
                    <Image
                      src={p.logo}
                      alt={p.name}
                      width={140}
                      height={40}
                      className="mx-auto h-10 w-auto grayscale opacity-80 transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                    />
                  </a>
                ) : (
                  <Image
                    src={p.logo}
                    alt={p.name}
                    width={140}
                    height={40}
                    className="mx-auto h-10 w-auto grayscale opacity-80 transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}


