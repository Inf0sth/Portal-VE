const createClient = supabase.createClient;

const supabaseClient = createClient(
  'https://npmhykkanlykzjsdzelo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wbWh5a2thbmx5a3pqc2R6ZWxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0ODUzMDksImV4cCI6MjA2MjA2MTMwOX0.3XFZdpYCV9DK60pogX0eM8OxmJtmAGdiDuWOaMv2H-Y'
);

// === MIEMBROS ===
document.getElementById('form-miembro')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const nuevoMiembro = {
    nombre: form.nombre.value,
    edad: Number(form.edad.value),
    fecha_cumpleaños: form.fecha_cumpleaños.value,
    correo: form.correo.value,
    ocupacion: form.ocupacion.value,
    bautizado: form.bautizado.value,
    ministerio: Number(form.ministerio.value),
  };

  const { error } = await supabaseClient.from('miembro').insert(nuevoMiembro);

  if (!error) {
    form.reset();
    cargarMiembros();
  } else {
    console.error('Error al agregar miembro:', error.message);
  }
});

async function cargarMiembros() {
  const { data, error } = await supabaseClient.from('miembro').select('*');

  const lista = document.getElementById('lista-miembros');
  if (!lista) return;
  lista.innerHTML = '';

  data?.forEach((miembro) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="p-2">${miembro.nombre}</td>
      <td class="p-2">${miembro.correo}</td>
      <td class="p-2">${miembro.edad}</td>
      <td class="p-2">
        <button onclick="eliminarMiembro(${miembro.id_miembro})" class="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
      </td>
    `;
    lista.appendChild(tr);
  });
}

async function eliminarMiembro(id) {
  const { error } = await supabaseClient.from('miembro').delete().eq('id_miembro', id);
  if (!error) cargarMiembros();
}

// === MOTIVOS DE ORACIÓN ===
document.getElementById('form-oracion')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const descripcion = e.target.descripcion.value;

  const { error } = await supabaseClient.from('MotivoOracion').insert({
    descripcion,
    fecha_registro: new Date().toISOString(),
    registrado_por: 1 // Usuario fijo por ahora
  });

  if (!error) {
    e.target.reset();
    cargarMotivos();
  }
});

async function cargarMotivos() {
  const { data } = await supabaseClient.from('motivooracion').select('*');
  const lista = document.getElementById('lista-oracion');
  if (!lista) return;
  lista.innerHTML = '';

  data?.forEach(m => {
    const li = document.createElement('li');
    li.className = 'bg-gray-100 p-2 rounded';
    li.textContent = m.descripcion;
    lista.appendChild(li);
  });
}

// === PENDIENTES ===
document.getElementById('form-pendiente')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const descripcion = e.target.descripcion.value;

  const { error } = await supabaseClient.from('pendiente').insert({
    titulo: descripcion,
    descripcion,
    fecha_creacion: new Date().toISOString().slice(0, 10),
    estado: false,
    responsable: 1 // Usuario fijo por ahora
  });

  if (!error) {
    e.target.reset();
    cargarPendientes();
  }
});

async function cargarPendientes() {
  const { data } = await supabaseClient.from('pendiente').select('*');
  const lista = document.getElementById('lista-pendientes');
  if (!lista) return;
  lista.innerHTML = '';

  data?.forEach(p => {
    const li = document.createElement('li');
    li.className = 'flex justify-between items-center bg-gray-100 p-2 rounded';
    li.innerHTML = `
      <span>${p.descripcion}</span>
      <button onclick="eliminarPendiente(${p.id_pendiente})" class="text-red-600">Eliminar</button>
    `;
    lista.appendChild(li);
  });
}

async function eliminarPendiente(id) {
  const { error } = await supabaseClient.from('pendiente').delete().eq('id_pendiente', id);
  if (!error) cargarPendientes();
}

// === RESPONSABLES DE EVENTOS ===
document.getElementById('form-responsable')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;

  const { error } = await supabaseClient.from('evento').insert({
    nombre: form.evento.value,
    descripcion: '-',
    fecha_evento: new Date().toISOString().slice(0, 10),
    responsable: 1 // Ministerio fijo por ahora
  });

  if (!error) {
    form.reset();
    cargarEventos();
  }
});

async function cargarEventos() {
  const { data } = await supabaseClient.from('evento').select('*');
  const lista = document.getElementById('lista-responsables');
  if (!lista) return;
  lista.innerHTML = '';

  data?.forEach(e => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="p-2">${e.nombre}</td>
      <td class="p-2">ID Ministerio: ${e.responsable}</td>
      <td class="p-2">
        <button onclick="eliminarEvento(${e.id_evento})" class="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
      </td>
    `;
    lista.appendChild(tr);
  });
}

async function eliminarEvento(id) {
  const { error } = await supabaseClient.from('evento').delete().eq('id_evento', id);
  if (!error) cargarEventos();
}

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', () => {
  cargarMiembros();
  cargarMotivos();
  cargarPendientes();
  cargarEventos();
});
