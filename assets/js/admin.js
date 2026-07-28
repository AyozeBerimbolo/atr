// ============================================================
// Panel de administración — requiere sesión Supabase activa.
// Todas las tablas tienen RLS: solo un usuario autenticado
// (el admin del club) puede insertar/editar/borrar.
// ============================================================

(async function protegerPanel() {
  const { data } = await supabaseClient.auth.getSession();
  if (!data.session) window.location.href = 'index.html';
})();

document.getElementById('logoutBtn').addEventListener('click', async () => {
  await supabaseClient.auth.signOut();
  window.location.href = 'index.html';
});

// ---------- Pestañas ----------
document.querySelectorAll('.admin-sidebar .tab[data-tab]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab[data-tab]').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
  });
});

function mostrarMsg(id, texto, esError = false) {
  const el = document.getElementById(id);
  el.textContent = texto;
  el.className = 'msg ' + (esError ? 'error' : 'ok');
}

// ============================================================
// NOTICIAS
// ============================================================
async function refrescarNoticiasAdmin() {
  const el = document.getElementById('newsAdminList');
  const { data, error } = await supabaseClient.from('news').select('*').order('created_at', { ascending: false });
  if (error) { el.innerHTML = ''; return; }
  el.innerHTML = data.map(n => `
    <div class="row">
      <span class="grow">${n.title}</span>
      <button class="btn btn-danger btn-sm" onclick="borrarNoticia('${n.id}')">Borrar</button>
    </div>
  `).join('') || '<div class="empty-state">Sin noticias todavía.</div>';
}
async function borrarNoticia(id) {
  if (!confirm('¿Borrar esta noticia?')) return;
  await supabaseClient.from('news').delete().eq('id', id);
  refrescarNoticiasAdmin();
}
document.getElementById('formNoticia').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('newsTitle').value;
  const body = document.getElementById('newsBody').value;
  const image_url = document.getElementById('newsImage').value || null;
  const { error } = await supabaseClient.from('news').insert({ title, body, image_url });
  if (error) return mostrarMsg('newsMsg', 'Error al publicar: ' + error.message, true);
  mostrarMsg('newsMsg', 'Noticia publicada.');
  e.target.reset();
  refrescarNoticiasAdmin();
});

// ============================================================
// HORARIO
// ============================================================
const DIAS_ADMIN = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
async function refrescarHorarioAdmin() {
  const el = document.getElementById('schedAdminList');
  const { data, error } = await supabaseClient.from('schedule').select('*').order('day_of_week').order('start_time');
  if (error) { el.innerHTML = ''; return; }
  el.innerHTML = data.map(s => `
    <div class="row">
      <span class="grow">${DIAS_ADMIN[s.day_of_week]} · ${s.start_time.slice(0,5)}–${s.end_time.slice(0,5)} · ${s.category} ${s.label ? '· ' + s.label : ''}</span>
      <button class="btn btn-danger btn-sm" onclick="borrarHorario('${s.id}')">Borrar</button>
    </div>
  `).join('') || '<div class="empty-state">Sin clases todavía.</div>';
}
async function borrarHorario(id) {
  if (!confirm('¿Borrar esta clase del horario?')) return;
  await supabaseClient.from('schedule').delete().eq('id', id);
  refrescarHorarioAdmin();
}
document.getElementById('formHorario').addEventListener('submit', async (e) => {
  e.preventDefault();
  const registro = {
    category: document.getElementById('schedCategory').value,
    day_of_week: parseInt(document.getElementById('schedDay').value, 10),
    start_time: document.getElementById('schedStart').value,
    end_time: document.getElementById('schedEnd').value,
    label: document.getElementById('schedLabel').value || null,
  };
  const { error } = await supabaseClient.from('schedule').insert(registro);
  if (error) return mostrarMsg('schedMsg', 'Error: ' + error.message, true);
  mostrarMsg('schedMsg', 'Clase añadida.');
  e.target.reset();
  refrescarHorarioAdmin();
});

