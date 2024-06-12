const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const staff = [];
const JWT_SECRET = 'your_jwt_secret';

const staffSchema = Joi.object({
  name: Joi.string().min(3).required(),
  available: Joi.boolean().required()
});

app.post('/staff', authenticateToken, (req, res) => {
  const { error } = staffSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, available } = req.body;
  const staffMember = { id: uuidv4(), name, available };
  staff.push(staffMember);
  res.status(201).send(staffMember);
});

app.get('/staff/:id', authenticateToken, (req, res) => {
  const staffMember = staff.find(s => s.id === req.params.id);
  if (staffMember) {
    res.status(200).send(staffMember);
  } else {
    res.status(404).send('Staff member not found');
  }
});

app.get('/staff/availability', authenticateToken, (req, res) => {
  const availableStaff = staff.filter(s => s.available);
  res.status(200).send(availableStaff);
});

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied');

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
}

app.use((err, req, res, next) => {
  res.status(500).send('Something went wrong');
});

app.listen(3001, () => {
  console.log('Staff Service is running on port 3001');
});
