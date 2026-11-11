/* METALLICA · LANDING · INTERACCIONES 777 */
/* Replicadas del prototipo de Figma (PARCIAL-3 · Laboratorio UX/UI 777).
   Cada sección empieza con un comentario que termina en 777. */

const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const esMovil = window.matchMedia("(max-width: 899px)"); // mismo corte que el CSS










/* DESPLEGABLES (OVERLAYS) 777 */
const DURACION_OVERLAY = 450; // ms — "Move in" 0.45s (el menú usa Dissolve 0.4s)
let overlayAbierto = null;
let elementoPrevio = null;

function abrirOverlay(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  if (overlayAbierto && overlayAbierto !== overlay) cerrarOverlay({ inmediato: true, devolverFoco: false });

  elementoPrevio = elementoPrevio || document.activeElement;
  overlay.hidden = false;
  document.body.classList.add("bloqueado");
  // Un frame después para que la transición arranque desde el estado inicial
  requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add("abierto")));
  overlayAbierto = overlay;

  const enfocable = overlay.querySelector("[data-cerrar]:not(.overlay__fondo), button, a, input");
  if (enfocable) enfocable.focus({ preventScroll: true });
}

function cerrarOverlay({ inmediato = false, devolverFoco = true } = {}) {
  const overlay = overlayAbierto;
  if (!overlay) return;
  overlay.classList.remove("abierto");
  overlayAbierto = null;

  const terminar = () => {
    if (!overlay.classList.contains("abierto")) overlay.hidden = true;
    if (!overlayAbierto) document.body.classList.remove("bloqueado");
  };
  if (inmediato || reducirMovimiento) terminar();
  else setTimeout(terminar, DURACION_OVERLAY);

  if (devolverFoco && elementoPrevio) {
    elementoPrevio.focus({ preventScroll: true });
    elementoPrevio = null;
  }
}

document.addEventListener("click", (e) => {
  const abrir = e.target.closest("[data-abrir]");
  if (abrir) {
    e.preventDefault();
    elementoPrevio = abrir;
    abrirOverlay(abrir.dataset.abrir);
    return;
  }

  // "Swap" del prototipo: cambia un desplegable por otro
  const cambiar = e.target.closest("[data-cambiar]");
  if (cambiar) {
    e.preventDefault();
    abrirOverlay(cambiar.dataset.cambiar);
    return;
  }

  if (e.target.closest("[data-cerrar]")) {
    e.preventDefault();
    cerrarOverlay();
    return;
  }

  // Enlaces internos dentro de un desplegable: cerrar y luego desplazarse
  const ancla = e.target.closest('.overlay a[href^="#"]');
  if (ancla && overlayAbierto) {
    const destino = document.querySelector(ancla.getAttribute("href"));
    e.preventDefault();
    cerrarOverlay({ inmediato: true, devolverFoco: false });
    if (destino) destino.scrollIntoView({ behavior: reducirMovimiento ? "auto" : "smooth" });
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlayAbierto) cerrarOverlay();
});










