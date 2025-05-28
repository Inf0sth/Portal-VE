// Configurar Supabase
// js/miembros.js

const supabase = supabase.createClient('https://npmhykkanlykzjsdzelo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wbWh5a2thbmx5a3pqc2R6ZWxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0ODUzMDksImV4cCI6MjA2MjA2MTMwOX0.3XFZdpYCV9DK60pogX0eM8OxmJtmAGdiDuWOaMv2H-Y');

// -------------------- MIEMBROS --------------------
const formMiembro = document.getElementById('form-miembro');
const listaMiembros = document.getElementById('lista-miembros');

formMiembro.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(formMiembro);
  const nuevoMiembro = Object.fromEntries(data.entries());

  const { error } = await supabase.from('Miembro').insert([nuevoMiembro]);
  if (!error) {
    formMiembro.reset();
    cargarMiembros();
  } else {
    alert('Error al insertar: ' + error.message);
  }
});

async function cargarMiembros() {
  const { data, error } = await supabase.from('Miembro').select();
  if (error) return;
  listaMiembros.innerHTML = data.map(m => `
    <tr class="border-b">
      <td class="p-2">${m.nombre}</td>
      <td class="p-2">${m.correo}</td>
      <td class="p-2">${m.edad}</td>
      <td class="p-2 space-x-2">
        <button onclick="eliminarMiembro(${m.id})" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Eliminar</button>
      </td>
    </tr>
  `).join('');
}

async function eliminarMiembro(id) {
  await supabase.from('Miembro').delete().eq('id', id);
  cargarMiembros();
}

// -------------------- PENDIENTES --------------------
const pendientesForm = document.querySelector('#pendientes form');
const pendientesInput = pendientesForm.querySelector('input');
const pendientesLista = document.querySelector('#pendientes ul');

pendientesForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const texto = pendientesInput.value.trim();
  if (!texto) return;

  const { error } = await supabase.from('Pendiente').insert([{ descripcion: texto }]);
  if (!error) {
    pendientesInput.value = '';
    cargarPendientes();
  }
});

async function cargarPendientes() {
  const { data } = await supabase.from('Pendiente').select();
  pendientesLista.innerHTML = data.map(p => `
    <li class="flex justify-between items-center border-b pb-2">
      <span>${p.descripcion}</span>
      <button onclick="eliminarPendiente(${p.id})" class="text-red-500 hover:text-red-700">Eliminar</button>
    </li>
  `).join('');
}

async function eliminarPendiente(id) {
  await supabase.from('Pendiente').delete().eq('id', id);
  cargarPendientes();
}

// -------------------- ORACIÓN --------------------
const oracionForm = document.querySelector('#oracion form');
const oracionInput = oracionForm.querySelector('textarea');
const oracionLista = document.querySelector('#oracion ul');

oracionForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const texto = oracionInput.value.trim();
  if (!texto) return;

  const { error } = await supabase.from('MotivoOracion').insert([{ motivo: texto }]);
  if (!error) {
    oracionInput.value = '';
    cargarOracion();
  }
});

async function cargarOracion() {
  const { data } = await supabase.from('MotivoOracion').select();
  oracionLista.innerHTML = data.map(p => `
    <li class="flex justify-between items-center border-b pb-2">
      <span>${p.motivo}</span>
      <button onclick="eliminarOracion(${p.id})" class="text-red-500 hover:text-red-700">Eliminar</button>
    </li>
  `).join('');
}

async function eliminarOracion(id) {
  await supabase.from('MotivoOracion').delete().eq('id', id);
  cargarOracion();
}

// -------------------- RESPONSABLES --------------------
const responsablesForm = document.querySelector('#responsables form');
const eventoInput = responsablesForm.querySelector('input[placeholder="Nombre del evento"]');
const responsableInput = responsablesForm.querySelector('input[placeholder="Responsable"]');
const tablaResponsables = document.querySelector('#responsables tbody');

responsablesForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const evento = eventoInput.value.trim();
  const responsable = responsableInput.value.trim();
  if (!evento || !responsable) return;

  const { error } = await supabase.from('Evento').insert([{ nombre: evento, responsable }]);
  if (!error) {
    eventoInput.value = '';
    responsableInput.value = '';
    cargarResponsables();
  }
});

async function cargarResponsables() {
  const { data } = await supabase.from('Evento').select();
  tablaResponsables.innerHTML = data.map(e => `
    <tr class="border-b">
      <td class="p-2">${e.nombre}</td>
      <td class="p-2">${e.responsable}</td>
      <td class="p-2">
        <button onclick="eliminarResponsable(${e.id})" class="text-red-500 hover:text-red-700">Eliminar</button>
      </td>
    </tr>
  `).join('');
}

async function eliminarResponsable(id) {
  await supabase.from('Evento').delete().eq('id', id);
  cargarResponsables();
}

// Inicialización
cargarMiembros();
cargarPendientes();
cargarOracion();
cargarResponsables();
