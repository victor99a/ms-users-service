const express = require('express');
const cors = require('cors');
const supabase = require('./supabase');

const app = express();
app.use(express.json());
app.use(cors());

//registro de usuario
app.post('/auth/signup', async (req, res) => {
  const { email, password, rut, first_names, last_names } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Estos datos los recibirá el TRIGGER en Supabase
      data: {
        rut: rut,
        first_names: first_names,
        last_names: last_names
      }
    }
  });

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ message: "Usuario registrado con éxito. Revisa tu email.", data });
});

//login de usuario
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ message: "Login exitoso", session: data.session });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Microservicio de Usuarios corriendo en puerto ${PORT}`));