/* VISTA RÁPIDA DE PRODUCTOS 777 */
const productos = [
  {
    ruta: ["Tienda", "Vinilos"], foto: "img/producto-1.png", etiqueta: "NUEVO",
    categoria: "VINILO · 2LP", titulo: "72 SEASONS", subtitulo: "Vinilo doble · 2023",
    descripcion: "El undécimo álbum de estudio de Metallica: 12 canciones y 77 minutos de energía pura, en vinilo doble de 180 g con portada gatefold.",
    precio: "$36,98 USD", chips: ["Negro 180 g", "Amarillo (edición limitada)"],
    detalles: ["Vinilo doble de 180 g", "Portada gatefold con librillo de letras", "12 canciones · 77 minutos", "Descarga digital incluida"],
  },
  {
    ruta: ["Tienda", "Vinilos"], foto: "img/producto-2.png", etiqueta: "",
    categoria: "VINILO · 2LP", titulo: "HARDWIRED… TO SELF-DESTRUCT", subtitulo: "Vinilo doble · 2016",
    descripcion: "El regreso furioso de 2016 en doble vinilo de 180 g, con la portada de los cuatro rostros fundidos.",
    precio: "$39,98 USD", chips: ["Negro 180 g", "Rojo translúcido"],
    detalles: ["Vinilo doble de 180 g", "Portada gatefold", "12 canciones", "Descarga digital incluida"],
  },
  {
    ruta: ["Tienda", "Vinilos"], foto: "img/producto-3.png", etiqueta: "EDICIÓN LIMITADA",
    categoria: "VINILO · 1LP", titulo: "RIDE THE LIGHTNING", subtitulo: "Remasterizado · 1984",
    descripcion: "El segundo álbum de la banda, remasterizado y prensado en vinilo azul eléctrico de edición limitada.",
    precio: "$32,99 USD", chips: ["Azul eléctrico", "Negro 180 g"],
    detalles: ["Vinilo de 180 g remasterizado", "Edición limitada en color azul", "8 canciones", "Inserto con letras"],
  },
  {
    ruta: ["Tienda", "Vinilos"], foto: "img/producto-4.png", etiqueta: "",
    categoria: "VINILO · 2LP", titulo: "…AND JUSTICE FOR ALL", subtitulo: "Remasterizado · 1988",
    descripcion: "El cuarto álbum de estudio, remasterizado en doble vinilo de 180 g con la icónica Lady Justice en la portada.",
    precio: "$36,98 USD", chips: ["Negro 180 g"],
    detalles: ["Vinilo doble de 180 g", "Remasterización oficial", "9 canciones", "Portada gatefold"],
  },
  {
    ruta: ["Tienda", "Vinilos"], foto: "img/producto-5.png", etiqueta: "",
    categoria: "VINILO · 2LP", titulo: "LOAD", subtitulo: "Vinilo doble · 1996",
    descripcion: "El sexto álbum de estudio en doble vinilo de 180 g, con el arte original de Andrés Serrano.",
    precio: "$36,98 USD", chips: ["Negro 180 g"],
    detalles: ["Vinilo doble de 180 g", "Portada gatefold", "14 canciones", "Descarga digital incluida"],
  },
  {
    ruta: ["Tienda", "Instrumentos"], foto: "img/producto-6.png", etiqueta: "EXCLUSIVO QUINTO MIEMBRO",
    categoria: "GUITARRA · MODELO DE FIRMA", titulo: "ESP SNAKEBYTE NEGRA", subtitulo: "Modelo de firma de James Hetfield",
    descripcion: "La guitarra de firma de James Hetfield, con cuerpo de caoba y acabado negro satinado, lista para el escenario.",
    precio: "$1.399,00 USD", chips: ["Negro satinado"],
    detalles: ["Cuerpo de caoba", "Pastillas activas EMG", "Puente fijo", "Incluye estuche rígido"],
  },
];

const vistaRapida = document.getElementById("vista-rapida");

function llenarVistaRapida(p) {
  const campo = (nombre) => vistaRapida.querySelector(`[data-vr="${nombre}"]`);
  ["etiqueta", "categoria", "titulo", "subtitulo", "descripcion", "precio"].forEach((k) => {
    campo(k).textContent = p[k];
  });
  // La ruta va en partes; la "/" entre ellas la pone el CSS
  campo("ruta").replaceChildren(...p.ruta.map((parte) => Object.assign(document.createElement("span"), { textContent: parte })));
  campo("foto").src = p.foto;
  campo("foto").alt = p.titulo;

  campo("chips").innerHTML = p.chips
    .map((c, i) => `<button class="chip${i === 0 ? " activo" : ""}">${c}</button>`)
    .join("");
  campo("detalles").innerHTML = p.detalles.map((d) => `<li>${d}</li>`).join("");
  vistaRapida.querySelector("[data-cantidad-valor]").textContent = "1";
}

document.querySelectorAll("[data-vista-rapida]").forEach((card) => {
  card.addEventListener("click", () => {
    llenarVistaRapida(productos[Number(card.dataset.vistaRapida)]);
    elementoPrevio = card;
    abrirOverlay("vista-rapida");
  });
});

// Chips seleccionables (una opción activa por grupo)
document.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  chip.parentElement.querySelectorAll(".chip").forEach((c) => c.classList.toggle("activo", c === chip));
});

// Selector de cantidad
document.querySelectorAll("[data-cantidad]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const salida = btn.parentElement.querySelector("[data-cantidad-valor]");
    const valor = Math.max(1, Math.min(10, Number(salida.textContent) + Number(btn.dataset.cantidad)));
    salida.textContent = valor;
  });
});

// Mostrar / ocultar contraseña
document.querySelectorAll("[data-mostrar]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const input = btn.parentElement.querySelector("input");
    const visible = input.type === "text";
    input.type = visible ? "password" : "text";
    btn.textContent = visible ? "Mostrar" : "Ocultar";
  });
});

// Los formularios son de prototipo: no se envían a ningún lado
document.querySelectorAll("[data-formulario]").forEach((form) => {
  form.addEventListener("submit", (e) => e.preventDefault());
});










/* SLIDERS (HERO Y GUITAR HERO) 777 */
/* Cambian solos cada 5 s; flechas y puntos con fundido de 0.6 s. */
const INTERVALO_SLIDER = 5000;

