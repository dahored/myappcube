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

type T = {
  lastUpdated: string;
  titleWord: string;
  intro1: string; intro2: string;
  fullTermsText: string; fullTermsLink: string;
  h1: string; s1a: string; s1b: string;
  h2: string; s2a: string; s2b: string;
  liPayment: string; liPaymentIos: string;
  liRenew: string;
  liCancelAndroid: string; liCancelIos: string;
  liNoRefund: string;
  h3: string; s3: string;
  h4: string; s4a: string; s4b: string;
  h5: string; s5a: string; s5b: string;
  h6: string; s6a: string; s6b: string;
  h7: string; s7a: string; s7b: string;
  h8: string; s8: string;
  h9: string;
};

const translations: Record<string, T> = {
  es: {
    lastUpdated: 'Última actualización: marzo 2025',
    titleWord: 'Términos de uso',
    intro1: 'Al descargar, instalar o usar ',
    intro2: ', aceptas estos términos. Si no estás de acuerdo, por favor no uses la aplicación.',
    fullTermsText: 'Para los términos de uso completos del estudio, consulta',
    fullTermsLink: 'myappcube.com/terms',
    h1: '1. Cuentas de usuario',
    s1a: 'Algunas funciones de ', s1b: ' requieren una cuenta creada mediante correo electrónico. Eres responsable de mantener la confidencialidad de tus credenciales y de todas las actividades realizadas bajo tu cuenta.',
    h2: '2. Suscripciones y pagos',
    s2a: '', s2b: ' ofrece una versión gratuita y planes de suscripción premium. Al suscribirte:',
    liPayment: 'El pago se procesa a través de Google Play',
    liPaymentIos: ' (Android) o la App Store (iOS)',
    liRenew: 'Las suscripciones se renuevan automáticamente salvo que las canceles antes de la fecha de renovación.',
    liCancelAndroid: 'cancela desde Google Play → Suscripciones.',
    liCancelIos: 'cancela desde Configuración → [tu nombre] → Suscripciones.',
    liNoRefund: 'No realizamos reembolsos por períodos parciales, salvo que la ley aplicable lo requiera.',
    h3: '3. Publicidad',
    s3: 'La versión gratuita puede mostrar anuncios de terceros (Google AdMob). Los usuarios con suscripción activa disfrutan de una experiencia sin anuncios.',
    h4: '4. Uso permitido',
    s4a: '', s4b: ' es para uso personal y no comercial. Queda prohibido modificar, distribuir o realizar ingeniería inversa sobre la aplicación.',
    h5: '5. Propiedad intelectual',
    s5a: 'Todo el contenido de ', s5b: ' — nombre, diseño, gráficos, código y mecánicas — es propiedad de myappcube y está protegido por las leyes de propiedad intelectual aplicables.',
    h6: '6. Limitación de responsabilidad',
    s6a: 'myappcube no será responsable por daños derivados del uso o la imposibilidad de uso de ', s6b: '. La aplicación se ofrece «tal cual», sin garantías de ningún tipo.',
    h7: '7. Menores de edad',
    s7a: '', s7b: ' está diseñado para mayores de 13 años. Los menores deben contar con la supervisión y autorización de sus padres o tutores, especialmente para realizar compras.',
    h8: '8. Modificaciones',
    s8: 'Podemos actualizar estos términos en cualquier momento. La fecha de última actualización estará siempre indicada al inicio del documento.',
    h9: '9. Contacto',
  },
  en: {
    lastUpdated: 'Last updated: March 2025',
    titleWord: 'Terms of Service',
    intro1: 'By downloading, installing, or using ',
    intro2: ', you agree to these terms. If you do not agree, please do not use the application.',
    fullTermsText: 'For the full studio terms of service, see',
    fullTermsLink: 'myappcube.com/terms',
    h1: '1. User Accounts',
    s1a: 'Some features of ', s1b: ' require an account created via email. You are responsible for maintaining the confidentiality of your credentials and all activities under your account.',
    h2: '2. Subscriptions and Payments',
    s2a: '', s2b: ' offers a free version and premium subscription plans. By subscribing:',
    liPayment: 'Payment is processed through Google Play',
    liPaymentIos: ' (Android) or the App Store (iOS)',
    liRenew: 'Subscriptions automatically renew unless cancelled before the renewal date.',
    liCancelAndroid: 'cancel from Google Play → Subscriptions.',
    liCancelIos: 'cancel from Settings → [your name] → Subscriptions.',
    liNoRefund: 'We do not offer refunds for partial periods, except where required by applicable law.',
    h3: '3. Advertising',
    s3: 'The free version may display third-party ads (Google AdMob). Users with an active subscription enjoy an ad-free experience.',
    h4: '4. Permitted Use',
    s4a: '', s4b: ' is for personal, non-commercial use only. Modifying, distributing, or reverse-engineering the application is prohibited.',
    h5: '5. Intellectual Property',
    s5a: 'All content in ', s5b: ' — name, design, graphics, code, and mechanics — is the property of myappcube and is protected by applicable intellectual property laws.',
    h6: '6. Limitation of Liability',
    s6a: 'myappcube shall not be liable for damages arising from the use or inability to use ', s6b: '. The application is provided "as is," without warranties of any kind.',
    h7: '7. Minors',
    s7a: '', s7b: ' is intended for users aged 13 and older. Minors must have parental or guardian supervision and consent, especially for purchases.',
    h8: '8. Modifications',
    s8: 'We may update these terms at any time. The last updated date will always be shown at the top of this document.',
    h9: '9. Contact',
  },
  pt: {
    lastUpdated: 'Última atualização: março de 2025',
    titleWord: 'Termos de Uso',
    intro1: 'Ao baixar, instalar ou usar ',
    intro2: ', você concorda com estes termos. Caso não concorde, por favor não use o aplicativo.',
    fullTermsText: 'Para os termos de uso completos do estúdio, consulte',
    fullTermsLink: 'myappcube.com/terms',
    h1: '1. Contas de usuário',
    s1a: 'Alguns recursos de ', s1b: ' exigem uma conta criada por e-mail. Você é responsável por manter a confidencialidade de suas credenciais e por todas as atividades realizadas em sua conta.',
    h2: '2. Assinaturas e pagamentos',
    s2a: '', s2b: ' oferece uma versão gratuita e planos de assinatura premium. Ao assinar:',
    liPayment: 'O pagamento é processado pelo Google Play',
    liPaymentIos: ' (Android) ou pela App Store (iOS)',
    liRenew: 'As assinaturas se renovam automaticamente, salvo cancelamento antes da data de renovação.',
    liCancelAndroid: 'cancele pelo Google Play → Assinaturas.',
    liCancelIos: 'cancele em Configurações → [seu nome] → Assinaturas.',
    liNoRefund: 'Não realizamos reembolsos por períodos parciais, salvo exigência legal.',
    h3: '3. Publicidade',
    s3: 'A versão gratuita pode exibir anúncios de terceiros (Google AdMob). Usuários com assinatura ativa têm uma experiência sem anúncios.',
    h4: '4. Uso permitido',
    s4a: '', s4b: ' é destinado a uso pessoal e não comercial. É proibido modificar, distribuir ou realizar engenharia reversa no aplicativo.',
    h5: '5. Propriedade intelectual',
    s5a: 'Todo o conteúdo de ', s5b: ' — nome, design, gráficos, código e mecânicas — é propriedade da myappcube e está protegido pelas leis de propriedade intelectual aplicáveis.',
    h6: '6. Limitação de responsabilidade',
    s6a: 'A myappcube não se responsabiliza por danos decorrentes do uso ou da impossibilidade de uso de ', s6b: '. O aplicativo é fornecido "no estado em que se encontra", sem garantias de qualquer tipo.',
    h7: '7. Menores de idade',
    s7a: '', s7b: ' é destinado a usuários com 13 anos ou mais. Menores devem ter a supervisão e autorização dos pais ou responsáveis, especialmente para compras.',
    h8: '8. Modificações',
    s8: 'Podemos atualizar estes termos a qualquer momento. A data da última atualização sempre estará indicada no início do documento.',
    h9: '9. Contato',
  },
  fr: {
    lastUpdated: 'Dernière mise à jour : mars 2025',
    titleWord: "Conditions d'utilisation",
    intro1: 'En téléchargeant, installant ou utilisant ',
    intro2: ", vous acceptez ces conditions. Si vous n'êtes pas d'accord, veuillez ne pas utiliser l'application.",
    fullTermsText: "Pour les conditions d'utilisation complètes du studio, consultez",
    fullTermsLink: 'myappcube.com/terms',
    h1: '1. Comptes utilisateurs',
    s1a: 'Certaines fonctionnalités de ', s1b: " nécessitent un compte créé par e-mail. Vous êtes responsable de la confidentialité de vos identifiants et de toutes les activités effectuées sous votre compte.",
    h2: '2. Abonnements et paiements',
    s2a: '', s2b: " propose une version gratuite et des plans d'abonnement premium. En souscrivant :",
    liPayment: 'Le paiement est traité via Google Play',
    liPaymentIos: " (Android) ou l'App Store (iOS)",
    liRenew: "Les abonnements se renouvellent automatiquement sauf annulation avant la date de renouvellement.",
    liCancelAndroid: 'annulez depuis Google Play → Abonnements.',
    liCancelIos: 'annulez depuis Réglages → [votre nom] → Abonnements.',
    liNoRefund: "Nous ne remboursons pas les périodes partielles, sauf si la loi applicable l'exige.",
    h3: '3. Publicité',
    s3: "La version gratuite peut afficher des publicités tierces (Google AdMob). Les utilisateurs avec un abonnement actif bénéficient d'une expérience sans publicité.",
    h4: '4. Utilisation autorisée',
    s4a: '', s4b: " est réservé à un usage personnel et non commercial. Modifier, distribuer ou effectuer de la rétro-ingénierie sur l'application est interdit.",
    h5: '5. Propriété intellectuelle',
    s5a: 'Tout le contenu de ', s5b: ' — nom, design, graphiques, code et mécaniques — est la propriété de myappcube et est protégé par les lois applicables en matière de propriété intellectuelle.',
    h6: '6. Limitation de responsabilité',
    s6a: "myappcube ne pourra être tenu responsable des dommages résultant de l'utilisation ou de l'impossibilité d'utiliser ", s6b: ". L'application est fournie « telle quelle », sans garantie d'aucune sorte.",
    h7: '7. Mineurs',
    s7a: '', s7b: " est destiné aux utilisateurs de 13 ans et plus. Les mineurs doivent disposer de la supervision et du consentement parental, notamment pour les achats.",
    h8: '8. Modifications',
    s8: "Nous pouvons mettre à jour ces conditions à tout moment. La date de dernière mise à jour sera toujours indiquée en haut du document.",
    h9: '9. Contact',
  },
  it: {
    lastUpdated: 'Ultimo aggiornamento: marzo 2025',
    titleWord: 'Termini di utilizzo',
    intro1: 'Scaricando, installando o utilizzando ',
    intro2: ", accetti questi termini. Se non sei d'accordo, ti preghiamo di non utilizzare l'applicazione.",
    fullTermsText: 'Per i termini di utilizzo completi dello studio, consulta',
    fullTermsLink: 'myappcube.com/terms',
    h1: '1. Account utente',
    s1a: 'Alcune funzionalità di ', s1b: " richiedono un account creato tramite e-mail. Sei responsabile della riservatezza delle tue credenziali e di tutte le attività effettuate con il tuo account.",
    h2: '2. Abbonamenti e pagamenti',
    s2a: '', s2b: ' offre una versione gratuita e piani di abbonamento premium. Iscrivendoti:',
    liPayment: 'Il pagamento viene elaborato tramite Google Play',
    liPaymentIos: " (Android) o l'App Store (iOS)",
    liRenew: "Gli abbonamenti si rinnovano automaticamente salvo cancellazione prima della data di rinnovo.",
    liCancelAndroid: 'annulla da Google Play → Abbonamenti.',
    liCancelIos: 'annulla da Impostazioni → [tuo nome] → Abbonamenti.',
    liNoRefund: 'Non effettuiamo rimborsi per periodi parziali, salvo quanto richiesto dalla legge applicabile.',
    h3: '3. Pubblicità',
    s3: 'La versione gratuita può mostrare annunci di terze parti (Google AdMob). Gli utenti con abbonamento attivo godono di un\'esperienza senza pubblicità.',
    h4: '4. Uso consentito',
    s4a: '', s4b: " è destinato a uso personale e non commerciale. È vietato modificare, distribuire o eseguire il reverse engineering dell'applicazione.",
    h5: '5. Proprietà intellettuale',
    s5a: 'Tutti i contenuti di ', s5b: ' — nome, design, grafica, codice e meccaniche — sono di proprietà di myappcube e sono protetti dalle leggi sulla proprietà intellettuale applicabili.',
    h6: '6. Limitazione di responsabilità',
    s6a: "myappcube non sarà responsabile per danni derivanti dall'uso o dall'impossibilità di utilizzare ", s6b: ". L'applicazione è fornita \"così com'è\", senza garanzie di alcun tipo.",
    h7: '7. Minori',
    s7a: '', s7b: ' è destinato a utenti di età pari o superiore a 13 anni. I minori devono avere la supervisione e il consenso dei genitori o tutori, in particolare per gli acquisti.',
    h8: '8. Modifiche',
    s8: "Possiamo aggiornare questi termini in qualsiasi momento. La data dell'ultimo aggiornamento sarà sempre indicata all'inizio del documento.",
    h9: '9. Contatto',
  },
  de: {
    lastUpdated: 'Zuletzt aktualisiert: März 2025',
    titleWord: 'Nutzungsbedingungen',
    intro1: 'Durch das Herunterladen, Installieren oder Verwenden von ',
    intro2: ' stimmen Sie diesen Bedingungen zu. Wenn Sie nicht zustimmen, verwenden Sie die Anwendung bitte nicht.',
    fullTermsText: 'Die vollständigen Studio-Nutzungsbedingungen finden Sie unter',
    fullTermsLink: 'myappcube.com/terms',
    h1: '1. Benutzerkonten',
    s1a: 'Einige Funktionen von ', s1b: ' erfordern ein per E-Mail erstelltes Konto. Sie sind für die Vertraulichkeit Ihrer Zugangsdaten und alle unter Ihrem Konto durchgeführten Aktivitäten verantwortlich.',
    h2: '2. Abonnements und Zahlungen',
    s2a: '', s2b: ' bietet eine kostenlose Version und Premium-Abonnementpläne an. Bei einem Abonnement:',
    liPayment: 'Die Zahlung erfolgt über Google Play',
    liPaymentIos: ' (Android) oder den App Store (iOS)',
    liRenew: 'Abonnements verlängern sich automatisch, sofern sie nicht vor dem Verlängerungsdatum gekündigt werden.',
    liCancelAndroid: 'kündigen Sie über Google Play → Abonnements.',
    liCancelIos: 'kündigen Sie über Einstellungen → [Ihr Name] → Abonnements.',
    liNoRefund: 'Wir erstatten keine anteiligen Zeiträume, es sei denn, dies ist gesetzlich vorgeschrieben.',
    h3: '3. Werbung',
    s3: 'Die kostenlose Version kann Werbung von Drittanbietern (Google AdMob) anzeigen. Nutzer mit einem aktiven Abonnement genießen eine werbefreie Erfahrung.',
    h4: '4. Erlaubte Nutzung',
    s4a: '', s4b: ' ist ausschließlich für den persönlichen, nicht kommerziellen Gebrauch bestimmt. Das Modifizieren, Verteilen oder Reverse-Engineering der Anwendung ist verboten.',
    h5: '5. Geistiges Eigentum',
    s5a: 'Alle Inhalte von ', s5b: ' — Name, Design, Grafiken, Code und Spielmechaniken — sind Eigentum von myappcube und durch das geltende Recht zum Schutz des geistigen Eigentums geschützt.',
    h6: '6. Haftungsbeschränkung',
    s6a: 'myappcube haftet nicht für Schäden, die aus der Nutzung oder Nichtnutzbarkeit von ', s6b: ' entstehen. Die Anwendung wird ohne Mängelgewähr und ohne jegliche Garantien bereitgestellt.',
    h7: '7. Minderjährige',
    s7a: '', s7b: ' ist für Benutzer ab 13 Jahren bestimmt. Minderjährige benötigen die Aufsicht und Zustimmung ihrer Eltern oder Erziehungsberechtigten, insbesondere bei Käufen.',
    h8: '8. Änderungen',
    s8: 'Wir können diese Bedingungen jederzeit aktualisieren. Das Datum der letzten Aktualisierung wird stets am Anfang des Dokuments angegeben.',
    h9: '9. Kontakt',
  },
};

