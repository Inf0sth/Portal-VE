const { createClient } = supabase;

const supabaseClient = createClient('hhttps://npmhykkanlykzjsdzelo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wbWh5a2thbmx5a3pqc2R6ZWxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0ODUzMDksImV4cCI6MjA2MjA2MTMwOX0.3XFZdpYCV9DK60pogX0eM8OxmJtmAGdiDuWOaMv2H-Y');

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const usuario = e.target.usuario.value;
  const contrasena = e.target.contrasena.value;
  const errorMsg = document.getElementById('error-msg');

  const { data, error } = await supabaseClient
    .from('Usuarios')
    .select('contrasena_hash')
    .eq('usuario', usuario)
    .single();

  if (error || !data) {
    errorMsg.textContent = 'Usuario no encontrado';
    errorMsg.classList.remove('hidden');
    return;
  }

  const match = await bcrypt.compare(contrasena, data.contrasena_hash);

  if (match) {
    localStorage.setItem('usuario', usuario);
    window.location.href = 'admin.html';
  } else {
    errorMsg.textContent = 'Contraseña incorrecta';
    errorMsg.classList.remove('hidden');
  }
});