document.querySelectorAll("[data-slider]").forEach((slider) => {
  const slides = [...slider.querySelectorAll(":scope > .slide")];
  const puntos = [...slider.querySelectorAll(".punto")];
  let actual = 0;
  let temporizador;

  function ir(indice) {
    actual = (indice + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle("activo", i === actual));
    puntos.forEach((p, i) => {
      p.classList.toggle("activo", i === actual);
      p.setAttribute("aria-current", i === actual ? "true" : "false");
    });
    reiniciar();
  }

  function reiniciar() {
    clearInterval(temporizador);
    if (!reducirMovimiento) temporizador = setInterval(() => ir(actual + 1), INTERVALO_SLIDER);
  }

  slider.querySelector("[data-anterior]").addEventListener("click", () => ir(actual - 1));
  slider.querySelector("[data-siguiente]").addEventListener("click", () => ir(actual + 1));
  puntos.forEach((p, i) => p.addEventListener("click", () => ir(i)));

  // Pausa mientras el mouse está encima o hay un desplegable abierto
  slider.addEventListener("mouseenter", () => clearInterval(temporizador));
  slider.addEventListener("mouseleave", reiniciar);

  // Deslizar con el dedo o arrastrando con el mouse (izquierda = siguiente)
  let inicioX = null;
  let inicioY = 0;
  slider.addEventListener("pointerdown", (e) => {
    // En mobile el slider de Guitar Hero es una fila con scroll: no se desliza aquí
    if (esMovil.matches && slider.classList.contains("gh-slider")) return;
    inicioX = e.clientX;
    inicioY = e.clientY;
  });
  slider.addEventListener("pointerup", (e) => {
    if (inicioX === null) return;
    const dx = e.clientX - inicioX;
    const dy = e.clientY - inicioY;
    inicioX = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      ir(dx < 0 ? actual + 1 : actual - 1);
      // Que el gesto no cuente además como clic sobre un botón
      ignorarSiguienteClic(slider);
    }
  });
  slider.addEventListener("pointercancel", () => { inicioX = null; });
  slider.addEventListener("dragstart", (e) => e.preventDefault());
  ir(0);
});

// Cancela solo el clic que llega justo al soltar después de un arrastre
function ignorarSiguienteClic(el) {
  const bloquear = (c) => { c.preventDefault(); c.stopPropagation(); };
  el.addEventListener("click", bloquear, { capture: true, once: true });
  setTimeout(() => el.removeEventListener("click", bloquear, { capture: true }), 0);
}










/* MOBILE · ARRASTRAR CARRUSELES CON EL MOUSE 777 */
/* Con el dedo ya se deslizan solos (scroll horizontal). Esto permite
   moverlos también arrastrando con el mouse en una ventana angosta. */
document.querySelectorAll(".carrusel__ventana, .gh-slider").forEach((fila) => {
  let inicioX = 0;
  let scrollInicio = 0;
  let arrastrando = false;
  let seMovio = false;

  fila.addEventListener("pointerdown", (e) => {
    if (!esMovil.matches || e.pointerType !== "mouse" || e.button !== 0) return;
    arrastrando = true;
    seMovio = false;
    inicioX = e.clientX;
    scrollInicio = fila.scrollLeft;
  });

  window.addEventListener("pointermove", (e) => {
    if (!arrastrando) return;
    const dx = e.clientX - inicioX;
    if (!seMovio && Math.abs(dx) > 5) {
      seMovio = true;
      fila.classList.add("arrastrando");
    }
    if (seMovio) fila.scrollLeft = scrollInicio - dx;
  });

  window.addEventListener("pointerup", () => {
    if (!arrastrando) return;
    arrastrando = false;
    if (seMovio) {
      fila.classList.remove("arrastrando");
      // Si se arrastró, el clic al soltar no abre la tarjeta
      ignorarSiguienteClic(fila);
    }
  });

  fila.addEventListener("dragstart", (e) => e.preventDefault());
});










/* CARRUSELES (GIRA Y TIENDA) 777 */
/* 3 posiciones; "anterior" desde la primera salta a la última, como en Figma. */
document.querySelectorAll("[data-carrusel]").forEach((carrusel) => {
  const ventana = carrusel.querySelector(".carrusel__ventana");
  const fila = carrusel.querySelector("[data-fila]");
  const avance = carrusel.querySelector("[data-avance]");
  const cards = fila.children;
  let indice = 0;

  function medidas() {
    const gap = parseFloat(getComputedStyle(fila).columnGap) || 0;
    const paso = cards[0].getBoundingClientRect().width + gap;
    const visibles = Math.max(1, Math.floor((ventana.clientWidth + gap) / paso));
    return { paso, maximo: Math.max(0, cards.length - visibles) };
  }

  function actualizar() {
    const { paso, maximo } = medidas();
    if (indice > maximo) indice = 0;
    if (indice < 0) indice = maximo;
    fila.style.transform = `translateX(${-indice * paso}px)`;
    const posiciones = maximo + 1;
    avance.style.width = `${100 / posiciones}%`;
    avance.style.left = `${(100 / posiciones) * indice}%`;
  }

  carrusel.querySelector("[data-anterior]").addEventListener("click", () => { indice--; actualizar(); });
  carrusel.querySelector("[data-siguiente]").addEventListener("click", () => { indice++; actualizar(); });
  window.addEventListener("resize", actualizar);
  actualizar();
});










