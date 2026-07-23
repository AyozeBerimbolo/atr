# ATR Team Berimbolo — sitio web del club

Web estática (HTML/CSS/JS, sin frameworks) pensada para alojarse en **GitHub Pages**,
con **Supabase** como backend (base de datos, autenticación y almacenamiento de fotos).
No requiere ningún paso de compilación (build).

## ¿Por qué Supabase y no Firebase?

Pediste dejar abierta la opción entre los dos, así que una aclaración antes de empezar:
todo este proyecto está construido sobre **Supabase**, no Firebase. Los dos son válidos
para un sitio así, pero Supabase encaja mejor con lo que pide el club:

- Su base de datos es **SQL normal (Postgres)**: el archivo `supabase/schema.sql` se
  ejecuta una vez y crea todas las tablas (noticias, horario, fotos, tarifas...) de golpe,
  con la seguridad ya configurada. En Firebase (NoSQL) habría que definir cada colección
  a mano desde la consola, sin ese script inicial.
- Su capa gratuita incluye autenticación + base de datos + almacenamiento de archivos
  en un solo panel, igual que Firebase, así que no se pierde nada al elegir uno u otro.
- Si en algún momento prefieres migrar a Firebase, la parte que cambiaría es sobre todo
  `assets/js/supabase-config.js`, `main.js` y `admin.js` (las llamadas a la base de datos);
  el resto del sitio (HTML, CSS, textos, PDF, lógica de idiomas) no depende del backend.

## Estructura del proyecto

```
index.html            → Inicio (filosofía del Jiu Jitsu, accesos, noticias y horario)
adultos.html           → Clases de adultos
menores.html           → Clases de menores
horario.html           → Horario completo
noticias.html          → Tablón de noticias
galeria.html           → Fotos y vídeos de YouTube
tarifas.html           → Cuotas del club
prueba.html            → Solicitud y pago de la clase de prueba
equipo.html            → Instructores y palmarés / competiciones
faq.html               → Preguntas frecuentes
aviso-legal.html       → Aviso legal, privacidad y cookies (plantilla a personalizar)
admin/index.html       → Login del panel
admin/dashboard.html   → Panel de administración (noticias, horario, fotos, vídeos, tarifas, clase de prueba, equipo, palmarés, FAQ, testimonios, enlaces)
assets/css/style.css   → Todo el diseño
assets/img/logo.jpg    → Logo del club (tu imagen original, recortada)
assets/img/favicon.png → Icono de pestaña del navegador
assets/js/             → Lógica: supabase-config.js, main.js (público), admin.js (panel), i18n.js (idiomas), cookies.js (banner)
assets/docs/autorizacion-menores.pdf → Autorización descargable para el tutor legal de menores
supabase/schema.sql    → Script para crear las tablas y la seguridad en Supabase
```

Nota: el diseño ya no usa `partials/` con `fetch()` — la cabecera y el pie de página están
directamente escritos dentro de cada página HTML. Esto es a propósito: así cada página
funciona por sí sola (incluso si la abres suelta, sin servidor), sin depender de que el
navegador pueda "traer" otro archivo.

## 1. Crear el proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) → crea una cuenta gratuita → **New project**.
2. Cuando esté listo, entra en **SQL Editor → New query**, pega todo el contenido de
   `supabase/schema.sql` y dale a **Run**. Esto crea las tablas de noticias, horario,
   fotos, vídeos y enlaces, con la seguridad (RLS) ya configurada.
3. Ve a **Storage** y comprueba que se ha creado el bucket `gallery` (lo crea el propio
   script). Si no existe, créalo manualmente como bucket **público** llamado `gallery`.
4. Ve a **Authentication → Users → Add user** y crea el usuario del club, por ejemplo
   `admin@atrteamberimbolo.com` con una contraseña segura. Con eso ya puedes entrar al panel.
   No actives el registro público: el club solo necesita este único usuario.
5. Ve a **Project Settings → API** y copia:
   - **Project URL**
   - **anon public key**

## 2. Conectar la web con Supabase

Abre `assets/js/supabase-config.js` y sustituye:

```js
const SUPABASE_URL = 'https://TU-PROYECTO.supabase.co';
const SUPABASE_ANON_KEY = 'TU-ANON-KEY-PUBLICA';
```

por los valores reales de tu proyecto. Esta clave "anon" es pública a propósito (viaja
al navegador de cualquier visitante); lo que protege los datos son las políticas RLS
del paso anterior, no esta clave.

## 3. Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub y sube todo el contenido de esta carpeta.
2. En el repositorio: **Settings → Pages → Source: Deploy from a branch**, elige la
   rama `main` y la carpeta `/ (root)`.
