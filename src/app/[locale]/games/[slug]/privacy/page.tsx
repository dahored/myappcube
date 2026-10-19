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
  tr: {
    lastUpdated: 'Son güncelleme: Mart 2025',
    titleWord: 'Gizlilik Politikası',
    intro_a: 'Bu gizlilik politikası, ',
    intro_b: ' tarafından aşağıdaki uygulamaya ilişkin bilgilerin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar: ',
    fullPrivacyText: 'Stüdyonun tam gizlilik politikası için bkz.',
    fullPrivacyLink: 'myappcube.com/privacy',
    h1: '1. Topladığımız Bilgiler',
    li1accountBold: 'Hesap:',
    li1account: ' bir hesap oluşturursanız, e-posta adresinizi Firebase Authentication (Google) aracılığıyla saklarız. Bu veriler yalnızca oturumunuzu ve aboneliğinizi yönetmek için kullanılır.',
    li1subBold: 'Abonelik:',
    li1sub_a: ' premium bir plan satın alırsanız, abonelik durumunuzun onayını Google Play',
    li1sub_ios: ' veya App Store',
    li1sub_b: ' üzerinden alırız. Ödeme verilerini saklamayız.',
    li1usageBold: 'Kullanım verileri:',
    li1usage: ' uygulamanın nasıl kullanıldığına ilişkin, sizi kişisel olarak tanımlamayan anonim ve toplu bilgiler (oturumlar, teknik hatalar).',
    h2: '2. Toplamadığımız Bilgiler',
    li2_1: 'Oyun oturumu içeriği (kelimeler, oylar, sonuçlar) hiçbir sunucuda saklanmaz.',
    li2_2: 'Onayınız olmadan adınızı, konumunuzu veya iletişim bilgilerinizi toplamayız.',
    li2_3: 'Verilerinizi doğrudan reklam amacıyla üçüncü taraflarla paylaşmayız.',
    h3: '3. Reklamlar',
    s3a: '',
    s3b: ' uygulamasının ücretsiz sürümü Google AdMob aracılığıyla reklam gösterebilir. Uygulamayı ilk kez başlattığınızda kişiselleştirilmiş reklamlar için onayınızı isteriz. Aktif aboneliği olan kullanıcılar reklam görmez. Onayınızı uygulama içindeki Ayarlar → Gizlilik bölümünden geri çekebilirsiniz.',
    h4: '4. Üçüncü Taraf Hizmetler',
    h5: '5. Çocuklar',
    s5a: '',
    s5b: ' 13 yaşın altındaki çocuklara yönelik değildir. Çocuklardan bilerek veri toplamayız.',
    h6: '6. Haklarınız',
    s6a: 'Verilerinize (hesabınız dahil) erişim, bunların düzeltilmesini veya silinmesini talep etmek için bize şu adresten yazabilirsiniz:',
    s6b: '.',
    h7: '7. Değişiklikler',
    s7: 'Bu politikayı istediğimiz zaman güncelleyebiliriz. Son güncelleme tarihi her zaman bu belgenin başında gösterilecektir.',
    h8: '8. İletişim',
  },
  ja: {
    lastUpdated: '最終更新日：2025年3月',
    titleWord: 'プライバシーポリシー',
    intro_a: '本プライバシーポリシーは、',
    intro_b: 'が以下のアプリケーションに関連する情報をどのように収集、利用、保護するかを説明するものです。対象アプリケーション：',
    fullPrivacyText: 'スタジオ全体のプライバシーポリシーについては、こちらをご覧ください：',
    fullPrivacyLink: 'myappcube.com/privacy',
    h1: '1. 収集する情報',
    li1accountBold: 'アカウント：',
    li1account: ' アカウントを作成された場合、当社はお客様のメールアドレスをFirebase Authentication（Google）を通じて保存します。このデータは、セッションおよびサブスクリプションの管理にのみ使用されます。',
    li1subBold: 'サブスクリプション：',
    li1sub_a: ' プレミアムプランをご購入いただいた場合、当社はGoogle Play',
    li1sub_ios: 'またはApp Store',
    li1sub_b: 'からサブスクリプションの状態に関する確認を受け取ります。お支払いデータは保存しません。',
    li1usageBold: '利用データ：',
    li1usage: ' アプリの利用状況に関する匿名かつ集計された情報（セッション、技術的なエラー）であり、お客様個人を特定するものではありません。',
    h2: '2. 収集しない情報',
    li2_1: 'ゲームセッションの内容（単語、投票、結果）は、いかなるサーバーにも保存されません。',
    li2_2: 'お客様の同意なく、氏名、位置情報、連絡先情報を収集することはありません。',
    li2_3: 'ダイレクト広告を目的として、お客様のデータを第三者と共有することはありません。',
    h3: '3. 広告',
    s3a: '',
    s3b: 'の無料版では、Google AdMobを通じて広告を表示する場合があります。アプリの初回起動時に、パーソナライズ広告に関するお客様の同意を求めます。有効なサブスクリプションをお持ちのユーザーには広告は表示されません。同意は、アプリ内の 設定 → プライバシー から撤回できます。',
    h4: '4. 第三者サービス',
    h5: '5. 子ども',
    s5a: '',
    s5b: 'は13歳未満のお子様を対象としていません。当社は、お子様から故意にデータを収集することはありません。',
    h6: '6. お客様の権利',
    s6a: 'ご自身のデータ（アカウントを含む）へのアクセス、訂正、削除をご希望の場合は、次の連絡先までご連絡ください：',
    s6b: '。',
    h7: '7. 変更',
    s7: '当社は、本ポリシーをいつでも更新することがあります。最終更新日は常に本書の冒頭に表示されます。',
    h8: '8. お問い合わせ',
  },
  ar: {
    lastUpdated: 'آخر تحديث: مارس 2025',
    titleWord: 'سياسة الخصوصية',
    intro_a: 'توضح سياسة الخصوصية هذه كيفية قيام ',
    intro_b: ' بجمع المعلومات المتعلقة بالتطبيق واستخدامها وحمايتها: ',
    fullPrivacyText: 'للاطلاع على سياسة الخصوصية الكاملة للاستوديو، يُرجى زيارة',
    fullPrivacyLink: 'myappcube.com/privacy',
    h1: '1. المعلومات التي نجمعها',
    li1accountBold: 'الحساب:',
    li1account: ' إذا أنشأت حسابًا، فإننا نخزّن عنوان بريدك الإلكتروني عبر Firebase Authentication (Google). وتُستخدم هذه البيانات حصريًا لإدارة جلستك واشتراكك.',
    li1subBold: 'الاشتراك:',
    li1sub_a: ' إذا اشتريت خطة مميّزة، فإننا نتلقى تأكيدًا لحالة اشتراكك من Google Play',
    li1sub_ios: ' أو App Store',
    li1sub_b: '. ولا نخزّن بيانات الدفع.',
    li1usageBold: 'بيانات الاستخدام:',
    li1usage: ' معلومات مجهولة الهوية ومجمّعة حول كيفية استخدام التطبيق (الجلسات، والأخطاء التقنية)، دون تحديد هويتك الشخصية.',
    h2: '2. المعلومات التي لا نجمعها',
    li2_1: 'لا يتم تخزين محتوى جلسات اللعب (الكلمات، والأصوات، والنتائج) على أي خادم.',
    li2_2: 'لا نجمع اسمك أو موقعك أو بيانات الاتصال الخاصة بك دون موافقتك.',
    li2_3: 'لا نشارك بياناتك مع جهات خارجية لأغراض الإعلان المباشر.',
    h3: '3. الإعلانات',
    s3a: 'قد تعرض النسخة المجانية من ',
    s3b: ' إعلانات عبر Google AdMob. عند تشغيل التطبيق لأول مرة، نطلب موافقتك على الإعلانات المخصّصة. ولا تظهر الإعلانات للمستخدمين الذين لديهم اشتراك نشط. ويمكنك سحب موافقتك من الإعدادات ← الخصوصية داخل التطبيق.',
    h4: '4. خدمات الجهات الخارجية',
    h5: '5. الأطفال',
    s5a: '',
    s5b: ' غير موجّه للأطفال دون سن 13 عامًا. ولا نجمع عن علم أي بيانات من الأطفال.',
    h6: '6. حقوقك',
    s6a: 'يمكنك طلب الوصول إلى بياناتك (بما في ذلك حسابك) أو تصحيحها أو حذفها عن طريق مراسلتنا على',
    s6b: '.',
    h7: '7. التغييرات',
    s7: 'يجوز لنا تحديث هذه السياسة في أي وقت. وسيظهر تاريخ آخر تحديث دائمًا في أعلى هذه الوثيقة.',
    h8: '8. التواصل',
  },
  ko: {
    lastUpdated: '최종 업데이트: 2025년 3월',
    titleWord: '개인정보 처리방침',
    intro_a: '본 개인정보 처리방침은 ',
    intro_b: '가 다음 애플리케이션과 관련된 정보를 수집, 이용 및 보호하는 방법을 설명합니다: ',
    fullPrivacyText: '스튜디오의 전체 개인정보 처리방침은 다음에서 확인하십시오:',
    fullPrivacyLink: 'myappcube.com/privacy',
    h1: '1. 수집하는 정보',
    li1accountBold: '계정:',
    li1account: ' 계정을 생성하시는 경우 당사는 Firebase Authentication(Google)을 통해 귀하의 이메일 주소를 저장합니다. 이 데이터는 귀하의 세션 및 구독을 관리하는 용도로만 사용됩니다.',
    li1subBold: '구독:',
    li1sub_a: ' 프리미엄 플랜을 구매하시는 경우 당사는 Google Play',
    li1sub_ios: ' 또는 App Store',
    li1sub_b: '로부터 귀하의 구독 상태 확인 정보를 받습니다. 당사는 결제 정보를 저장하지 않습니다.',
    li1usageBold: '이용 데이터:',
    li1usage: ' 귀하를 개인적으로 식별하지 않는, 앱 이용 방식(세션, 기술적 오류)에 관한 익명의 집계 정보.',
    h2: '2. 수집하지 않는 정보',
    li2_1: '게임 세션 내용(단어, 투표, 결과)은 어떠한 서버에도 저장되지 않습니다.',
    li2_2: '당사는 귀하의 동의 없이 이름, 위치 또는 연락처 정보를 수집하지 않습니다.',
    li2_3: '당사는 직접 광고 목적으로 귀하의 데이터를 제3자와 공유하지 않습니다.',
    h3: '3. 광고',
    s3a: '',
    s3b: ' 앱의 무료 버전은 Google AdMob을 통해 광고를 표시할 수 있습니다. 앱을 처음 실행하면 맞춤형 광고에 대한 귀하의 동의를 요청합니다. 활성 구독이 있는 사용자에게는 광고가 표시되지 않습니다. 앱 내 설정 → 개인정보 보호에서 동의를 철회할 수 있습니다.',
    h4: '4. 제3자 서비스',
    h5: '5. 아동',
    s5a: '',
    s5b: ' 앱은 만 13세 미만의 아동을 대상으로 하지 않습니다. 당사는 고의로 아동의 데이터를 수집하지 않습니다.',
    h6: '6. 귀하의 권리',
    s6a: '귀하는 다음 주소로 연락하여 귀하의 데이터(계정 포함)에 대한 접근, 정정 또는 삭제를 요청할 수 있습니다:',
    s6b: '.',
    h7: '7. 변경 사항',
    s7: '당사는 언제든지 본 방침을 업데이트할 수 있습니다. 최종 업데이트 날짜는 항상 본 문서 상단에 표시됩니다.',
    h8: '8. 문의',
  },
  pl: {
    lastUpdated: 'Ostatnia aktualizacja: marzec 2025',
    titleWord: 'Polityka prywatności',
    intro_a: 'Niniejsza polityka prywatności opisuje, w jaki sposób ',
    intro_b: ' gromadzi, wykorzystuje i chroni informacje związane z aplikacją ',
    fullPrivacyText: 'Pełna polityka prywatności studia jest dostępna pod adresem',
    fullPrivacyLink: 'myappcube.com/privacy',
    h1: '1. Informacje, które gromadzimy',
    li1accountBold: 'Konto:',
    li1account: ' jeśli utworzą Państwo konto, przechowujemy Państwa adres e-mail za pośrednictwem Firebase Authentication (Google). Dane te są wykorzystywane wyłącznie do zarządzania sesją i subskrypcją.',
    li1subBold: 'Subskrypcja:',
    li1sub_a: ' jeśli wykupią Państwo plan premium, otrzymujemy potwierdzenie statusu subskrypcji z Google Play',
    li1sub_ios: ' lub App Store',
    li1sub_b: '. Nie przechowujemy danych płatniczych.',
    li1usageBold: 'Dane o użytkowaniu:',
    li1usage: ' anonimowe i zagregowane informacje o sposobie korzystania z aplikacji (sesje, błędy techniczne), które nie pozwalają na identyfikację Państwa osoby.',
    h2: '2. Informacje, których NIE gromadzimy',
    li2_1: 'Treść sesji gry (słowa, głosy, wyniki) nie jest przechowywana na żadnym serwerze.',
    li2_2: 'Nie gromadzimy Państwa imienia i nazwiska, lokalizacji ani danych kontaktowych bez Państwa zgody.',
    li2_3: 'Nie udostępniamy Państwa danych podmiotom zewnętrznym w celach marketingu bezpośredniego.',
    h3: '3. Reklamy',
    s3a: 'Bezpłatna wersja aplikacji ',
    s3b: ' może wyświetlać reklamy za pośrednictwem Google AdMob. Przy pierwszym uruchomieniu aplikacji prosimy o Państwa zgodę na reklamy spersonalizowane. Użytkownicy z aktywną subskrypcją nie widzą reklam. Mogą Państwo wycofać zgodę w aplikacji w sekcji Ustawienia → Prywatność.',
    h4: '4. Usługi podmiotów zewnętrznych',
    h5: '5. Dzieci',
    s5a: 'Aplikacja ',
    s5b: ' nie jest skierowana do dzieci poniżej 13. roku życia. Nie gromadzimy świadomie danych od dzieci.',
    h6: '6. Państwa prawa',
    s6a: 'Mogą Państwo zażądać dostępu do swoich danych, ich sprostowania lub usunięcia (w tym konta), pisząc do nas na adres',
    s6b: '.',
    h7: '7. Zmiany',
    s7: 'Możemy w dowolnym momencie aktualizować niniejszą politykę. Data ostatniej aktualizacji będzie zawsze podana na początku tego dokumentu.',
    h8: '8. Kontakt',
  },
  nl: {
    lastUpdated: 'Laatst bijgewerkt: maart 2025',
    titleWord: 'Privacybeleid',
    intro_a: 'Dit privacybeleid beschrijft hoe ',
    intro_b: ' informatie verzamelt, gebruikt en beschermt met betrekking tot de applicatie ',
    fullPrivacyText: 'Zie voor het volledige privacybeleid van de studio',
    fullPrivacyLink: 'myappcube.com/privacy',
    h1: '1. Informatie die we verzamelen',
    li1accountBold: 'Account:',
    li1account: ' als u een account aanmaakt, slaan we uw e-mailadres op via Firebase Authentication (Google). Deze gegevens worden uitsluitend gebruikt om uw sessie en abonnement te beheren.',
    li1subBold: 'Abonnement:',
    li1sub_a: ' als u een premiumabonnement aanschaft, ontvangen we een bevestiging van uw abonnementsstatus van Google Play',
    li1sub_ios: ' of de App Store',
    li1sub_b: '. We slaan geen betalingsgegevens op.',
    li1usageBold: 'Gebruiksgegevens:',
    li1usage: ' anonieme en geaggregeerde informatie over hoe de app wordt gebruikt (sessies, technische fouten), zonder u persoonlijk te identificeren.',
    h2: '2. Informatie die we NIET verzamelen',
    li2_1: 'De inhoud van spelsessies (woorden, stemmen, resultaten) wordt op geen enkele server opgeslagen.',
    li2_2: 'We verzamelen uw naam, locatie of contactgegevens niet zonder uw toestemming.',
    li2_3: 'We delen uw gegevens niet met derden voor directe reclamedoeleinden.',
    h3: '3. Advertenties',
    s3a: 'De gratis versie van ',
    s3b: ' kan advertenties weergeven via Google AdMob. Wanneer u de app voor het eerst opstart, vragen we uw toestemming voor gepersonaliseerde advertenties. Gebruikers met een actief abonnement zien geen advertenties. U kunt uw toestemming intrekken via Instellingen → Privacy in de app.',
    h4: '4. Diensten van derden',
    h5: '5. Kinderen',
    s5a: '',
    s5b: ' is niet gericht op kinderen jonger dan 13 jaar. We verzamelen niet bewust gegevens van kinderen.',
    h6: '6. Uw rechten',
    s6a: 'U kunt verzoeken om inzage in, correctie of verwijdering van uw gegevens (inclusief uw account) door ons te schrijven via',
    s6b: '.',
    h7: '7. Wijzigingen',
    s7: 'We kunnen dit beleid op elk moment bijwerken. De datum van de laatste update wordt altijd bovenaan dit document vermeld.',
    h8: '8. Contact',
  },
  ru: {
    lastUpdated: 'Последнее обновление: март 2025 г.',
    titleWord: 'Политика конфиденциальности',
    intro_a: 'В настоящей политике конфиденциальности описывается, как ',
    intro_b: ' собирает, использует и защищает информацию, связанную с приложением ',
    fullPrivacyText: 'С полной политикой конфиденциальности студии можно ознакомиться по адресу',
    fullPrivacyLink: 'myappcube.com/privacy',
    h1: '1. Информация, которую мы собираем',
    li1accountBold: 'Учетная запись:',
    li1account: ' если вы создаете учетную запись, мы храним ваш адрес электронной почты посредством Firebase Authentication (Google). Эти данные используются исключительно для управления вашим сеансом и подпиской.',
    li1subBold: 'Подписка:',
    li1sub_a: ' если вы приобретаете премиум-план, мы получаем подтверждение статуса вашей подписки от Google Play',
    li1sub_ios: ' или App Store',
    li1sub_b: '. Мы не храним платежные данные.',
    li1usageBold: 'Данные об использовании:',
    li1usage: ' анонимная и обобщенная информация об использовании приложения (сеансы, технические ошибки), не позволяющая установить вашу личность.',
    h2: '2. Информация, которую мы НЕ собираем',
    li2_1: 'Содержимое игровых сеансов (слова, голоса, результаты) не хранится ни на одном сервере.',
    li2_2: 'Мы не собираем ваше имя, местоположение или контактные данные без вашего согласия.',
    li2_3: 'Мы не передаем ваши данные третьим лицам в целях прямой рекламы.',
    h3: '3. Реклама',
    s3a: 'Бесплатная версия ',
    s3b: ' может показывать рекламу через Google AdMob. При первом запуске приложения мы запрашиваем ваше согласие на персонализированную рекламу. Пользователи с активной подпиской не видят рекламу. Вы можете отозвать свое согласие в разделе Настройки → Конфиденциальность в приложении.',
    h4: '4. Сторонние сервисы',
    h5: '5. Дети',
    s5a: 'Приложение ',
    s5b: ' не предназначено для детей младше 13 лет. Мы сознательно не собираем данные детей.',
    h6: '6. Ваши права',
    s6a: 'Вы можете запросить доступ к своим данным, их исправление или удаление (включая вашу учетную запись), написав нам по адресу',
    s6b: '.',
    h7: '7. Изменения',
    s7: 'Мы можем обновлять настоящую политику в любое время. Дата последнего обновления всегда указывается в начале этого документа.',
    h8: '8. Контакты',
  },
  id: {
    lastUpdated: 'Terakhir diperbarui: Maret 2025',
    titleWord: 'Kebijakan Privasi',
    intro_a: 'Kebijakan privasi ini menjelaskan bagaimana ',
    intro_b: ' mengumpulkan, menggunakan, dan melindungi informasi yang terkait dengan aplikasi ',
    fullPrivacyText: 'Untuk kebijakan privasi studio selengkapnya, lihat',
    fullPrivacyLink: 'myappcube.com/privacy',
    h1: '1. Informasi yang Kami Kumpulkan',
    li1accountBold: 'Akun:',
    li1account: ' jika Anda membuat akun, kami menyimpan alamat email Anda melalui Firebase Authentication (Google). Data ini digunakan secara eksklusif untuk mengelola sesi dan langganan Anda.',
    li1subBold: 'Langganan:',
    li1sub_a: ' jika Anda membeli paket premium, kami menerima konfirmasi status langganan Anda dari Google Play',
    li1sub_ios: ' atau App Store',
    li1sub_b: '. Kami tidak menyimpan data pembayaran.',
    li1usageBold: 'Data penggunaan:',
    li1usage: ' informasi anonim dan agregat tentang cara aplikasi digunakan (sesi, kesalahan teknis), tanpa mengidentifikasi Anda secara pribadi.',
    h2: '2. Informasi yang TIDAK Kami Kumpulkan',
    li2_1: 'Konten sesi permainan (kata, suara, hasil) tidak disimpan di server mana pun.',
    li2_2: 'Kami tidak mengumpulkan nama, lokasi, atau detail kontak Anda tanpa persetujuan Anda.',
    li2_3: 'Kami tidak membagikan data Anda kepada pihak ketiga untuk tujuan iklan langsung.',
    h3: '3. Iklan',
    s3a: 'Versi gratis ',
    s3b: ' dapat menampilkan iklan melalui Google AdMob. Saat Anda pertama kali meluncurkan aplikasi, kami meminta persetujuan Anda untuk iklan yang dipersonalisasi. Pengguna dengan langganan aktif tidak melihat iklan. Anda dapat menarik persetujuan Anda di Pengaturan → Privasi di dalam aplikasi.',
    h4: '4. Layanan Pihak Ketiga',
    h5: '5. Anak-Anak',
    s5a: '',
    s5b: ' tidak ditujukan untuk anak-anak di bawah usia 13 tahun. Kami tidak dengan sengaja mengumpulkan data dari anak-anak.',
    h6: '6. Hak-Hak Anda',
    s6a: 'Anda dapat meminta akses, perbaikan, atau penghapusan data Anda (termasuk akun Anda) dengan mengirimkan surat kepada kami di',
    s6b: '.',
    h7: '7. Perubahan',
    s7: 'Kami dapat memperbarui kebijakan ini kapan saja. Tanggal pembaruan terakhir akan selalu ditampilkan di bagian atas dokumen ini.',
    h8: '8. Kontak',
  },
  vi: {
    lastUpdated: 'Cập nhật lần cuối: tháng 3 năm 2025',
    titleWord: 'Chính sách quyền riêng tư',
    intro_a: 'Chính sách quyền riêng tư này mô tả cách ',
    intro_b: ' thu thập, sử dụng và bảo vệ thông tin liên quan đến ứng dụng ',
    fullPrivacyText: 'Để xem toàn bộ chính sách quyền riêng tư của studio, vui lòng truy cập',
    fullPrivacyLink: 'myappcube.com/privacy',
    h1: '1. Thông tin chúng tôi thu thập',
    li1accountBold: 'Tài khoản:',
    li1account: ' nếu bạn tạo tài khoản, chúng tôi lưu trữ địa chỉ email của bạn thông qua Firebase Authentication (Google). Dữ liệu này chỉ được sử dụng để quản lý phiên đăng nhập và gói đăng ký của bạn.',
    li1subBold: 'Gói đăng ký:',
    li1sub_a: ' nếu bạn mua gói cao cấp, chúng tôi nhận được xác nhận về trạng thái gói đăng ký của bạn từ Google Play',
    li1sub_ios: ' hoặc App Store',
    li1sub_b: '. Chúng tôi không lưu trữ dữ liệu thanh toán.',
    li1usageBold: 'Dữ liệu sử dụng:',
    li1usage: ' thông tin ẩn danh và tổng hợp về cách ứng dụng được sử dụng (phiên sử dụng, lỗi kỹ thuật), không nhận dạng cá nhân bạn.',
    h2: '2. Thông tin chúng tôi KHÔNG thu thập',
    li2_1: 'Nội dung ván chơi (từ khóa, phiếu bầu, kết quả) không được lưu trữ trên bất kỳ máy chủ nào.',
    li2_2: 'Chúng tôi không thu thập tên, vị trí hoặc thông tin liên hệ của bạn khi chưa có sự đồng ý của bạn.',
    li2_3: 'Chúng tôi không chia sẻ dữ liệu của bạn với bên thứ ba cho mục đích quảng cáo trực tiếp.',
    h3: '3. Quảng cáo',
    s3a: 'Phiên bản miễn phí của ',
    s3b: ' có thể hiển thị quảng cáo thông qua Google AdMob. Khi bạn khởi chạy ứng dụng lần đầu tiên, chúng tôi sẽ yêu cầu sự đồng ý của bạn đối với quảng cáo được cá nhân hóa. Người dùng có gói đăng ký đang hoạt động sẽ không thấy quảng cáo. Bạn có thể rút lại sự đồng ý trong Cài đặt → Quyền riêng tư trong ứng dụng.',
    h4: '4. Dịch vụ của bên thứ ba',
    h5: '5. Trẻ em',
    s5a: '',
    s5b: ' không dành cho trẻ em dưới 13 tuổi. Chúng tôi không cố ý thu thập dữ liệu từ trẻ em.',
    h6: '6. Quyền của bạn',
    s6a: 'Bạn có thể yêu cầu truy cập, chỉnh sửa hoặc xóa dữ liệu của mình (bao gồm cả tài khoản) bằng cách gửi thư cho chúng tôi theo địa chỉ',
    s6b: '.',
    h7: '7. Thay đổi',
    s7: 'Chúng tôi có thể cập nhật chính sách này bất cứ lúc nào. Ngày cập nhật lần cuối sẽ luôn được hiển thị ở đầu tài liệu này.',
    h8: '8. Liên hệ',
  },
  th: {
    lastUpdated: 'อัปเดตล่าสุด: มีนาคม 2025',
    titleWord: 'นโยบายความเป็นส่วนตัว',
    intro_a: 'นโยบายความเป็นส่วนตัวนี้อธิบายถึงวิธีที่ ',
    intro_b: ' เก็บรวบรวม ใช้ และปกป้องข้อมูลที่เกี่ยวข้องกับแอปพลิเคชัน ',
    fullPrivacyText: 'สำหรับนโยบายความเป็นส่วนตัวฉบับเต็มของสตูดิโอ โปรดดูที่',
    fullPrivacyLink: 'myappcube.com/privacy',
    h1: '1. ข้อมูลที่เราเก็บรวบรวม',
    li1accountBold: 'บัญชี:',
    li1account: ' หากคุณสร้างบัญชี เราจะจัดเก็บที่อยู่อีเมลของคุณผ่าน Firebase Authentication (Google) ข้อมูลนี้ใช้เพื่อจัดการเซสชันและการสมัครสมาชิกของคุณเท่านั้น',
    li1subBold: 'การสมัครสมาชิก:',
    li1sub_a: ' หากคุณซื้อแผนพรีเมียม เราจะได้รับการยืนยันสถานะการสมัครสมาชิกของคุณจาก Google Play',
    li1sub_ios: ' หรือ App Store',
    li1sub_b: ' เราไม่จัดเก็บข้อมูลการชำระเงิน',
    li1usageBold: 'ข้อมูลการใช้งาน:',
    li1usage: ' ข้อมูลแบบไม่ระบุตัวตนและข้อมูลโดยรวมเกี่ยวกับวิธีการใช้งานแอป (เซสชัน ข้อผิดพลาดทางเทคนิค) โดยไม่ระบุตัวตนของคุณ',
    h2: '2. ข้อมูลที่เราไม่เก็บรวบรวม',
    li2_1: 'เนื้อหาของเซสชันเกม (คำ การโหวต ผลลัพธ์) จะไม่ถูกจัดเก็บไว้บนเซิร์ฟเวอร์ใด ๆ',
    li2_2: 'เราไม่เก็บรวบรวมชื่อ ตำแหน่งที่ตั้ง หรือข้อมูลติดต่อของคุณโดยไม่ได้รับความยินยอมจากคุณ',
    li2_3: 'เราไม่แบ่งปันข้อมูลของคุณกับบุคคลที่สามเพื่อวัตถุประสงค์ในการโฆษณาโดยตรง',
    h3: '3. การโฆษณา',
    s3a: 'เวอร์ชันฟรีของ ',
    s3b: ' อาจแสดงโฆษณาผ่าน Google AdMob เมื่อคุณเปิดแอปครั้งแรก เราจะขอความยินยอมจากคุณสำหรับโฆษณาที่ปรับให้เหมาะกับคุณ ผู้ใช้ที่มีการสมัครสมาชิกที่ใช้งานอยู่จะไม่เห็นโฆษณา คุณสามารถถอนความยินยอมได้ที่ การตั้งค่า → ความเป็นส่วนตัว ภายในแอป',
    h4: '4. บริการของบุคคลที่สาม',
    h5: '5. เด็ก',
    s5a: '',
    s5b: ' ไม่ได้มุ่งเป้าไปที่เด็กอายุต่ำกว่า 13 ปี เราไม่เก็บรวบรวมข้อมูลจากเด็กโดยเจตนา',
    h6: '6. สิทธิของคุณ',
    s6a: 'คุณสามารถขอเข้าถึง แก้ไข หรือลบข้อมูลของคุณ (รวมถึงบัญชีของคุณ) ได้โดยเขียนถึงเราที่',
    s6b: '',
    h7: '7. การเปลี่ยนแปลง',
    s7: 'เราอาจอัปเดตนโยบายนี้ได้ตลอดเวลา วันที่อัปเดตล่าสุดจะแสดงไว้ที่ด้านบนของเอกสารนี้เสมอ',
    h8: '8. ติดต่อเรา',
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