/* LETRAS DE FONDO (TOUR, MERCH, FAN) 777 */
/* Ligadas al scroll. Progreso 0 → 1 según cuánto de la sección ha entrado en pantalla:
   0 = la sección apenas asoma por abajo (frame 0) · 1 = subió el 60 % de la pantalla (frame 100).
   Al bajar se encienden las letras una a una; al subir se apagan en orden inverso. */
const bloquesLetras = [...document.querySelectorAll(".letras")];

function actualizarLetras() {
  const alto = window.innerHeight;
  bloquesLetras.forEach((bloque) => {
    const top = bloque.parentElement.getBoundingClientRect().top;
    const progreso = Math.min(Math.max((alto - top) / (alto * 0.6), 0), 1);
    const letras = [...bloque.children];
    const cuantas = Math.round(progreso * letras.length);
    letras.forEach((letra, i) => letra.classList.toggle("visible", i < cuantas));
  });
}

let letrasPendiente = false;
window.addEventListener("scroll", () => {
  if (!letrasPendiente) {
    letrasPendiente = true;
    requestAnimationFrame(() => { actualizarLetras(); letrasPendiente = false; });
  }
}, { passive: true });
window.addEventListener("resize", actualizarLetras);
actualizarLetras();










/* PARALLAX (MÚSICA Y MUSEO) 777 */
const fondosParallax = [...document.querySelectorAll("[data-parallax]")];

if (fondosParallax.length && !reducirMovimiento) {
  let pendiente = false;

  function moverFondos() {
    const alto = window.innerHeight;
    fondosParallax.forEach((fondo) => {
      const seccion = fondo.closest("section");
      const rect = seccion.getBoundingClientRect();
      // 0 cuando la sección entra por abajo, 1 cuando sale por arriba
      const p = Math.min(1, Math.max(0, (alto - rect.top) / (alto + rect.height)));
      // El fondo es más alto que su caja: se mueve dentro de ese sobrante
      const sobra = fondo.offsetHeight - fondo.parentElement.offsetHeight;
      fondo.style.transform = `translateY(${(p - 0.5) * sobra}px)`;
    });
    pendiente = false;
  }

  window.addEventListener("scroll", () => {
    if (!pendiente) {
      pendiente = true;
      requestAnimationFrame(moverFondos);
    }
  }, { passive: true });
  window.addEventListener("resize", moverFondos);

  moverFondos();
}










/* MÚSICA · CARRUSEL 3D DE DISCOS 777 */
/* Idea del video de referencia: el disco del centro grande y de frente,
   los de los lados más chicos, oscuros y girados en perspectiva.
   Se mueve arrastrando (mouse o dedo), con las flechas o las barritas; da la vuelta.
   Clic en el disco del centro o en "Reproducir" = suena su mp3 (carpeta Assets/) y gira rápido. */
const seccionMusica = document.querySelector(".musica");
const escenaMusica = document.querySelector("[data-musica]");
const discos = [...document.querySelectorAll(".disco3d")];
const pasosMusica = [...document.querySelectorAll("[data-ir]")];
const fichaMusica = document.querySelector("[data-info]");
const botonPlay = document.querySelector("[data-musica-play]");
const textoPlay = document.querySelector("[data-play-texto]");
const limitar = (v, min, max) => Math.min(max, Math.max(min, v));