// ============================================================
// FOTOS (Supabase Storage, bucket "gallery")
// ============================================================
async function refrescarFotosAdmin() {
  const el = document.getElementById('photoAdminList');
  const { data, error } = await supabaseClient.from('photos').select('*').order('created_at', { ascending: false });
  if (error) { el.innerHTML = ''; return; }
  el.innerHTML = data.map(p => `
    <div class="row">
      <span class="grow">${p.caption || '(sin descripción)'}</span>
      <button class="btn btn-danger btn-sm" onclick="borrarFoto('${p.id}', '${p.storage_path}')">Borrar</button>
    </div>
  `).join('') || '<div class="empty-state">Sin fotos todavía.</div>';
}
async function borrarFoto(id, storagePath) {
  if (!confirm('¿Borrar esta foto?')) return;
  await supabaseClient.storage.from('gallery').remove([storagePath]);
  await supabaseClient.from('photos').delete().eq('id', id);
  refrescarFotosAdmin();
}
document.getElementById('formFoto').addEventListener('submit', async (e) => {
  e.preventDefault();
  const file = document.getElementById('photoFile').files[0];
  const caption = document.getElementById('photoCaption').value || null;
  if (!file) return;
  mostrarMsg('photoMsg', 'Subiendo…');
  const path = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
  const { error: upErr } = await supabaseClient.storage.from('gallery').upload(path, file);
  if (upErr) return mostrarMsg('photoMsg', 'Error al subir: ' + upErr.message, true);
  const { data: pub } = supabaseClient.storage.from('gallery').getPublicUrl(path);
  const { error } = await supabaseClient.from('photos').insert({ url: pub.publicUrl, storage_path: path, caption });
  if (error) return mostrarMsg('photoMsg', 'Error al guardar: ' + error.message, true);
  mostrarMsg('photoMsg', 'Foto subida.');
  e.target.reset();
  refrescarFotosAdmin();
});

// ============================================================
// VÍDEOS
// ============================================================
async function refrescarVideosAdmin() {
  const el = document.getElementById('videoAdminList');
  const { data, error } = await supabaseClient.from('videos').select('*').order('created_at', { ascending: false });
  if (error) { el.innerHTML = ''; return; }
  el.innerHTML = data.map(v => `
    <div class="row">
      <span class="grow">${v.title || v.youtube_url}</span>
      <button class="btn btn-danger btn-sm" onclick="borrarVideo('${v.id}')">Borrar</button>
    </div>
  `).join('') || '<div class="empty-state">Sin vídeos todavía.</div>';
}
async function borrarVideo(id) {
  if (!confirm('¿Borrar este vídeo?')) return;
  await supabaseClient.from('videos').delete().eq('id', id);
  refrescarVideosAdmin();
}
document.getElementById('formVideo').addEventListener('submit', async (e) => {
  e.preventDefault();
  const youtube_url = document.getElementById('videoUrl').value;
  const title = document.getElementById('videoTitle').value || null;
  const { error } = await supabaseClient.from('videos').insert({ youtube_url, title });
  if (error) return mostrarMsg('videoMsg', 'Error: ' + error.message, true);
  mostrarMsg('videoMsg', 'Vídeo añadido.');
  e.target.reset();
  refrescarVideosAdmin();
});

// ============================================================
// CLASE DE PRUEBA — configuración (fila única) + solicitudes
// ============================================================
async function cargarOfertaAdmin() {
  const { data, error } = await supabaseClient.from('trial_offer').select('*').eq('id', 1).single();
  if (error || !data) return;
  document.getElementById('offerPrice').value = data.price;
  document.getElementById('offerCurrency').value = data.currency;
  document.getElementById('offerDescription').value = data.description || '';
  document.getElementById('offerPaymentUrl').value = data.payment_url || '';
}
document.getElementById('formOferta').addEventListener('submit', async (e) => {
  e.preventDefault();
  const registro = {
    id: 1,
    price: parseFloat(document.getElementById('offerPrice').value),
    currency: document.getElementById('offerCurrency').value,
    description: document.getElementById('offerDescription').value || null,
    payment_url: document.getElementById('offerPaymentUrl').value || null,
  };
  const { error } = await supabaseClient.from('trial_offer').upsert(registro, { onConflict: 'id' });
  if (error) return mostrarMsg('offerMsg', 'Error: ' + error.message, true);
  mostrarMsg('offerMsg', 'Configuración guardada.');
});