3. En un par de minutos tu web estará disponible en
   `https://tu-usuario.github.io/nombre-del-repositorio/`.
4. El panel de administración quedará en
   `https://tu-usuario.github.io/nombre-del-repositorio/admin/`.
   No hace falta ocultarlo: sin iniciar sesión con el usuario creado en Supabase no se
   puede editar nada (y con RLS, tampoco vía API).

## 4. Uso diario del panel

- Entra en `/admin/` con el correo y contraseña creados en Supabase.
- Desde las pestañas puedes: publicar noticias, añadir o quitar clases del horario,
  subir fotos, añadir vídeos de YouTube, gestionar tarifas, configurar la clase de
  prueba y ver las solicitudes recibidas, añadir instructores y resultados de
  competición, escribir preguntas frecuentes, publicar testimonios de alumnos, y
  actualizar los enlaces de Instagram, Facebook, YouTube, WhatsApp y Google Maps.
- Todo se refleja al momento en la web pública, sin tocar código.

## Idiomas (Español / English / Deutsch)

Arriba a la derecha de cada página hay un pequeño selector **ES / EN / DE**. Traduce
el texto fijo de la plantilla (menús, titulares, botones, formularios) al instante,
sin recargar la página, y recuerda la elección en el navegador de cada visitante.

Importante: **el contenido que escribes desde el panel** (noticias, nombres de clases
en el horario, biografías de instructores, preguntas frecuentes, testimonios...) se
muestra tal cual lo escribas, en el idioma en que lo escribas — no se traduce
automáticamente. Si quieres que ese contenido también esté en varios idiomas, la forma
más simple es escribirlo ya en dos o tres idiomas dentro del mismo campo (por ejemplo,
el título de una noticia en español seguido de la versión en inglés entre paréntesis).

## Clase de prueba con pago

La pestaña **"Clase de prueba"** del panel te deja configurar el precio, la descripción y un
**enlace de pago** (por ejemplo un Stripe Payment Link, un PayPal.me o el enlace que te dé tu
banco/TPV). Cuando alguien rellena el formulario en `prueba.html`:

1. Su solicitud (nombre, contacto, si es para adultos o menores, mensaje) se guarda en Supabase
   y aparece en la lista de "Solicitudes recibidas" del panel, con un desplegable de estado
   (pendiente / contactado / confirmado).
2. En la misma página ve el precio y un botón **"Reservar y pagar"** que lleva a tu enlace de pago.

Importante: esta web **no procesa el pago en sí misma** (eso requeriría un servidor/backend con
las claves secretas de una pasarela de pago, algo que no encaja con un sitio 100% estático). El
flujo es: la persona paga en tu pasarela externa → tú confirmas manualmente la reserva desde el
panel. Si más adelante quieres pagos y confirmación 100% automáticos, la vía natural sería añadir
una Supabase Edge Function que cree sesiones de Stripe Checkout y reciba su webhook — es una
ampliación posterior, no algo imprescindible para empezar.

## Personalizar el aviso legal y la autorización de menores

- **`aviso-legal.html`**: contiene un texto de plantilla con datos entre corchetes
  (`[NOMBRE DEL CLUB]`, `[NIF/CIF]`, `[DIRECCIÓN]`, `[EMAIL DE CONTACTO]`). Sustitúyelos por los
  reales antes de publicar la web. No es asesoramiento legal: para un club que trabaja con
  menores, conviene que lo revise una gestoría o un abogado.
- **`assets/docs/autorizacion-menores.pdf`**: documento para imprimir, rellenar a mano y firmar
  (nombre del menor, tutor legal, datos de salud básicos y autorización de imagen). También
  contiene los mismos corchetes `[NOMBRE DEL CLUB]` y `[EMAIL DE CONTACTO]` — puedes regenerarlo
  o editarlo con cualquier editor de PDF una vez tengas esos datos definitivos.

## Ideas para seguir mejorando la web

Con todo lo anterior, la web ya cubre prácticamente toda la lista de mejoras que se
suele echar en falta en la web de un club: clase de prueba con pago, tarifas, equipo
e instructores, palmarés, preguntas frecuentes, testimonios, mapa embebido, aviso legal,
autorización de menores y web en tres idiomas. Quedan dos cosas que dependen de pasos
externos, no de código:

- **Pago y confirmación 100% automáticos**: con una Supabase Edge Function que cree
  sesiones de Stripe Checkout y procese su webhook (ver la sección de más arriba).
- **SEO básico**: dar de alta el club en Google Business Profile con el mismo nombre,
  dirección y enlaces que en la web, para aparecer en búsquedas locales tipo
  "jiu jitsu Gran Canaria". Esto se hace desde la cuenta de Google del club, no
  desde el código de la web.