if (seccionMusica && discos.length) {
  const n = discos.length;
  let tam = 560;           // tamaño del disco del centro
  let indice = 0;          // disco elegido (puede pasar de n: da la vuelta)
  let posicion = 0;        // posición dibujada, va suave hacia el índice
  let arrastrando = false;
  let frente = -1;
  let inclinX = 0, inclinY = 0, objX = 0, objY = 0; // inclinación con el mouse
  const giros = discos.map(() => ({ angulo: Math.random() * 360, velocidad: 12 }));
  let sonando = -1;        // índice del disco que suena (-1 = ninguno)

  // Audio: cada disco tiene su mp3 (data-audio en el HTML)
  const pistas = discos.map((disco) => {
    const audio = new Audio(disco.dataset.audio);
    audio.loop = true;
    audio.preload = "none";
    audio.volume = 0.85;
    return audio;
  });

  function detener() {
    if (sonando < 0) return;
    pistas[sonando].pause();
    discos[sonando].classList.remove("sonando");
    sonando = -1;
    seccionMusica.classList.remove("sonando");
    botonPlay.setAttribute("aria-pressed", "false");
    textoPlay.textContent = "Reproducir";
  }

  function alternar() {
    const i = frente < 0 ? 0 : frente; // antes del primer cuadro, el del centro es el 1.º
    if (sonando === i) { detener(); return; }
    detener();
    sonando = i;
    discos[i].classList.add("sonando");
    seccionMusica.classList.add("sonando");
    botonPlay.setAttribute("aria-pressed", "true");
    textoPlay.textContent = "Pausar";
    // AbortError = se pausó antes de que empezara: no es un error real
    pistas[i].play().catch((error) => { if (error.name !== "AbortError") detener(); });
  }

  // Tamaño del disco según el espacio disponible
  function medir() {
    const ancho = escenaMusica.clientWidth;
    const movil = esMovil.matches;
    tam = movil
      ? limitar(ancho * 0.8, 200, 440)
      : limitar(Math.min(ancho * 0.56, window.innerHeight * 0.62), 300, 640);
    seccionMusica.style.setProperty("--tam", `${Math.round(tam)}px`);
  }

  // Ficha del disco del centro
  function mostrarFicha(i) {
    const d = discos[i].dataset;
    fichaMusica.querySelector("[data-info-num]").textContent = String(i + 1).padStart(2, "0");
    fichaMusica.querySelector("[data-info-titulo]").textContent = d.titulo;
    fichaMusica.querySelector("[data-info-anio]").textContent = d.anio;
    fichaMusica.querySelector("[data-info-canciones]").textContent = d.canciones;
    fichaMusica.querySelector("[data-info-tema]").textContent = d.tema;
    fichaMusica.classList.remove("cambiando");
    void fichaMusica.offsetWidth; // reinicia la animación
    fichaMusica.classList.add("cambiando");
    pasosMusica.forEach((b, k) => b.classList.toggle("activo", k === i));
  }

  // Trazos blancos "a mano" alrededor del disco del centro
  const trazos = document.querySelector(".musica__trazos");
  const lineasTrazo = [...trazos.querySelectorAll("path")];
  let trazosVisibles = false;
  // Posición del cursor en toda la ventana (null = fuera de la ventana o sin mouse).
  // Cada cuadro se revisa si está sobre el disco del centro: así los trazos se
  // borran aunque el cursor salga rápido, se haga scroll o el disco se mueva.
  let cursor = null;
  window.addEventListener("pointermove", (e) => {
    cursor = e.pointerType === "mouse" ? { x: e.clientX, y: e.clientY } : null;
  }, { passive: true });
  document.documentElement.addEventListener("mouseleave", () => { cursor = null; });
  window.addEventListener("blur", () => { cursor = null; });

  function cursorSobreDisco() {
    if (!cursor) return false;
    const centro = discos.find((d) => d.classList.contains("centro"));
    if (!centro) return false;
    const r = centro.getBoundingClientRect();
    // círculo del disco (no el cuadrado de la imagen)
    const radio = Math.min(r.width, r.height) / 2;
    return Math.hypot(cursor.x - (r.left + r.width / 2), cursor.y - (r.top + r.height / 2)) < radio;
  }

  // Un óvalo tembloroso que da algo más de una vuelta (como un marcador)
  function garabato(radio, vueltas) {
    const puntos = [];
    const cantidad = 26;
    const inicio = Math.random() * Math.PI * 2;
    const fase1 = Math.random() * 6, fase2 = Math.random() * 6;
    const ovalo = 0.9 + Math.random() * 0.08;
    const giro = Math.random() * Math.PI;
    for (let k = 0; k <= cantidad; k++) {
      const t = k / cantidad;
      const a = inicio + t * Math.PI * 2 * vueltas;
      const r = radio * (1 + 0.035 * Math.sin(a * 2 + fase1) + 0.025 * Math.sin(a * 3 + fase2)) + (Math.random() - 0.5) * 2.2 + t * 4;
      const x = Math.cos(a) * r, y = Math.sin(a) * r * ovalo;
      puntos.push([100 + x * Math.cos(giro) - y * Math.sin(giro), 100 + x * Math.sin(giro) + y * Math.cos(giro)]);
    }
    // Curva suave que pasa por los puntos (Catmull-Rom → Bézier)
    let d = `M${puntos[0][0].toFixed(1)} ${puntos[0][1].toFixed(1)}`;
    for (let k = 0; k < puntos.length - 1; k++) {
      const p0 = puntos[Math.max(0, k - 1)], p1 = puntos[k], p2 = puntos[k + 1], p3 = puntos[Math.min(puntos.length - 1, k + 2)];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    }
    return d;
  }

  function dibujarTrazos() {
    lineasTrazo[0].setAttribute("d", garabato(86, 1.12));
    lineasTrazo[1].setAttribute("d", garabato(91, 0.55));
    trazos.classList.remove("dibujando", "borrando");
    void trazos.getBoundingClientRect(); // reinicia la animación
    trazos.classList.add("dibujando");
  }

  // Distancia con vuelta: -n/2 … n/2
  const distancia = (i) => {
    let d = (i - posicion) % n;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  let ultimo = performance.now();
  function cuadro(ahora) {
    const dt = Math.min(0.05, (ahora - ultimo) / 1000);
    ultimo = ahora;

    if (!arrastrando) posicion += (indice - posicion) * Math.min(1, dt * 7);
    inclinX += (objX - inclinX) * Math.min(1, dt * 6);
    inclinY += (objY - inclinY) * Math.min(1, dt * 6);

    const separacion = tam * (esMovil.matches ? 0.78 : 0.82);
    discos.forEach((disco, i) => {
      const d = distancia(i);
      const a = Math.abs(d);
      const x = d * separacion;
      const z = -Math.min(a, 1.5) * tam * 0.6;
      const giroY = -limitar(d, -1.2, 1.2) * 42;
      const centro = Math.max(0, 1 - a); // 1 en el centro
      const rx = 10 * (1 - centro) + inclinX * centro;
      const ry = giroY + inclinY * centro;
      const opacidad = limitar((1.45 - a) / 0.3, 0, 1);

      // Giro: lento en reposo, rápido mientras suena
      const g = giros[i];
      const objetivo = sonando === i ? 320 : 14;
      g.velocidad += (objetivo - g.velocidad) * Math.min(1, dt * (sonando === i ? 1.6 : 1.1));
      g.angulo = (g.angulo + g.velocidad * dt) % 360;

      disco.style.transform = `translate3d(${x.toFixed(1)}px, 0, ${z.toFixed(1)}px) rotateY(${ry.toFixed(2)}deg) rotateX(${rx.toFixed(2)}deg)`;
      disco.style.opacity = opacidad.toFixed(3);
      disco.style.zIndex = String(100 - Math.round(a * 10));
      disco.style.pointerEvents = opacidad < 0.5 ? "none" : "";
      disco.style.setProperty("--brillo", (1 - Math.min(a, 1) * 0.6).toFixed(3));
      disco.style.setProperty("--luz", `${(30 + ry * 2).toFixed(1)}deg`);
      disco.firstElementChild.firstElementChild.style.transform = `rotate(${g.angulo.toFixed(2)}deg)`;
      disco.classList.toggle("centro", a < 0.5);
      disco.classList.toggle("lado", a >= 0.5);
    });

    // Trazos: solo mientras el cursor está sobre el disco del centro;
    // se borran al quitar el cursor (distintos cada vez)
    const quieto = !arrastrando && Math.abs(indice - posicion) < 0.03;
    const mostrar = quieto && cursorSobreDisco();
    if (mostrar && !trazosVisibles) {
      trazosVisibles = true;
      dibujarTrazos();
    } else if (!mostrar && trazosVisibles) {
      trazosVisibles = false;
      trazos.classList.remove("dibujando");
      trazos.classList.add("borrando");
    }

    const nuevo = ((Math.round(posicion) % n) + n) % n;
    if (nuevo !== frente) {
      frente = nuevo;
      mostrarFicha(frente);
      // Si suena un disco que ya no está al centro, se detiene
      if (sonando >= 0 && sonando !== frente) detener();
    }
    requestAnimationFrame(cuadro);
  }

  function irA(i) {
    // Va por el camino más corto (con vuelta)
    const actual = ((Math.round(indice) % n) + n) % n;
    let paso = i - actual;
    if (paso > n / 2) paso -= n;
    if (paso < -n / 2) paso += n;
    indice = Math.round(indice) + paso;
  }

  // Arrastre (mouse y dedo)
  let inicioX = 0, inicioY = 0, inicioPos = 0, presionado = false, seMovio = false;

  escenaMusica.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    presionado = true;
    seMovio = false;
    inicioX = e.clientX;
    inicioY = e.clientY;
    inicioPos = posicion;
  });

  window.addEventListener("pointermove", (e) => {
    // Inclinación del disco del centro según el mouse (efecto 3D)
    if (e.pointerType === "mouse") {
      const r = escenaMusica.getBoundingClientRect();
      if (e.clientY > r.top && e.clientY < r.bottom && e.clientX > r.left && e.clientX < r.right) {
        objY = ((e.clientX - (r.left + r.width / 2)) / r.width) * 24;
        objX = -((e.clientY - (r.top + r.height / 2)) / r.height) * 20;
      } else {
        objX = objY = 0;
      }
    }
    if (!presionado) return;
    const dx = e.clientX - inicioX;
    if (!seMovio) {
      if (Math.abs(dx) < 6) return;
      if (Math.abs(e.clientY - inicioY) > Math.abs(dx)) { presionado = false; return; } // scroll vertical
      seMovio = true;
      arrastrando = true;
      escenaMusica.classList.add("arrastrando");
    }
    posicion = inicioPos - dx / (tam * 0.9);
  });

  const soltar = () => {
    if (!presionado) return;
    presionado = false;
    if (!seMovio) return;
    arrastrando = false;
    escenaMusica.classList.remove("arrastrando");
    const delta = posicion - inicioPos;
    let destino = Math.round(posicion);
    if (Math.abs(delta) > 0.12 && destino === Math.round(inicioPos)) destino += Math.sign(delta);
    indice = destino;
    ignorarSiguienteClic(escenaMusica);
  };
  window.addEventListener("pointerup", soltar);
  window.addEventListener("pointercancel", soltar);
  escenaMusica.addEventListener("pointerleave", () => { objX = objY = 0; });

  // Trackpad: deslizar con dos dedos hacia los lados
  let acumulado = 0, enfriar = 0;
  escenaMusica.addEventListener("wheel", (e) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault();
    if (Date.now() < enfriar) return;
    acumulado += e.deltaX;
    if (Math.abs(acumulado) > 60) {
      indice = Math.round(indice) + Math.sign(acumulado);
      acumulado = 0;
      enfriar = Date.now() + 450;
    }
  }, { passive: false });

  // Clic: disco del centro = play/pausa; disco del lado = pasa al centro
  discos.forEach((disco, i) => disco.addEventListener("click", () => {
    if (disco.classList.contains("centro")) alternar();
    else irA(i);
  }));
  botonPlay.addEventListener("click", alternar);
  document.querySelector("[data-musica-anterior]").addEventListener("click", () => { indice = Math.round(indice) - 1; });
  document.querySelector("[data-musica-siguiente]").addEventListener("click", () => { indice = Math.round(indice) + 1; });
  pasosMusica.forEach((b) => b.addEventListener("click", () => irA(Number(b.dataset.ir))));

  window.addEventListener("resize", medir);
  medir();
  requestAnimationFrame(cuadro);
}










