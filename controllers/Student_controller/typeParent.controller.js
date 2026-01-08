import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/db.js'

// Define the model (if not already in models folder)
export const TypeParent = sequelize.define('TypeParent', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'type_parents',
  timestamps: false
})

// ===== CONTROLLER FUNCTIONS =====

// GET all type parents
export const getTypeParents = async (req, res) => {
  try {
    const typeParents = await TypeParent.findAll({ order: [['id', 'DESC']] })
    res.json(typeParents)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// GET single type parent
export const getTypeParentById = async (req, res) => {
  try {
    const typeParent = await TypeParent.findByPk(req.params.id)
    if (!typeParent) return res.status(404).json({ message: 'Type Parent not found' })
    res.json(typeParent)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// CREATE type parent
export const createTypeParent = async (req, res) => {
  try {
    const { name } = req.body
    if (!name) return res.status(400).json({ message: 'Name is required' })

    const typeParent = await TypeParent.create({ name })
    res.status(201).json(typeParent)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// UPDATE type parent
export const updateTypeParent = async (req, res) => {
  try {
    const { id } = req.params
    const { name } = req.body

    const typeParent = await TypeParent.findByPk(id)
    if (!typeParent) return res.status(404).json({ message: 'Type Parent not found' })

    await typeParent.update({ name })
    res.json(typeParent)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// DELETE type parent
export const deleteTypeParent = async (req, res) => {
  try {
    const typeParent = await TypeParent.findByPk(req.params.id)
    if (!typeParent) return res.status(404).json({ message: 'Type Parent not found' })

    await typeParent.destroy()
    res.json({ message: 'Type Parent deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}
