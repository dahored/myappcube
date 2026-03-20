import type { Metadata } from 'next';
import LegalLayout from '@/components/ui/LegalLayout';
import { studio } from '@/config/studio';

export const metadata: Metadata = {
  title: 'Privacy Policy — myappcube',
  description: 'Privacy policy for myappcube and its mobile games.',
};

type T = {
  title: string;
  lastUpdated: string;
  intro: string;
  h1: string; s1intro: string;
  li1_1bold: string; li1_1: string;
  li1_2bold: string; li1_2: string;
  li1_3bold: string; li1_3: string;
  li1_4bold: string; li1_4: string;
  li1_5bold: string; li1_5: string;
  li1_6bold: string; li1_6: string;
  li1_7bold: string; li1_7: string;
  h2: string;
  li2_1: string; li2_2: string; li2_3: string;
  li2_4: string; li2_5: string; li2_6: string; li2_7: string; li2_8: string;
  h3: string; s3_app_bold: string; s3_app: string; s3_web_bold: string; s3_web: string;
  googleAdsLink: string;
  h4: string; s4intro: string;
  h5: string; s5: string;
  h6: string; s6: string;
  h7: string; s7intro: string;
  li7_1bold: string; li7_1: string;
  li7_2bold: string; li7_2: string;
  li7_3bold: string; li7_3: string;
  li7_4bold: string; li7_4: string;
  li7_5bold: string; li7_5: string;
  s7eea: string;
  li7_eea1bold: string; li7_eea1: string;
  li7_eea2bold: string; li7_eea2: string;
  li7_eea3bold: string; li7_eea3: string;
  li7_eea4bold: string; li7_eea4: string;
  s7rights: string;
  h8: string; s8: string;
  h9: string; s9: string;
  h10: string; s10: string;
  revenuecatPrivacy: string;
};