/* ENTRADAS AL HACER SCROLL 777 */
/* Títulos, tarjetas, Instagram, Museo, Fan club y footer aparecen al entrar en pantalla
   (escalonados). Al subir y volver a bajar, se repite la animación. */
const GRUPOS_REVELAR = [
  // [selector, clase extra, retraso entre elementos (s)]
  [".encabezado .super-titulo, .musica .super-titulo, .fan-club .super-titulo, .museo .super-titulo", "revelar--titulo", 0],
  [".encabezado .link, .encabezado .boton, .musica__antetitulo, .musica__bajada", "", 0.15],
  ["#noticias .card-noticia", "", 0.12],
  ["#gira .card-gira", "", 0.1],
  ["#tienda .card-producto", "", 0.1],
  [".carrusel__controles, .musica__indicador", "", 0],
  ["#instagram .card-ig", "revelar--zoom", 0.05],
  [".museo__contenido > *", "", 0.15],
  [".fan-club__imagen", "revelar--zoom", 0],
  // Los logos usan mix-blend-mode: si se anima su contenedor, se ve un
  // instante el fondo negro del PNG. Por eso se anima cada logo por separado.
  [".fan-club__logos > *", "", 0.1],
  [".fan-club__contenido > :not(.fan-club__logos)", "", 0.12],
  [".footer__contenido > *", "", 0.1],
];

