const express = require('express');
const sequelize = require('./db');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Sincronizar con la DB
sequelize.sync().then(() => {
  console.log("✅ DB sincronizada");
}).catch(err => console.error("⛔ Error DB:", err));

// GET /users
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// GET /users/:id
app.get('/users/:id', async (req, res) => {
  try {
    console.log("🔎 Buscando usuario con ID:", req.params.id);
    const user = await User.findByPk(req.params.id);
    console.log("Resultado:", user);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    console.error("❌ Error al buscar usuario:", err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


// POST /users
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Nombre y email son requeridos' });
    }
    const newUser = await User.create({ name, email });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /users/:id
app.delete('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  await user.destroy();
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

