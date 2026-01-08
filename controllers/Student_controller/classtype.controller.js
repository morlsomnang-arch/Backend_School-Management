import { ClassType } from '../../model/Element/ClassType.js'

export const index = async (req, res) => {
  try {
    const classtypes = await ClassType.findAll({
      order: [['id', 'DESC']]
    })
    res.json(classtypes)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const show = async (req, res) => {
  try {
    const classtype = await ClassType.findByPk(req.params.id)
    if (!classtype) {
      return res.status(404).json({ message: 'Class type not found' })
    }
    res.json(classtype)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const store = async (req, res) => {
  try {
    const { name } = req.body
    if (!name) return res.status(400).json({ message: 'Name required' })

    const classtype = await ClassType.create({ name })
    res.status(201).json(classtype)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const update = async (req, res) => {
  try {
    const classtype = await ClassType.findByPk(req.params.id)
    if (!classtype) {
      return res.status(404).json({ message: 'Class type not found' })
    }

    await classtype.update({ name: req.body.name })
    res.json(classtype)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const destroy = async (req, res) => {
  try {
    const classtype = await ClassType.findByPk(req.params.id)
    if (!classtype) {
      return res.status(404).json({ message: 'Class type not found' })
    }

    await classtype.destroy()
    res.json({ message: 'Deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
