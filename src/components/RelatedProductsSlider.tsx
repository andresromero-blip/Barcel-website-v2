"use client";

import Link from "next/link";
import type { Brand, Flavor } from "@/data/brands";

// Mismo mecanismo de loop infinito que ProductSlider.tsx (marquee CSS
// vía animate-marquee, pausa al pasar el cursor, 4 copias para que el
// -50% del loop nunca deje ver un hueco) — reutilizado aquí en vez de
// inventar un segundo patrón de slider para "También te puede antojar".
export default function RelatedProductsSlider({
  brand,
  items,
}: {
  brand: Brand;
  items: Flavor[];
}) {
  const loop = Array.from({ length: 4 }, () => items).flat();
  // Ronda 101 (corregida): el cliente mandó 9 fotos de "estilo de vida"
  // (bolsa + bowl sobre una mesa, con ambiente real) — el pedido original
  // era para "el slider de la página de producto", que es ESTE
  // componente ("También te puede antojar", dentro de la página de
  // detalle de sabor), no el slider de la página de marca
  // (ProductSlider.tsx, que ahora quedó revertido a su recorte de
  // siempre). 6 de las 9 fotos coinciden con los sabores existentes de
  // Chip's (flavor.sliderImage en brands.ts); las otras 3 se dejaron
  // fuera, mismo criterio que la Ronda 97.
  const isChips = brand.slug === "chips";

  return (
    <div className="overflow-hidden">
      <div className="flex w-max animate-marquee items-stretch gap-5 py-1 hover:[animation-play-state:paused]">
        {loop.map((flavor, i) => (
          <Link
            key={`${flavor.slug}-${i}`}
            href={`/marcas/${brand.slug}/${flavor.slug}`}
            className={`group flex w-60 shrink-0 flex-col gap-3 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:w-72 ${brand.hoverBg}`}
          >
            {isChips && flavor.sliderImage ? (
              // Foto de estilo de vida a sangre dentro de la caja (mismo
              // criterio de object-cover que se probó primero, por error,
              // en el slider de marca) — reemplaza la caja crema +
              // recorte de producto solo para los sabores de Chip's que
              // tienen este asset.
              <div className="h-48 overflow-hidden sm:h-56">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={flavor.sliderImage}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="flex h-48 items-center justify-center bg-barcel-cream sm:h-56">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={flavor.image}
                  alt=""
                  aria-hidden="true"
                  className="h-40 w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:h-48"
                />
              </div>
            )}
            {/* El fondo cambia al color de marca en hover (mismo hoverBg
                que las tarjetas del portafolio en ProductSlider.tsx, para
                coherencia en toda la navegación) — como estos dos textos
                tienen su propio color en reposo (label con acento de
                marca, nombre en negro), usan group-hover en vez de
                heredar el color del contenedor. */}
            <p
              className={`font-display text-xs font-bold uppercase tracking-wide ${brand.textOnBg} ${brand.groupHoverText}`}
            >
              {brand.name}
            </p>
            <p
              className={`font-teko text-2xl font-bold uppercase leading-none text-barcel-black ${brand.groupHoverText}`}
            >
              {brand.name} {flavor.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
