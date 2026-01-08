import { Parent } from '../../model/Element/Parent.js'
import { TypeParent } from '../../model/Element/TypeParent.js'

/* ===== GET ALL PARENTS ===== */
export const getParents = async (req, res) => {
  try {
    const parents = await Parent.findAll({
      include: [
        {
          model: TypeParent,
          as: 'typeParent', // Must match the association alias
          attributes: ['id', 'name']
        }
      ],
      order: [['id', 'DESC']]
    })

    res.json(parents)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

/* ===== GET SINGLE PARENT ===== */
export const getParent = async (req, res) => {
  try {
    const { id } = req.params

    const parent = await Parent.findByPk(id, {
      include: [
        {
          model: TypeParent,
          as: 'typeParent',
          attributes: ['id', 'name']
        }
      ]

    })

    if (!parent) {
      return res.status(404).json({ message: 'Parent not found' })
    }

    res.json(parent)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

/* ===== CREATE PARENT ===== */
export const createParent = async (req, res) => {
  try {
    const { name_kh, name_en, gender, occupation, phone, type_parent_id } = req.body

    if (!name_kh || !gender || !type_parent_id) {
      return res.status(400).json({ message: 'Required fields missing' })
    }

    const parent = await Parent.create({
      name_kh,
      name_en,
      gender,
      occupation,
      phone,
      type_parent_id
    })

    res.status(201).json({
      success: true,
      message: 'Parent created',
      data: parent
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

/* ===== UPDATE PARENT ===== */
export const updateParent = async (req, res) => {
  try {
    const { id } = req.params
    const { name_kh, name_en, gender, occupation, phone, type_parent_id } = req.body

    const parent = await Parent.findByPk(id)

    if (!parent) {
      return res.status(404).json({ message: 'Parent not found' })
    }

    // Update only provided fields
    await parent.update({
      name_kh,
      name_en,
      gender,
      occupation,
      phone,
      type_parent_id
    })

    res.json({
      success: true,
      message: 'Parent updated',
      data: parent
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

/* ===== DELETE PARENT ===== */
export const deleteParent = async (req, res) => {
  try {
    const { id } = req.params
    const parent = await Parent.findByPk(id)

    if (!parent) {
      return res.status(404).json({ message: 'Parent not found' })
    }

    await parent.destroy()

    res.json({
      success: true,
      message: 'Parent deleted'
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}
