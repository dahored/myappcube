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
    title: `Privacy Policy — ${game.name}`,
    description: `Privacy policy for ${game.name} by myappcube.`,
  };
}

export default async function GamePrivacyPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const game = games.find((g) => g.slug === slug && !g.comingSoon);
  if (!game) notFound();

  const es = locale === 'es';
  const title = es ? `Política de privacidad — ${game.name}` : `Privacy Policy — ${game.name}`;
  const lastUpdated = es ? 'Última actualización: marzo 2025' : 'Last updated: March 2025';

  if (es) {
    return (
      <LegalLayout title={title} lastUpdated={lastUpdated}>
        <p>
          Esta política de privacidad describe cómo <strong>myappcube</strong> recopila, usa y
          protege la información relacionada con la aplicación <strong>{game.name}</strong>.
        </p>
        <p>
          Para la política de privacidad completa del estudio, consulta{' '}
          <Link href="/privacy" className="text-violet-600 dark:text-violet-400 underline">
            myappcube.com/privacy
          </Link>
          .
        </p>

        <h2>1. Información que recopilamos</h2>
        <ul>
          <li>
            <strong>Cuenta:</strong> si creas una cuenta, almacenamos tu correo electrónico a
            través de Firebase Authentication (Google). Este dato se usa exclusivamente para
            gestionar tu sesión y suscripción.
          </li>
          <li>
            <strong>Suscripción:</strong> si adquieres un plan premium, recibimos confirmación del
            estado de tu suscripción desde Google Play{game.storeUrl?.ios ? ' o la App Store' : ''}.
            No almacenamos datos de pago.
          </li>
          <li>
            <strong>Datos de uso:</strong> información anónima y agregada sobre cómo se usa la app
            (sesiones, errores técnicos), sin identificarte personalmente.
          </li>
        </ul>

        <h2>2. Información que NO recopilamos</h2>
        <ul>
          <li>El contenido de las partidas (palabras, votos, resultados) no se almacena en ningún servidor.</li>
          <li>No recopilamos tu nombre, ubicación ni datos de contacto sin tu consentimiento.</li>
          <li>No compartimos tus datos con terceros para fines publicitarios directos.</li>
        </ul>

        <h2>3. Publicidad</h2>
        <p>
          La versión gratuita de {game.name} puede mostrar anuncios a través de Google AdMob. Al
          iniciar la app, solicitamos tu consentimiento para anuncios personalizados. Los usuarios
          con suscripción activa no ven anuncios. Puedes revocar tu consentimiento en Configuración
          → Privacidad dentro de la app.
        </p>

        <h2>4. Servicios de terceros</h2>
        <ul>
          <li>
            <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">
              Firebase Authentication — Google
            </a>
          </li>
          <li>
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google AdMob / Google Play
            </a>
          </li>
          {game.storeUrl?.ios && (
            <li>
              <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">
                Apple App Store
              </a>
            </li>
          )}
        </ul>

        <h2>5. Menores de edad</h2>
        <p>
          {game.name} no está dirigido a menores de 13 años. No recopilamos conscientemente datos
          de niños.
        </p>

        <h2>6. Tus derechos</h2>
        <p>
          Puedes solicitar acceso, rectificación o eliminación de tus datos (incluyendo tu cuenta)
          escribiéndonos a{' '}
          <a href={`mailto:${studio.email}?subject=${encodeURIComponent('Privacidad / Privacy — myappcube')}`}>{studio.email}</a>.
        </p>

        <h2>7. Cambios</h2>
        <p>
          Podemos actualizar esta política en cualquier momento. La fecha de última actualización
          siempre estará indicada al inicio del documento.
        </p>

        <h2>8. Contacto</h2>
        <p>
          <a href={`mailto:${studio.email}?subject=${encodeURIComponent('Privacidad / Privacy — myappcube')}`}>{studio.email}</a>
        </p>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout title={title} lastUpdated={lastUpdated}>
      <p>
        This privacy policy describes how <strong>myappcube</strong> collects, uses, and protects
        information related to the application <strong>{game.name}</strong>.
      </p>
      <p>
        For the full studio privacy policy, see{' '}
        <Link href="/privacy" className="text-violet-600 dark:text-violet-400 underline">
          myappcube.com/privacy
        </Link>
        .
      </p>

      <h2>1. Information We Collect</h2>
      <ul>
        <li>
          <strong>Account:</strong> if you create an account, we store your email address through
          Firebase Authentication (Google). This data is used exclusively to manage your session
          and subscription.
        </li>
        <li>
          <strong>Subscription:</strong> if you purchase a premium plan, we receive confirmation
          of your subscription status from Google Play{game.storeUrl?.ios ? ' or the App Store' : ''}.
          We do not store payment data.
        </li>
        <li>
          <strong>Usage data:</strong> anonymous and aggregate information about how the app is
          used (sessions, technical errors), without personally identifying you.
        </li>
      </ul>

      <h2>2. Information We Do NOT Collect</h2>
      <ul>
        <li>Game session content (words, votes, results) is not stored on any server.</li>
        <li>We do not collect your name, location, or contact details without your consent.</li>
        <li>We do not share your data with third parties for direct advertising purposes.</li>
      </ul>

      <h2>3. Advertising</h2>
      <p>
        The free version of {game.name} may display ads through Google AdMob. When you first
        launch the app, we request your consent for personalized ads. Users with an active
        subscription do not see ads. You can withdraw your consent in Settings → Privacy within
        the app.
      </p>

      <h2>4. Third-Party Services</h2>
      <ul>
        <li>
          <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">
            Firebase Authentication — Google
          </a>
        </li>
        <li>
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Google AdMob / Google Play
          </a>
        </li>
        {game.storeUrl?.ios && (
          <li>
            <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">
              Apple App Store
            </a>
          </li>
        )}
      </ul>

      <h2>5. Children</h2>
      <p>
        {game.name} is not directed at children under 13. We do not knowingly collect data from
        children.
      </p>

      <h2>6. Your Rights</h2>
      <p>
        You may request access, correction, or deletion of your data (including your account) by
        writing to us at{' '}
        <a href={`mailto:${studio.email}?subject=${encodeURIComponent('Privacidad / Privacy — myappcube')}`}>{studio.email}</a>.
      </p>

      <h2>7. Changes</h2>
      <p>
        We may update this policy at any time. The last updated date will always be shown at the
        top of this document.
      </p>

      <h2>8. Contact</h2>
      <p>
        <a href={`mailto:${studio.email}?subject=${encodeURIComponent('Privacidad / Privacy — myappcube')}`}>{studio.email}</a>
      </p>
    </LegalLayout>
  );
}