const ESTADOS_SOLICITUD = ['pendiente', 'contactado', 'confirmado'];
async function refrescarSolicitudesAdmin() {
  const el = document.getElementById('trialAdminList');
  const { data, error } = await supabaseClient.from('trial_requests').select('*').order('created_at', { ascending: false });
  if (error) { el.innerHTML = ''; return; }
  el.innerHTML = data.map(r => `
    <div class="row">
      <span class="grow"><strong>${r.full_name}</strong> · ${r.contact} · ${r.category}${r.message ? ' · ' + r.message : ''}</span>
      <select onchange="cambiarEstadoSolicitud('${r.id}', this.value)">
        ${ESTADOS_SOLICITUD.map(s => `<option value="${s}" ${s === r.status ? 'selected' : ''}>${s}</option>`).join('')}
      </select>
      <button class="btn btn-danger btn-sm" onclick="borrarSolicitud('${r.id}')">Borrar</button>
    </div>
  `).join('') || '<div class="empty-state">Sin solicitudes todavía.</div>';
}
async function cambiarEstadoSolicitud(id, status) {
  await supabaseClient.from('trial_requests').update({ status }).eq('id', id);
}
async function borrarSolicitud(id) {
  if (!confirm('¿Borrar esta solicitud?')) return;
  await supabaseClient.from('trial_requests').delete().eq('id', id);
  refrescarSolicitudesAdmin();
}

// ============================================================
// CLASES PARTICULARES — configuración (fila única) + solicitudes
// ============================================================
async function cargarOfertaParticularAdmin() {
  const { data, error } = await supabaseClient.from('private_offer').select('*').eq('id', 1).single();
  if (error || !data) return;
  document.getElementById('privateOfferPrice').value = data.price;
  document.getElementById('privateOfferCurrency').value = data.currency;
  document.getElementById('privateOfferDescription').value = data.description || '';
  document.getElementById('privateOfferPaymentUrl').value = data.payment_url || '';
}
document.getElementById('formOfertaParticular').addEventListener('submit', async (e) => {
  e.preventDefault();
  const registro = {
    id: 1,
    price: parseFloat(document.getElementById('privateOfferPrice').value),
    currency: document.getElementById('privateOfferCurrency').value,
    description: document.getElementById('privateOfferDescription').value || null,
    payment_url: document.getElementById('privateOfferPaymentUrl').value || null,
  };
  const { error } = await supabaseClient.from('private_offer').upsert(registro, { onConflict: 'id' });
  if (error) return mostrarMsg('privateOfferMsg', 'Error: ' + error.message, true);
  mostrarMsg('privateOfferMsg', 'Configuración guardada.');
});

async function refrescarSolicitudesParticularAdmin() {
  const el = document.getElementById('privateAdminList');
  const { data, error } = await supabaseClient.from('private_requests').select('*').order('created_at', { ascending: false });
  if (error) { el.innerHTML = ''; return; }
  el.innerHTML = data.map(r => `
    <div class="row">
      <span class="grow"><strong>${r.full_name}</strong> · ${r.contact}${r.message ? ' · ' + r.message : ''}</span>
      <select onchange="cambiarEstadoSolicitudParticular('${r.id}', this.value)">
        ${ESTADOS_SOLICITUD.map(s => `<option value="${s}" ${s === r.status ? 'selected' : ''}>${s}</option>`).join('')}
      </select>
      <button class="btn btn-danger btn-sm" onclick="borrarSolicitudParticular('${r.id}')">Borrar</button>
    </div>
  `).join('') || '<div class="empty-state">Sin solicitudes todavía.</div>';
}
async function cambiarEstadoSolicitudParticular(id, status) {
  await supabaseClient.from('private_requests').update({ status }).eq('id', id);
}
async function borrarSolicitudParticular(id) {
  if (!confirm('¿Borrar esta solicitud?')) return;
  await supabaseClient.from('private_requests').delete().eq('id', id);
  refrescarSolicitudesParticularAdmin();
}