if (!reducirMovimiento && "IntersectionObserver" in window) {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      const el = entrada.target;
      if (entrada.isIntersecting) {
        el.classList.add("revelado");
      } else if (entrada.boundingClientRect.top > window.innerHeight * 0.5) {
        // Quedó por debajo de la pantalla (se subió): vuelve al inicio
        el.classList.remove("revelado");
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  GRUPOS_REVELAR.forEach(([selector, extra, paso]) => {
    // Los retrasos se cuentan por grupo de hermanos (cada fila / grilla empieza en 0)
    const contador = new Map();
    document.querySelectorAll(selector).forEach((el) => {
      if (el.closest(".overlay") || el.classList.contains("revelar")) return;
      const padre = el.parentElement;
      const i = contador.get(padre) || 0;
      contador.set(padre, i + 1);
      el.classList.add("revelar");
      if (extra) el.classList.add(extra);
      el.style.setProperty("--retraso", `${Math.min(i * paso, 0.8)}s`);
      observador.observe(el);
    });
  });
}










/* HERO · PARALLAX Y PARALLAX SUAVE EN IMÁGENES 777 */
/* Mouse + scroll */
const heroParallax = document.querySelector(".hero");

if (heroParallax && !reducirMovimiento) {
  let mx = 0, my = 0, objMx = 0, objMy = 0;
  let animando = false;

  function pintarHero() {
    mx += (objMx - mx) * 0.08;
    my += (objMy - my) * 0.08;
    const sy = Math.min(Math.max(window.scrollY, 0), heroParallax.offsetHeight);
    heroParallax.style.setProperty("--mx", mx.toFixed(4));
    heroParallax.style.setProperty("--my", my.toFixed(4));
    heroParallax.style.setProperty("--sy", sy.toFixed(1));
    if (Math.abs(objMx - mx) > 0.001 || Math.abs(objMy - my) > 0.001) {
      requestAnimationFrame(pintarHero);
    } else {
      animando = false;
    }
  }

  function despertarHero() {
    if (!animando) {
      animando = true;
      requestAnimationFrame(pintarHero);
    }
  }

  heroParallax.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const r = heroParallax.getBoundingClientRect();
    objMx = ((e.clientX - r.left) / r.width) * 2 - 1;
    objMy = ((e.clientY - r.top) / r.height) * 2 - 1;
    heroParallax.style.setProperty("--lx", `${e.clientX - r.left}px`);
    heroParallax.style.setProperty("--ly", `${e.clientY - r.top}px`);
    heroParallax.style.setProperty("--luz-on", "1");
    despertarHero();
  });

  heroParallax.addEventListener("pointerleave", () => {
    objMx = objMy = 0;
    heroParallax.style.setProperty("--luz-on", "0");
    despertarHero();
  });

  window.addEventListener("scroll", despertarHero, { passive: true });
  despertarHero();
}

