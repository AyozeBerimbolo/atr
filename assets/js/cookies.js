// Banner de cookies muy simple: solo informa (este sitio no usa cookies de
// terceros ni analíticas propias; Supabase y YouTube son los únicos servicios
// externos, ver política de privacidad). Guarda la aceptación en una cookie
// propia de 6 meses.

function leerCookie(nombre) {
  return document.cookie.split('; ').find(row => row.startsWith(nombre + '='))?.split('=')[1];
}
function escribirCookie(nombre, valor, dias) {
  const fecha = new Date();
  fecha.setTime(fecha.getTime() + dias * 24 * 60 * 60 * 1000);
  document.cookie = `${nombre}=${valor}; expires=${fecha.toUTCString()}; path=/; SameSite=Lax`;
}

document.addEventListener('DOMContentLoaded', () => {
  if (leerCookie('cookies_aceptadas')) return;

  const banner = document.createElement('div');
  banner.id = 'cookieBanner';
  banner.innerHTML = `
    <p>Usamos cookies técnicas necesarias para el funcionamiento de la web y, si inicias sesión, la autenticación del panel. Más información en nuestra <a href="aviso-legal.html">política de privacidad y cookies</a>.</p>
    <div class="actions">
      <button class="btn btn-outline btn-sm" id="cookieAceptar">Entendido</button>
    </div>
  `;
  document.body.appendChild(banner);
  document.getElementById('cookieAceptar').addEventListener('click', () => {
    escribirCookie('cookies_aceptadas', '1', 180);
    banner.remove();
  });
});