// ============================================================
// TARIFAS
// ============================================================
async function refrescarTarifasAdmin() {
  const el = document.getElementById('priceAdminList');
  const { data, error } = await supabaseClient.from('pricing_plans').select('*').order('sort_order').order('price');
  if (error) { el.innerHTML = ''; return; }
  el.innerHTML = data.map(p => {
    const faltan = [];
    if (!p.name_en) faltan.push('EN');
    if (!p.name_de) faltan.push('DE');
    const aviso = faltan.length ? ` <span style="color:var(--text-muted); font-size:12px;">(sin traducir: ${faltan.join(', ')})</span>` : '';
    return `
    <div class="row">
      <span class="grow">${p.category} · ${p.name} · ${p.price}€ ${p.period}${aviso}</span>
      <button class="btn btn-danger btn-sm" onclick="borrarTarifa('${p.id}')">Borrar</button>
    </div>
  `;
  }).join('') || '<div class="empty-state">Sin tarifas todavía.</div>';
}
async function borrarTarifa(id) {
  if (!confirm('¿Borrar esta tarifa?')) return;
  await supabaseClient.from('pricing_plans').delete().eq('id', id);
  refrescarTarifasAdmin();
}
document.getElementById('formTarifa').addEventListener('submit', async (e) => {
  e.preventDefault();
  const registro = {
    category: document.getElementById('priceCategory').value,
    name: document.getElementById('priceName').value,
    name_en: document.getElementById('priceNameEn').value || null,
    name_de: document.getElementById('priceNameDe').value || null,
    price: parseFloat(document.getElementById('priceAmount').value),
    period: document.getElementById('pricePeriod').value,
    description: document.getElementById('priceDescription').value || null,
    description_en: document.getElementById('priceDescriptionEn').value || null,
    description_de: document.getElementById('priceDescriptionDe').value || null,
  };
  const { error } = await supabaseClient.from('pricing_plans').insert(registro);
  if (error) return mostrarMsg('priceMsg', 'Error: ' + error.message, true);
  mostrarMsg('priceMsg', 'Tarifa añadida.');
  e.target.reset();
  refrescarTarifasAdmin();
});

// ============================================================
// EQUIPO: INSTRUCTORES
// ============================================================
async function refrescarEquipoAdmin() {
  const el = document.getElementById('teamAdminList');
  const { data, error } = await supabaseClient.from('instructors').select('*').order('sort_order');
  if (error) { el.innerHTML = ''; return; }
  el.innerHTML = data.map(i => `
    <div class="row">
      <span class="grow">${i.name}${i.belt ? ' · ' + i.belt : ''}</span>
      <button class="btn btn-danger btn-sm" onclick="borrarInstructor('${i.id}')">Borrar</button>
    </div>
  `).join('') || '<div class="empty-state">Sin instructores todavía.</div>';
}
async function borrarInstructor(id) {
  if (!confirm('¿Borrar este instructor?')) return;
  await supabaseClient.from('instructors').delete().eq('id', id);
  refrescarEquipoAdmin();
}
document.getElementById('formInstructor').addEventListener('submit', async (e) => {
  e.preventDefault();
  const registro = {
    name: document.getElementById('teamName').value,
    belt: document.getElementById('teamBelt').value || null,
    bio: document.getElementById('teamBio').value || null,
    photo_url: document.getElementById('teamPhoto').value || null,
  };
  const { error } = await supabaseClient.from('instructors').insert(registro);
  if (error) return mostrarMsg('teamMsg', 'Error: ' + error.message, true);
  mostrarMsg('teamMsg', 'Instructor añadido.');
  e.target.reset();
  refrescarEquipoAdmin();
});

// ============================================================
// PALMARÉS
// ============================================================
async function refrescarPalmaresAdmin() {
  const el = document.getElementById('achAdminList');
  const { data, error } = await supabaseClient.from('achievements').select('*').order('sort_order').order('event_date', { ascending: false });
  if (error) { el.innerHTML = ''; return; }
  el.innerHTML = data.map(a => `
    <div class="row">
      <span class="grow">${a.title}${a.event_date ? ' · ' + a.event_date : ''}</span>
      <button class="btn btn-danger btn-sm" onclick="borrarPalmares('${a.id}')">Borrar</button>
    </div>
  `).join('') || '<div class="empty-state">Sin resultados todavía.</div>';
}
async function borrarPalmares(id) {
  if (!confirm('¿Borrar este resultado?')) return;
  await supabaseClient.from('achievements').delete().eq('id', id);
  refrescarPalmaresAdmin();
}
document.getElementById('formPalmares').addEventListener('submit', async (e) => {
  e.preventDefault();
  const registro = {
    title: document.getElementById('achTitle').value,
    event_date: document.getElementById('achDate').value || null,
    description: document.getElementById('achDescription').value || null,
    image_url: document.getElementById('achImage').value || null,
  };
  const { error } = await supabaseClient.from('achievements').insert(registro);
  if (error) return mostrarMsg('achMsg', 'Error: ' + error.message, true);
  mostrarMsg('achMsg', 'Resultado añadido.');
  e.target.reset();
  refrescarPalmaresAdmin();
});

