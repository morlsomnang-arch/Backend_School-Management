import { Class } from '../../model/Element/Class.js'
import { ClassType } from '../../model/Element/ClassType.js'
import { ClassClasstype } from '../../model/Element/ClassClasstype.js'

/**
 * GET ALL
 * /api/class-classtypes
 */
export const getAll = async (req, res) => {
  try {
    const rows = await ClassClasstype.findAll({
      order: [['id', 'DESC']],
      include: [
        { model: Class, attributes: ['id', 'name'] },
        { model: ClassType, attributes: ['id', 'name'] }
      ]
    })

    res.json(rows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getByClassId = async (req, res) => {
  try {
    const { class_id } = req.params

    const rows = await ClassClasstype.findAll({
      where: { class_id },
      include: [
        {
          model: ClassType,
          attributes: ['id', 'name']
        }
      ]
    })

    res.json(rows)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

/**
 * CREATE (single)
 * /api/class-classtypes
 */
export const create = async (req, res) => {
  const { class_id, classtype_id, group_no } = req.body

  if (!class_id || !classtype_id) {
    return res.status(400).json({ message: 'Missing data' })
  }

  try {
    await ClassClasstype.create({
      class_id,
      classtype_id,
      group_no: group_no || 1
    })

    res.status(201).json({ message: 'Created successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

/**
 * UPDATE
 * /api/class-classtypes/:id
 */
export const update = async (req, res) => {
  try {
    const { id } = req.params
    const { class_id, classtype_id, group_no } = req.body

    const item = await ClassClasstype.findByPk(id)
    if (!item) {
      return res.status(404).json({ message: 'Not found' })
    }

    item.class_id = class_id
    item.classtype_id = classtype_id
    item.group_no = group_no

    await item.save()

    res.json({ message: 'Updated successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const remove = async (req, res) => {
  try {
    const { id } = req.params

    const item = await ClassClasstype.findByPk(id)
    if (!item) {
      return res.status(404).json({ message: 'Not found' })
    }

    await item.destroy()

    res.json({ message: 'Deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

/**
 * ASSIGN / REPLACE (MULTI)
 * /api/class-classtypes/assign
 */
export const assignOrUpdate = async (req, res) => {
  const { class_id, classtype_ids, group_no } = req.body

  if (!class_id || !Array.isArray(classtype_ids)) {
    return res.status(400).json({ message: 'Invalid data' })
  }

  try {
    // delete old
    await ClassClasstype.destroy({
      where: { class_id }
    })

    // insert new
    const data = classtype_ids.map(id => ({
      class_id,
      classtype_id: id,
      group_no: group_no || 1
    }))

    await ClassClasstype.bulkCreate(data)

    res.json({ message: 'Assigned successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
