import { notFound } from 'next/navigation';
import Image from 'next/image';
import type React from 'react';
import type { Metadata } from 'next';
import { Settings, User, Trash2, TriangleAlert, XCircle, Mail } from 'lucide-react';
import { games } from '@/config/games';
import { routing } from '@/i18n/routing';
import { studio } from '@/config/studio';
import ScrollReveal from '@/components/ui/ScrollReveal';

/* ─── Static params ──────────────────────────────────────────────────────── */

export function generateStaticParams() {
  const slugs = games.filter((g) => !g.comingSoon).map((g) => g.slug);
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

/* ─── Metadata ───────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const game = games.find((g) => g.slug === slug);
  if (!game) return {};
  const c = getContent(locale);
  return {
    title: `${c.title} — ${game.name}`,
    description: c.subtitle,
  };
}

/* ─── Translations ───────────────────────────────────────────────────────── */

type Content = {
  title: string;
  label: string;
  subtitle: string;
  steps: { label: string; title: string; description: React.ReactNode }[];
  dataTitle: string;
  dataItems: string[];
  dataNote: string;
  helpTitle: string;
  helpText: string;
  helpSuffix: string;
};

function getContent(locale: string): Content {
  const map: Record<string, Content> = {
    es: {
      title: 'Eliminar cuenta',
      label: 'Cuenta y datos',
      subtitle: 'Puedes eliminar tu cuenta y todos los datos asociados directamente desde la aplicación. Esta acción es permanente e irreversible.',
      steps: [
        {
          label: 'Paso 1',
          title: 'Abre los Ajustes',
          description: <>En la pantalla principal, toca el ícono <Settings className="inline w-4 h-4 text-blue-400 mx-0.5 -mt-0.5" /> de ajustes en la esquina superior izquierda.</>,
        },
        {
          label: 'Paso 2',
          title: 'Toca "Perfil"',
          description: <>Dentro de Ajustes, en la sección &ldquo;Cuenta y asistencia&rdquo;, toca la opción <User className="inline w-4 h-4 text-violet-400 mx-0.5 -mt-0.5" /> Perfil.</>,
        },
        {
          label: 'Paso 3',
          title: 'Toca el ícono de eliminar',
          description: <>En la pantalla de Perfil, toca el botón rojo <Trash2 className="inline w-4 h-4 text-rose-400 mx-0.5 -mt-0.5" /> en la esquina superior derecha.</>,
        },
        {
          label: 'Paso 4',
          title: 'Confirma la eliminación',
          description: <>Aparecerá un diálogo de confirmación. Toca <strong>&ldquo;Eliminar&rdquo;</strong> para borrar permanentemente tu cuenta y todos tus datos.</>,
        },
      ],
      dataTitle: 'Datos que se eliminan',
      dataItems: [
        'Cuenta de usuario (correo electrónico o Google)',
        'Nombre de usuario y avatar',
        'Estadísticas y progreso de juego',
        'Preferencias y configuración de la app',
      ],
      dataNote: 'Si tienes una suscripción activa, deberás cancelarla por separado desde Google Play → Suscripciones. La eliminación de la cuenta no cancela la suscripción automáticamente.',
      helpTitle: '¿Necesitas ayuda?',
      helpText: 'Escríbenos a ',
      helpSuffix: ' y procesaremos tu solicitud en un plazo de 30 días.',
    },
    en: {
      title: 'Delete Account',
      label: 'Account & Data',
      subtitle: 'You can delete your account and all associated data directly from the app. This action is permanent and cannot be undone.',
      steps: [
        {
          label: 'Step 1',
          title: 'Open Settings',
          description: <>On the main screen, tap the <Settings className="inline w-4 h-4 text-blue-400 mx-0.5 -mt-0.5" /> settings icon in the top-left corner.</>,
        },
        {
          label: 'Step 2',
          title: 'Tap "Profile"',
          description: <>Inside Settings, under the &ldquo;Account &amp; Support&rdquo; section, tap the <User className="inline w-4 h-4 text-violet-400 mx-0.5 -mt-0.5" /> Profile option.</>,
        },
        {
          label: 'Step 3',
          title: 'Tap the delete icon',
          description: <>On the Profile screen, tap the red <Trash2 className="inline w-4 h-4 text-rose-400 mx-0.5 -mt-0.5" /> button in the top-right corner.</>,
        },
        {
          label: 'Step 4',
          title: 'Confirm deletion',
          description: <>A confirmation dialog will appear. Tap <strong>&ldquo;Delete&rdquo;</strong> to permanently erase your account and all associated data.</>,
        },
      ],
      dataTitle: 'Data that is deleted',
      dataItems: [
        'User account (email or Google)',
        'Username and avatar',
        'Game statistics and progress',
        'App preferences and settings',
      ],
      dataNote: 'If you have an active subscription, you must cancel it separately from Google Play → Subscriptions. Deleting your account does not automatically cancel your subscription.',
      helpTitle: 'Need help?',
      helpText: 'Contact us at ',
      helpSuffix: ' and we will process your deletion request within 30 days.',
    },
    pt: {
      title: 'Excluir conta',
      label: 'Conta e dados',
      subtitle: 'Você pode excluir sua conta e todos os dados associados diretamente no aplicativo. Esta ação é permanente e não pode ser desfeita.',
      steps: [
        {
          label: 'Passo 1',
          title: 'Abra as Configurações',
          description: <>Na tela principal, toque no ícone <Settings className="inline w-4 h-4 text-blue-400 mx-0.5 -mt-0.5" /> de configurações no canto superior esquerdo.</>,
        },
        {
          label: 'Passo 2',
          title: 'Toque em "Perfil"',
          description: <>Nas Configurações, na seção &ldquo;Conta e suporte&rdquo;, toque na opção <User className="inline w-4 h-4 text-violet-400 mx-0.5 -mt-0.5" /> Perfil.</>,
        },
        {
          label: 'Passo 3',
          title: 'Toque no ícone de exclusão',
          description: <>Na tela de Perfil, toque no botão vermelho <Trash2 className="inline w-4 h-4 text-rose-400 mx-0.5 -mt-0.5" /> no canto superior direito.</>,
        },
        {
          label: 'Passo 4',
          title: 'Confirme a exclusão',
          description: <>Uma caixa de confirmação será exibida. Toque em <strong>&ldquo;Eliminar&rdquo;</strong> para apagar permanentemente sua conta e todos os dados.</>,
        },
      ],
      dataTitle: 'Dados que serão excluídos',
      dataItems: [
        'Conta de usuário (e-mail ou Google)',
        'Nome de usuário e avatar',
        'Estatísticas e progresso do jogo',
        'Preferências e configurações do app',
      ],
      dataNote: 'Se você tiver uma assinatura ativa, cancele-a separadamente no Google Play → Assinaturas. A exclusão da conta não cancela a assinatura automaticamente.',
      helpTitle: 'Precisa de ajuda?',
      helpText: 'Entre em contato em ',
      helpSuffix: ' e processaremos sua solicitação em até 30 dias.',
    },
    fr: {
      title: 'Supprimer le compte',
      label: 'Compte et données',
      subtitle: "Vous pouvez supprimer votre compte et toutes les données associées directement depuis l'application. Cette action est permanente et irréversible.",
      steps: [
        {
          label: 'Étape 1',
          title: 'Ouvrez les Paramètres',
          description: <>Sur l&apos;écran principal, appuyez sur l&apos;icône <Settings className="inline w-4 h-4 text-blue-400 mx-0.5 -mt-0.5" /> dans le coin supérieur gauche.</>,
        },
        {
          label: 'Étape 2',
          title: 'Appuyez sur "Profil"',
          description: <>Dans Paramètres, sous la section &ldquo;Compte et assistance&rdquo;, appuyez sur <User className="inline w-4 h-4 text-violet-400 mx-0.5 -mt-0.5" /> Profil.</>,
        },
        {
          label: 'Étape 3',
          title: "Appuyez sur l'icône de suppression",
          description: <>Sur l&apos;écran Profil, appuyez sur le bouton rouge <Trash2 className="inline w-4 h-4 text-rose-400 mx-0.5 -mt-0.5" /> dans le coin supérieur droit.</>,
        },
        {
          label: 'Étape 4',
          title: 'Confirmez la suppression',
          description: <>Une boîte de confirmation apparaît. Appuyez sur <strong>&ldquo;Supprimer&rdquo;</strong> pour effacer définitivement votre compte et toutes les données.</>,
        },
      ],
      dataTitle: 'Données supprimées',
      dataItems: [
        'Compte utilisateur (e-mail ou Google)',
        "Nom d'utilisateur et avatar",
        'Statistiques et progression du jeu',
        "Préférences et paramètres de l'application",
      ],
      dataNote: "Si vous avez un abonnement actif, annulez-le séparément depuis Google Play → Abonnements. La suppression du compte n'annule pas automatiquement l'abonnement.",
      helpTitle: "Besoin d'aide ?",
      helpText: 'Contactez-nous à ',
      helpSuffix: ' et nous traiterons votre demande dans un délai de 30 jours.',
    },
    it: {
      title: 'Elimina account',
      label: 'Account e dati',
      subtitle: "Puoi eliminare il tuo account e tutti i dati associati direttamente dall'app. Questa azione è permanente e irreversibile.",
      steps: [
        {
          label: 'Passo 1',
          title: 'Apri le Impostazioni',
          description: <>Nella schermata principale, tocca l&apos;icona <Settings className="inline w-4 h-4 text-blue-400 mx-0.5 -mt-0.5" /> delle impostazioni nell&apos;angolo in alto a sinistra.</>,
        },
        {
          label: 'Passo 2',
          title: 'Tocca "Profilo"',
          description: <>Nelle Impostazioni, nella sezione &ldquo;Account e supporto&rdquo;, tocca l&apos;opzione <User className="inline w-4 h-4 text-violet-400 mx-0.5 -mt-0.5" /> Profilo.</>,
        },
        {
          label: 'Passo 3',
          title: "Tocca l'icona di eliminazione",
          description: <>Nella schermata Profilo, tocca il pulsante rosso <Trash2 className="inline w-4 h-4 text-rose-400 mx-0.5 -mt-0.5" /> nell&apos;angolo in alto a destra.</>,
        },
        {
          label: 'Passo 4',
          title: "Conferma l'eliminazione",
          description: <>Apparirà una finestra di conferma. Tocca <strong>&ldquo;Elimina&rdquo;</strong> per cancellare definitivamente il tuo account e tutti i dati.</>,
        },
      ],
      dataTitle: 'Dati eliminati',
      dataItems: [
        'Account utente (e-mail o Google)',
        'Nome utente e avatar',
        'Statistiche e progressi di gioco',
        "Preferenze e impostazioni dell'app",
      ],
      dataNote: "Se hai un abbonamento attivo, devi cancellarlo separatamente da Google Play → Abbonamenti. L'eliminazione dell'account non cancella automaticamente l'abbonamento.",
      helpTitle: 'Hai bisogno di aiuto?',
      helpText: 'Contattaci a ',
      helpSuffix: ' e elaboreremo la tua richiesta entro 30 giorni.',
    },
    de: {
      title: 'Konto löschen',
      label: 'Konto & Daten',
      subtitle: 'Du kannst dein Konto und alle zugehörigen Daten direkt in der App löschen. Diese Aktion ist dauerhaft und kann nicht rückgängig gemacht werden.',
      steps: [
        {
          label: 'Schritt 1',
          title: 'Einstellungen öffnen',
          description: <>Tippe auf dem Hauptbildschirm auf das <Settings className="inline w-4 h-4 text-blue-400 mx-0.5 -mt-0.5" />-Einstellungssymbol oben links.</>,
        },
        {
          label: 'Schritt 2',
          title: '"Profil" antippen',
          description: <>Tippe in den Einstellungen unter &ldquo;Konto &amp; Support&rdquo; auf die Option <User className="inline w-4 h-4 text-violet-400 mx-0.5 -mt-0.5" /> Profil.</>,
        },
        {
          label: 'Schritt 3',
          title: 'Löschen-Symbol antippen',
          description: <>Tippe im Profilbildschirm auf die rote <Trash2 className="inline w-4 h-4 text-rose-400 mx-0.5 -mt-0.5" />-Schaltfläche oben rechts.</>,
        },
        {
          label: 'Schritt 4',
          title: 'Löschung bestätigen',
          description: <>Ein Bestätigungsdialog erscheint. Tippe auf <strong>&ldquo;Löschen&rdquo;</strong>, um dein Konto und alle Daten dauerhaft zu entfernen.</>,
        },
      ],
      dataTitle: 'Gelöschte Daten',
      dataItems: [
        'Benutzerkonto (E-Mail oder Google)',
        'Benutzername und Avatar',
        'Spielstatistiken und Fortschritt',
        'App-Einstellungen und Präferenzen',
      ],
      dataNote: 'Wenn du ein aktives Abonnement hast, musst du es separat über Google Play → Abonnements kündigen. Das Löschen des Kontos kündigt das Abonnement nicht automatisch.',
      helpTitle: 'Brauchst du Hilfe?',
      helpText: 'Kontaktiere uns unter ',
      helpSuffix: ' und wir bearbeiten deinen Antrag innerhalb von 30 Tagen.',
    },
  };

  return map[locale] ?? map['en'];
}

/* ─── Step metadata ──────────────────────────────────────────────────────── */

const stepMeta = [
  {
    icon: Settings,
    color: 'text-blue-400',
    numBg: 'bg-blue-500',
    glow: 'bg-blue-500/10',
  },
  {
    icon: User,
    color: 'text-violet-400',
    numBg: 'bg-violet-500',
    glow: 'bg-violet-500/10',
  },
  {
    icon: Trash2,
    color: 'text-rose-400',
    numBg: 'bg-rose-500',
    glow: 'bg-rose-500/10',
  },
  {
    icon: TriangleAlert,
    color: 'text-orange-400',
    numBg: 'bg-orange-500',
    glow: 'bg-orange-500/10',
  },
];

const screenshots = [
  {
    src: '/images/games/el-infiltrado/screenshots/account_delete/1_home_screen_screenshot.png',
    alt: 'Home screen',
  },
  {
    src: '/images/games/el-infiltrado/screenshots/account_delete/2_settings_screenshot.png',
    alt: 'Settings screen',
  },
  {
    src: '/images/games/el-infiltrado/screenshots/account_delete/3_profile_screenshot.png',
    alt: 'Profile screen',
  },
  {
    src: '/images/games/el-infiltrado/screenshots/account_delete/3-1_profile_screenshot.png',
    alt: 'Delete confirmation dialog',
  },
];

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default async function DeleteAccountPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const game = games.find((g) => g.slug === slug && !g.comingSoon);
  if (!game) notFound();

  const c = getContent(locale);

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-zinc-950 overflow-hidden -mt-16 pt-16">
        <div className="absolute inset-0 bg-linear-to-b from-rose-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto px-6 py-24 md:py-32 max-w-3xl flex flex-col items-center text-center gap-6">

          <ScrollReveal>
            <div className="relative inline-flex">
              <div className="absolute -inset-6 bg-rose-500/20 blur-3xl rounded-full" />
              <div className="relative w-16 h-16 rounded-2xl bg-zinc-800 border border-white/10 flex items-center justify-center shadow-2xl">
                <Trash2 className="w-7 h-7 text-rose-400" />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-rose-400 mb-1">
              {c.label}
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-50 mt-2">
              {c.title}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
              {c.subtitle}
            </p>
          </ScrollReveal>

        </div>
      </section>

      {/* ── Steps ────────────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-6 py-20 md:py-28 max-w-5xl">
          <div className="flex flex-col gap-20 md:gap-28">
            {c.steps.map((step, i) => {
              const { icon: StepIcon, color, numBg, glow } = stepMeta[i];
              const isEven = i % 2 === 0;
              return (
                <ScrollReveal key={i} delay={i * 60}>
                  <div
                    className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${
                      isEven ? '' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Screenshot */}
                    <div className="w-full md:w-auto shrink-0 flex justify-center">
                      <div className="relative">
                        <div className={`absolute -inset-4 ${glow} blur-2xl rounded-3xl`} />
                        <div className="relative w-44 rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800">
                          <Image
                            src={screenshots[i].src}
                            alt={screenshots[i].alt}
                            width={400}
                            height={867}
                            className="w-full h-auto"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-xl ${glow} border border-zinc-200/40 dark:border-zinc-700/40 flex items-center justify-center shrink-0`}>
                          <StepIcon className={`w-5 h-5 ${color}`} />
                        </div>
                        <span className={`w-6 h-6 rounded-full ${numBg} text-white text-xs font-bold flex items-center justify-center shrink-0`}>
                          {i + 1}
                        </span>
                        <span className="text-xs font-semibold tracking-widest uppercase text-zinc-500 dark:text-zinc-500">
                          {step.label}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
                        {step.title}
                      </h2>
                      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Data info ────────────────────────────────────────────────────── */}
      <section className="bg-zinc-50 dark:bg-zinc-900">
        <div className="container mx-auto px-6 py-20 max-w-3xl">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-8">
              {c.dataTitle}
            </h2>

            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {c.dataItems.map((item) => (
                  <li key={item} className="flex items-center gap-4 px-6 py-4 bg-white dark:bg-zinc-950/60">
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    <span className="text-zinc-700 dark:text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex gap-3 p-5 rounded-2xl bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20">
              <TriangleAlert className="w-5 h-5 text-orange-500 dark:text-orange-400 shrink-0 mt-0.5" />
              <p className="text-sm text-orange-700 dark:text-orange-300 leading-relaxed">
                {c.dataNote}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────────────── */}
      <section className="bg-zinc-950">
        <div className="container mx-auto px-6 py-20 max-w-3xl">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-white/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-violet-400" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-50">
                {c.helpTitle}
              </h2>
              <p className="text-zinc-400 leading-relaxed">
                {c.helpText}
                <a
                  href={`mailto:${studio.email}`}
                  className="text-violet-400 underline underline-offset-4 hover:text-violet-300 transition-colors"
                >
                  {studio.email}
                </a>
                {c.helpSuffix}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </main>
  );
}