// ============================================================
// PREGUNTAS FRECUENTES
// ============================================================
async function refrescarFaqAdmin() {
  const el = document.getElementById('faqAdminList');
  const { data, error } = await supabaseClient.from('faqs').select('*').order('sort_order');
  if (error) { el.innerHTML = ''; return; }
  el.innerHTML = data.map(f => `
    <div class="row">
      <span class="grow">${f.question}</span>
      <button class="btn btn-danger btn-sm" onclick="borrarFaq('${f.id}')">Borrar</button>
    </div>
  `).join('') || '<div class="empty-state">Sin preguntas todavía.</div>';
}
async function borrarFaq(id) {
  if (!confirm('¿Borrar esta pregunta?')) return;
  await supabaseClient.from('faqs').delete().eq('id', id);
  refrescarFaqAdmin();
}
document.getElementById('formFaq').addEventListener('submit', async (e) => {
  e.preventDefault();
  const registro = {
    question: document.getElementById('faqQuestion').value,
    answer: document.getElementById('faqAnswer').value,
  };
  const { error } = await supabaseClient.from('faqs').insert(registro);
  if (error) return mostrarMsg('faqMsg', 'Error: ' + error.message, true);
  mostrarMsg('faqMsg', 'Pregunta añadida.');
  e.target.reset();
  refrescarFaqAdmin();
});

// ============================================================
// TESTIMONIOS
// ============================================================
async function refrescarTestimoniosAdmin() {
  const el = document.getElementById('testAdminList');
  const { data, error } = await supabaseClient.from('testimonials').select('*').order('sort_order');
  if (error) { el.innerHTML = ''; return; }
  el.innerHTML = data.map(t => `
    <div class="row">
      <span class="grow">${t.name}${t.role ? ' · ' + t.role : ''}</span>
      <button class="btn btn-danger btn-sm" onclick="borrarTestimonio('${t.id}')">Borrar</button>
    </div>
  `).join('') || '<div class="empty-state">Sin testimonios todavía.</div>';
}
async function borrarTestimonio(id) {
  if (!confirm('¿Borrar este testimonio?')) return;
  await supabaseClient.from('testimonials').delete().eq('id', id);
  refrescarTestimoniosAdmin();
}
document.getElementById('formTestimonio').addEventListener('submit', async (e) => {
  e.preventDefault();
  const registro = {
    name: document.getElementById('testName').value,
    role: document.getElementById('testRole').value || null,
    quote: document.getElementById('testQuote').value,
  };
  const { error } = await supabaseClient.from('testimonials').insert(registro);
  if (error) return mostrarMsg('testMsg', 'Error: ' + error.message, true);
  mostrarMsg('testMsg', 'Testimonio añadido.');
  e.target.reset();
  refrescarTestimoniosAdmin();
});

// ============================================================
// ENLACES SOCIALES (tabla "links": key, url) — upsert por clave
// ============================================================
async function cargarEnlacesAdmin() {
  const { data, error } = await supabaseClient.from('links').select('*');
  if (error) return;
  const mapa = Object.fromEntries(data.map(l => [l.key, l.url]));
  document.getElementById('linkInstagram').value = mapa.instagram || '';
  document.getElementById('linkFacebook').value = mapa.facebook || '';
  document.getElementById('linkYoutube').value = mapa.youtube || '';
  document.getElementById('linkWhatsapp').value = mapa.whatsapp || '';
  document.getElementById('linkMaps').value = mapa.maps || '';
}
document.getElementById('formEnlaces').addEventListener('submit', async (e) => {
  e.preventDefault();
  const registros = [
    { key: 'instagram', url: document.getElementById('linkInstagram').value || null },
    { key: 'facebook', url: document.getElementById('linkFacebook').value || null },
    { key: 'youtube', url: document.getElementById('linkYoutube').value || null },
    { key: 'whatsapp', url: document.getElementById('linkWhatsapp').value || null },
    { key: 'maps', url: document.getElementById('linkMaps').value || null },
  ];
  const { error } = await supabaseClient.from('links').upsert(registros, { onConflict: 'key' });
  if (error) return mostrarMsg('linksMsg', 'Error: ' + error.message, true);
  mostrarMsg('linksMsg', 'Enlaces guardados.');
});

// ---------- Carga inicial ----------
refrescarNoticiasAdmin();
refrescarHorarioAdmin();
refrescarFotosAdmin();
refrescarVideosAdmin();
cargarOfertaAdmin();
refrescarSolicitudesAdmin();
cargarOfertaParticularAdmin();
refrescarSolicitudesParticularAdmin();
refrescarTarifasAdmin();
refrescarEquipoAdmin();
refrescarPalmaresAdmin();
refrescarFaqAdmin();
refrescarTestimoniosAdmin();
cargarEnlacesAdmin();
