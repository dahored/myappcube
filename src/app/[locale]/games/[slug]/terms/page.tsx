import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { games } from '@/config/games';
import { routing } from '@/i18n/routing';
import { studio } from '@/config/studio';
import LegalLayout from '@/components/ui/LegalLayout';

export function generateStaticParams() {
  const slugs = games.filter((g) => !g.comingSoon).map((g) => g.slug);
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);
  if (!game) return {};
  return {
    title: `Terms of Service — ${game.name}`,
    description: `Terms of service for ${game.name} by myappcube.`,
  };
}

export default async function GameTermsPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const game = games.find((g) => g.slug === slug && !g.comingSoon);
  if (!game) notFound();

  const es = locale === 'es';
  const title = es ? `Términos de uso — ${game.name}` : `Terms of Service — ${game.name}`;
  const lastUpdated = es ? 'Última actualización: marzo 2025' : 'Last updated: March 2025';

  if (es) {
    return (
      <LegalLayout title={title} lastUpdated={lastUpdated}>
        <p>
          Al descargar, instalar o usar <strong>{game.name}</strong>, aceptas estos términos. Si
          no estás de acuerdo, por favor no uses la aplicación.
        </p>
        <p>
          Para los términos de uso completos del estudio, consulta{' '}
          <Link href="/terms" className="text-violet-600 dark:text-violet-400 underline">
            myappcube.com/terms
          </Link>
          .
        </p>

        <h2>1. Cuentas de usuario</h2>
        <p>
          Algunas funciones de {game.name} requieren una cuenta creada mediante correo electrónico.
          Eres responsable de mantener la confidencialidad de tus credenciales y de todas las
          actividades realizadas bajo tu cuenta.
        </p>

        <h2>2. Suscripciones y pagos</h2>
        <p>
          {game.name} ofrece una versión gratuita y planes de suscripción premium. Al suscribirte:
        </p>
        <ul>
          <li>
            El pago se procesa a través de <strong>Google Play</strong>
            {game.storeUrl?.ios ? ' (Android) o la <strong>App Store</strong> (iOS)' : ''}.
          </li>
          <li>
            Las suscripciones se renuevan automáticamente salvo que las canceles antes de la fecha
            de renovación.
          </li>
          <li>
            <strong>Android:</strong> cancela desde Google Play → Suscripciones.
          </li>
          {game.storeUrl?.ios && (
            <li>
              <strong>iOS:</strong> cancela desde Configuración → [tu nombre] → Suscripciones.
            </li>
          )}
          <li>
            No realizamos reembolsos por períodos parciales, salvo que la ley aplicable lo requiera.
          </li>
        </ul>

        <h2>3. Publicidad</h2>
        <p>
          La versión gratuita puede mostrar anuncios de terceros (Google AdMob). Los usuarios con
          suscripción activa disfrutan de una experiencia sin anuncios.
        </p>

        <h2>4. Uso permitido</h2>
        <p>
          {game.name} es para uso personal y no comercial. Queda prohibido modificar, distribuir
          o realizar ingeniería inversa sobre la aplicación.
        </p>

        <h2>5. Propiedad intelectual</h2>
        <p>
          Todo el contenido de {game.name} — nombre, diseño, gráficos, código y mecánicas — es
          propiedad de <strong>myappcube</strong> y está protegido por las leyes de propiedad
          intelectual aplicables.
        </p>

        <h2>6. Limitación de responsabilidad</h2>
        <p>
          myappcube no será responsable por daños derivados del uso o la imposibilidad de uso de
          {' '}{game.name}. La aplicación se ofrece «tal cual», sin garantías de ningún tipo.
        </p>

        <h2>7. Menores de edad</h2>
        <p>
          {game.name} está diseñado para mayores de 13 años. Los menores deben contar con la
          supervisión y autorización de sus padres o tutores, especialmente para realizar compras.
        </p>

        <h2>8. Modificaciones</h2>
        <p>
          Podemos actualizar estos términos en cualquier momento. La fecha de última actualización
          estará siempre indicada al inicio del documento.
        </p>

        <h2>9. Contacto</h2>
        <p>
          <a href={`mailto:${studio.email}`}>{studio.email}</a>
        </p>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout title={title} lastUpdated={lastUpdated}>
      <p>
        By downloading, installing, or using <strong>{game.name}</strong>, you agree to these
        terms. If you do not agree, please do not use the application.
      </p>
      <p>
        For the full studio terms of service, see{' '}
        <Link href="/terms" className="text-violet-600 dark:text-violet-400 underline">
          myappcube.com/terms
        </Link>
        .
      </p>

      <h2>1. User Accounts</h2>
      <p>
        Some features of {game.name} require an account created via email. You are responsible
        for maintaining the confidentiality of your credentials and all activities under your
        account.
      </p>

      <h2>2. Subscriptions and Payments</h2>
      <p>
        {game.name} offers a free version and premium subscription plans. By subscribing:
      </p>
      <ul>
        <li>
          Payment is processed through <strong>Google Play</strong>
          {game.storeUrl?.ios ? ' (Android) or the <strong>App Store</strong> (iOS)' : ''}.
        </li>
        <li>
          Subscriptions automatically renew unless cancelled before the renewal date.
        </li>
        <li>
          <strong>Android:</strong> cancel from Google Play → Subscriptions.
        </li>
        {game.storeUrl?.ios && (
          <li>
            <strong>iOS:</strong> cancel from Settings → [your name] → Subscriptions.
          </li>
        )}
        <li>
          We do not offer refunds for partial periods, except where required by applicable law.
        </li>
      </ul>

      <h2>3. Advertising</h2>
      <p>
        The free version may display third-party ads (Google AdMob). Users with an active
        subscription enjoy an ad-free experience.
      </p>

      <h2>4. Permitted Use</h2>
      <p>
        {game.name} is for personal, non-commercial use only. Modifying, distributing, or
        reverse-engineering the application is prohibited.
      </p>

      <h2>5. Intellectual Property</h2>
      <p>
        All content in {game.name} — name, design, graphics, code, and mechanics — is the
        property of <strong>myappcube</strong> and is protected by applicable intellectual
        property laws.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        myappcube shall not be liable for damages arising from the use or inability to use{' '}
        {game.name}. The application is provided "as is," without warranties of any kind.
      </p>

      <h2>7. Minors</h2>
      <p>
        {game.name} is intended for users aged 13 and older. Minors must have parental or
        guardian supervision and consent, especially for purchases.
      </p>

      <h2>8. Modifications</h2>
      <p>
        We may update these terms at any time. The last updated date will always be shown at the
        top of this document.
      </p>

      <h2>9. Contact</h2>
      <p>
        <a href={`mailto:${studio.email}`}>{studio.email}</a>
      </p>
    </LegalLayout>
  );
}
