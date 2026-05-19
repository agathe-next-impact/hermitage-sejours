"use client";

const specs = [
  { label: "Hectares de domaine", value: "30" },
  { label: "De Paris", value: "1h40" },
  { label: "Couchages", value: "100+" },
  { label: "Hectares de forêt", value: "21" },
];

export function EditorialSection() {
  return (
    <section aria-labelledby="domain-stats-heading" className="bg-background">
      <h2 id="domain-stats-heading" className="sr-only">
        Le domaine de L'Hermitage en chiffres
      </h2>
      {/* Newsletter Banner */}
      

      {/* Decorative Icons */}
      <div className="flex items-center justify-center gap-6 pb-20">
        
        
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-2 border-t border-border md:grid-cols-4">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="border-b border-r border-border p-8 text-center last:border-r-0 md:border-b-0"
          >
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              {spec.label}
            </p>
            <p className="font-medium text-foreground text-4xl">
              {spec.value}
            </p>
          </div>
        ))}
      </div>

      {/* Full-width Video */}
      <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label="Vidéo aérienne du domaine forestier de 30 hectares de L'Hermitage"
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/hero.mp4"
        />
      </div>
    </section>
  );
}
