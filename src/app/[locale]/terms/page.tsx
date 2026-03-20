import type { Metadata } from 'next';
import LegalLayout from '@/components/ui/LegalLayout';
import { studio } from '@/config/studio';

export const metadata: Metadata = {
  title: 'Terms of Service — myappcube',
  description: 'Terms of service for myappcube and its mobile apps.',
};

type T = {
  title: string;
  lastUpdated: string;
  intro: string;
  h1: string; s1: string;
  h2: string; s2intro: string;
  li2_1: string; li2_2: string;
  li2_3: string; li2_4: string; li2_5: string; li2_6: string;
  h3: string; s3: string;
  h4: string; s4intro: string;
  li4_1: string; li4_2: string; li4_3: string; li4_4: string;
  h5: string; s5: string;
  h6: string; s6: string;
  h7: string; s7: string;
  h8: string; s8: string;
  h9: string; s9: string;
  h10: string; s10: string;
  h11: string; s11: string;
  revenuecatTerms: string;
};

const translations: Record<string, T> = {
  es: {
    title: 'Términos de uso',
    lastUpdated: 'Última actualización: marzo 2026',
    intro: 'Al descargar, instalar o usar cualquier aplicación de myappcube, o al navegar por este sitio web, aceptas los siguientes términos. Si no estás de acuerdo, por favor no uses nuestros productos.',
    h1: '1. Cuentas de usuario',
    s1: 'Al abrir la app por primera vez, se te asigna automáticamente un identificador de sesión anónimo. Si decides crear una cuenta para acceder a funciones adicionales, puedes hacerlo mediante correo electrónico y contraseña, Google Sign-In o Sign in with Apple. Eres responsable de mantener la confidencialidad de tus credenciales y de todas las actividades que ocurran bajo tu cuenta. Notifícanos de inmediato ante cualquier uso no autorizado.',
    h2: '2. Suscripciones y pagos',
    s2intro: 'Algunas apps ofrecen planes de suscripción con acceso a funciones premium. Al suscribirte:',
    li2_1: 'El pago se procesa a través de Google Play (Android) o la App Store (iOS), según la plataforma que uses. Cada tienda aplica sus propios términos y condiciones de pago.',
    li2_2: 'La gestión del estado de suscripción se realiza mediante RevenueCat. Al suscribirte aceptas también sus términos de servicio.',
    li2_3: 'Las suscripciones se renuevan automáticamente al final de cada período, salvo que las canceles antes de la fecha de renovación.',
    li2_4: 'Android: puedes cancelar desde la configuración de tu cuenta en Google Play → Suscripciones.',
    li2_5: 'iOS: puedes cancelar desde Configuración → [tu nombre] → Suscripciones.',
    li2_6: 'La cancelación tiene efecto al final del período de facturación vigente. No realizamos reembolsos por períodos parciales, salvo que la ley aplicable lo requiera.',
    h3: '3. Publicidad',
    s3: 'Nuestras apps gratuitas pueden mostrar anuncios a través de Google AdMob: banners, intersticiales (al finalizar partidas) y anuncios recompensados (que el usuario puede ver voluntariamente para desbloquear contenido premium de forma temporal). Los usuarios con suscripción activa disfrutan de una experiencia sin anuncios, según lo indicado en cada app.',
    h4: '4. Uso permitido',
    s4intro: 'Nuestras apps y sitio web son para uso personal y no comercial. Queda prohibido:',
    li4_1: 'Copiar, modificar o distribuir nuestro contenido sin autorización.',
    li4_2: 'Realizar ingeniería inversa sobre nuestras aplicaciones.',
    li4_3: 'Usar los servicios para actividades ilegales o que perjudiquen a terceros.',
    li4_4: 'Intentar acceder a sistemas o datos no autorizados.',
    h5: '5. Propiedad intelectual',
    s5: 'Todo el contenido de este sitio y de nuestras apps — incluyendo nombre, logo, diseños, código, gráficos y textos — es propiedad de myappcube y está protegido por las leyes de propiedad intelectual aplicables.',
    h6: '6. Disponibilidad del servicio',
    s6: 'Nos reservamos el derecho de modificar, suspender o discontinuar cualquier app o función en cualquier momento, sin previo aviso. No nos hacemos responsables por interrupciones del servicio.',
    h7: '7. Limitación de responsabilidad',
    s7: 'myappcube no será responsable por daños directos, indirectos, incidentales o consecuentes derivados del uso o la imposibilidad de uso de nuestras apps o sitio web. Nuestros productos se ofrecen «tal cual», sin garantías de ningún tipo.',
    h8: '8. Menores de edad',
    s8: 'Nuestras apps están diseñadas para mayores de 13 años. Los menores deben contar con la supervisión y autorización de sus padres o tutores para usarlas o realizar compras.',
    h9: '9. Modificaciones',
    s9: 'Podemos actualizar estos términos en cualquier momento. La fecha de última actualización estará siempre indicada al inicio del documento. El uso continuado de nuestros productos implica la aceptación de los términos vigentes.',
    h10: '10. Ley aplicable',
    s10: 'Estos términos se rigen por las leyes de la República Argentina. Cualquier disputa se resolverá ante los tribunales competentes de dicha jurisdicción.',
    h11: '11. Contacto',
    s11: 'Para consultas sobre estos términos, puedes escribirnos a',
    revenuecatTerms: 'términos de servicio',
  },
  en: {
    title: 'Terms of Service',
    lastUpdated: 'Last updated: March 2026',
    intro: 'By downloading, installing, or using any myappcube application, or by browsing this website, you agree to the following terms. If you do not agree, please do not use our products.',
    h1: '1. User Accounts',
    s1: 'When you open the app for the first time, an anonymous session identifier is automatically assigned to your device. If you choose to create an account to access additional features, you can do so via email and password, Google Sign-In, or Sign in with Apple. You are responsible for maintaining the confidentiality of your credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use.',
    h2: '2. Subscriptions and Payments',
    s2intro: 'Some apps offer subscription plans with access to premium features. By subscribing:',
    li2_1: 'Payment is processed through Google Play (Android) or the App Store (iOS), depending on your platform. Each store applies its own payment terms and conditions.',
    li2_2: 'Subscription status management is handled by RevenueCat. By subscribing you also agree to their Terms of Service.',
    li2_3: 'Subscriptions automatically renew at the end of each billing period unless cancelled before the renewal date.',
    li2_4: 'Android: cancel from your Google Play account settings → Subscriptions.',
    li2_5: 'iOS: cancel from Settings → [your name] → Subscriptions.',
    li2_6: 'Cancellation takes effect at the end of the current billing period. We do not offer refunds for partial periods, except where required by applicable law.',
    h3: '3. Advertising',
    s3: 'Our free apps may display ads through Google AdMob: banners, interstitials (shown when a game ends), and rewarded ads (which users can voluntarily watch to temporarily unlock premium content). Users with an active subscription enjoy an ad-free experience, as indicated in each app.',
    h4: '4. Permitted Use',
    s4intro: 'Our apps and website are for personal, non-commercial use only. You may not:',
    li4_1: 'Copy, modify, or distribute our content without authorization.',
    li4_2: 'Reverse-engineer our applications.',
    li4_3: 'Use our services for illegal activities or to harm others.',
    li4_4: 'Attempt to access unauthorized systems or data.',
    h5: '5. Intellectual Property',
    s5: 'All content on this site and in our apps — including the name, logo, designs, code, graphics, and text — is the property of myappcube and is protected by applicable intellectual property laws.',
    h6: '6. Service Availability',
    s6: 'We reserve the right to modify, suspend, or discontinue any app or feature at any time without prior notice. We are not responsible for service interruptions.',
    h7: '7. Limitation of Liability',
    s7: 'myappcube shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use our apps or website. Our products are provided "as is," without warranties of any kind.',
    h8: '8. Minors',
    s8: 'Our apps are intended for users aged 13 and older. Minors must have parental or guardian supervision and consent to use our apps or make purchases.',
    h9: '9. Modifications',
    s9: 'We may update these terms at any time. The last updated date will always be shown at the top of this document. Continued use of our products implies acceptance of the current terms.',
    h10: '10. Governing Law',
    s10: 'These terms are governed by the laws of the Republic of Argentina. Any disputes shall be resolved before the competent courts of that jurisdiction.',
    h11: '11. Contact',
    s11: 'For questions about these terms, you can reach us at',
    revenuecatTerms: 'Terms of Service',
  },
  pt: {
    title: 'Termos de Uso',
    lastUpdated: 'Última atualização: março de 2026',
    intro: 'Ao baixar, instalar ou usar qualquer aplicativo da myappcube, ou ao navegar neste site, você concorda com os seguintes termos. Caso não concorde, por favor não use nossos produtos.',
    h1: '1. Contas de usuário',
    s1: 'Ao abrir o aplicativo pela primeira vez, um identificador de sessão anônimo é atribuído automaticamente ao seu dispositivo. Se você optar por criar uma conta para acessar recursos adicionais, pode fazê-lo por e-mail e senha, Google Sign-In ou Sign in with Apple. Você é responsável pela confidencialidade de suas credenciais e por todas as atividades realizadas em sua conta. Notifique-nos imediatamente em caso de uso não autorizado.',
    h2: '2. Assinaturas e pagamentos',
    s2intro: 'Alguns aplicativos oferecem planos de assinatura com acesso a recursos premium. Ao assinar:',
    li2_1: 'O pagamento é processado pelo Google Play (Android) ou pela App Store (iOS), conforme a plataforma utilizada. Cada loja aplica seus próprios termos e condições de pagamento.',
    li2_2: 'O gerenciamento do status da assinatura é realizado pelo RevenueCat. Ao assinar, você também concorda com os Termos de Serviço do RevenueCat.',
    li2_3: 'As assinaturas se renovam automaticamente ao final de cada período, salvo cancelamento antes da data de renovação.',
    li2_4: 'Android: cancele nas configurações da sua conta no Google Play → Assinaturas.',
    li2_5: 'iOS: cancele em Configurações → [seu nome] → Assinaturas.',
    li2_6: 'O cancelamento entra em vigor no final do período de faturamento vigente. Não realizamos reembolsos por períodos parciais, salvo exigência legal.',
    h3: '3. Publicidade',
    s3: 'Nossos aplicativos gratuitos podem exibir anúncios via Google AdMob: banners, intersticiais (exibidos ao final de partidas) e anúncios recompensados (que o usuário pode assistir voluntariamente para desbloquear conteúdo premium temporariamente). Usuários com assinatura ativa têm uma experiência sem anúncios, conforme indicado em cada app.',
    h4: '4. Uso permitido',
    s4intro: 'Nossos aplicativos e site são para uso pessoal e não comercial. É proibido:',
    li4_1: 'Copiar, modificar ou distribuir nosso conteúdo sem autorização.',
    li4_2: 'Realizar engenharia reversa nos nossos aplicativos.',
    li4_3: 'Usar os serviços para atividades ilegais ou que prejudiquem terceiros.',
    li4_4: 'Tentar acessar sistemas ou dados não autorizados.',
    h5: '5. Propriedade intelectual',
    s5: 'Todo o conteúdo deste site e de nossos aplicativos — incluindo nome, logotipo, designs, código, gráficos e textos — é propriedade da myappcube e está protegido pelas leis de propriedade intelectual aplicáveis.',
    h6: '6. Disponibilidade do serviço',
    s6: 'Reservamo-nos o direito de modificar, suspender ou descontinuar qualquer aplicativo ou função a qualquer momento, sem aviso prévio. Não nos responsabilizamos por interrupções do serviço.',
    h7: '7. Limitação de responsabilidade',
    s7: 'A myappcube não se responsabiliza por danos diretos, indiretos, incidentais ou consequentes decorrentes do uso ou da impossibilidade de uso de nossos aplicativos ou site. Nossos produtos são fornecidos "no estado em que se encontram", sem garantias de qualquer tipo.',
    h8: '8. Menores de idade',
    s8: 'Nossos aplicativos são destinados a usuários com 13 anos ou mais. Menores devem ter supervisão e autorização dos pais ou responsáveis para usá-los ou realizar compras.',
    h9: '9. Modificações',
    s9: 'Podemos atualizar estes termos a qualquer momento. A data da última atualização sempre estará indicada no início do documento. O uso contínuo de nossos produtos implica a aceitação dos termos vigentes.',
    h10: '10. Lei aplicável',
    s10: 'Estes termos são regidos pelas leis da República Argentina. Qualquer disputa será resolvida perante os tribunais competentes dessa jurisdição.',
    h11: '11. Contato',
    s11: 'Para dúvidas sobre estes termos, entre em contato conosco em',
    revenuecatTerms: 'Termos de Serviço',
  },
  fr: {
    title: "Conditions d'utilisation",
    lastUpdated: 'Dernière mise à jour : mars 2026',
    intro: "En téléchargeant, installant ou utilisant toute application myappcube, ou en naviguant sur ce site web, vous acceptez les conditions suivantes. Si vous n'êtes pas d'accord, veuillez ne pas utiliser nos produits.",
    h1: '1. Comptes utilisateurs',
    s1: "Lorsque vous ouvrez l'application pour la première fois, un identifiant de session anonyme est automatiquement attribué à votre appareil. Si vous souhaitez créer un compte pour accéder à des fonctionnalités supplémentaires, vous pouvez le faire via e-mail et mot de passe, Google Sign-In ou Sign in with Apple. Vous êtes responsable de la confidentialité de vos identifiants et de toutes les activités effectuées sous votre compte. Notifiez-nous immédiatement de tout usage non autorisé.",
    h2: '2. Abonnements et paiements',
    s2intro: "Certaines applications proposent des plans d'abonnement avec accès à des fonctionnalités premium. En souscrivant :",
    li2_1: "Le paiement est traité via Google Play (Android) ou l'App Store (iOS), selon la plateforme utilisée. Chaque boutique applique ses propres conditions générales de paiement.",
    li2_2: "La gestion de l'état de l'abonnement est assurée par RevenueCat. En souscrivant, vous acceptez également leurs Conditions de service.",
    li2_3: "Les abonnements se renouvellent automatiquement à la fin de chaque période, sauf annulation avant la date de renouvellement.",
    li2_4: 'Android : annulez depuis les paramètres de votre compte Google Play → Abonnements.',
    li2_5: 'iOS : annulez depuis Réglages → [votre nom] → Abonnements.',
    li2_6: "L'annulation prend effet à la fin de la période de facturation en cours. Nous ne remboursons pas les périodes partielles, sauf si la loi applicable l'exige.",
    h3: '3. Publicité',
    s3: "Nos applications gratuites peuvent afficher des publicités via Google AdMob : bannières, publicités interstitielles (affichées en fin de partie) et publicités récompensées (que l'utilisateur peut regarder volontairement pour débloquer temporairement du contenu premium). Les utilisateurs avec un abonnement actif bénéficient d'une expérience sans publicité, comme indiqué dans chaque application.",
    h4: '4. Utilisation autorisée',
    s4intro: 'Nos applications et site web sont réservés à un usage personnel et non commercial. Il est interdit de :',
    li4_1: 'Copier, modifier ou distribuer notre contenu sans autorisation.',
    li4_2: 'Effectuer de la rétro-ingénierie sur nos applications.',
    li4_3: 'Utiliser nos services pour des activités illégales ou nuisant à des tiers.',
    li4_4: "Tenter d'accéder à des systèmes ou données non autorisés.",
    h5: '5. Propriété intellectuelle',
    s5: 'Tout le contenu de ce site et de nos applications — incluant le nom, logo, designs, code, graphiques et textes — est la propriété de myappcube et est protégé par les lois applicables en matière de propriété intellectuelle.',
    h6: '6. Disponibilité du service',
    s6: "Nous nous réservons le droit de modifier, suspendre ou interrompre toute application ou fonctionnalité à tout moment, sans préavis. Nous ne sommes pas responsables des interruptions de service.",
    h7: '7. Limitation de responsabilité',
    s7: 'myappcube ne pourra être tenu responsable de tout dommage direct, indirect, accessoire ou consécutif découlant de l\'utilisation ou de l\'impossibilité d\'utiliser nos applications ou ce site web. Nos produits sont fournis « tels quels », sans garantie d\'aucune sorte.',
    h8: '8. Mineurs',
    s8: 'Nos applications sont destinées aux utilisateurs de 13 ans et plus. Les mineurs doivent disposer de la supervision et du consentement de leurs parents ou tuteurs pour utiliser nos applications ou effectuer des achats.',
    h9: '9. Modifications',
    s9: 'Nous pouvons mettre à jour ces conditions à tout moment. La date de dernière mise à jour sera toujours indiquée en haut du document. L\'utilisation continue de nos produits implique l\'acceptation des conditions en vigueur.',
    h10: '10. Loi applicable',
    s10: 'Ces conditions sont régies par les lois de la République Argentine. Tout litige sera résolu devant les tribunaux compétents de cette juridiction.',
    h11: '11. Contact',
    s11: 'Pour toute question sur ces conditions, vous pouvez nous contacter à',
    revenuecatTerms: 'Conditions de service',
  },
  it: {
    title: 'Termini di utilizzo',
    lastUpdated: 'Ultimo aggiornamento: marzo 2026',
    intro: 'Scaricando, installando o utilizzando qualsiasi applicazione di myappcube, o navigando su questo sito web, accetti i seguenti termini. Se non sei d\'accordo, ti preghiamo di non utilizzare i nostri prodotti.',
    h1: '1. Account utente',
    s1: 'Alla prima apertura dell\'app, al tuo dispositivo viene automaticamente assegnato un identificatore di sessione anonimo. Se decidi di creare un account per accedere a funzionalità aggiuntive, puoi farlo tramite e-mail e password, Google Sign-In o Sign in with Apple. Sei responsabile della riservatezza delle tue credenziali e di tutte le attività effettuate con il tuo account. Notificaci immediatamente in caso di utilizzo non autorizzato.',
    h2: '2. Abbonamenti e pagamenti',
    s2intro: 'Alcune app offrono piani di abbonamento con accesso a funzionalità premium. Iscrivendoti:',
    li2_1: 'Il pagamento viene elaborato tramite Google Play (Android) o l\'App Store (iOS), a seconda della piattaforma. Ogni negozio applica le proprie condizioni di pagamento.',
    li2_2: 'La gestione dello stato dell\'abbonamento è affidata a RevenueCat. Iscrivendoti accetti anche i loro Termini di servizio.',
    li2_3: 'Gli abbonamenti si rinnovano automaticamente alla fine di ogni periodo, salvo cancellazione prima della data di rinnovo.',
    li2_4: 'Android: annulla dalle impostazioni del tuo account Google Play → Abbonamenti.',
    li2_5: 'iOS: annulla da Impostazioni → [tuo nome] → Abbonamenti.',
    li2_6: 'La cancellazione ha effetto alla fine del periodo di fatturazione corrente. Non effettuiamo rimborsi per periodi parziali, salvo quanto richiesto dalla legge applicabile.',
    h3: '3. Pubblicità',
    s3: 'Le nostre app gratuite possono mostrare annunci tramite Google AdMob: banner, annunci interstitial (mostrati al termine di una partita) e annunci con premio (che l\'utente può guardare volontariamente per sbloccare temporaneamente contenuti premium). Gli utenti con abbonamento attivo godono di un\'esperienza senza pubblicità, come indicato in ogni app.',
    h4: '4. Uso consentito',
    s4intro: 'Le nostre app e il sito web sono destinati a uso personale e non commerciale. È vietato:',
    li4_1: 'Copiare, modificare o distribuire i nostri contenuti senza autorizzazione.',
    li4_2: 'Eseguire il reverse engineering delle nostre applicazioni.',
    li4_3: 'Utilizzare i servizi per attività illegali o che danneggino terzi.',
    li4_4: 'Tentare di accedere a sistemi o dati non autorizzati.',
    h5: '5. Proprietà intellettuale',
    s5: 'Tutti i contenuti di questo sito e delle nostre app — inclusi nome, logo, design, codice, grafica e testi — sono di proprietà di myappcube e sono protetti dalle leggi sulla proprietà intellettuale applicabili.',
    h6: '6. Disponibilità del servizio',
    s6: 'Ci riserviamo il diritto di modificare, sospendere o interrompere qualsiasi app o funzionalità in qualsiasi momento, senza preavviso. Non siamo responsabili per interruzioni del servizio.',
    h7: '7. Limitazione di responsabilità',
    s7: 'myappcube non sarà responsabile per danni diretti, indiretti, incidentali o consequenziali derivanti dall\'uso o dall\'impossibilità di utilizzare le nostre app o il sito web. I nostri prodotti sono forniti "così com\'è", senza garanzie di alcun tipo.',
    h8: '8. Minori',
    s8: 'Le nostre app sono destinate a utenti di età pari o superiore a 13 anni. I minori devono avere la supervisione e il consenso dei genitori o tutori per utilizzarle o effettuare acquisti.',
    h9: '9. Modifiche',
    s9: 'Possiamo aggiornare questi termini in qualsiasi momento. La data dell\'ultimo aggiornamento sarà sempre indicata all\'inizio del documento. L\'uso continuato dei nostri prodotti implica l\'accettazione dei termini vigenti.',
    h10: '10. Legge applicabile',
    s10: 'Questi termini sono disciplinati dalle leggi della Repubblica Argentina. Qualsiasi controversia sarà risolta dinanzi ai tribunali competenti di tale giurisdizione.',
    h11: '11. Contatto',
    s11: 'Per domande su questi termini, puoi scriverci a',
    revenuecatTerms: 'Termini di servizio',
  },
  de: {
    title: 'Nutzungsbedingungen',
    lastUpdated: 'Zuletzt aktualisiert: März 2026',
    intro: 'Durch das Herunterladen, Installieren oder Verwenden einer myappcube-Anwendung oder durch das Surfen auf dieser Website stimmen Sie den folgenden Bedingungen zu. Wenn Sie nicht zustimmen, verwenden Sie unsere Produkte bitte nicht.',
    h1: '1. Benutzerkonten',
    s1: 'Beim ersten Öffnen der App wird Ihrem Gerät automatisch ein anonymer Sitzungsbezeichner zugewiesen. Wenn Sie ein Konto erstellen möchten, um auf zusätzliche Funktionen zuzugreifen, können Sie dies per E-Mail und Passwort, Google Sign-In oder Sign in with Apple tun. Sie sind für die Vertraulichkeit Ihrer Zugangsdaten und alle unter Ihrem Konto durchgeführten Aktivitäten verantwortlich. Benachrichtigen Sie uns umgehend bei unbefugter Nutzung.',
    h2: '2. Abonnements und Zahlungen',
    s2intro: 'Einige Apps bieten Abonnementpläne mit Zugang zu Premium-Funktionen an. Bei einem Abonnement:',
    li2_1: 'Die Zahlung erfolgt über Google Play (Android) oder den App Store (iOS), je nach verwendeter Plattform. Jeder Store wendet seine eigenen Zahlungsbedingungen an.',
    li2_2: 'Die Verwaltung des Abonnementstatus erfolgt über RevenueCat. Durch die Anmeldung stimmen Sie auch deren Nutzungsbedingungen zu.',
    li2_3: 'Abonnements verlängern sich am Ende jedes Zeitraums automatisch, sofern sie nicht vor dem Verlängerungsdatum gekündigt werden.',
    li2_4: 'Android: kündigen Sie über Ihr Google Play-Konto → Abonnements.',
    li2_5: 'iOS: kündigen Sie über Einstellungen → [Ihr Name] → Abonnements.',
    li2_6: 'Die Kündigung tritt am Ende des aktuellen Abrechnungszeitraums in Kraft. Wir erstatten keine anteiligen Zeiträume, es sei denn, dies ist gesetzlich vorgeschrieben.',
    h3: '3. Werbung',
    s3: 'Unsere kostenlosen Apps können Werbung über Google AdMob schalten: Banner, Interstitials (nach Spielende) und Belohnungswerbung (die Nutzer freiwillig ansehen können, um Premium-Inhalte vorübergehend freizuschalten). Nutzer mit einem aktiven Abonnement genießen eine werbefreie Erfahrung, wie in der jeweiligen App angegeben.',
    h4: '4. Erlaubte Nutzung',
    s4intro: 'Unsere Apps und diese Website sind ausschließlich für den persönlichen, nicht kommerziellen Gebrauch bestimmt. Es ist nicht gestattet:',
    li4_1: 'Unsere Inhalte ohne Genehmigung zu kopieren, zu ändern oder zu verbreiten.',
    li4_2: 'Reverse Engineering unserer Anwendungen durchzuführen.',
    li4_3: 'Unsere Dienste für illegale Aktivitäten oder zur Schädigung Dritter zu nutzen.',
    li4_4: 'Zu versuchen, auf nicht autorisierte Systeme oder Daten zuzugreifen.',
    h5: '5. Geistiges Eigentum',
    s5: 'Alle Inhalte dieser Website und unserer Apps — einschließlich Name, Logo, Designs, Code, Grafiken und Texte — sind Eigentum von myappcube und durch das geltende Recht zum Schutz des geistigen Eigentums geschützt.',
    h6: '6. Dienstverfügbarkeit',
    s6: 'Wir behalten uns das Recht vor, jede App oder Funktion jederzeit ohne vorherige Ankündigung zu ändern, auszusetzen oder einzustellen. Wir haften nicht für Dienstunterbrechungen.',
    h7: '7. Haftungsbeschränkung',
    s7: 'myappcube haftet nicht für direkte, indirekte, zufällige oder Folgeschäden, die aus der Nutzung oder Nichtnutzbarkeit unserer Apps oder dieser Website entstehen. Unsere Produkte werden ohne Mängelgewähr und ohne jegliche Garantien bereitgestellt.',
    h8: '8. Minderjährige',
    s8: 'Unsere Apps sind für Benutzer ab 13 Jahren bestimmt. Minderjährige benötigen die Aufsicht und Zustimmung ihrer Eltern oder Erziehungsberechtigten, um unsere Apps zu nutzen oder Käufe zu tätigen.',
    h9: '9. Änderungen',
    s9: 'Wir können diese Bedingungen jederzeit aktualisieren. Das Datum der letzten Aktualisierung wird stets am Anfang des Dokuments angegeben. Die weitere Nutzung unserer Produkte gilt als Zustimmung zu den jeweils geltenden Bedingungen.',
    h10: '10. Anwendbares Recht',
    s10: 'Diese Bedingungen unterliegen dem Recht der Republik Argentinien. Streitigkeiten werden vor den zuständigen Gerichten dieser Jurisdiktion entschieden.',
    h11: '11. Kontakt',
    s11: 'Bei Fragen zu diesen Bedingungen können Sie uns unter folgender Adresse kontaktieren:',
    revenuecatTerms: 'Nutzungsbedingungen',
  },
};

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = translations[locale] ?? translations.en;

  return (
    <LegalLayout title={t.title} lastUpdated={t.lastUpdated}>
      <p>{t.intro}</p>

      <h2>{t.h1}</h2>
      <p>{t.s1}</p>

      <h2>{t.h2}</h2>
      <p>{t.s2intro}</p>
      <ul>
        <li>{t.li2_1}</li>
        <li>
          {t.li2_2.split('RevenueCat')[0]}
          <strong>RevenueCat</strong>
          {t.li2_2.split('RevenueCat')[1].split(t.revenuecatTerms)[0]}
          <a href="https://www.revenuecat.com/terms" target="_blank" rel="noopener noreferrer">
            {t.revenuecatTerms}
          </a>
          {t.li2_2.split(t.revenuecatTerms)[1]}
        </li>
        <li>{t.li2_3}</li>
        <li><strong>Android:</strong> {t.li2_4}</li>
        <li><strong>iOS:</strong> {t.li2_5}</li>
        <li>{t.li2_6}</li>
      </ul>

      <h2>{t.h3}</h2>
      <p>{t.s3}</p>

      <h2>{t.h4}</h2>
      <p>{t.s4intro}</p>
      <ul>
        <li>{t.li4_1}</li>
        <li>{t.li4_2}</li>
        <li>{t.li4_3}</li>
        <li>{t.li4_4}</li>
      </ul>

      <h2>{t.h5}</h2>
      <p>{t.s5}</p>

      <h2>{t.h6}</h2>
      <p>{t.s6}</p>

      <h2>{t.h7}</h2>
      <p>{t.s7}</p>

      <h2>{t.h8}</h2>
      <p>{t.s8}</p>

      <h2>{t.h9}</h2>
      <p>{t.s9}</p>

      <h2>{t.h10}</h2>
      <p>{t.s10}</p>

      <h2>{t.h11}</h2>
      <p>
        {t.s11}{' '}
        <a href={`mailto:${studio.email}?subject=${encodeURIComponent('Términos / Terms — myappcube')}`}>
          {studio.email}
        </a>
        .
      </p>
    </LegalLayout>
  );
}