export default async function GameTermsPage({
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
        {t.intro1}<strong>{game.name}</strong>{t.intro2}
      </p>
      <p>
        {t.fullTermsText}{' '}
        <Link href="/terms" className="text-violet-600 dark:text-violet-400 underline">
          {t.fullTermsLink}
        </Link>
        .
      </p>

      <h2>{t.h1}</h2>
      <p>{t.s1a}{game.name}{t.s1b}</p>

      <h2>{t.h2}</h2>
      <p>{t.s2a}{game.name}{t.s2b}</p>
      <ul>
        <li>
          {t.liPayment}{game.storeUrl?.ios ? t.liPaymentIos : ''}.
        </li>
        <li>{t.liRenew}</li>
        <li><strong>Android:</strong> {t.liCancelAndroid}</li>
        {game.storeUrl?.ios && (
          <li><strong>iOS:</strong> {t.liCancelIos}</li>
        )}
        <li>{t.liNoRefund}</li>
      </ul>

      <h2>{t.h3}</h2>
      <p>{t.s3}</p>

      <h2>{t.h4}</h2>
      <p>{t.s4a}{game.name}{t.s4b}</p>

      <h2>{t.h5}</h2>
      <p>{t.s5a}{game.name}{t.s5b}</p>

      <h2>{t.h6}</h2>
      <p>{t.s6a}{game.name}{t.s6b}</p>

      <h2>{t.h7}</h2>
      <p>{t.s7a}{game.name}{t.s7b}</p>

      <h2>{t.h8}</h2>
      <p>{t.s8}</p>

      <h2>{t.h9}</h2>
      <p>
        <a href={`mailto:${studio.email}?subject=${encodeURIComponent('Términos / Terms — myappcube')}`}>
          {studio.email}
        </a>
      </p>
    </LegalLayout>
  );
}
