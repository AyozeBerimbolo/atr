// ============================================================
// Selector de idioma (Español / English / Deutsch)
// Traduce únicamente los textos fijos de la plantilla (menú,
// titulares, botones, formularios). El contenido que el club
// escribe desde el panel (noticias, horario, bios, FAQ...)
// se muestra tal cual se escribió, en el idioma que sea.
// ============================================================

const TRANSLATIONS = {
  es: {
    nav_inicio: 'Inicio', nav_adultos: 'Adultos', nav_menores: 'Menores',
    nav_horario: 'Horario', nav_tarifas: 'Tarifas', nav_equipo: 'Equipo',
    nav_noticias: 'Noticias', nav_galeria: 'Galería', nav_faq: 'Preguntas',
    nav_prueba: 'Clase de prueba',

    home_eyebrow: 'ATR Team Berimbolo · El Tablero, Maspalomas',
    home_title: 'JIU JITSU<br>PARA TODA<br>LA FAMILIA<br><span class="hero-location">EL TABLERO, MASPALOMAS</span>',
    home_tagline: 'Un arte marcial sin golpes, basado en la técnica, el respeto y la constancia. Clases para adultos y para menores, en un ambiente cercano, seguro y abierto a todo el mundo.',
    home_btn_adultos: 'Clases de adultos', home_btn_menores: 'Clases de menores', home_btn_prueba: 'Pedir clase de prueba',

    philosophy_eyebrow: '¿Qué es el Jiu Jitsu?', philosophy_title: 'Más que una técnica de suelo',
    philosophy_lede: 'El Jiu Jitsu Brasileño es un arte marcial de contacto en el que se prioriza la técnica y la estrategia por encima de la fuerza bruta. Se entrena en pareja, se pierde, se aprende y se vuelve a intentar — y precisamente por eso es una de las herramientas más completas para el desarrollo personal: enseña a mantener la calma bajo presión, a respetar al compañero que tienes delante y a ser constante con la disciplina, dentro y fuera del tatami. Y, sobre todo, se disfruta.',
    value_respeto_tag: 'Respeto', value_respeto_title: 'Compañero, no rival', value_respeto_desc: 'Se entrena con quien tienes delante, no contra él. El respeto por el compañero y por el propio cuerpo es la base de todo lo demás.',
    value_disciplina_tag: 'Disciplina', value_disciplina_title: 'Constancia sobre el tatami', value_disciplina_desc: 'Los progresos llegan con la repetición y la paciencia. Esa misma disciplina se traslada a la vida diaria, dentro y fuera del club.',
    value_desarrollo_tag: 'Desarrollo', value_desarrollo_title: 'Confianza y autocontrol', value_desarrollo_desc: 'Aprender a defenderse da seguridad; aprender a perder con deportividad da carácter. El tatami enseña ambas cosas a la vez.',
    value_diversion_tag: 'Diversión', value_diversion_title: 'Se entrena riendo', value_diversion_desc: 'Por encima de todo, entrenamos porque nos gusta. El ambiente del club es cercano, y eso se nota en cada clase.',

    audience_eyebrow: 'Nuestras clases', audience_title: 'Adultos y menores',
    adults_tag: 'Adultos', adults_title: 'Entrena a cualquier edad',
    adults_desc: 'Clases de iniciación y de nivel avanzado. Trabajo técnico, preparación física y la opción de competir para quien lo desee.',
    kids_tag: 'Menores', kids_title: 'Jiu Jitsu infantil y juvenil',
    kids_desc: 'Un espacio seguro y supervisado donde niños y adolescentes aprenden respeto, autocontrol y confianza, jugando y entrenando.',
    ver_mas: 'Ver más →',

    pride_text: '<strong>Un tatami para todos.</strong> ATR Team Berimbolo es un espacio libre de discriminación por orientación sexual, identidad o expresión de género. Todo el mundo es bienvenido a entrenar con respeto.',

    testimonios_eyebrow: 'Lo que dicen de nosotros', testimonios_title: 'Voces del club',

    news_eyebrow: 'Tablón', news_title: 'Últimas noticias', ver_noticias: 'Ver todas las noticias →',
    schedule_eyebrow: 'Horario', schedule_title: 'Próximas clases', ver_horario: 'Ver horario completo →',
    location_eyebrow: 'Ubicación', location_title: 'Entrena con nosotros en ATR Team Berimbolo',
    location_lede: 'El Tablero, Maspalomas. Aquí abajo tienes el mapa, o pincha el botón para abrirlo en Google Maps.',
    como_llegar: '📍 Cómo llegar',

    adults_hero_eyebrow: 'Adultos', adults_hero_title: 'ENTRENA<br>A CUALQUIER<br>EDAD',
    adults_hero_tagline: 'Da igual si nunca has hecho artes marciales o si llevas años sobre el tatami: en ATR Team Berimbolo encontrarás un grupo con el que progresar a tu ritmo.',
    adults_v1_title: 'Defensa personal', adults_v1_desc: 'Técnica real de control y sumisión, pensada para funcionar independientemente de la fuerza o el tamaño.',
    adults_v2_title: 'Forma física', adults_v2_desc: 'Un entrenamiento completo que mejora la resistencia, la movilidad y la fuerza funcional sesión tras sesión.',
    adults_v3_title: 'Gestión del estrés', adults_v3_desc: 'Una hora sobre el tatami, concentrado en la técnica, es una de las mejores formas de desconectar de todo lo demás.',
    adults_v4_title: 'Comunidad', adults_v4_desc: 'Un grupo cercano donde se entrena, se aprende y también se comparte fuera del club.',
    adults_panel_title: '¿Primera vez en un club de Jiu Jitsu?',
    adults_panel_text: 'No hace falta experiencia previa ni un nivel físico determinado. Las clases de iniciación están pensadas para empezar desde cero, con calma y buen ambiente. Para quien quiera dar el paso, también existe la opción de preparar competiciones.',
    adults_panel_cta: 'Ven a probar una clase →',
    ver_tarifas: 'Ver tarifas',

    kids_hero_eyebrow: 'Menores', kids_hero_title: 'RESPETO,<br>CONFIANZA<br>Y DIVERSIÓN',
    kids_hero_tagline: 'Clases pensadas para niños y adolescentes, en un ambiente seguro, supervisado y divertido, donde el juego y la técnica van de la mano.',
    kids_v1_title: 'Autocontrol', kids_v1_desc: 'Aprenden a manejar la frustración de perder un combate y la calma de no usar la fuerza de forma innecesaria.',
    kids_v2_title: 'Respeto', kids_v2_desc: 'Saludo al entrar y salir del tatami, cuidado del compañero de entrenamiento y respeto por el profesor.',
    kids_v3_title: 'Confianza', kids_v3_desc: 'Ganar seguridad en el propio cuerpo ayuda también fuera del club, incluida la prevención del acoso escolar.',
    kids_v4_title: 'Diversión', kids_v4_desc: 'Juegos, retos y trabajo en equipo. Aprenden entrenando, y entrenan porque se lo pasan bien.',
    kids_panel_title: 'Información para madres, padres y tutores',
    kids_panel_text: 'Las clases están siempre supervisadas por el equipo de instructores del club y adaptadas a cada grupo de edad. Antes de la primera clase se solicita una autorización firmada por el tutor legal. Si tienes dudas sobre grupos de edad, horarios o el proceso de inscripción, puedes escribirnos por Instagram, Facebook o WhatsApp — los enlaces están en el pie de página.',
    kids_download_pdf: '📄 Descargar autorización del tutor legal (PDF)',

    schedule_page_title: 'Todas las clases', schedule_adults: 'Adultos', schedule_kids: 'Menores',
    news_page_title: 'Noticias del club',
    gallery_photos_eyebrow: 'Galería', gallery_photos_title: 'Fotos del club',
    gallery_videos_eyebrow: 'Vídeos', gallery_videos_title: 'Técnica y competición',

    pricing_eyebrow: 'Tarifas', pricing_title: 'Cuotas del club',
    pricing_lede: 'Estas son nuestras tarifas actuales. Si tienes dudas sobre bonos, hermanos o descuentos, escríbenos por Instagram, Facebook o WhatsApp.',

    trial_eyebrow: 'Ven a probar', trial_title: 'Reserva tu clase de prueba',
    trial_lede: 'Sin compromiso. Rellena el formulario y te contactaremos para confirmar día y hora; puedes reservar la clase de prueba directamente desde aquí.',
    trial_form_title: 'Cuéntanos sobre ti',
    trial_label_name: 'Nombre completo', trial_label_contact: 'Teléfono o email de contacto',
    trial_label_category: '¿Para quién es la clase?', trial_label_message: 'Mensaje (opcional)',
    trial_placeholder_message: 'Días u horarios que te vengan mejor, experiencia previa, etc.',
    trial_submit: 'Enviar solicitud',

    private_eyebrow: 'A tu ritmo', private_title: 'Clases particulares',
    private_lede: 'Sesiones 1 a 1 con un instructor, en el horario que mejor te venga. Rellena el formulario y te contactaremos para acordar día y hora.',
    private_form_title: 'Cuéntanos sobre ti',
    private_placeholder_message: 'Días u horarios que te vengan mejor, objetivo de las clases, etc.',

    team_eyebrow: 'Nuestro equipo', team_title: 'Instructores',
    team_affiliation: 'Equipo dirigido por el Prof. Ayoze Ramírez, afiliado a Team Rumen Caraballo.',
    achievements_eyebrow: 'Palmarés', achievements_title: 'Competiciones y resultados',

    faq_eyebrow: 'Ayuda', faq_title: 'Preguntas frecuentes',

    legal_eyebrow: 'Legal', legal_title: 'Aviso legal, privacidad y cookies',

    footer_direccion: 'El Tablero, Maspalomas',
    footer_como_llegar: 'Cómo llegar →',
    footer_copyright: 'Team Berimbolo. Respeto, disciplina y comunidad dentro y fuera del tatami.',
    footer_legal_link: 'Aviso legal y privacidad',

    cargando: 'Cargando…',
  },

  en: {
    nav_inicio: 'Home', nav_adultos: 'Adults', nav_menores: 'Kids',
    nav_horario: 'Schedule', nav_tarifas: 'Pricing', nav_equipo: 'Team',
    nav_noticias: 'News', nav_galeria: 'Gallery', nav_faq: 'FAQ',
    nav_prueba: 'Trial class',

    home_eyebrow: 'ATR Team Berimbolo · El Tablero, Maspalomas',
    home_title: 'JIU JITSU<br>FOR THE WHOLE<br>FAMILY<br><span class="hero-location">EL TABLERO, MASPALOMAS</span>',
    home_tagline: 'A martial art with no striking, built on technique, respect and consistency. Classes for adults and children, in a friendly, safe space open to everyone.',
    home_btn_adultos: 'Adult classes', home_btn_menores: 'Kids classes', home_btn_prueba: 'Book a trial class',

    philosophy_eyebrow: 'What is Jiu Jitsu?', philosophy_title: 'More than a ground technique',
    philosophy_lede: 'Brazilian Jiu Jitsu is a grappling martial art that prioritises technique, leverage and strategy over brute strength. You train with a partner, you lose, you learn, and you try again — which is exactly why it\'s such a complete tool for personal growth: it teaches you to stay calm under pressure, to respect the person in front of you, and to stay disciplined on and off the mats. And above all, it\'s fun.',
    value_respeto_tag: 'Respect', value_respeto_title: 'A partner, not a rival', value_respeto_desc: 'You train with the person in front of you, not against them. Respect for your partner and for your own body is the foundation for everything else.',
    value_disciplina_tag: 'Discipline', value_disciplina_title: 'Consistency on the mats', value_disciplina_desc: 'Progress comes from repetition and patience. That same discipline carries over into daily life, on and off the mats.',
    value_desarrollo_tag: 'Growth', value_desarrollo_title: 'Confidence and self-control', value_desarrollo_desc: 'Learning to defend yourself builds confidence; learning to lose gracefully builds character. The mats teach both at once.',
    value_diversion_tag: 'Fun', value_diversion_title: 'We train laughing', value_diversion_desc: 'Above all, we train because we love it. The club\'s friendly atmosphere shows in every class.',

    audience_eyebrow: 'Our classes', audience_title: 'Adults and kids',
    adults_tag: 'Adults', adults_title: 'Train at any age',
    adults_desc: 'Beginner and advanced classes. Technical work, physical conditioning, and the option to compete for those who want to.',
    kids_tag: 'Kids', kids_title: 'Jiu Jitsu for children and teens',
    kids_desc: 'A safe, supervised space where children and teenagers learn respect, self-control and confidence, playing and training.',
    ver_mas: 'Learn more →',

    pride_text: '<strong>Mats for everyone.</strong> ATR Team Berimbolo is a space free of discrimination based on sexual orientation, gender identity or expression. Everyone is welcome to train with respect.',

    testimonios_eyebrow: 'What people say', testimonios_title: 'Voices from the club',

    news_eyebrow: 'Noticeboard', news_title: 'Latest news', ver_noticias: 'See all news →',
    schedule_eyebrow: 'Schedule', schedule_title: 'Upcoming classes', ver_horario: 'See full schedule →',
    location_eyebrow: 'Location', location_title: 'Train with us at ATR Team Berimbolo',
    location_lede: 'El Tablero, Maspalomas. You can see the map below, or tap the button to open it in Google Maps.',
    como_llegar: '📍 Get directions',

    adults_hero_eyebrow: 'Adults', adults_hero_title: 'TRAIN AT<br>ANY<br>AGE',
    adults_hero_tagline: 'Whether you\'ve never done a martial art or you\'ve been on the mats for years, at ATR Team Berimbolo you\'ll find a group to progress with, at your own pace.',
    adults_v1_title: 'Self-defence', adults_v1_desc: 'Real control and submission technique, designed to work regardless of strength or size.',
    adults_v2_title: 'Fitness', adults_v2_desc: 'A complete workout that improves endurance, mobility and functional strength, session after session.',
    adults_v3_title: 'Stress relief', adults_v3_desc: 'An hour on the mats, focused on technique, is one of the best ways to switch off from everything else.',
    adults_v4_title: 'Community', adults_v4_desc: 'A close-knit group where you train, learn, and also connect outside the club.',
    adults_panel_title: 'First time at a Jiu Jitsu club?',
    adults_panel_text: 'No previous experience or fitness level is required. Beginner classes are designed to start from scratch, at an easy pace in a friendly atmosphere. For those who want to take it further, there\'s also the option to prepare for competitions.',
    adults_panel_cta: 'Come try a class →',
    ver_tarifas: 'See pricing',

    kids_hero_eyebrow: 'Kids', kids_hero_title: 'RESPECT,<br>CONFIDENCE<br>AND FUN',
    kids_hero_tagline: 'Classes designed for children and teenagers, in a safe, supervised and fun environment, where play and technique go hand in hand.',
    kids_v1_title: 'Self-control', kids_v1_desc: 'They learn to handle the frustration of losing a match and the calm of not using unnecessary force.',
    kids_v2_title: 'Respect', kids_v2_desc: 'Bowing in and out of the mats, looking after their training partner, and respecting the instructor.',
    kids_v3_title: 'Confidence', kids_v3_desc: 'Gaining confidence in their own body helps outside the club too, including preventing bullying.',
    kids_v4_title: 'Fun', kids_v4_desc: 'Games, challenges and teamwork. They learn by training, and they train because they enjoy it.',
    kids_panel_title: 'Information for parents and guardians',
    kids_panel_text: 'Classes are always supervised by the club\'s instructor team and adapted to each age group. Before the first class we ask for a form signed by the legal guardian. If you have any questions about age groups, schedules or enrolment, you can message us on Instagram, Facebook or WhatsApp — the links are in the footer.',
    kids_download_pdf: '📄 Download guardian consent form (PDF)',

    schedule_page_title: 'All classes', schedule_adults: 'Adults', schedule_kids: 'Kids',
    news_page_title: 'Club news',
    gallery_photos_eyebrow: 'Gallery', gallery_photos_title: 'Club photos',
    gallery_videos_eyebrow: 'Videos', gallery_videos_title: 'Technique and competition',

    pricing_eyebrow: 'Pricing', pricing_title: 'Club fees',
    pricing_lede: 'These are our current rates. If you have questions about bundles, sibling discounts or anything else, message us on Instagram, Facebook or WhatsApp.',

    trial_eyebrow: 'Come try it', trial_title: 'Book your trial class',
    trial_lede: 'No commitment. Fill in the form and we\'ll contact you to confirm a day and time; you can also reserve your spot by paying for the trial class directly here.',
    trial_form_title: 'Tell us about yourself',
    trial_label_name: 'Full name', trial_label_contact: 'Phone or email',
    trial_label_category: 'Who is the class for?', trial_label_message: 'Message (optional)',
    trial_placeholder_message: 'Days or times that work best for you, previous experience, etc.',
    trial_submit: 'Send request',

    private_eyebrow: 'At your pace', private_title: 'Private classes',
    private_lede: '1-to-1 sessions with an instructor, at whatever time suits you best. Fill in the form and we\'ll contact you to arrange a day and time.',
    private_form_title: 'Tell us about yourself',
    private_placeholder_message: 'Days or times that work best for you, what you\'d like to focus on, etc.',

    team_eyebrow: 'Our team', team_title: 'Instructors',
    team_affiliation: 'Team led by Prof. Ayoze Ramírez, affiliated with Team Rumen Caraballo.',
    achievements_eyebrow: 'Achievements', achievements_title: 'Competitions and results',

    faq_eyebrow: 'Help', faq_title: 'Frequently asked questions',

    legal_eyebrow: 'Legal', legal_title: 'Legal notice, privacy and cookies',

    footer_direccion: 'El Tablero, Maspalomas',
    footer_como_llegar: 'Get directions →',
    footer_copyright: 'Team Berimbolo. Respect, discipline and community, on and off the mats.',
    footer_legal_link: 'Legal notice and privacy',

    cargando: 'Loading…',
  },

  de: {
    nav_inicio: 'Start', nav_adultos: 'Erwachsene', nav_menores: 'Kinder',
    nav_horario: 'Stundenplan', nav_tarifas: 'Preise', nav_equipo: 'Team',
    nav_noticias: 'Neuigkeiten', nav_galeria: 'Galerie', nav_faq: 'FAQ',
    nav_prueba: 'Probetraining',

    home_eyebrow: 'ATR Team Berimbolo · El Tablero, Maspalomas',
    home_title: 'JIU JITSU<br>FÜR DIE GANZE<br>FAMILIE<br><span class="hero-location">EL TABLERO, MASPALOMAS</span>',
    home_tagline: 'Eine Kampfkunst ohne Schläge, die auf Technik, Respekt und Beständigkeit setzt. Kurse für Erwachsene und Kinder, in einer freundlichen, sicheren Umgebung, offen für alle.',
    home_btn_adultos: 'Kurse für Erwachsene', home_btn_menores: 'Kurse für Kinder', home_btn_prueba: 'Probetraining buchen',

    philosophy_eyebrow: 'Was ist Jiu Jitsu?', philosophy_title: 'Mehr als nur Bodentechnik',
    philosophy_lede: 'Brazilian Jiu Jitsu ist eine Kontakt-Kampfkunst, bei der Technik, Hebelwirkung und Strategie wichtiger sind als reine Kraft. Man trainiert mit einem Partner, verliert, lernt dazu und versucht es erneut — genau deshalb ist es eines der besten Werkzeuge für die persönliche Entwicklung: Es lehrt, unter Druck ruhig zu bleiben, den Trainingspartner zu respektieren und diszipliniert zu bleiben, auf und neben der Matte. Und vor allem: Es macht Spaß.',
    value_respeto_tag: 'Respekt', value_respeto_title: 'Partner, kein Gegner', value_respeto_desc: 'Man trainiert mit dem Partner, nicht gegen ihn. Respekt vor dem Partner und dem eigenen Körper ist die Grundlage für alles andere.',
    value_disciplina_tag: 'Disziplin', value_disciplina_title: 'Beständigkeit auf der Matte', value_disciplina_desc: 'Fortschritte entstehen durch Wiederholung und Geduld. Genau diese Disziplin überträgt sich auch auf den Alltag, innerhalb und außerhalb des Vereins.',
    value_desarrollo_tag: 'Entwicklung', value_desarrollo_title: 'Selbstvertrauen und Selbstbeherrschung', value_desarrollo_desc: 'Sich verteidigen zu können gibt Sicherheit; fair verlieren zu können formt den Charakter. Die Matte lehrt beides zugleich.',
    value_diversion_tag: 'Spaß', value_diversion_title: 'Wir trainieren mit einem Lächeln', value_diversion_desc: 'Vor allem trainieren wir, weil es uns Spaß macht. Die freundliche Atmosphäre des Vereins spürt man in jedem Training.',

    audience_eyebrow: 'Unsere Kurse', audience_title: 'Erwachsene und Kinder',
    adults_tag: 'Erwachsene', adults_title: 'Training in jedem Alter',
    adults_desc: 'Anfänger- und Fortgeschrittenenkurse. Techniktraining, körperliche Vorbereitung und die Möglichkeit, an Wettkämpfen teilzunehmen.',
    kids_tag: 'Kinder', kids_title: 'Jiu Jitsu für Kinder und Jugendliche',
    kids_desc: 'Ein sicherer, beaufsichtigter Ort, an dem Kinder und Jugendliche spielerisch Respekt, Selbstbeherrschung und Selbstvertrauen lernen.',
    ver_mas: 'Mehr erfahren →',

    pride_text: '<strong>Eine Matte für alle.</strong> ATR Team Berimbolo ist ein Ort ohne Diskriminierung aufgrund sexueller Orientierung, Geschlechtsidentität oder -ausdruck. Alle sind willkommen, respektvoll mitzutrainieren.',

    testimonios_eyebrow: 'Das sagt man über uns', testimonios_title: 'Stimmen aus dem Verein',

    news_eyebrow: 'Anschlagbrett', news_title: 'Neuigkeiten', ver_noticias: 'Alle Neuigkeiten ansehen →',
    schedule_eyebrow: 'Stundenplan', schedule_title: 'Nächste Kurse', ver_horario: 'Ganzen Stundenplan ansehen →',
    location_eyebrow: 'Standort', location_title: 'Trainiere mit uns bei ATR Team Berimbolo',
    location_lede: 'El Tablero, Maspalomas. Die Karte findest du weiter unten, oder öffne sie über den Button direkt in Google Maps.',
    como_llegar: '📍 Route anzeigen',

    adults_hero_eyebrow: 'Erwachsene', adults_hero_title: 'TRAINING IN<br>JEDEM<br>ALTER',
    adults_hero_tagline: 'Egal ob du noch nie eine Kampfkunst ausgeübt hast oder schon seit Jahren auf der Matte stehst: Bei ATR Team Berimbolo findest du eine Gruppe, mit der du dich in deinem eigenen Tempo weiterentwickelst.',
    adults_v1_title: 'Selbstverteidigung', adults_v1_desc: 'Echte Kontroll- und Hebeltechnik, die unabhängig von Kraft oder Körpergröße funktioniert.',
    adults_v2_title: 'Fitness', adults_v2_desc: 'Ein komplettes Training, das Ausdauer, Beweglichkeit und funktionelle Kraft von Einheit zu Einheit verbessert.',
    adults_v3_title: 'Stressabbau', adults_v3_desc: 'Eine Stunde auf der Matte, konzentriert auf die Technik, ist eine der besten Arten, alles andere für einen Moment auszublenden.',
    adults_v4_title: 'Gemeinschaft', adults_v4_desc: 'Eine enge Gruppe, in der man trainiert, lernt und sich auch außerhalb des Vereins austauscht.',
    adults_panel_title: 'Zum ersten Mal in einem Jiu-Jitsu-Verein?',
    adults_panel_text: 'Vorerfahrung oder ein bestimmtes Fitnesslevel sind nicht nötig. Die Anfängerkurse sind so gestaltet, dass man in Ruhe und in freundlicher Atmosphäre bei null anfangen kann. Wer möchte, kann sich später auch auf Wettkämpfe vorbereiten.',
    adults_panel_cta: 'Komm zu einem Probetraining →',
    ver_tarifas: 'Preise ansehen',

    kids_hero_eyebrow: 'Kinder', kids_hero_title: 'RESPEKT,<br>SELBSTVERTRAUEN<br>UND SPASS',
    kids_hero_tagline: 'Kurse für Kinder und Jugendliche in einer sicheren, beaufsichtigten und unterhaltsamen Umgebung, in der Spiel und Technik Hand in Hand gehen.',
    kids_v1_title: 'Selbstbeherrschung', kids_v1_desc: 'Sie lernen, mit der Frustration einer Niederlage umzugehen und Kraft nicht unnötig einzusetzen.',
    kids_v2_title: 'Respekt', kids_v2_desc: 'Verbeugung beim Betreten und Verlassen der Matte, Rücksicht auf den Trainingspartner und Respekt gegenüber dem Trainer.',
    kids_v3_title: 'Selbstvertrauen', kids_v3_desc: 'Sicherheit im eigenen Körper hilft auch außerhalb des Vereins, unter anderem bei der Vorbeugung von Mobbing.',
    kids_v4_title: 'Spaß', kids_v4_desc: 'Spiele, Herausforderungen und Teamarbeit. Sie lernen durch Training, und sie trainieren, weil es ihnen Spaß macht.',
    kids_panel_title: 'Informationen für Eltern und Erziehungsberechtigte',
    kids_panel_text: 'Die Kurse werden immer vom Trainerteam des Vereins beaufsichtigt und an jede Altersgruppe angepasst. Vor dem ersten Training bitten wir um eine von den Erziehungsberechtigten unterschriebene Einverständniserklärung. Bei Fragen zu Altersgruppen, Zeiten oder Anmeldung erreichst du uns über Instagram, Facebook oder WhatsApp — die Links findest du im Footer.',
    kids_download_pdf: '📄 Einverständniserklärung herunterladen (PDF)',

    schedule_page_title: 'Alle Kurse', schedule_adults: 'Erwachsene', schedule_kids: 'Kinder',
    news_page_title: 'Neuigkeiten des Vereins',
    gallery_photos_eyebrow: 'Galerie', gallery_photos_title: 'Fotos vom Verein',
    gallery_videos_eyebrow: 'Videos', gallery_videos_title: 'Technik und Wettkampf',

    pricing_eyebrow: 'Preise', pricing_title: 'Mitgliedsbeiträge',
    pricing_lede: 'Das sind unsere aktuellen Preise. Bei Fragen zu Paketen, Geschwisterrabatten oder Ähnlichem schreib uns über Instagram, Facebook oder WhatsApp.',

    trial_eyebrow: 'Komm vorbei', trial_title: 'Probetraining buchen',
    trial_lede: 'Ganz unverbindlich. Fülle das Formular aus, wir melden uns, um Tag und Uhrzeit zu bestätigen; du kannst deinen Platz auch direkt hier bezahlen und sichern.',
    trial_form_title: 'Erzähl uns von dir',
    trial_label_name: 'Vollständiger Name', trial_label_contact: 'Telefon oder E-Mail',
    trial_label_category: 'Für wen ist der Kurs?', trial_label_message: 'Nachricht (optional)',
    trial_placeholder_message: 'Passende Tage oder Uhrzeiten, Vorerfahrung usw.',
    trial_submit: 'Anfrage senden',

    private_eyebrow: 'In deinem Tempo', private_title: 'Einzelstunden',
    private_lede: '1-zu-1-Einheiten mit einem Trainer, zu der Zeit, die dir am besten passt. Fülle das Formular aus, wir melden uns, um Tag und Uhrzeit abzustimmen.',
    private_form_title: 'Erzähl uns von dir',
    private_placeholder_message: 'Passende Tage oder Uhrzeiten, dein Ziel für die Stunden usw.',

    team_eyebrow: 'Unser Team', team_title: 'Trainer',
    team_affiliation: 'Team unter der Leitung von Prof. Ayoze Ramírez, angegliedert an Team Rumen Caraballo.',
    achievements_eyebrow: 'Erfolge', achievements_title: 'Wettkämpfe und Ergebnisse',

    faq_eyebrow: 'Hilfe', faq_title: 'Häufig gestellte Fragen',

    legal_eyebrow: 'Rechtliches', legal_title: 'Impressum, Datenschutz und Cookies',

    footer_direccion: 'El Tablero, Maspalomas',
    footer_como_llegar: 'Route anzeigen →',
    footer_copyright: 'Team Berimbolo. Respekt, Disziplin und Gemeinschaft, auf und neben der Matte.',
    footer_legal_link: 'Impressum und Datenschutz',

    cargando: 'Wird geladen…',
  },
};

function leerIdiomaGuardado() {
  const m = document.cookie.split('; ').find(row => row.startsWith('idioma='));
  return m ? m.split('=')[1] : 'es';
}
function guardarIdioma(lang) {
  const fecha = new Date();
  fecha.setTime(fecha.getTime() + 365 * 24 * 60 * 60 * 1000);
  document.cookie = `idioma=${lang}; expires=${fecha.toUTCString()}; path=/; SameSite=Lax`;
}

function aplicarIdioma(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.es;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
  });
  document.documentElement.lang = lang;
  document.querySelectorAll('.lang-switch button').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  aplicarIdioma(leerIdiomaGuardado());
  document.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.addEventListener('click', () => {
      guardarIdioma(btn.dataset.lang);
      aplicarIdioma(btn.dataset.lang);
    });
  });
});
