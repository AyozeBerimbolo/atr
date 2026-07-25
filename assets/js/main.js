// ============================================================
// Funciones públicas de lectura de datos (sin login).
// Cada página llama a la función que necesita cuando el DOM
// (y los partials) ya están cargados.
// ============================================================

const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

function formatearFecha(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

function escapeHtml(str = '') {
  return str.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function youtubeEmbedUrl(url) {
  try {
    const u = new URL(url);
    let id = u.searchParams.get('v');
    if (!id && u.hostname.includes('youtu.be')) id = u.pathname.slice(1);
    if (!id && u.pathname.includes('/embed/')) return url;
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : url;
  } catch {
    return url;
  }
}

// ---------- NOTICIAS ----------
async function cargarNoticias(targetId, limite = null) {
  const el = document.getElementById(targetId);
  if (!el) return;
  let query = supabaseClient.from('news').select('*').order('created_at', { ascending: false });
  if (limite) query = query.limit(limite);
  const { data, error } = await query;
  if (error || !data || data.length === 0) {
    el.innerHTML = '<div class="empty-state">Todavía no hay noticias publicadas. Vuelve pronto.</div>';
    return;
  }
  el.innerHTML = data.map(n => `
    <article class="news-item">
      <div class="date">${formatearFecha(n.created_at)}</div>
      <h3>${escapeHtml(n.title)}</h3>
      <p>${escapeHtml(n.body).replace(/\n/g, '<br>')}</p>
      ${n.image_url ? `<img src="${n.image_url}" alt="${escapeHtml(n.title)}">` : ''}
    </article>
  `).join('');
}

// ---------- HORARIO (vista semanal en columnas) ----------
const ORDEN_DIAS_SEMANA = [1, 2, 3, 4, 5, 6, 0]; // Lunes...Domingo (en BD: 0=domingo)

async function cargarHorario(targetId, categoria = null) {
  const el = document.getElementById(targetId);
  if (!el) return;
  let query = supabaseClient.from('schedule').select('*').order('start_time');
  if (categoria) query = query.eq('category', categoria);
  const { data, error } = await query;
  if (error || !data || data.length === 0) {
    el.innerHTML = '<div class="empty-state">El horario se publicará en breve.</div>';
    return;
  }
  el.innerHTML = `<div class="week-grid">` + ORDEN_DIAS_SEMANA.map(dow => {
    const clases = data
      .filter(s => s.day_of_week === dow)
      .sort((a, b) => a.start_time.localeCompare(b.start_time));
    return `
      <div class="week-day">
        <div class="week-day-header">${DIAS[dow]}</div>
        <div class="week-day-body">
          ${clases.length === 0 ? '<div class="week-empty">—</div>' : clases.map(s => `
            <div class="class-chip ${s.category === 'menores' ? 'chip-menores' : 'chip-adultos'}">
              <div class="chip-time">${s.start_time.slice(0,5)}–${s.end_time.slice(0,5)}</div>
              <div class="chip-label">${escapeHtml(s.label || (s.category === 'adultos' ? 'Adultos' : 'Menores'))}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('') + `</div>`;
}

// ---------- GALERÍA: FOTOS ----------
async function cargarFotos(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const { data, error } = await supabaseClient.from('photos').select('*').order('created_at', { ascending: false });
  if (error || !data || data.length === 0) {
    el.innerHTML = '<div class="empty-state">Todavía no hay fotos.</div>';
    return;
  }
  el.innerHTML = data.map(p => `<img src="${p.url}" alt="${escapeHtml(p.caption || 'Foto del club')}" loading="lazy">`).join('');
}

// ---------- GALERÍA: VÍDEOS ----------
async function cargarVideos(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const { data, error } = await supabaseClient.from('videos').select('*').order('created_at', { ascending: false });
  if (error || !data || data.length === 0) {
    el.innerHTML = '<div class="empty-state">Todavía no hay vídeos.</div>';
    return;
  }
  el.innerHTML = data.map(v => `
    <div class="video-card">
      <iframe src="${youtubeEmbedUrl(v.youtube_url)}" title="${escapeHtml(v.title || 'Vídeo')}" allowfullscreen loading="lazy"></iframe>
      <p>${escapeHtml(v.title || '')}</p>
    </div>
  `).join('');
}

// ---------- ENLACES SOCIALES (instagram, facebook, whatsapp, youtube, maps) ----------
const ICONOS_SOCIAL = {
  instagram: '📷 Instagram',
  facebook: '📘 Facebook',
  youtube: '▶️ YouTube',
  whatsapp: '💬 WhatsApp',
  maps: '📍 Cómo llegar',
};

async function cargarEnlacesSociales(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const { data, error } = await supabaseClient.from('links').select('*');
  if (error || !data) return;
  el.innerHTML = data
    .filter(l => l.url)
    .map(l => `<a class="social-pill" href="${l.url}" target="_blank" rel="noopener">${ICONOS_SOCIAL[l.key] || l.key}</a>`)
    .join('');

  // si hay un enlace de maps personalizado, sustituye el del footer por defecto
  const mapsLink = data.find(l => l.key === 'maps' && l.url);
  const footMap = document.getElementById('footMapLink');
  if (mapsLink && footMap) footMap.href = mapsLink.url;
}

// ---------- TARIFAS ----------
function formatearPrecio(valor, moneda = 'EUR') {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: moneda, minimumFractionDigits: valor % 1 === 0 ? 0 : 2 }).format(valor);
}

async function cargarTarifas(targetId, categoria = null) {
  const el = document.getElementById(targetId);
  if (!el) return;
  let query = supabaseClient.from('pricing_plans').select('*').order('sort_order').order('price');
  if (categoria) query = query.eq('category', categoria);
  const { data, error } = await query;
  if (error || !data || data.length === 0) {
    el.innerHTML = '<div class="empty-state">Las tarifas se publicarán en breve. Escríbenos para más información.</div>';
    return;
  }
  el.innerHTML = data.map(p => `
    <div class="pricing-card">
      <div class="tag">${p.category}</div>
      <h3>${escapeHtml(p.name)}</h3>
      <div class="price">${formatearPrecio(p.price)}<span>${escapeHtml(p.period)}</span></div>
      ${p.description ? `<p>${escapeHtml(p.description)}</p>` : ''}
    </div>
  `).join('');
}

// ---------- CLASE DE PRUEBA ----------
async function cargarOfertaPrueba(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const { data, error } = await supabaseClient.from('trial_offer').select('*').eq('id', 1).single();
  if (error || !data) {
    el.innerHTML = '<div class="empty-state">Escríbenos para reservar tu clase de prueba.</div>';
    return;
  }
  el.innerHTML = `
    <div class="panel">
      <div class="price" style="font-family:var(--font-display); font-size:36px; color:var(--cyan);">
        ${formatearPrecio(data.price, data.currency)}
        <span style="font-family:var(--font-body); font-size:14px; color:var(--text-muted); font-weight:normal;"> / clase de prueba</span>
      </div>
      <p style="color:var(--text-muted)">${escapeHtml(data.description || '')}</p>
      ${data.payment_url ? `<a href="${data.payment_url}" target="_blank" rel="noopener" class="btn btn-gold">Reservar y pagar →</a>` : ''}
    </div>
  `;
}

async function enviarSolicitudPrueba(formEl, msgId) {
  const full_name = formEl.querySelector('#trialName').value;
  const contact = formEl.querySelector('#trialContact').value;
  const category = formEl.querySelector('#trialCategory').value;
  const message = formEl.querySelector('#trialMessage').value || null;
  const { error } = await supabaseClient.from('trial_requests').insert({ full_name, contact, category, message });
  const msg = document.getElementById(msgId);
  if (error) {
    msg.textContent = 'No se pudo enviar la solicitud. Inténtalo de nuevo o escríbenos directamente.';
    msg.className = 'msg error';
    return false;
  }
  msg.textContent = '¡Solicitud enviada! Te contactaremos en breve para confirmar el horario.';
  msg.className = 'msg ok';
  formEl.reset();
  return true;
}

// ---------- CLASES PARTICULARES ----------
async function cargarOfertaParticular(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const { data, error } = await supabaseClient.from('private_offer').select('*').eq('id', 1).single();
  if (error || !data) {
    el.innerHTML = '<div class="empty-state">Escríbenos para reservar una clase particular.</div>';
    return;
  }
  el.innerHTML = `
    <div class="panel">
      <div class="price" style="font-family:var(--font-display); font-size:36px; color:var(--cyan);">
        ${formatearPrecio(data.price, data.currency)}
        <span style="font-family:var(--font-body); font-size:14px; color:var(--text-muted); font-weight:normal;"> / clase particular</span>
      </div>
      <p style="color:var(--text-muted)">${escapeHtml(data.description || '')}</p>
      ${data.payment_url ? `<a href="${data.payment_url}" target="_blank" rel="noopener" class="btn btn-gold">Reservar y pagar →</a>` : ''}
    </div>
  `;
}

async function enviarSolicitudParticular(formEl, msgId) {
  const full_name = formEl.querySelector('#privateName').value;
  const contact = formEl.querySelector('#privateContact').value;
  const message = formEl.querySelector('#privateMessage').value || null;
  const { error } = await supabaseClient.from('private_requests').insert({ full_name, contact, message });
  const msg = document.getElementById(msgId);
  if (error) {
    msg.textContent = 'No se pudo enviar la solicitud. Inténtalo de nuevo o escríbenos directamente.';
    msg.className = 'msg error';
    return false;
  }
  msg.textContent = '¡Solicitud enviada! Te contactaremos en breve para acordar día y hora.';
  msg.className = 'msg ok';
  formEl.reset();
  return true;
}

// ---------- EQUIPO: INSTRUCTORES ----------
async function cargarInstructores(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const { data, error } = await supabaseClient.from('instructors').select('*').order('sort_order');
  if (error || !data || data.length === 0) {
    el.innerHTML = '<div class="empty-state" data-i18n="team_empty">Todavía no hemos publicado el equipo de instructores.</div>';
    return;
  }
  el.innerHTML = data.map(i => `
    <div class="team-card">
      ${i.photo_url ? `<img src="${i.photo_url}" alt="${escapeHtml(i.name)}">` : '<div class="team-photo-placeholder">🥋</div>'}
      <h3>${escapeHtml(i.name)}</h3>
      ${i.belt ? `<div class="belt-tag">${escapeHtml(i.belt)}</div>` : ''}
      ${i.bio ? `<p>${escapeHtml(i.bio)}</p>` : ''}
    </div>
  `).join('');
}

// ---------- PALMARÉS ----------
async function cargarPalmares(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const { data, error } = await supabaseClient.from('achievements').select('*').order('sort_order').order('event_date', { ascending: false });
  if (error || !data || data.length === 0) {
    el.innerHTML = '<div class="empty-state" data-i18n="achievements_empty">Todavía no hay resultados publicados.</div>';
    return;
  }
  el.innerHTML = data.map(a => `
    <div class="achievement-card">
      ${a.image_url ? `<img src="${a.image_url}" alt="${escapeHtml(a.title)}">` : ''}
      <div class="body">
        ${a.event_date ? `<div class="date">${formatearFecha(a.event_date)}</div>` : ''}
        <h3>${escapeHtml(a.title)}</h3>
        ${a.description ? `<p>${escapeHtml(a.description)}</p>` : ''}
      </div>
    </div>
  `).join('');
}

// ---------- PREGUNTAS FRECUENTES ----------
async function cargarFaqs(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const { data, error } = await supabaseClient.from('faqs').select('*').order('sort_order');
  if (error || !data || data.length === 0) {
    el.innerHTML = '<div class="empty-state" data-i18n="faq_empty">Todavía no hay preguntas publicadas.</div>';
    return;
  }
  el.innerHTML = data.map((f, idx) => `
    <div class="faq-item">
      <button class="faq-question" onclick="this.parentElement.classList.toggle('open')">
        <span>${escapeHtml(f.question)}</span><span class="faq-icon">+</span>
      </button>
      <div class="faq-answer"><p>${escapeHtml(f.answer)}</p></div>
    </div>
  `).join('');
}

// ---------- TESTIMONIOS ----------
async function cargarTestimonios(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const { data, error } = await supabaseClient.from('testimonials').select('*').order('sort_order');
  if (error || !data || data.length === 0) {
    el.style.display = 'none';
    return;
  }
  el.innerHTML = data.map(t => `
    <div class="testimonial-card">
      <p>&ldquo;${escapeHtml(t.quote)}&rdquo;</p>
      <div class="who">${escapeHtml(t.name)}${t.role ? ' · ' + escapeHtml(t.role) : ''}</div>
    </div>
  `).join('');
}

// Carga automática de los enlaces sociales del footer (el footer ya viene
// incluido en el HTML de cada página, no se inserta por fetch).
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('footSocial')) cargarEnlacesSociales('footSocial');
});
