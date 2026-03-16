import type { Metadata } from 'next';
import LegalLayout from '@/components/ui/LegalLayout';
import { studio } from '@/config/studio';

export const metadata: Metadata = {
  title: 'Terms of Service — myappcube',
  description: 'Terms of service for myappcube and its mobile apps.',
};

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const es = locale === 'es';

  const title = es ? 'Términos de uso' : 'Terms of Service';
  const lastUpdated = es ? 'Última actualización: marzo 2026' : 'Last updated: March 2026';

  if (es) {
    return (
      <LegalLayout title={title} lastUpdated={lastUpdated}>
        <p>
          Al descargar, instalar o usar cualquier aplicación de <strong>myappcube</strong>, o al
          navegar por este sitio web, aceptas los siguientes términos. Si no estás de acuerdo, por
          favor no uses nuestros productos.
        </p>

        <h2>1. Cuentas de usuario</h2>
        <p>
          Al abrir la app por primera vez, se te asigna automáticamente un identificador de sesión
          anónimo. Si decides crear una cuenta para acceder a funciones adicionales, puedes hacerlo
          mediante correo electrónico y contraseña, Google Sign-In o Sign in with Apple. Eres
          responsable de mantener la confidencialidad de tus credenciales y de todas las
          actividades que ocurran bajo tu cuenta. Notifícanos de inmediato ante cualquier uso no
          autorizado.
        </p>

        <h2>2. Suscripciones y pagos</h2>
        <p>
          Algunas apps ofrecen planes de suscripción con acceso a funciones premium. Al suscribirte:
        </p>
        <ul>
          <li>
            El pago se procesa a través de <strong>Google Play</strong> (Android) o la{' '}
            <strong>App Store</strong> (iOS), según la plataforma que uses. Cada tienda aplica sus
            propios términos y condiciones de pago.
          </li>
          <li>
            La gestión del estado de suscripción se realiza mediante <strong>RevenueCat</strong>.
            Al suscribirte aceptas también sus{' '}
            <a href="https://www.revenuecat.com/terms" target="_blank" rel="noopener noreferrer">
              términos de servicio
            </a>
            .
          </li>
          <li>
            Las suscripciones se renuevan automáticamente al final de cada período, salvo que las
            canceles antes de la fecha de renovación.
          </li>
          <li>
            <strong>Android:</strong> puedes cancelar desde la configuración de tu cuenta en Google
            Play → Suscripciones.
          </li>
          <li>
            <strong>iOS:</strong> puedes cancelar desde Configuración → [tu nombre] → Suscripciones.
          </li>
          <li>
            La cancelación tiene efecto al final del período de facturación vigente. No realizamos
            reembolsos por períodos parciales, salvo que la ley aplicable lo requiera.
          </li>
        </ul>

        <h2>3. Publicidad</h2>
        <p>
          Nuestras apps gratuitas pueden mostrar anuncios a través de Google AdMob: banners,
          intersticiales (al finalizar partidas) y anuncios recompensados (que el usuario puede ver
          voluntariamente para desbloquear contenido premium de forma temporal). Los usuarios con
          suscripción activa disfrutan de una experiencia sin anuncios, según lo indicado en cada
          app.
        </p>

        <h2>4. Uso permitido</h2>
        <p>Nuestras apps y sitio web son para uso personal y no comercial. Queda prohibido:</p>
        <ul>
          <li>Copiar, modificar o distribuir nuestro contenido sin autorización.</li>
          <li>Realizar ingeniería inversa sobre nuestras aplicaciones.</li>
          <li>Usar los servicios para actividades ilegales o que perjudiquen a terceros.</li>
          <li>Intentar acceder a sistemas o datos no autorizados.</li>
        </ul>

        <h2>5. Propiedad intelectual</h2>
        <p>
          Todo el contenido de este sitio y de nuestras apps — incluyendo nombre, logo, diseños,
          código, gráficos y textos — es propiedad de <strong>myappcube</strong> y está protegido
          por las leyes de propiedad intelectual aplicables.
        </p>

        <h2>6. Disponibilidad del servicio</h2>
        <p>
          Nos reservamos el derecho de modificar, suspender o discontinuar cualquier app o función
          en cualquier momento, sin previo aviso. No nos hacemos responsables por interrupciones
          del servicio.
        </p>

        <h2>7. Limitación de responsabilidad</h2>
        <p>
          myappcube no será responsable por daños directos, indirectos, incidentales o consecuentes
          derivados del uso o la imposibilidad de uso de nuestras apps o sitio web. Nuestros
          productos se ofrecen «tal cual», sin garantías de ningún tipo.
        </p>

        <h2>8. Menores de edad</h2>
        <p>
          Nuestras apps están diseñadas para mayores de 13 años. Los menores deben contar con la
          supervisión y autorización de sus padres o tutores para usarlas o realizar compras.
        </p>

        <h2>9. Modificaciones</h2>
        <p>
          Podemos actualizar estos términos en cualquier momento. La fecha de última actualización
          estará siempre indicada al inicio del documento. El uso continuado de nuestros productos
          implica la aceptación de los términos vigentes.
        </p>

        <h2>10. Ley aplicable</h2>
        <p>
          Estos términos se rigen por las leyes de la República Argentina. Cualquier disputa se
          resolverá ante los tribunales competentes de dicha jurisdicción.
        </p>

        <h2>11. Contacto</h2>
        <p>
          Para consultas sobre estos términos, puedes escribirnos a{' '}
          <a href={`mailto:${studio.email}?subject=${encodeURIComponent('Términos / Terms — myappcube')}`}>{studio.email}</a>.
        </p>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout title={title} lastUpdated={lastUpdated}>
      <p>
        By downloading, installing, or using any <strong>myappcube</strong> application, or by
        browsing this website, you agree to the following terms. If you do not agree, please do not
        use our products.
      </p>

      <h2>1. User Accounts</h2>
      <p>
        When you open the app for the first time, an anonymous session identifier is automatically
        assigned to your device. If you choose to create an account to access additional features,
        you can do so via email and password, Google Sign-In, or Sign in with Apple. You are
        responsible for maintaining the confidentiality of your credentials and for all activities
        that occur under your account. Notify us immediately of any unauthorized use.
      </p>

      <h2>2. Subscriptions and Payments</h2>
      <p>Some apps offer subscription plans with access to premium features. By subscribing:</p>
      <ul>
        <li>
          Payment is processed through <strong>Google Play</strong> (Android) or the{' '}
          <strong>App Store</strong> (iOS), depending on your platform. Each store applies its own
          payment terms and conditions.
        </li>
        <li>
          Subscription status management is handled by <strong>RevenueCat</strong>. By subscribing
          you also agree to their{' '}
          <a href="https://www.revenuecat.com/terms" target="_blank" rel="noopener noreferrer">
            Terms of Service
          </a>
          .
        </li>
        <li>
          Subscriptions automatically renew at the end of each billing period unless cancelled
          before the renewal date.
        </li>
        <li>
          <strong>Android:</strong> cancel from your Google Play account settings → Subscriptions.
        </li>
        <li>
          <strong>iOS:</strong> cancel from Settings → [your name] → Subscriptions.
        </li>
        <li>
          Cancellation takes effect at the end of the current billing period. We do not offer
          refunds for partial periods, except where required by applicable law.
        </li>
      </ul>

      <h2>3. Advertising</h2>
      <p>
        Our free apps may display ads through Google AdMob: banners, interstitials (shown when a
        game ends), and rewarded ads (which users can voluntarily watch to temporarily unlock
        premium content). Users with an active subscription enjoy an ad-free experience, as
        indicated in each app.
      </p>

      <h2>4. Permitted Use</h2>
      <p>Our apps and website are for personal, non-commercial use only. You may not:</p>
      <ul>
        <li>Copy, modify, or distribute our content without authorization.</li>
        <li>Reverse-engineer our applications.</li>
        <li>Use our services for illegal activities or to harm others.</li>
        <li>Attempt to access unauthorized systems or data.</li>
      </ul>

      <h2>5. Intellectual Property</h2>
      <p>
        All content on this site and in our apps — including the name, logo, designs, code,
        graphics, and text — is the property of <strong>myappcube</strong> and is protected by
        applicable intellectual property laws.
      </p>

      <h2>6. Service Availability</h2>
      <p>
        We reserve the right to modify, suspend, or discontinue any app or feature at any time
        without prior notice. We are not responsible for service interruptions.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>
        myappcube shall not be liable for any direct, indirect, incidental, or consequential
        damages arising from the use or inability to use our apps or website. Our products are
        provided "as is," without warranties of any kind.
      </p>

      <h2>8. Minors</h2>
      <p>
        Our apps are intended for users aged 13 and older. Minors must have parental or guardian
        supervision and consent to use our apps or make purchases.
      </p>

      <h2>9. Modifications</h2>
      <p>
        We may update these terms at any time. The last updated date will always be shown at the
        top of this document. Continued use of our products implies acceptance of the current terms.
      </p>

      <h2>10. Governing Law</h2>
      <p>
        These terms are governed by the laws of the Republic of Argentina. Any disputes shall be
        resolved before the competent courts of that jurisdiction.
      </p>

      <h2>11. Contact</h2>
      <p>
        For questions about these terms, you can reach us at{' '}
        <a href={`mailto:${studio.email}?subject=${encodeURIComponent('Términos / Terms — myappcube')}`}>{studio.email}</a>.
      </p>
    </LegalLayout>
  );
}