const translations: Record<string, T> = {
  es: {
    title: 'Política de privacidad',
    lastUpdated: 'Última actualización: marzo 2026',
    intro: 'En myappcube nos tomamos tu privacidad en serio. Esta política explica qué información recopilamos, cómo la usamos y cuáles son tus derechos al respecto.',
    h1: '1. Información que recopilamos',
    s1intro: 'Nuestras aplicaciones y este sitio web pueden recopilar los siguientes tipos de datos:',
    li1_1bold: 'Identificador anónimo:', li1_1: ' al abrir la app por primera vez, Firebase Authentication asigna automáticamente un identificador único (UID) a tu dispositivo, incluso antes de que crees una cuenta. Este UID se usa internamente para gestionar tu sesión y estado de suscripción.',
    li1_2bold: 'Cuenta de usuario:', li1_2: ' si decides crear una cuenta, puedes hacerlo mediante correo electrónico y contraseña, Google Sign-In o Sign in with Apple. Almacenamos tu dirección de email, nombre de visualización y foto de perfil del proveedor que elijas a través de Firebase Authentication (Google). Además, guardamos en Firestore el nombre de usuario y el avatar que configures dentro de la app.',
    li1_3bold: 'Diagnóstico de errores:', li1_3: ' utilizamos Firebase Crashlytics para detectar y corregir fallos técnicos. Crashlytics recopila automáticamente informes de fallos, trazas de pila (stack traces) y, cuando el usuario está autenticado, el UID de Firebase asociado. Estos datos nunca se usan para identificarte de forma personal, solo para mejorar la estabilidad de la app.',
    li1_4bold: 'Publicidad en la app:', li1_4: ' nuestras apps gratuitas utilizan Google AdMob para mostrar anuncios (banners, intersticiales y anuncios recompensados). AdMob puede recopilar identificadores de dispositivo (como el IDFA en iOS o el Android Advertising ID) para personalizar los anuncios. Tu consentimiento se solicita al primer lanzamiento a través del sistema de gestión de consentimiento de Google (UMP), conforme al GDPR y CCPA.',
    li1_5bold: 'Publicidad en el sitio web:', li1_5: ' este sitio web puede utilizar Google AdSense, que emplea cookies para mostrar anuncios personalizados.',
    li1_6bold: 'Suscripciones:', li1_6: ' las compras se procesan a través de Google Play (Android) o la App Store (iOS). La gestión del estado de suscripción se realiza mediante RevenueCat, que puede recopilar identificadores de dispositivo y receipts de compra para verificar y mantener tu acceso premium. No almacenamos datos de pago; solo recibimos confirmación del estado de la suscripción.',
    li1_7bold: 'Datos del dispositivo:', li1_7: ' modelo, sistema operativo y versión de la app, necesarios para diagnóstico técnico a través de Crashlytics.',
    h2: '2. Cómo usamos la información',
    li2_1: 'Asignarte un identificador de sesión desde el primer lanzamiento.',
    li2_2: 'Autenticar tu cuenta y mantener tu sesión activa.',
    li2_3: 'Mostrar y sincronizar tu perfil (nombre de usuario y avatar) en la app.',
    li2_4: 'Gestionar y verificar el estado de tu suscripción.',
    li2_5: 'Detectar y corregir errores técnicos mediante Firebase Crashlytics.',
    li2_6: 'Mostrar anuncios en la app a través de Google AdMob (según tu consentimiento).',
    li2_7: 'Mejorar el rendimiento y la experiencia de nuestras apps y sitio web.',
    li2_8: 'Analizar el uso general de manera anónima para tomar decisiones de producto.',
    h3: '3. Publicidad y cookies',
    s3_app_bold: 'En la app:', s3_app: ' utilizamos Google AdMob para mostrar anuncios a usuarios sin suscripción activa. Incluye anuncios banner, intersticiales (al finalizar una partida) y anuncios recompensados (que el usuario puede ver voluntariamente para desbloquear categorías premium de forma temporal). El consentimiento para anuncios personalizados se solicita en el primer lanzamiento mediante el CMP de Google (UMP). Puedes revisar o revocar tu consentimiento en cualquier momento desde la configuración de la app.',
    s3_web_bold: 'En el sitio web:', s3_web: ' utilizamos cookies de terceros (Google AdSense) para medir el tráfico y mostrar anuncios. Puedes controlar las cookies desde la configuración de tu navegador o mediante el',
    googleAdsLink: 'Centro de preferencias de anuncios de Google',
    h4: '4. Servicios de terceros',
    s4intro: 'Nuestras apps y sitio integran servicios de terceros con sus propias políticas de privacidad:',
    h5: '5. Retención de datos',
    s5: 'Tu cuenta (email, nombre de usuario, avatar y UID de Firebase) se retiene mientras la cuenta esté activa. Puedes solicitar su eliminación en cualquier momento escribiéndonos a',
    h6: '6. Privacidad de menores',
    s6: 'Nuestras apps no están dirigidas a menores de 13 años. No recopilamos conscientemente información de niños. Si crees que un menor nos ha proporcionado datos, contáctanos para eliminarlos.',
    h7: '7. Usuarios de la Unión Europea (GDPR)',
    s7intro: 'Si te encuentras en el Espacio Económico Europeo (EEE), el tratamiento de tus datos personales se rige por el GDPR. A continuación se indica la base legal de cada tipo de tratamiento:',
    li7_1bold: 'Identificador anónimo (UID):', li7_1: ' ejecución de un contrato — necesario para prestarte el servicio desde el primer uso.',
    li7_2bold: 'Cuenta de usuario (email, nombre, avatar):', li7_2: ' ejecución de un contrato — necesario para gestionar tu perfil y acceso a la app.',
    li7_3bold: 'Suscripciones:', li7_3: ' ejecución de un contrato — necesario para gestionar tu plan de pago y acceso premium.',
    li7_4bold: 'Diagnóstico de errores (Crashlytics):', li7_4: ' interés legítimo — para mantener la estabilidad técnica de la app sin identificarte personalmente.',
    li7_5bold: 'Anuncios personalizados (AdMob):', li7_5: ' consentimiento — solicitamos tu autorización al primer lanzamiento. Puedes revocarla en cualquier momento desde la configuración de la app.',
    s7eea: 'Como usuario del EEE, además de los derechos generales, tienes derecho a:',
    li7_eea1bold: 'Portabilidad:', li7_eea1: ' recibir tus datos en formato legible por máquina.',
    li7_eea2bold: 'Oposición:', li7_eea2: ' oponerte al tratamiento basado en interés legítimo.',
    li7_eea3bold: 'Limitación:', li7_eea3: ' solicitar que restrinjamos el tratamiento de tus datos.',
    li7_eea4bold: 'Reclamación:', li7_eea4: ' presentar una queja ante la autoridad de protección de datos de tu país.',
    s7rights: 'Para ejercer cualquiera de estos derechos, escríbenos a',
    h8: '8. Tus derechos (general)',
    s8: 'Tienes derecho a acceder, rectificar o eliminar tus datos personales (incluyendo tu cuenta, correo electrónico, nombre de usuario y avatar). Para ejercer estos derechos, escríbenos a',
    h9: '9. Cambios a esta política',
    s9: 'Podemos actualizar esta política en cualquier momento. La fecha de última actualización siempre estará indicada al inicio del documento. El uso continuado del sitio o las apps implica aceptación de los cambios.',
    h10: '10. Contacto',
    s10: 'Si tienes preguntas sobre esta política, puedes escribirnos a',
    revenuecatPrivacy: 'RevenueCat (gestión de suscripciones)',
  },
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: March 2026',
    intro: 'At myappcube we take your privacy seriously. This policy explains what information we collect, how we use it, and your rights regarding it.',
    h1: '1. Information We Collect',
    s1intro: 'Our applications and this website may collect the following types of data:',
    li1_1bold: 'Anonymous identifier:', li1_1: ' when you open the app for the first time, Firebase Authentication automatically assigns a unique identifier (UID) to your device, even before you create an account. This UID is used internally to manage your session and subscription status.',
    li1_2bold: 'User account:', li1_2: ' if you choose to create an account, you can do so via email and password, Google Sign-In, or Sign in with Apple. We store your email address, display name, and profile photo from your chosen provider through Firebase Authentication (Google). We also store in Firestore the username and avatar you configure within the app.',
    li1_3bold: 'Crash diagnostics:', li1_3: ' we use Firebase Crashlytics to detect and fix technical issues. Crashlytics automatically collects crash reports, stack traces, and, when the user is authenticated, the associated Firebase UID. This data is never used to personally identify you — it is only used to improve app stability.',
    li1_4bold: 'In-app advertising:', li1_4: ' our free apps use Google AdMob to display ads (banners, interstitials, and rewarded ads). AdMob may collect device identifiers (such as IDFA on iOS or Android Advertising ID) to personalize ads. Your consent is requested at first launch through Google\'s User Messaging Platform (UMP), in compliance with GDPR and CCPA.',
    li1_5bold: 'Website advertising:', li1_5: ' this website may use Google AdSense, which uses cookies to show personalized ads based on your interests.',
    li1_6bold: 'Subscriptions:', li1_6: ' purchases are processed through Google Play (Android) or the App Store (iOS). Subscription status management is handled by RevenueCat, which may collect device identifiers and purchase receipts to verify and maintain your premium access. We do not store payment data; we only receive confirmation of your subscription status.',
    li1_7bold: 'Device data:', li1_7: ' model, operating system, and app version, used for technical diagnostics via Crashlytics.',
    h2: '2. How We Use the Information',
    li2_1: 'Assign a session identifier from the first launch.',
    li2_2: 'Authenticate your account and maintain your session.',
    li2_3: 'Display and sync your profile (username and avatar) in the app.',
    li2_4: 'Manage and verify your subscription status.',
    li2_5: 'Detect and fix technical errors via Firebase Crashlytics.',
    li2_6: 'Display ads in the app via Google AdMob (based on your consent).',
    li2_7: 'Improve the performance and experience of our apps and website.',
    li2_8: 'Analyze general usage anonymously to make product decisions.',
    h3: '3. Advertising and Cookies',
    s3_app_bold: 'In the app:', s3_app: ' we use Google AdMob to show ads to users without an active subscription. This includes banner ads, interstitial ads (shown when a game ends), and rewarded ads (which users can voluntarily watch to temporarily unlock premium categories). Consent for personalized ads is requested at first launch via Google\'s UMP. You can review or withdraw consent at any time from the app settings.',
    s3_web_bold: 'On the website:', s3_web: ' we use third-party cookies (Google AdSense) to measure traffic and display ads. You can manage cookies through your browser settings or via',
    googleAdsLink: "Google's Ads Settings",
    h4: '4. Third-Party Services',
    s4intro: 'Our apps and site integrate third-party services with their own privacy policies:',
    h5: '5. Data Retention',
    s5: 'Your account (email, username, avatar, and Firebase UID) is retained for as long as your account is active. You may request deletion at any time by contacting us at',
    h6: "6. Children's Privacy",
    s6: 'Our apps are not directed at children under 13. We do not knowingly collect information from children. If you believe a child has provided us with personal data, please contact us so we can delete it.',
    h7: '7. European Union Users (GDPR)',
    s7intro: 'If you are located in the European Economic Area (EEA), the processing of your personal data is governed by the GDPR. Below is the legal basis for each type of processing:',
    li7_1bold: 'Anonymous identifier (UID):', li7_1: ' performance of a contract — necessary to provide the service from the first use.',
    li7_2bold: 'User account (email, name, avatar):', li7_2: ' performance of a contract — necessary to manage your profile and access to the app.',
    li7_3bold: 'Subscriptions:', li7_3: ' performance of a contract — necessary to manage your payment plan and premium access.',
    li7_4bold: 'Crash diagnostics (Crashlytics):', li7_4: ' legitimate interest — to maintain the technical stability of the app without personally identifying you.',
    li7_5bold: 'Personalized ads (AdMob):', li7_5: ' consent — we request your authorization at first launch. You may withdraw consent at any time from the app settings.',
    s7eea: 'As an EEA user, in addition to general rights, you also have the right to:',
    li7_eea1bold: 'Data portability:', li7_eea1: ' receive your data in a machine-readable format.',
    li7_eea2bold: 'Object:', li7_eea2: ' object to processing based on legitimate interest.',
    li7_eea3bold: 'Restriction:', li7_eea3: ' request that we restrict the processing of your data.',
    li7_eea4bold: 'Lodge a complaint:', li7_eea4: " file a complaint with your country's data protection authority.",
    s7rights: 'To exercise any of these rights, write to us at',
    h8: '8. Your Rights (General)',
    s8: 'You have the right to access, correct, or delete your personal data (including your account, email address, username, and avatar). To exercise these rights, please write to us at',
    h9: '9. Changes to This Policy',
    s9: 'We may update this policy at any time. The last updated date will always be shown at the top of this document. Continued use of the site or apps implies acceptance of any changes.',
    h10: '10. Contact',
    s10: 'If you have questions about this policy, you can reach us at',
    revenuecatPrivacy: 'RevenueCat (subscription management)',
  },
  pt: {
    title: 'Política de Privacidade',
    lastUpdated: 'Última atualização: março de 2026',
    intro: 'Na myappcube levamos sua privacidade a sério. Esta política explica quais informações coletamos, como as usamos e quais são seus direitos.',
    h1: '1. Informações que coletamos',
    s1intro: 'Nossos aplicativos e este site podem coletar os seguintes tipos de dados:',
    li1_1bold: 'Identificador anônimo:', li1_1: ' ao abrir o aplicativo pela primeira vez, o Firebase Authentication atribui automaticamente um identificador único (UID) ao seu dispositivo, mesmo antes de você criar uma conta. Esse UID é usado internamente para gerenciar sua sessão e status de assinatura.',
    li1_2bold: 'Conta de usuário:', li1_2: ' se você optar por criar uma conta, pode fazê-lo por e-mail e senha, Google Sign-In ou Sign in with Apple. Armazenamos seu endereço de e-mail, nome de exibição e foto de perfil do provedor escolhido via Firebase Authentication (Google). Também armazenamos no Firestore o nome de usuário e avatar configurados no app.',
    li1_3bold: 'Diagnóstico de falhas:', li1_3: ' usamos o Firebase Crashlytics para detectar e corrigir problemas técnicos. O Crashlytics coleta automaticamente relatórios de falhas, stack traces e, quando autenticado, o UID do Firebase. Esses dados nunca são usados para identificá-lo pessoalmente — apenas para melhorar a estabilidade do app.',
    li1_4bold: 'Publicidade no app:', li1_4: ' nossos aplicativos gratuitos usam o Google AdMob para exibir anúncios (banners, intersticiais e anúncios recompensados). O AdMob pode coletar identificadores de dispositivo (como IDFA no iOS ou Android Advertising ID) para personalizar anúncios. Seu consentimento é solicitado no primeiro lançamento via UMP do Google, em conformidade com o GDPR e CCPA.',
    li1_5bold: 'Publicidade no site:', li1_5: ' este site pode usar o Google AdSense, que utiliza cookies para exibir anúncios personalizados.',
    li1_6bold: 'Assinaturas:', li1_6: ' as compras são processadas pelo Google Play (Android) ou App Store (iOS). O gerenciamento do status da assinatura é realizado pelo RevenueCat, que pode coletar identificadores de dispositivo e recibos de compra para verificar e manter seu acesso premium. Não armazenamos dados de pagamento; apenas recebemos confirmação do status da assinatura.',
    li1_7bold: 'Dados do dispositivo:', li1_7: ' modelo, sistema operacional e versão do app, usados para diagnóstico técnico via Crashlytics.',
    h2: '2. Como usamos as informações',
    li2_1: 'Atribuir um identificador de sessão desde o primeiro lançamento.',
    li2_2: 'Autenticar sua conta e manter sua sessão ativa.',
    li2_3: 'Exibir e sincronizar seu perfil (nome de usuário e avatar) no app.',
    li2_4: 'Gerenciar e verificar o status da sua assinatura.',
    li2_5: 'Detectar e corrigir erros técnicos via Firebase Crashlytics.',
    li2_6: 'Exibir anúncios no app via Google AdMob (com base no seu consentimento).',
    li2_7: 'Melhorar o desempenho e a experiência dos nossos aplicativos e site.',
    li2_8: 'Analisar o uso geral de forma anônima para tomar decisões de produto.',
    h3: '3. Publicidade e cookies',
    s3_app_bold: 'No app:', s3_app: ' usamos o Google AdMob para exibir anúncios a usuários sem assinatura ativa. Inclui banners, anúncios intersticiais (ao final de uma partida) e anúncios recompensados (que o usuário pode assistir voluntariamente para desbloquear categorias premium temporariamente). O consentimento para anúncios personalizados é solicitado no primeiro lançamento via UMP do Google. Você pode revisar ou revogar o consentimento a qualquer momento nas configurações do app.',
    s3_web_bold: 'No site:', s3_web: ' usamos cookies de terceiros (Google AdSense) para medir o tráfego e exibir anúncios. Você pode gerenciar os cookies pelas configurações do navegador ou pelo',
    googleAdsLink: 'Centro de preferências de anúncios do Google',
    h4: '4. Serviços de terceiros',
    s4intro: 'Nossos aplicativos e site integram serviços de terceiros com suas próprias políticas de privacidade:',
    h5: '5. Retenção de dados',
    s5: 'Sua conta (e-mail, nome de usuário, avatar e UID do Firebase) é mantida enquanto a conta estiver ativa. Você pode solicitar a exclusão a qualquer momento entrando em contato conosco em',
    h6: '6. Privacidade de menores',
    s6: 'Nossos aplicativos não são destinados a menores de 13 anos. Não coletamos conscientemente informações de crianças. Se você acredita que uma criança nos forneceu dados, entre em contato para que possamos excluí-los.',
    h7: '7. Usuários da União Europeia (GDPR)',
    s7intro: 'Se você estiver localizado no Espaço Econômico Europeu (EEE), o tratamento dos seus dados pessoais é regido pelo GDPR. Abaixo está a base legal para cada tipo de tratamento:',
    li7_1bold: 'Identificador anônimo (UID):', li7_1: ' execução de contrato — necessário para prestar o serviço desde o primeiro uso.',
    li7_2bold: 'Conta de usuário (e-mail, nome, avatar):', li7_2: ' execução de contrato — necessário para gerenciar seu perfil e acesso ao app.',
    li7_3bold: 'Assinaturas:', li7_3: ' execução de contrato — necessário para gerenciar seu plano de pagamento e acesso premium.',
    li7_4bold: 'Diagnóstico de falhas (Crashlytics):', li7_4: ' interesse legítimo — para manter a estabilidade técnica do app sem identificá-lo pessoalmente.',
    li7_5bold: 'Anúncios personalizados (AdMob):', li7_5: ' consentimento — solicitamos sua autorização no primeiro lançamento. Você pode revogar a qualquer momento nas configurações do app.',
    s7eea: 'Como usuário do EEE, além dos direitos gerais, você também tem direito a:',
    li7_eea1bold: 'Portabilidade:', li7_eea1: ' receber seus dados em formato legível por máquina.',
    li7_eea2bold: 'Oposição:', li7_eea2: ' opor-se ao tratamento baseado em interesse legítimo.',
    li7_eea3bold: 'Limitação:', li7_eea3: ' solicitar que restrinjamos o tratamento dos seus dados.',
    li7_eea4bold: 'Reclamação:', li7_eea4: ' apresentar uma queixa à autoridade de proteção de dados do seu país.',
    s7rights: 'Para exercer qualquer um desses direitos, escreva-nos em',
    h8: '8. Seus direitos (geral)',
    s8: 'Você tem o direito de acessar, corrigir ou excluir seus dados pessoais (incluindo sua conta, endereço de e-mail, nome de usuário e avatar). Para exercer esses direitos, escreva-nos em',
    h9: '9. Alterações nesta política',
    s9: 'Podemos atualizar esta política a qualquer momento. A data da última atualização sempre estará indicada no início do documento. O uso contínuo do site ou dos apps implica a aceitação das alterações.',
    h10: '10. Contato',
    s10: 'Se tiver dúvidas sobre esta política, entre em contato conosco em',
    revenuecatPrivacy: 'RevenueCat (gerenciamento de assinaturas)',
  },
  fr: {
    title: 'Politique de confidentialité',
    lastUpdated: 'Dernière mise à jour : mars 2026',
    intro: 'Chez myappcube, nous prenons votre vie privée au sérieux. Cette politique explique quelles informations nous collectons, comment nous les utilisons et quels sont vos droits.',
    h1: '1. Informations que nous collectons',
    s1intro: 'Nos applications et ce site web peuvent collecter les types de données suivants :',
    li1_1bold: 'Identifiant anonyme :', li1_1: " lors de la première ouverture de l'application, Firebase Authentication attribue automatiquement un identifiant unique (UID) à votre appareil, avant même que vous créiez un compte. Cet UID est utilisé en interne pour gérer votre session et votre statut d'abonnement.",
    li1_2bold: 'Compte utilisateur :', li1_2: " si vous choisissez de créer un compte, vous pouvez le faire par e-mail et mot de passe, Google Sign-In ou Sign in with Apple. Nous stockons votre adresse e-mail, votre nom d'affichage et votre photo de profil du fournisseur choisi via Firebase Authentication (Google). Nous stockons également dans Firestore le nom d'utilisateur et l'avatar que vous configurez dans l'application.",
    li1_3bold: 'Diagnostics de plantage :', li1_3: " nous utilisons Firebase Crashlytics pour détecter et corriger les problèmes techniques. Crashlytics collecte automatiquement des rapports de plantage, des traces de pile et, lorsque l'utilisateur est authentifié, l'UID Firebase associé. Ces données ne sont jamais utilisées pour vous identifier personnellement — elles servent uniquement à améliorer la stabilité de l'application.",
    li1_4bold: 'Publicité dans l\'application :', li1_4: " nos applications gratuites utilisent Google AdMob pour afficher des publicités (bannières, interstitiels et publicités récompensées). AdMob peut collecter des identifiants d'appareil (tels que l'IDFA sur iOS ou l'Android Advertising ID) pour personnaliser les publicités. Votre consentement est demandé au premier lancement via la plateforme UMP de Google, conformément au RGPD et au CCPA.",
    li1_5bold: 'Publicité sur le site web :', li1_5: ' ce site web peut utiliser Google AdSense, qui utilise des cookies pour afficher des publicités personnalisées.',
    li1_6bold: 'Abonnements :', li1_6: " les achats sont traités via Google Play (Android) ou l'App Store (iOS). La gestion du statut d'abonnement est assurée par RevenueCat, qui peut collecter des identifiants d'appareil et des reçus d'achat pour vérifier et maintenir votre accès premium. Nous ne stockons pas les données de paiement ; nous recevons uniquement la confirmation du statut de l'abonnement.",
    li1_7bold: 'Données de l\'appareil :', li1_7: ' modèle, système d\'exploitation et version de l\'application, utilisés pour les diagnostics techniques via Crashlytics.',
    h2: '2. Comment nous utilisons les informations',
    li2_1: 'Attribuer un identifiant de session dès le premier lancement.',
    li2_2: 'Authentifier votre compte et maintenir votre session active.',
    li2_3: "Afficher et synchroniser votre profil (nom d'utilisateur et avatar) dans l'application.",
    li2_4: "Gérer et vérifier le statut de votre abonnement.",
    li2_5: 'Détecter et corriger les erreurs techniques via Firebase Crashlytics.',
    li2_6: "Afficher des publicités dans l'application via Google AdMob (selon votre consentement).",
    li2_7: 'Améliorer les performances et l\'expérience de nos applications et de ce site.',
    li2_8: 'Analyser l\'utilisation générale de manière anonyme pour prendre des décisions produit.',
    h3: '3. Publicité et cookies',
    s3_app_bold: "Dans l'application :", s3_app: " nous utilisons Google AdMob pour afficher des publicités aux utilisateurs sans abonnement actif. Cela inclut des bannières publicitaires, des publicités interstitielles (affichées en fin de partie) et des publicités récompensées (que l'utilisateur peut regarder volontairement pour débloquer temporairement des catégories premium). Le consentement pour les publicités personnalisées est demandé au premier lancement via le CMP de Google (UMP). Vous pouvez consulter ou retirer votre consentement à tout moment depuis les paramètres de l'application.",
    s3_web_bold: 'Sur le site web :', s3_web: ' nous utilisons des cookies tiers (Google AdSense) pour mesurer le trafic et afficher des publicités. Vous pouvez gérer les cookies depuis les paramètres de votre navigateur ou via le',
    googleAdsLink: 'Centre de préférences des annonces Google',
    h4: '4. Services tiers',
    s4intro: 'Nos applications et ce site intègrent des services tiers avec leurs propres politiques de confidentialité :',
    h5: '5. Conservation des données',
    s5: 'Votre compte (e-mail, nom d\'utilisateur, avatar et UID Firebase) est conservé tant que votre compte est actif. Vous pouvez demander sa suppression à tout moment en nous contactant à',
    h6: '6. Confidentialité des mineurs',
    s6: 'Nos applications ne sont pas destinées aux enfants de moins de 13 ans. Nous ne collectons pas sciemment d\'informations sur des enfants. Si vous pensez qu\'un enfant nous a fourni des données personnelles, contactez-nous afin que nous puissions les supprimer.',
    h7: '7. Utilisateurs de l\'Union européenne (RGPD)',
    s7intro: "Si vous êtes situé dans l'Espace économique européen (EEE), le traitement de vos données personnelles est régi par le RGPD. Voici la base juridique de chaque type de traitement :",
    li7_1bold: 'Identifiant anonyme (UID) :', li7_1: ' exécution d\'un contrat — nécessaire pour fournir le service dès la première utilisation.',
    li7_2bold: 'Compte utilisateur (e-mail, nom, avatar) :', li7_2: ' exécution d\'un contrat — nécessaire pour gérer votre profil et votre accès à l\'application.',
    li7_3bold: 'Abonnements :', li7_3: ' exécution d\'un contrat — nécessaire pour gérer votre plan de paiement et votre accès premium.',
    li7_4bold: 'Diagnostics de plantage (Crashlytics) :', li7_4: ' intérêt légitime — pour maintenir la stabilité technique de l\'application sans vous identifier personnellement.',
    li7_5bold: 'Publicités personnalisées (AdMob) :', li7_5: ' consentement — nous demandons votre autorisation au premier lancement. Vous pouvez la retirer à tout moment depuis les paramètres de l\'application.',
    s7eea: 'En tant qu\'utilisateur de l\'EEE, en plus des droits généraux, vous avez également le droit de :',
    li7_eea1bold: 'Portabilité des données :', li7_eea1: ' recevoir vos données dans un format lisible par machine.',
    li7_eea2bold: 'Opposition :', li7_eea2: ' vous opposer au traitement fondé sur l\'intérêt légitime.',
    li7_eea3bold: 'Limitation :', li7_eea3: ' demander que nous limitions le traitement de vos données.',
    li7_eea4bold: 'Réclamation :', li7_eea4: ' déposer une plainte auprès de l\'autorité de protection des données de votre pays.',
    s7rights: 'Pour exercer l\'un de ces droits, écrivez-nous à',
    h8: '8. Vos droits (général)',
    s8: 'Vous avez le droit d\'accéder, de corriger ou de supprimer vos données personnelles (y compris votre compte, adresse e-mail, nom d\'utilisateur et avatar). Pour exercer ces droits, écrivez-nous à',
    h9: '9. Modifications de cette politique',
    s9: 'Nous pouvons mettre à jour cette politique à tout moment. La date de dernière mise à jour sera toujours indiquée en haut du document. L\'utilisation continue du site ou des applications implique l\'acceptation des modifications.',
    h10: '10. Contact',
    s10: 'Si vous avez des questions sur cette politique, vous pouvez nous contacter à',
    revenuecatPrivacy: 'RevenueCat (gestion des abonnements)',
  },
  it: {
    title: 'Informativa sulla privacy',
    lastUpdated: 'Ultimo aggiornamento: marzo 2026',
    intro: 'Da myappcube prendiamo sul serio la tua privacy. Questa informativa spiega quali informazioni raccogliamo, come le utilizziamo e quali sono i tuoi diritti.',
    h1: '1. Informazioni che raccogliamo',
    s1intro: 'Le nostre applicazioni e questo sito web possono raccogliere i seguenti tipi di dati:',
    li1_1bold: 'Identificatore anonimo:', li1_1: " all'apertura dell'app per la prima volta, Firebase Authentication assegna automaticamente un identificatore univoco (UID) al tuo dispositivo, anche prima che tu crei un account. Questo UID viene utilizzato internamente per gestire la sessione e lo stato dell'abbonamento.",
    li1_2bold: 'Account utente:', li1_2: " se decidi di creare un account, puoi farlo tramite e-mail e password, Google Sign-In o Sign in with Apple. Conserviamo il tuo indirizzo e-mail, il nome visualizzato e la foto del profilo del provider scelto tramite Firebase Authentication (Google). Archiviamo inoltre in Firestore il nome utente e l'avatar configurati nell'app.",
    li1_3bold: 'Diagnostica degli arresti:', li1_3: " utilizziamo Firebase Crashlytics per rilevare e correggere problemi tecnici. Crashlytics raccoglie automaticamente report degli arresti, stack trace e, quando l'utente è autenticato, l'UID Firebase associato. Questi dati non vengono mai utilizzati per identificarti personalmente — servono solo a migliorare la stabilità dell'app.",
    li1_4bold: "Pubblicità nell'app:", li1_4: " le nostre app gratuite usano Google AdMob per mostrare annunci (banner, interstitial e annunci con premio). AdMob può raccogliere identificatori del dispositivo (come IDFA su iOS o Android Advertising ID) per personalizzare gli annunci. Il tuo consenso viene richiesto al primo avvio tramite la piattaforma UMP di Google, in conformità con GDPR e CCPA.",
    li1_5bold: 'Pubblicità sul sito web:', li1_5: ' questo sito web può utilizzare Google AdSense, che usa cookie per mostrare annunci personalizzati.',
    li1_6bold: 'Abbonamenti:', li1_6: " gli acquisti vengono elaborati tramite Google Play (Android) o l'App Store (iOS). La gestione dello stato dell'abbonamento è affidata a RevenueCat, che può raccogliere identificatori del dispositivo e ricevute di acquisto per verificare e mantenere l'accesso premium. Non conserviamo dati di pagamento; riceviamo solo la conferma dello stato dell'abbonamento.",
    li1_7bold: 'Dati del dispositivo:', li1_7: ' modello, sistema operativo e versione dell\'app, utilizzati per la diagnostica tecnica tramite Crashlytics.',
    h2: '2. Come utilizziamo le informazioni',
    li2_1: 'Assegnare un identificatore di sessione dal primo avvio.',
    li2_2: 'Autenticare il tuo account e mantenere la sessione attiva.',
    li2_3: "Visualizzare e sincronizzare il tuo profilo (nome utente e avatar) nell'app.",
    li2_4: "Gestire e verificare lo stato del tuo abbonamento.",
    li2_5: 'Rilevare e correggere errori tecnici tramite Firebase Crashlytics.',
    li2_6: "Mostrare annunci nell'app tramite Google AdMob (in base al tuo consenso).",
    li2_7: 'Migliorare le prestazioni e l\'esperienza delle nostre app e del sito web.',
    li2_8: 'Analizzare l\'utilizzo generale in modo anonimo per prendere decisioni di prodotto.',
    h3: '3. Pubblicità e cookie',
    s3_app_bold: "Nell'app:", s3_app: " utilizziamo Google AdMob per mostrare annunci agli utenti senza abbonamento attivo. Include banner, annunci interstitial (mostrati al termine di una partita) e annunci con premio (che l'utente può guardare volontariamente per sbloccare temporaneamente categorie premium). Il consenso per gli annunci personalizzati viene richiesto al primo avvio tramite il CMP di Google (UMP). Puoi consultare o revocare il consenso in qualsiasi momento dalle impostazioni dell'app.",
    s3_web_bold: 'Sul sito web:', s3_web: ' utilizziamo cookie di terze parti (Google AdSense) per misurare il traffico e mostrare annunci. Puoi gestire i cookie dalle impostazioni del browser o tramite il',
    googleAdsLink: 'Centro preferenze annunci di Google',
    h4: '4. Servizi di terze parti',
    s4intro: 'Le nostre app e il sito integrano servizi di terze parti con le proprie informative sulla privacy:',
    h5: '5. Conservazione dei dati',
    s5: 'Il tuo account (e-mail, nome utente, avatar e UID Firebase) viene conservato finché l\'account è attivo. Puoi richiederne la cancellazione in qualsiasi momento scrivendo a',
    h6: '6. Privacy dei minori',
    s6: 'Le nostre app non sono destinate a minori di 13 anni. Non raccogliamo consapevolmente informazioni da minori. Se ritieni che un minore ci abbia fornito dati personali, contattaci per procedere alla cancellazione.',
    h7: '7. Utenti dell\'Unione Europea (GDPR)',
    s7intro: 'Se ti trovi nello Spazio Economico Europeo (SEE), il trattamento dei tuoi dati personali è disciplinato dal GDPR. Di seguito è indicata la base giuridica per ciascun tipo di trattamento:',
    li7_1bold: 'Identificatore anonimo (UID):', li7_1: ' esecuzione di un contratto — necessario per fornire il servizio dal primo utilizzo.',
    li7_2bold: 'Account utente (e-mail, nome, avatar):', li7_2: " esecuzione di un contratto — necessario per gestire il profilo e l'accesso all'app.",
    li7_3bold: 'Abbonamenti:', li7_3: " esecuzione di un contratto — necessario per gestire il piano di pagamento e l'accesso premium.",
    li7_4bold: 'Diagnostica degli arresti (Crashlytics):', li7_4: " interesse legittimo — per mantenere la stabilità tecnica dell'app senza identificarti personalmente.",
    li7_5bold: 'Annunci personalizzati (AdMob):', li7_5: " consenso — richiediamo la tua autorizzazione al primo avvio. Puoi revocarla in qualsiasi momento dalle impostazioni dell'app.",
    s7eea: 'Come utente del SEE, oltre ai diritti generali, hai anche il diritto di:',
    li7_eea1bold: 'Portabilità dei dati:', li7_eea1: ' ricevere i tuoi dati in un formato leggibile da macchina.',
    li7_eea2bold: 'Opposizione:', li7_eea2: " opporti al trattamento basato sull'interesse legittimo.",
    li7_eea3bold: 'Limitazione:', li7_eea3: ' richiedere che limitiamo il trattamento dei tuoi dati.',
    li7_eea4bold: 'Reclamo:', li7_eea4: " presentare un reclamo all'autorità di protezione dei dati del tuo paese.",
    s7rights: 'Per esercitare uno qualsiasi di questi diritti, scrivici a',
    h8: '8. I tuoi diritti (generale)',
    s8: 'Hai il diritto di accedere, correggere o cancellare i tuoi dati personali (inclusi account, indirizzo e-mail, nome utente e avatar). Per esercitare questi diritti, scrivici a',
    h9: '9. Modifiche a questa informativa',
    s9: "Possiamo aggiornare questa informativa in qualsiasi momento. La data dell'ultimo aggiornamento sarà sempre indicata all'inizio del documento. L'uso continuato del sito o delle app implica l'accettazione delle modifiche.",
    h10: '10. Contatto',
    s10: 'Se hai domande su questa informativa, puoi scriverci a',
    revenuecatPrivacy: 'RevenueCat (gestione abbonamenti)',
  },
  de: {
    title: 'Datenschutzrichtlinie',
    lastUpdated: 'Zuletzt aktualisiert: März 2026',
    intro: 'Bei myappcube nehmen wir Ihren Datenschutz ernst. Diese Richtlinie erklärt, welche Informationen wir erfassen, wie wir sie verwenden und welche Rechte Sie haben.',
    h1: '1. Informationen, die wir erfassen',
    s1intro: 'Unsere Anwendungen und diese Website können folgende Arten von Daten erfassen:',
    li1_1bold: 'Anonymer Bezeichner:', li1_1: ' beim ersten Öffnen der App weist Firebase Authentication Ihrem Gerät automatisch eine eindeutige Kennung (UID) zu, noch bevor Sie ein Konto erstellen. Diese UID wird intern verwendet, um Ihre Sitzung und Ihren Abonnementstatus zu verwalten.',
    li1_2bold: 'Benutzerkonto:', li1_2: ' wenn Sie ein Konto erstellen möchten, können Sie dies per E-Mail und Passwort, Google Sign-In oder Sign in with Apple tun. Wir speichern Ihre E-Mail-Adresse, Ihren Anzeigenamen und Ihr Profilfoto vom gewählten Anbieter über Firebase Authentication (Google). Darüber hinaus speichern wir in Firestore den Benutzernamen und Avatar, den Sie in der App konfigurieren.',
    li1_3bold: 'Absturzdiagnose:', li1_3: ' wir verwenden Firebase Crashlytics, um technische Probleme zu erkennen und zu beheben. Crashlytics erfasst automatisch Absturzberichte, Stack-Traces und, wenn der Benutzer authentifiziert ist, die zugehörige Firebase-UID. Diese Daten werden niemals zur persönlichen Identifikation verwendet — sie dienen ausschließlich zur Verbesserung der App-Stabilität.',
    li1_4bold: 'In-App-Werbung:', li1_4: ' unsere kostenlosen Apps verwenden Google AdMob zur Anzeige von Werbung (Banner, Interstitials und Belohnungswerbung). AdMob kann Gerätekennungen (wie IDFA unter iOS oder Android Advertising ID) erfassen, um Anzeigen zu personalisieren. Ihre Einwilligung wird beim ersten Start über Googles User Messaging Platform (UMP) gemäß DSGVO und CCPA eingeholt.',
    li1_5bold: 'Website-Werbung:', li1_5: ' diese Website kann Google AdSense verwenden, das Cookies einsetzt, um personalisierte Anzeigen zu schalten.',
    li1_6bold: 'Abonnements:', li1_6: ' Käufe werden über Google Play (Android) oder den App Store (iOS) abgewickelt. Die Verwaltung des Abonnementstatus erfolgt über RevenueCat, das Gerätekennungen und Kaufbelege erfassen kann, um Ihren Premium-Zugang zu überprüfen und aufrechtzuerhalten. Wir speichern keine Zahlungsdaten; wir erhalten nur eine Bestätigung des Abonnementstatus.',
    li1_7bold: 'Gerätedaten:', li1_7: ' Modell, Betriebssystem und App-Version, verwendet für technische Diagnosen über Crashlytics.',
    h2: '2. Wie wir die Informationen verwenden',
    li2_1: 'Zuweisung eines Sitzungsbezeichners ab dem ersten Start.',
    li2_2: 'Authentifizierung Ihres Kontos und Aufrechterhaltung Ihrer Sitzung.',
    li2_3: 'Anzeige und Synchronisierung Ihres Profils (Benutzername und Avatar) in der App.',
    li2_4: 'Verwaltung und Überprüfung Ihres Abonnementstatus.',
    li2_5: 'Erkennung und Behebung technischer Fehler über Firebase Crashlytics.',
    li2_6: 'Anzeige von Werbung in der App über Google AdMob (basierend auf Ihrer Einwilligung).',
    li2_7: 'Verbesserung der Leistung und Erfahrung unserer Apps und dieser Website.',
    li2_8: 'Anonyme Analyse der allgemeinen Nutzung zur Produktentscheidung.',
    h3: '3. Werbung und Cookies',
    s3_app_bold: 'In der App:', s3_app: ' wir verwenden Google AdMob, um Nutzern ohne aktives Abonnement Werbung anzuzeigen. Dies umfasst Bannerwerbung, Interstitial-Anzeigen (nach Spielende) und Belohnungswerbung (die Nutzer freiwillig ansehen können, um Premium-Kategorien vorübergehend freizuschalten). Die Einwilligung für personalisierte Werbung wird beim ersten Start über Googles UMP eingeholt. Sie können Ihre Einwilligung jederzeit in den App-Einstellungen einsehen oder widerrufen.',
    s3_web_bold: 'Auf der Website:', s3_web: ' wir verwenden Drittanbieter-Cookies (Google AdSense), um den Traffic zu messen und Werbung anzuzeigen. Sie können Cookies über Ihre Browsereinstellungen oder über die',
    googleAdsLink: 'Google-Anzeigeneinstellungen',
    h4: '4. Dienste von Drittanbietern',
    s4intro: 'Unsere Apps und diese Website integrieren Dienste von Drittanbietern mit eigenen Datenschutzrichtlinien:',
    h5: '5. Datenspeicherung',
    s5: 'Ihr Konto (E-Mail, Benutzername, Avatar und Firebase-UID) wird gespeichert, solange das Konto aktiv ist. Sie können die Löschung jederzeit beantragen, indem Sie uns schreiben an',
    h6: '6. Datenschutz für Minderjährige',
    s6: 'Unsere Apps richten sich nicht an Kinder unter 13 Jahren. Wir erfassen wissentlich keine Daten von Kindern. Wenn Sie glauben, dass ein Kind uns personenbezogene Daten übermittelt hat, kontaktieren Sie uns, damit wir diese löschen können.',
    h7: '7. Nutzer der Europäischen Union (DSGVO)',
    s7intro: 'Wenn Sie sich im Europäischen Wirtschaftsraum (EWR) befinden, unterliegt die Verarbeitung Ihrer personenbezogenen Daten der DSGVO. Nachfolgend sind die Rechtsgrundlagen für die einzelnen Verarbeitungsarten aufgeführt:',
    li7_1bold: 'Anonymer Bezeichner (UID):', li7_1: ' Vertragserfüllung — erforderlich, um den Dienst ab der ersten Nutzung bereitzustellen.',
    li7_2bold: 'Benutzerkonto (E-Mail, Name, Avatar):', li7_2: ' Vertragserfüllung — erforderlich zur Verwaltung Ihres Profils und Zugangs zur App.',
    li7_3bold: 'Abonnements:', li7_3: ' Vertragserfüllung — erforderlich zur Verwaltung Ihres Zahlungsplans und Premium-Zugangs.',
    li7_4bold: 'Absturzdiagnose (Crashlytics):', li7_4: ' berechtigtes Interesse — zur Aufrechterhaltung der technischen Stabilität der App ohne persönliche Identifikation.',
    li7_5bold: 'Personalisierte Werbung (AdMob):', li7_5: ' Einwilligung — wir holen Ihre Genehmigung beim ersten Start ein. Sie können diese jederzeit in den App-Einstellungen widerrufen.',
    s7eea: 'Als EWR-Nutzer haben Sie zusätzlich zu den allgemeinen Rechten das Recht auf:',
    li7_eea1bold: 'Datenübertragbarkeit:', li7_eea1: ' Erhalt Ihrer Daten in einem maschinenlesbaren Format.',
    li7_eea2bold: 'Widerspruch:', li7_eea2: ' Widerspruch gegen die Verarbeitung auf Basis berechtigter Interessen.',
    li7_eea3bold: 'Einschränkung:', li7_eea3: ' Anforderung der Einschränkung der Verarbeitung Ihrer Daten.',
    li7_eea4bold: 'Beschwerde:', li7_eea4: ' Einreichung einer Beschwerde bei der Datenschutzbehörde Ihres Landes.',
    s7rights: 'Um eines dieser Rechte auszuüben, schreiben Sie uns an',
    h8: '8. Ihre Rechte (allgemein)',
    s8: 'Sie haben das Recht, auf Ihre personenbezogenen Daten (einschließlich Konto, E-Mail-Adresse, Benutzername und Avatar) zuzugreifen, sie zu berichtigen oder zu löschen. Um diese Rechte auszuüben, schreiben Sie uns bitte an',
    h9: '9. Änderungen dieser Richtlinie',
    s9: 'Wir können diese Richtlinie jederzeit aktualisieren. Das Datum der letzten Aktualisierung wird stets am Anfang des Dokuments angegeben. Die weitere Nutzung der Website oder der Apps gilt als Zustimmung zu den Änderungen.',
    h10: '10. Kontakt',
    s10: 'Wenn Sie Fragen zu dieser Richtlinie haben, können Sie uns unter folgender Adresse kontaktieren:',
    revenuecatPrivacy: 'RevenueCat (Abonnementverwaltung)',
  },
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = translations[locale] ?? translations.en;

  const emailLink = (
    <a href={`mailto:${studio.email}?subject=${encodeURIComponent('Privacidad / Privacy — myappcube')}`}>
      {studio.email}
    </a>
  );

  return (
    <LegalLayout title={t.title} lastUpdated={t.lastUpdated}>
      <p>{t.intro}</p>

      <h2>{t.h1}</h2>
      <p>{t.s1intro}</p>
      <ul>
        <li><strong>{t.li1_1bold}</strong>{t.li1_1}</li>
        <li><strong>{t.li1_2bold}</strong>{t.li1_2}</li>
        <li><strong>{t.li1_3bold}</strong>{t.li1_3}</li>
        <li><strong>{t.li1_4bold}</strong>{t.li1_4}</li>
        <li><strong>{t.li1_5bold}</strong>{t.li1_5}</li>
        <li><strong>{t.li1_6bold}</strong>{t.li1_6}</li>
        <li><strong>{t.li1_7bold}</strong>{t.li1_7}</li>
      </ul>

      <h2>{t.h2}</h2>
      <ul>
        <li>{t.li2_1}</li>
        <li>{t.li2_2}</li>
        <li>{t.li2_3}</li>
        <li>{t.li2_4}</li>
        <li>{t.li2_5}</li>
        <li>{t.li2_6}</li>
        <li>{t.li2_7}</li>
        <li>{t.li2_8}</li>
      </ul>

      <h2>{t.h3}</h2>
      <p>
        <strong>{t.s3_app_bold}</strong>{t.s3_app}
      </p>
      <p>
        <strong>{t.s3_web_bold}</strong>{t.s3_web}{' '}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          {t.googleAdsLink}
        </a>
        .
      </p>

      <h2>{t.h4}</h2>
      <p>{t.s4intro}</p>
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
            {t.revenuecatPrivacy}
          </a>
        </li>
      </ul>

      <h2>{t.h5}</h2>
      <p>
        {t.s5}{' '}{emailLink}.
      </p>

      <h2>{t.h6}</h2>
      <p>{t.s6}</p>

      <h2>{t.h7}</h2>
      <p>{t.s7intro}</p>
      <ul>
        <li><strong>{t.li7_1bold}</strong>{t.li7_1}</li>
        <li><strong>{t.li7_2bold}</strong>{t.li7_2}</li>
        <li><strong>{t.li7_3bold}</strong>{t.li7_3}</li>
        <li><strong>{t.li7_4bold}</strong>{t.li7_4}</li>
        <li><strong>{t.li7_5bold}</strong>{t.li7_5}</li>
      </ul>
      <p>{t.s7eea}</p>
      <ul>
        <li><strong>{t.li7_eea1bold}</strong>{t.li7_eea1}</li>
        <li><strong>{t.li7_eea2bold}</strong>{t.li7_eea2}</li>
        <li><strong>{t.li7_eea3bold}</strong>{t.li7_eea3}</li>
        <li><strong>{t.li7_eea4bold}</strong>{t.li7_eea4}</li>
      </ul>
      <p>{t.s7rights}{' '}{emailLink}.</p>

      <h2>{t.h8}</h2>
      <p>{t.s8}{' '}{emailLink}.</p>

      <h2>{t.h9}</h2>
      <p>{t.s9}</p>

      <h2>{t.h10}</h2>
      <p>{t.s10}{' '}{emailLink}.</p>
    </LegalLayout>
  );
}
