const { validationResult } = require('express-validator');
const { getPool } = require('../config/db');
const { haversineDistanceKm } = require('../utils/distance');

async function addSchool(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, address, latitude, longitude } = req.body;
  try {
    const pool = getPool();
    const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    const params = [name.trim(), address.trim(), Number(latitude), Number(longitude)];
    const [result] = await pool.execute(sql, params);
    return res.status(201).json({ id: result.insertId, name, address, latitude: Number(latitude), longitude: Number(longitude) });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to add school', error: error.message });
  }
}

async function listSchools(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userLat = Number(req.query.lat);
  const userLon = Number(req.query.lng);

  try {
    const pool = getPool();
    const [rows] = await pool.query(
      'SELECT id, name, address, latitude, longitude FROM schools'
    );

    const withDistance = rows.map((s) => ({
      ...s,
      distance_km: parseFloat(
        haversineDistanceKm(userLat, userLon, s.latitude, s.longitude).toFixed(2)
      ),
    }));

    withDistance.sort((a, b) => a.distance_km - b.distance_km);

    return res.json(withDistance);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to list schools', error: error.message });
  }
}


module.exports = { addSchool, listSchools };

