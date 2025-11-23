// Construye la URL embed robusta usando location.origin
function buildEmbedUrl(id, autoplay = false) {
  const params = new URLSearchParams({
    enablejsapi: '1',
    rel: '0',
    controls: '1',
    modestbranding: '1'
  });
  if (autoplay) params.set('autoplay', '1');
  // añade origin dinámicamente (evita problemas de validación)
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}&origin=${location.origin}`;
}

const iframe = document.getElementById('playerFrame');

function loadTrackById(id, autoplay=false) {
  // muestra spinner opcional
  const spinner = document.getElementById('loadingSpinner');
  if (spinner) spinner.style.display = 'block';

  // carga el iframe (embed "no-cookie")
  iframe.src = buildEmbedUrl(id, autoplay);

  // oculta spinner tras unos segundos (simple UX)
  setTimeout(()=>{ if (spinner) spinner.style.display = 'none'; }, 1500);
}

// Inicializa con la pista activa (si existe)
const active = document.querySelector('.track.active');
if (active) loadTrackById(active.dataset.id);

// Click en pistas
document.querySelectorAll('.track').forEach(track=>{
  track.addEventListener('click', ()=>{
    document.querySelectorAll('.track').forEach(t=>t.classList.remove('active'));
    track.classList.add('active');
    loadTrackById(track.dataset.id, true);
    // actualizar título/lyrics/duración si lo deseas:
    const title = track.dataset.title || '';
    const lyrics = track.dataset.lyrics || '';
    document.getElementById('lyricsTitle').textContent = title;
    document.getElementById('lyricsContent').textContent = lyrics;
  });
});
