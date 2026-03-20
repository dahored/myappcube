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

type T = {
  lastUpdated: string;
  titleWord: string;
  intro_a: string; intro_b: string;
  fullPrivacyText: string; fullPrivacyLink: string;
  h1: string;
  li1accountBold: string; li1account: string;
  li1subBold: string; li1sub_a: string; li1sub_ios: string; li1sub_b: string;
  li1usageBold: string; li1usage: string;
  h2: string;
  li2_1: string; li2_2: string; li2_3: string;
  h3: string; s3a: string; s3b: string;
  h4: string;
  h5: string; s5a: string; s5b: string;
  h6: string; s6a: string; s6b: string;
  h7: string; s7: string;
  h8: string;
};

const translations: Record<string, T> = {
  es: {
    lastUpdated: 'Última actualización: marzo 2025',
    titleWord: 'Política de privacidad',
    intro_a: 'Esta política de privacidad describe cómo ',
    intro_b: ' recopila, usa y protege la información relacionada con la aplicación ',
    fullPrivacyText: 'Para la política de privacidad completa del estudio, consulta',
    fullPrivacyLink: 'myappcube.com/privacy',
    h1: '1. Información que recopilamos',
    li1accountBold: 'Cuenta:', li1account: ' si creas una cuenta, almacenamos tu correo electrónico a través de Firebase Authentication (Google). Este dato se usa exclusivamente para gestionar tu sesión y suscripción.',
    li1subBold: 'Suscripción:', li1sub_a: ' si adquieres un plan premium, recibimos confirmación del estado de tu suscripción desde Google Play', li1sub_ios: ' o la App Store', li1sub_b: '. No almacenamos datos de pago.',
    li1usageBold: 'Datos de uso:', li1usage: ' información anónima y agregada sobre cómo se usa la app (sesiones, errores técnicos), sin identificarte personalmente.',
    h2: '2. Información que NO recopilamos',
    li2_1: 'El contenido de las partidas (palabras, votos, resultados) no se almacena en ningún servidor.',
    li2_2: 'No recopilamos tu nombre, ubicación ni datos de contacto sin tu consentimiento.',
    li2_3: 'No compartimos tus datos con terceros para fines publicitarios directos.',
    h3: '3. Publicidad',
    s3a: 'La versión gratuita de ', s3b: ' puede mostrar anuncios a través de Google AdMob. Al iniciar la app, solicitamos tu consentimiento para anuncios personalizados. Los usuarios con suscripción activa no ven anuncios. Puedes revocar tu consentimiento en Configuración → Privacidad dentro de la app.',
    h4: '4. Servicios de terceros',
    h5: '5. Menores de edad',
    s5a: '', s5b: ' no está dirigido a menores de 13 años. No recopilamos conscientemente datos de niños.',
    h6: '6. Tus derechos',
    s6a: 'Puedes solicitar acceso, rectificación o eliminación de tus datos (incluyendo tu cuenta) escribiéndonos a',
    s6b: '.',
    h7: '7. Cambios',
    s7: 'Podemos actualizar esta política en cualquier momento. La fecha de última actualización siempre estará indicada al inicio del documento.',
    h8: '8. Contacto',
  },
  en: {
    lastUpdated: 'Last updated: March 2025',
    titleWord: 'Privacy Policy',
    intro_a: 'This privacy policy describes how ',
    intro_b: ' collects, uses, and protects information related to the application ',
    fullPrivacyText: 'For the full studio privacy policy, see',
    fullPrivacyLink: 'myappcube.com/privacy',
    h1: '1. Information We Collect',
    li1accountBold: 'Account:', li1account: ' if you create an account, we store your email address through Firebase Authentication (Google). This data is used exclusively to manage your session and subscription.',
    li1subBold: 'Subscription:', li1sub_a: ' if you purchase a premium plan, we receive confirmation of your subscription status from Google Play', li1sub_ios: ' or the App Store', li1sub_b: '. We do not store payment data.',
    li1usageBold: 'Usage data:', li1usage: ' anonymous and aggregate information about how the app is used (sessions, technical errors), without personally identifying you.',
    h2: '2. Information We Do NOT Collect',
    li2_1: 'Game session content (words, votes, results) is not stored on any server.',
    li2_2: 'We do not collect your name, location, or contact details without your consent.',
    li2_3: 'We do not share your data with third parties for direct advertising purposes.',
    h3: '3. Advertising',
    s3a: 'The free version of ', s3b: ' may display ads through Google AdMob. When you first launch the app, we request your consent for personalized ads. Users with an active subscription do not see ads. You can withdraw your consent in Settings → Privacy within the app.',
    h4: '4. Third-Party Services',
    h5: '5. Children',
    s5a: '', s5b: ' is not directed at children under 13. We do not knowingly collect data from children.',
    h6: '6. Your Rights',
    s6a: 'You may request access, correction, or deletion of your data (including your account) by writing to us at',
    s6b: '.',
    h7: '7. Changes',
    s7: 'We may update this policy at any time. The last updated date will always be shown at the top of this document.',
    h8: '8. Contact',
  },
  pt: {
    lastUpdated: 'Última atualização: março de 2025',
    titleWord: 'Política de Privacidade',
    intro_a: 'Esta política de privacidade descreve como ',
    intro_b: ' coleta, usa e protege as informações relacionadas ao aplicativo ',
    fullPrivacyText: 'Para a política de privacidade completa do estúdio, consulte',
    fullPrivacyLink: 'myappcube.com/privacy',
    h1: '1. Informações que coletamos',
    li1accountBold: 'Conta:', li1account: ' se você criar uma conta, armazenamos seu e-mail por meio do Firebase Authentication (Google). Esses dados são usados exclusivamente para gerenciar sua sessão e assinatura.',
    li1subBold: 'Assinatura:', li1sub_a: ' se você adquirir um plano premium, recebemos a confirmação do status da sua assinatura pelo Google Play', li1sub_ios: ' ou pela App Store', li1sub_b: '. Não armazenamos dados de pagamento.',
    li1usageBold: 'Dados de uso:', li1usage: ' informações anônimas e agregadas sobre como o aplicativo é utilizado (sessões, erros técnicos), sem identificá-lo pessoalmente.',
    h2: '2. Informações que NÃO coletamos',
    li2_1: 'O conteúdo das partidas (palavras, votos, resultados) não é armazenado em nenhum servidor.',
    li2_2: 'Não coletamos seu nome, localização ou dados de contato sem o seu consentimento.',
    li2_3: 'Não compartilhamos seus dados com terceiros para fins publicitários diretos.',
    h3: '3. Publicidade',
    s3a: 'A versão gratuita de ', s3b: ' pode exibir anúncios pelo Google AdMob. Ao abrir o aplicativo pela primeira vez, solicitamos seu consentimento para anúncios personalizados. Usuários com assinatura ativa não veem anúncios. Você pode revogar seu consentimento em Configurações → Privacidade no aplicativo.',
    h4: '4. Serviços de terceiros',
    h5: '5. Menores de idade',
    s5a: '', s5b: ' não é destinado a menores de 13 anos. Não coletamos conscientemente dados de crianças.',
    h6: '6. Seus direitos',
    s6a: 'Você pode solicitar acesso, correção ou exclusão de seus dados (incluindo sua conta) entrando em contato conosco em',
    s6b: '.',
    h7: '7. Alterações',
    s7: 'Podemos atualizar esta política a qualquer momento. A data da última atualização sempre estará indicada no início do documento.',
    h8: '8. Contato',
  },
  fr: {
    lastUpdated: 'Dernière mise à jour : mars 2025',
    titleWord: 'Politique de confidentialité',
    intro_a: 'Cette politique de confidentialité décrit comment ',
    intro_b: " collecte, utilise et protège les informations relatives à l'application ",
    fullPrivacyText: 'Pour la politique de confidentialité complète du studio, consultez',
    fullPrivacyLink: 'myappcube.com/privacy',
    h1: '1. Informations que nous collectons',
    li1accountBold: 'Compte :', li1account: ' si vous créez un compte, nous stockons votre adresse e-mail via Firebase Authentication (Google). Ces données sont utilisées exclusivement pour gérer votre session et votre abonnement.',
    li1subBold: 'Abonnement :', li1sub_a: ' si vous souscrivez un plan premium, nous recevons la confirmation de l\'état de votre abonnement depuis Google Play', li1sub_ios: " ou l'App Store", li1sub_b: '. Nous ne stockons pas les données de paiement.',
    li1usageBold: "Données d'utilisation :", li1usage: " informations anonymes et agrégées sur la façon dont l'application est utilisée (sessions, erreurs techniques), sans vous identifier personnellement.",
    h2: '2. Informations que nous ne collectons PAS',
    li2_1: "Le contenu des parties (mots, votes, résultats) n'est stocké sur aucun serveur.",
    li2_2: 'Nous ne collectons pas votre nom, localisation ou coordonnées sans votre consentement.',
    li2_3: 'Nous ne partageons pas vos données avec des tiers à des fins publicitaires directes.',
    h3: '3. Publicité',
    s3a: 'La version gratuite de ', s3b: " peut afficher des publicités via Google AdMob. Au premier lancement, nous vous demandons votre consentement pour les publicités personnalisées. Les utilisateurs avec un abonnement actif ne voient pas de publicités. Vous pouvez retirer votre consentement dans Paramètres → Confidentialité dans l'application.",
    h4: '4. Services tiers',
    h5: '5. Mineurs',
    s5a: '', s5b: " n'est pas destiné aux enfants de moins de 13 ans. Nous ne collectons pas sciemment de données sur les enfants.",
    h6: '6. Vos droits',
    s6a: "Vous pouvez demander l'accès, la rectification ou la suppression de vos données (y compris votre compte) en nous écrivant à",
    s6b: '.',
    h7: '7. Modifications',
    s7: 'Nous pouvons mettre à jour cette politique à tout moment. La date de dernière mise à jour sera toujours indiquée en haut du document.',
    h8: '8. Contact',
  },
  it: {
    lastUpdated: 'Ultimo aggiornamento: marzo 2025',
    titleWord: 'Informativa sulla privacy',
    intro_a: 'Questa informativa sulla privacy descrive come ',
    intro_b: " raccoglie, utilizza e protegge le informazioni relative all'applicazione ",
    fullPrivacyText: "Per l'informativa sulla privacy completa dello studio, consulta",
    fullPrivacyLink: 'myappcube.com/privacy',
    h1: '1. Informazioni che raccogliamo',
    li1accountBold: 'Account:', li1account: " se crei un account, conserviamo il tuo indirizzo e-mail tramite Firebase Authentication (Google). Questi dati vengono utilizzati esclusivamente per gestire la sessione e l'abbonamento.",
    li1subBold: 'Abbonamento:', li1sub_a: " se acquisti un piano premium, riceviamo la conferma dello stato del tuo abbonamento da Google Play", li1sub_ios: " o dall'App Store", li1sub_b: '. Non conserviamo dati di pagamento.',
    li1usageBold: 'Dati di utilizzo:', li1usage: " informazioni anonime e aggregate su come viene utilizzata l'app (sessioni, errori tecnici), senza identificarti personalmente.",
    h2: '2. Informazioni che NON raccogliamo',
    li2_1: 'Il contenuto delle partite (parole, voti, risultati) non viene archiviato su alcun server.',
    li2_2: 'Non raccogliamo il tuo nome, posizione o dati di contatto senza il tuo consenso.',
    li2_3: 'Non condividiamo i tuoi dati con terze parti per fini pubblicitari diretti.',
    h3: '3. Pubblicità',
    s3a: 'La versione gratuita di ', s3b: " può mostrare annunci tramite Google AdMob. Al primo avvio, richiediamo il tuo consenso per gli annunci personalizzati. Gli utenti con abbonamento attivo non vedono annunci. Puoi revocare il consenso in Impostazioni → Privacy nell'app.",
    h4: '4. Servizi di terze parti',
    h5: '5. Minori',
    s5a: '', s5b: ' non è destinato a minori di 13 anni. Non raccogliamo consapevolmente dati da minori.',
    h6: '6. I tuoi diritti',
    s6a: 'Puoi richiedere accesso, rettifica o cancellazione dei tuoi dati (incluso il tuo account) scrivendoci a',
    s6b: '.',
    h7: '7. Modifiche',
    s7: "Possiamo aggiornare questa informativa in qualsiasi momento. La data dell'ultimo aggiornamento sarà sempre indicata all'inizio del documento.",
    h8: '8. Contatto',
  },
  de: {
    lastUpdated: 'Zuletzt aktualisiert: März 2025',
    titleWord: 'Datenschutzrichtlinie',
    intro_a: 'Diese Datenschutzrichtlinie beschreibt die Erfassung, Verwendung und den Schutz von Informationen durch ',
    intro_b: ' in Bezug auf die Anwendung ',
    fullPrivacyText: 'Die vollständige Datenschutzrichtlinie des Studios finden Sie unter',
    fullPrivacyLink: 'myappcube.com/privacy',
    h1: '1. Informationen, die wir erfassen',
    li1accountBold: 'Konto:', li1account: ' wenn Sie ein Konto erstellen, speichern wir Ihre E-Mail-Adresse über Firebase Authentication (Google). Diese Daten werden ausschließlich zur Verwaltung Ihrer Sitzung und Ihres Abonnements verwendet.',
    li1subBold: 'Abonnement:', li1sub_a: ' wenn Sie einen Premium-Plan erwerben, erhalten wir eine Bestätigung Ihres Abonnementstatus von Google Play', li1sub_ios: ' oder dem App Store', li1sub_b: '. Wir speichern keine Zahlungsdaten.',
    li1usageBold: 'Nutzungsdaten:', li1usage: ' anonyme und aggregierte Informationen darüber, wie die App genutzt wird (Sitzungen, technische Fehler), ohne Sie persönlich zu identifizieren.',
    h2: '2. Informationen, die wir NICHT erfassen',
    li2_1: 'Spielsitzungsinhalte (Wörter, Abstimmungen, Ergebnisse) werden auf keinem Server gespeichert.',
    li2_2: 'Wir erfassen Ihren Namen, Standort oder Kontaktdaten nicht ohne Ihre Einwilligung.',
    li2_3: 'Wir geben Ihre Daten nicht für direkte Werbezwecke an Dritte weiter.',
    h3: '3. Werbung',
    s3a: 'Die kostenlose Version von ', s3b: ' kann über Google AdMob Werbung anzeigen. Beim ersten Start bitten wir Sie um Ihre Einwilligung für personalisierte Werbung. Nutzer mit einem aktiven Abonnement sehen keine Werbung. Sie können Ihre Einwilligung in Einstellungen → Datenschutz in der App widerrufen.',
    h4: '4. Dienste von Drittanbietern',
    h5: '5. Minderjährige',
    s5a: '', s5b: ' richtet sich nicht an Kinder unter 13 Jahren. Wir erfassen wissentlich keine Daten von Kindern.',
    h6: '6. Ihre Rechte',
    s6a: 'Sie können Zugang, Berichtigung oder Löschung Ihrer Daten (einschließlich Ihres Kontos) beantragen, indem Sie uns schreiben an',
    s6b: '.',
    h7: '7. Änderungen',
    s7: 'Wir können diese Richtlinie jederzeit aktualisieren. Das Datum der letzten Aktualisierung wird stets am Anfang des Dokuments angegeben.',
    h8: '8. Kontakt',
  },
};

