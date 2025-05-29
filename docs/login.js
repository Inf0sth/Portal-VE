const createClient = supabase.createClient;

const supabaseClient = createClient('https://npmhykkanlykzjsdzelo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wbWh5a2thbmx5a3pqc2R6ZWxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0ODUzMDksImV4cCI6MjA2MjA2MTMwOX0.3XFZdpYCV9DK60pogX0eM8OxmJtmAGdiDuWOaMv2H-Y');

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const usuario = e.target.usuario.value;
  const contrasena = e.target.contrasena.value;
  const errorMsg = document.getElementById('error-msg');

  const { data, error } = await supabaseClient
    .from('usuarios')
    .select('contrasena_hash')
    .eq('nombre_usuario', usuario)
    .single();

  if (error || !data) {
    errorMsg.textContent = 'Usuario no encontrado';
    errorMsg.classList.remove('hidden');
    return;
  }

  const match = contrasena === data.contrasena_hash;

  if (match) {
    localStorage.setItem('nombre_usuario', usuario);
    window.location.href = 'dashboard.html';
  } else {
    errorMsg.textContent = 'Contraseña incorrecta';
    errorMsg.classList.remove('hidden');
  }
});
