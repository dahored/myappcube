# myappcube — Tareas pendientes

## 🚀 Infraestructura

- [ ] **Migrar hosting de GitHub Pages a Vercel**
  - Conectar repositorio en vercel.com
  - Configurar dominio custom `myappcube.com` en Vercel (DNS → CNAME/A records)
  - Verificar que SSR, image optimization y rutas i18n funcionen correctamente
  - Desactivar GitHub Pages una vez confirmado en Vercel

---

## 🔍 SEO

- [ ] **Google Search Console**
  - Verificar el dominio `myappcube.com` (método DNS o meta tag)
  - Enviar sitemap manualmente: `https://myappcube.com/sitemap.xml`
  - Monitorear indexación y keywords orgánicas

- [ ] **OG Image 1200×630**
  - Diseñar una imagen banner para compartir en redes sociales (reemplaza el logo 512×512)
  - Guardar en `public/images/og/og_myappcube.png`
  - Actualizar `src/app/layout.tsx` → `openGraph.images` con la nueva imagen
  - Actualizar `src/app/[locale]/games/[slug]/page.tsx` si se quiere OG específica por juego

- [ ] **Google Analytics (GA4)**
  - Crear propiedad GA4 en analytics.google.com
  - Agregar `@next/third-parties` o script de GA4 al layout
  - Activar después del lanzamiento para medir tráfico orgánico

---

## 📱 App — El Infiltrado

- [ ] **Reemplazar API key de RevenueCat iOS (test → producción)**
  - Archivo: `src/config/premium.constants.ts`
  - Cambiar `test_myaaTNtuSnunJMDGmVSLXvlazdm` por la key `appl_xxx` real
  - Requiere cuenta activa de Apple Developer

- [ ] **Configurar AdMob para iOS**
  - Obtener App ID de AdMob para iOS
  - Configurar Ad Unit IDs (banner, interstitial, rewarded) para iOS
  - Archivo: `src/config/admob.constants.ts` en el proyecto de la app

---

## 🌐 Sitio web

- [ ] **Activar el sitio** (cuando esté listo para lanzar)
  - Cambiar `comingSoon: false` en `src/config/studio.ts`
  - Hacer commit y push → Vercel despliega automáticamente
