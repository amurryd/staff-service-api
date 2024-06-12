const express = require('express');
const sequelize = require('./models/Staff').sequelize;
const staffRoutes = require('./routes/staffRoutes');

const app = express();
app.use(express.json());
app.use('/api', staffRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Staff service is running on port ${PORT}`);
  });
});
