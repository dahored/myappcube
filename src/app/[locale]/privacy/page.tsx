import type { Metadata } from 'next';
import LegalLayout from '@/components/ui/LegalLayout';
import { studio } from '@/config/studio';

export const metadata: Metadata = {
  title: 'Privacy Policy — myappcube',
  description: 'Privacy policy for myappcube and its mobile games.',
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const es = locale === 'es';

  const title = es ? 'Política de privacidad' : 'Privacy Policy';
  const lastUpdated = es ? 'Última actualización: marzo 2026' : 'Last updated: March 2026';

  if (es) {
    return (
      <LegalLayout title={title} lastUpdated={lastUpdated}>
        <p>
          En <strong>myappcube</strong> nos tomamos tu privacidad en serio. Esta política explica qué
          información recopilamos, cómo la usamos y cuáles son tus derechos al respecto.
        </p>

        <h2>1. Información que recopilamos</h2>
        <p>Nuestras aplicaciones y este sitio web pueden recopilar los siguientes tipos de datos:</p>
        <ul>
          <li>
            <strong>Identificador anónimo:</strong> al abrir la app por primera vez, Firebase
            Authentication asigna automáticamente un identificador único (UID) a tu dispositivo,
            incluso antes de que crees una cuenta. Este UID se usa internamente para gestionar tu
            sesión y estado de suscripción.
          </li>
          <li>
            <strong>Cuenta de usuario:</strong> si decides crear una cuenta, puedes hacerlo
            mediante correo electrónico y contraseña, Google Sign-In o Sign in with Apple.
            Almacenamos tu dirección de email, nombre de visualización y foto de perfil del
            proveedor que elijas a través de Firebase Authentication (Google). Además, guardamos
            en Firestore el nombre de usuario y el avatar que configures dentro de la app.
          </li>
          <li>
            <strong>Diagnóstico de errores:</strong> utilizamos Firebase Crashlytics para detectar
            y corregir fallos técnicos. Crashlytics recopila automáticamente informes de fallos,
            trazas de pila (stack traces) y, cuando el usuario está autenticado, el UID de
            Firebase asociado. Estos datos nunca se usan para identificarte de forma personal,
            solo para mejorar la estabilidad de la app.
          </li>
          <li>
            <strong>Publicidad en la app:</strong> nuestras apps gratuitas utilizan Google AdMob
            para mostrar anuncios (banners, intersticiales y anuncios recompensados). AdMob puede
            recopilar identificadores de dispositivo (como el IDFA en iOS o el Android
            Advertising ID) para personalizar los anuncios. Tu consentimiento se solicita al
            primer lanzamiento a través del sistema de gestión de consentimiento de Google (UMP),
            conforme al GDPR y CCPA.
          </li>
          <li>
            <strong>Publicidad en el sitio web:</strong> este sitio web puede utilizar Google
            AdSense, que emplea cookies para mostrar anuncios personalizados.
          </li>
          <li>
            <strong>Suscripciones:</strong> las compras se procesan a través de Google Play
            (Android) o la App Store (iOS). La gestión del estado de suscripción se realiza
            mediante <strong>RevenueCat</strong>, que puede recopilar identificadores de
            dispositivo y receipts de compra para verificar y mantener tu acceso premium. No
            almacenamos datos de pago; solo recibimos confirmación del estado de la suscripción.
          </li>
          <li>
            <strong>Datos del dispositivo:</strong> modelo, sistema operativo y versión de la app,
            necesarios para diagnóstico técnico a través de Crashlytics.
          </li>
        </ul>

        <h2>2. Cómo usamos la información</h2>
        <ul>
          <li>Asignarte un identificador de sesión desde el primer lanzamiento.</li>
          <li>Autenticar tu cuenta y mantener tu sesión activa.</li>
          <li>Mostrar y sincronizar tu perfil (nombre de usuario y avatar) en la app.</li>
          <li>Gestionar y verificar el estado de tu suscripción.</li>
          <li>Detectar y corregir errores técnicos mediante Firebase Crashlytics.</li>
          <li>Mostrar anuncios en la app a través de Google AdMob (según tu consentimiento).</li>
          <li>Mejorar el rendimiento y la experiencia de nuestras apps y sitio web.</li>
          <li>Analizar el uso general de manera anónima para tomar decisiones de producto.</li>
        </ul>

        <h2>3. Publicidad y cookies</h2>
        <p>
          <strong>En la app:</strong> utilizamos Google AdMob para mostrar anuncios a usuarios
          sin suscripción activa. Incluye anuncios banner, intersticiales (al finalizar una
          partida) y anuncios recompensados (que el usuario puede ver voluntariamente para
          desbloquear categorías premium de forma temporal). El consentimiento para anuncios
          personalizados se solicita en el primer lanzamiento mediante el CMP de Google (UMP).
          Puedes revisar o revocar tu consentimiento en cualquier momento desde la configuración
          de la app.
        </p>
        <p>
          <strong>En el sitio web:</strong> utilizamos cookies de terceros (Google AdSense) para
          medir el tráfico y mostrar anuncios. Puedes controlar las cookies desde la configuración
          de tu navegador o mediante el{' '}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
            Centro de preferencias de anuncios de Google
          </a>
          .
        </p>

        <h2>4. Servicios de terceros</h2>
        <p>
          Nuestras apps y sitio integran servicios de terceros con sus propias políticas de
          privacidad:
        </p>
        <ul>
          <li>
            <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">
              Firebase Authentication y Crashlytics (Google)
            </a>
          </li>
          <li>
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google AdMob / Google Play
            </a>
          </li>
          <li>
            <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">
              Apple App Store / Sign in with Apple
            </a>
          </li>
          <li>
            <a href="https://www.revenuecat.com/privacy" target="_blank" rel="noopener noreferrer">
              RevenueCat (gestión de suscripciones)
            </a>
          </li>
        </ul>

        <h2>5. Retención de datos</h2>
        <p>
          Tu cuenta (email, nombre de usuario, avatar y UID de Firebase) se retiene mientras
          la cuenta esté activa. Puedes solicitar su eliminación en cualquier momento
          escribiéndonos a <a href={`mailto:${studio.email}`}>{studio.email}</a>. Los informes
          de fallos de Crashlytics se retienen conforme a la política de retención de Google
          Firebase. Los datos de uso anónimos se retienen el tiempo necesario para análisis.
        </p>

        <h2>6. Privacidad de menores</h2>
        <p>
          Nuestras apps no están dirigidas a menores de 13 años. No recopilamos conscientemente
          información de niños. Si crees que un menor nos ha proporcionado datos, contáctanos
          para eliminarlos.
        </p>

        <h2>7. Usuarios de la Unión Europea (GDPR)</h2>
        <p>
          Si te encuentras en el Espacio Económico Europeo (EEE), el tratamiento de tus datos
          personales se rige por el GDPR. A continuación se indica la base legal de cada tipo
          de tratamiento:
        </p>
        <ul>
          <li>
            <strong>Identificador anónimo (UID):</strong> ejecución de un contrato — necesario
            para prestarte el servicio desde el primer uso.
          </li>
          <li>
            <strong>Cuenta de usuario (email, nombre, avatar):</strong> ejecución de un
            contrato — necesario para gestionar tu perfil y acceso a la app.
          </li>
          <li>
            <strong>Suscripciones:</strong> ejecución de un contrato — necesario para gestionar
            tu plan de pago y acceso premium.
          </li>
          <li>
            <strong>Diagnóstico de errores (Crashlytics):</strong> interés legítimo — para
            mantener la estabilidad técnica de la app sin identificarte personalmente.
          </li>
          <li>
            <strong>Anuncios personalizados (AdMob):</strong> consentimiento — solicitamos tu
            autorización al primer lanzamiento. Puedes revocarla en cualquier momento desde la
            configuración de la app.
          </li>
        </ul>
        <p>Como usuario del EEE, además de los derechos generales, tienes derecho a:</p>
        <ul>
          <li><strong>Portabilidad:</strong> recibir tus datos en formato legible por máquina.</li>
          <li><strong>Oposición:</strong> oponerte al tratamiento basado en interés legítimo.</li>
          <li><strong>Limitación:</strong> solicitar que restrinjamos el tratamiento de tus datos.</li>
          <li>
            <strong>Reclamación:</strong> presentar una queja ante la autoridad de protección de
            datos de tu país.
          </li>
        </ul>
        <p>
          Para ejercer cualquiera de estos derechos, escríbenos a{' '}
          <a href={`mailto:${studio.email}`}>{studio.email}</a>. Responderemos en un plazo máximo
          de 30 días.
        </p>

        <h2>8. Tus derechos (general)</h2>
        <p>
          Tienes derecho a acceder, rectificar o eliminar tus datos personales (incluyendo tu
          cuenta, correo electrónico, nombre de usuario y avatar). Para ejercer estos derechos,
          escríbenos a{' '}
          <a href={`mailto:${studio.email}`}>{studio.email}</a>.
        </p>

        <h2>9. Cambios a esta política</h2>
        <p>
          Podemos actualizar esta política en cualquier momento. La fecha de última actualización
          siempre estará indicada al inicio del documento. El uso continuado del sitio o las apps
          implica aceptación de los cambios.
        </p>

        <h2>10. Contacto</h2>
        <p>
          Si tienes preguntas sobre esta política, puedes escribirnos a{' '}
          <a href={`mailto:${studio.email}`}>{studio.email}</a>.
        </p>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout title={title} lastUpdated={lastUpdated}>
      <p>
        At <strong>myappcube</strong> we take your privacy seriously. This policy explains what
        information we collect, how we use it, and your rights regarding it.
      </p>

      <h2>1. Information We Collect</h2>
      <p>Our applications and this website may collect the following types of data:</p>
      <ul>
        <li>
          <strong>Anonymous identifier:</strong> when you open the app for the first time, Firebase
          Authentication automatically assigns a unique identifier (UID) to your device, even before
          you create an account. This UID is used internally to manage your session and subscription
          status.
        </li>
        <li>
          <strong>User account:</strong> if you choose to create an account, you can do so via
          email and password, Google Sign-In, or Sign in with Apple. We store your email address,
          display name, and profile photo from your chosen provider through Firebase Authentication
          (Google). We also store in Firestore the username and avatar you configure within the app.
        </li>
        <li>
          <strong>Crash diagnostics:</strong> we use Firebase Crashlytics to detect and fix
          technical issues. Crashlytics automatically collects crash reports, stack traces, and,
          when the user is authenticated, the associated Firebase UID. This data is never used to
          personally identify you — it is only used to improve app stability.
        </li>
        <li>
          <strong>In-app advertising:</strong> our free apps use Google AdMob to display ads
          (banners, interstitials, and rewarded ads). AdMob may collect device identifiers (such as
          IDFA on iOS or Android Advertising ID) to personalize ads. Your consent is requested at
          first launch through Google's User Messaging Platform (UMP), in compliance with GDPR and
          CCPA. You may review or withdraw consent at any time from the app settings.
        </li>
        <li>
          <strong>Website advertising:</strong> this website may use Google AdSense, which uses
          cookies to show personalized ads based on your interests.
        </li>
        <li>
          <strong>Subscriptions:</strong> purchases are processed through Google Play (Android) or
          the App Store (iOS). Subscription status management is handled by{' '}
          <strong>RevenueCat</strong>, which may collect device identifiers and purchase receipts
          to verify and maintain your premium access. We do not store payment data; we only receive
          confirmation of your subscription status.
        </li>
        <li>
          <strong>Device data:</strong> model, operating system, and app version, used for technical
          diagnostics via Crashlytics.
        </li>
      </ul>

      <h2>2. How We Use the Information</h2>
      <ul>
        <li>Assign a session identifier from the first launch.</li>
        <li>Authenticate your account and maintain your session.</li>
        <li>Display and sync your profile (username and avatar) in the app.</li>
        <li>Manage and verify your subscription status.</li>
        <li>Detect and fix technical errors via Firebase Crashlytics.</li>
        <li>Display ads in the app via Google AdMob (based on your consent).</li>
        <li>Improve the performance and experience of our apps and website.</li>
        <li>Analyze general usage anonymously to make product decisions.</li>
      </ul>

      <h2>3. Advertising and Cookies</h2>
      <p>
        <strong>In the app:</strong> we use Google AdMob to show ads to users without an active
        subscription. This includes banner ads, interstitial ads (shown when a game ends), and
        rewarded ads (which users can voluntarily watch to temporarily unlock premium categories).
        Consent for personalized ads is requested at first launch via Google's UMP. You can review
        or withdraw consent at any time from the app settings.
      </p>
      <p>
        <strong>On the website:</strong> we use third-party cookies (Google AdSense) to measure
        traffic and display ads. You can manage cookies through your browser settings or via{' '}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          Google's Ads Settings
        </a>
        .
      </p>

      <h2>4. Third-Party Services</h2>
      <p>Our apps and site integrate third-party services with their own privacy policies:</p>
      <ul>
        <li>
          <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">
            Firebase Authentication &amp; Crashlytics (Google)
          </a>
        </li>
        <li>
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Google AdMob / Google Play
          </a>
        </li>
        <li>
          <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">
            Apple App Store / Sign in with Apple
          </a>
        </li>
        <li>
          <a href="https://www.revenuecat.com/privacy" target="_blank" rel="noopener noreferrer">
            RevenueCat (subscription management)
          </a>
        </li>
      </ul>

      <h2>5. Data Retention</h2>
      <p>
        Your account (email, username, avatar, and Firebase UID) is retained for as long as your
        account is active. You may request deletion at any time by contacting us at{' '}
        <a href={`mailto:${studio.email}`}>{studio.email}</a>. Crashlytics crash reports are
        retained in accordance with Google Firebase's retention policy. Anonymous usage data is
        retained as long as needed for analysis.
      </p>

      <h2>6. Children's Privacy</h2>
      <p>
        Our apps are not directed at children under 13. We do not knowingly collect information
        from children. If you believe a child has provided us with personal data, please contact
        us so we can delete it.
      </p>

      <h2>7. European Union Users (GDPR)</h2>
      <p>
        If you are located in the European Economic Area (EEA), the processing of your personal
        data is governed by the GDPR. Below is the legal basis for each type of processing:
      </p>
      <ul>
        <li>
          <strong>Anonymous identifier (UID):</strong> performance of a contract — necessary to
          provide the service from the first use.
        </li>
        <li>
          <strong>User account (email, name, avatar):</strong> performance of a contract —
          necessary to manage your profile and access to the app.
        </li>
        <li>
          <strong>Subscriptions:</strong> performance of a contract — necessary to manage your
          payment plan and premium access.
        </li>
        <li>
          <strong>Crash diagnostics (Crashlytics):</strong> legitimate interest — to maintain the
          technical stability of the app without personally identifying you.
        </li>
        <li>
          <strong>Personalized ads (AdMob):</strong> consent — we request your authorization at
          first launch. You may withdraw consent at any time from the app settings.
        </li>
      </ul>
      <p>As an EEA user, in addition to general rights, you also have the right to:</p>
      <ul>
        <li><strong>Data portability:</strong> receive your data in a machine-readable format.</li>
        <li><strong>Object:</strong> object to processing based on legitimate interest.</li>
        <li><strong>Restriction:</strong> request that we restrict the processing of your data.</li>
        <li>
          <strong>Lodge a complaint:</strong> file a complaint with your country's data protection
          authority.
        </li>
      </ul>
      <p>
        To exercise any of these rights, write to us at{' '}
        <a href={`mailto:${studio.email}`}>{studio.email}</a>. We will respond within 30 days.
      </p>

      <h2>8. Your Rights (General)</h2>
      <p>
        You have the right to access, correct, or delete your personal data (including your
        account, email address, username, and avatar). To exercise these rights, please write
        to us at <a href={`mailto:${studio.email}`}>{studio.email}</a>.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this policy at any time. The last updated date will always be shown at the
        top of this document. Continued use of the site or apps implies acceptance of any changes.
      </p>

      <h2>10. Contact</h2>
      <p>
        If you have questions about this policy, you can reach us at{' '}
        <a href={`mailto:${studio.email}`}>{studio.email}</a>.
      </p>
    </LegalLayout>
  );
}