export default async function GamePrivacyPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const game = games.find((g) => g.slug === slug && !g.comingSoon);
  if (!game) notFound();

  const t = translations[locale] ?? translations.en;
  const title = `${t.titleWord} — ${game.name}`;

  return (
    <LegalLayout title={title} lastUpdated={t.lastUpdated}>
      <p>
        {t.intro_a}<strong>myappcube</strong>{t.intro_b}<strong>{game.name}</strong>.
      </p>
      <p>
        {t.fullPrivacyText}{' '}
        <Link href="/privacy" className="text-violet-600 dark:text-violet-400 underline">
          {t.fullPrivacyLink}
        </Link>
        .
      </p>

      <h2>{t.h1}</h2>
      <ul>
        <li>
          <strong>{t.li1accountBold}</strong>{t.li1account}
        </li>
        <li>
          <strong>{t.li1subBold}</strong>{t.li1sub_a}{game.storeUrl?.ios ? t.li1sub_ios : ''}{t.li1sub_b}
        </li>
        <li>
          <strong>{t.li1usageBold}</strong>{t.li1usage}
        </li>
      </ul>

      <h2>{t.h2}</h2>
      <ul>
        <li>{t.li2_1}</li>
        <li>{t.li2_2}</li>
        <li>{t.li2_3}</li>
      </ul>

      <h2>{t.h3}</h2>
      <p>{t.s3a}{game.name}{t.s3b}</p>

      <h2>{t.h4}</h2>
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

      <h2>{t.h5}</h2>
      <p>{t.s5a}{game.name}{t.s5b}</p>

      <h2>{t.h6}</h2>
      <p>
        {t.s6a}{' '}
        <a href={`mailto:${studio.email}?subject=${encodeURIComponent('Privacidad / Privacy — myappcube')}`}>{studio.email}</a>
        {t.s6b}
      </p>

      <h2>{t.h7}</h2>
      <p>{t.s7}</p>

      <h2>{t.h8}</h2>
      <p>
        <a href={`mailto:${studio.email}?subject=${encodeURIComponent('Privacidad / Privacy — myappcube')}`}>{studio.email}</a>
      </p>
    </LegalLayout>
  );
}
