-- ============================================================
-- ATR TEAM BERIMBOLO — esquema de base de datos (Supabase)
-- Ejecuta este archivo completo en: Supabase → SQL Editor → New query
-- ============================================================

-- Extensión para generar UUIDs
create extension if not exists "pgcrypto";

-- ---------- NOTICIAS ----------
create table if not exists news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  image_url text,
  created_at timestamptz not null default now()
);

-- ---------- HORARIO ----------
create table if not exists schedule (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('adultos', 'menores')),
  day_of_week int not null check (day_of_week between 0 and 6), -- 0 = domingo ... 6 = sábado
  start_time time not null,
  end_time time not null,
  label text,
  created_at timestamptz not null default now()
);

-- ---------- FOTOS ----------
create table if not exists photos (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  storage_path text not null,
  caption text,
  created_at timestamptz not null default now()
);

-- ---------- VÍDEOS DE YOUTUBE ----------
create table if not exists videos (
  id uuid primary key default gen_random_uuid(),
  youtube_url text not null,
  title text,
  created_at timestamptz not null default now()
);

-- ---------- ENLACES (instagram, facebook, youtube, whatsapp, maps) ----------
create table if not exists links (
  key text primary key,
  url text
);

-- filas iniciales (se editan luego desde el panel admin)
insert into links (key, url) values
  ('instagram', null), ('facebook', null), ('youtube', null),
  ('whatsapp', null), ('maps', 'https://maps.app.goo.gl/CgaQXvJxpQVZNumM8')
on conflict (key) do nothing;

-- ---------- TARIFAS ----------
create table if not exists pricing_plans (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('adultos', 'menores', 'general')),
  name text not null,
  price numeric not null,
  period text not null default '/mes',
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- CLASE DE PRUEBA: configuracion (una sola fila, id = 1) ----------
create table if not exists trial_offer (
  id int primary key default 1,
  price numeric not null default 0,
  currency text not null default 'EUR',
  description text default 'Ven a probar una clase de Jiu Jitsu con nosotros.',
  payment_url text,
  constraint trial_offer_single_row check (id = 1)
);
insert into trial_offer (id) values (1) on conflict (id) do nothing;

-- ---------- CLASE DE PRUEBA: solicitudes recibidas ----------
create table if not exists trial_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  contact text not null,
  category text not null check (category in ('adultos', 'menores')),
  message text,
  status text not null default 'pendiente' check (status in ('pendiente', 'contactado', 'confirmado')),
  created_at timestamptz not null default now()
);

-- ---------- EQUIPO: INSTRUCTORES ----------
create table if not exists instructors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  belt text, -- ej. "Cinturón negro 2º grado"
  bio text,
  photo_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- OPCIONAL: descomenta y ejecuta esta línea si quieres pre-cargar al instructor
-- principal en vez de escribirlo a mano desde el panel de administración.
-- insert into instructors (name, belt, bio, sort_order) values
--   ('Ayoze Ramírez', 'Profesor principal', 'Director de ATR Team Berimbolo, equipo afiliado a Team Rumen Caraballo.', 0);

-- ---------- PALMARÉS / COMPETICIONES ----------
create table if not exists achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date date,
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- PREGUNTAS FRECUENTES ----------
create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- TESTIMONIOS ----------
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text, -- ej. "Alumno adultos", "Madre de alumno"
  quote text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- Lectura: pública (cualquiera puede ver la web).
-- Escritura: solo un usuario autenticado (el admin del club).
-- ============================================================
alter table news enable row level security;
alter table schedule enable row level security;
alter table photos enable row level security;
alter table videos enable row level security;
alter table links enable row level security;

create policy "lectura publica noticias" on news for select using (true);
create policy "escritura admin noticias" on news for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "lectura publica horario" on schedule for select using (true);
create policy "escritura admin horario" on schedule for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "lectura publica fotos" on photos for select using (true);
create policy "escritura admin fotos" on photos for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "lectura publica videos" on videos for select using (true);
create policy "escritura admin videos" on videos for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "lectura publica enlaces" on links for select using (true);
create policy "escritura admin enlaces" on links for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

alter table pricing_plans enable row level security;
create policy "lectura publica tarifas" on pricing_plans for select using (true);
create policy "escritura admin tarifas" on pricing_plans for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

alter table trial_offer enable row level security;
create policy "lectura publica oferta prueba" on trial_offer for select using (true);
create policy "escritura admin oferta prueba" on trial_offer for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Solicitudes de clase de prueba: cualquier visitante puede CREAR una solicitud
-- (formulario público), pero solo el admin autenticado puede LEERLAS o borrarlas.
alter table trial_requests enable row level security;
create policy "insercion publica solicitudes" on trial_requests for insert
  with check (true);
create policy "lectura admin solicitudes" on trial_requests for select
  using (auth.role() = 'authenticated');
create policy "gestion admin solicitudes" on trial_requests for update
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "borrado admin solicitudes" on trial_requests for delete
  using (auth.role() = 'authenticated');

alter table instructors enable row level security;
create policy "lectura publica instructores" on instructors for select using (true);
create policy "escritura admin instructores" on instructors for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

alter table achievements enable row level security;
create policy "lectura publica palmares" on achievements for select using (true);
create policy "escritura admin palmares" on achievements for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

alter table faqs enable row level security;
create policy "lectura publica faqs" on faqs for select using (true);
create policy "escritura admin faqs" on faqs for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

alter table testimonials enable row level security;
create policy "lectura publica testimonios" on testimonials for select using (true);
create policy "escritura admin testimonios" on testimonials for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE: bucket "gallery" para las fotos
-- Crea el bucket manualmente desde Storage → New bucket → "gallery" → marcar como público.
-- Después ejecuta estas políticas (sustituyen a las de por defecto de storage.objects):
-- ============================================================
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

create policy "lectura publica gallery" on storage.objects for select
  using (bucket_id = 'gallery');

create policy "subida admin gallery" on storage.objects for insert
  with check (bucket_id = 'gallery' and auth.role() = 'authenticated');

create policy "borrado admin gallery" on storage.objects for delete
  using (bucket_id = 'gallery' and auth.role() = 'authenticated');