// Imágenes que se desplazan un poco más lento que la página
const capasParallax = [
  [".card-noticia__imagen img", 22],
  [".gh-slide__fondo", 110],
  [".fan-club__imagen", 40],
  [".instagram__fondo", 60],
].flatMap(([selector, rango]) => [...document.querySelectorAll(selector)].map((el) => ({ el, rango })));

if (capasParallax.length && !reducirMovimiento) {
  let pendiente = false;
  function moverCapas() {
    const alto = window.innerHeight;
    capasParallax.forEach(({ el, rango }) => {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -200 || r.top > alto + 200) return;
      // -1 (abajo de la pantalla) … 1 (arriba)
      const p = Math.max(-1, Math.min(1, (alto / 2 - (r.top + r.height / 2)) / (alto / 2 + r.height / 2)));
      el.style.setProperty("--py", (p * rango).toFixed(1));
    });
    pendiente = false;
  }
  window.addEventListener("scroll", () => {
    if (!pendiente) {
      pendiente = true;
      requestAnimationFrame(moverCapas);
    }
  }, { passive: true });
  window.addEventListener("resize", moverCapas);
  moverCapas();
}

// Menú: numerar los grupos para que entren uno tras otro
document.querySelectorAll(".menu__grupo").forEach((g, i) => g.style.setProperty("--i", i));










/* GUITAR HERO · PARALLAX CON EL MOUSE 777 */
const sliderGH = document.querySelector(".gh-slider");
if (sliderGH && !reducirMovimiento) {
  let gx = 0, gy = 0, objGx = 0, objGy = 0, animandoGH = false;
  function pintarGH() {
    gx += (objGx - gx) * 0.08;
    gy += (objGy - gy) * 0.08;
    sliderGH.style.setProperty("--gx", gx.toFixed(4));
    sliderGH.style.setProperty("--gy", gy.toFixed(4));
    if (Math.abs(objGx - gx) > 0.001 || Math.abs(objGy - gy) > 0.001) requestAnimationFrame(pintarGH);
    else animandoGH = false;
  }
  const despertarGH = () => { if (!animandoGH) { animandoGH = true; requestAnimationFrame(pintarGH); } };
  sliderGH.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    const r = sliderGH.getBoundingClientRect();
    objGx = ((e.clientX - r.left) / r.width) * 2 - 1;
    objGy = ((e.clientY - r.top) / r.height) * 2 - 1;
    despertarGH();
  });
  sliderGH.addEventListener("pointerleave", () => { objGx = objGy = 0; despertarGH(); });
}










/* MÚSICA · UNIONES CON GUITAR HERO E INSTAGRAM 777 */
/* El corte diagonal se acomoda con el scroll */
const cortesMusica = [...document.querySelectorAll(".musica__corte")];
if (cortesMusica.length) {
  let pendienteCorte = false;
  function moverCorte() {
    const alto = window.innerHeight;
    cortesMusica.forEach((corte) => {
      const top = corte.getBoundingClientRect().top;
      // 0 cuando el corte asoma por abajo, 1 cuando llega al 25 % de la pantalla
      const p = reducirMovimiento ? 1 : Math.min(1, Math.max(0, (alto - top) / (alto * 0.75)));
      corte.style.setProperty("--corte", (p * p * (3 - 2 * p)).toFixed(3));
    });
    pendienteCorte = false;
  }
  window.addEventListener("scroll", () => {
    if (!pendienteCorte) { pendienteCorte = true; requestAnimationFrame(moverCorte); }
  }, { passive: true });
  window.addEventListener("resize", moverCorte);
  moverCorte();
}
