import { Class } from '../../model/Element/Class.js'
import { ClassType } from '../../model/Element/ClassType.js'
import { ClassClasstype } from '../../model/Element/ClassClasstype.js'

/* ===== GET classes + assigned class types ===== */
export const index = async (req, res) => {
  try {
    const classes = await Class.findAll({
      order: [['id', 'DESC']],
      include: [
        {
          model: ClassClasstype,
          include: [
            { model: ClassType, attributes: ['id', 'name'] }
          ]
        }

      ]
    })

    res.json(classes)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

/* ===== CREATE ===== */
export const store = async (req, res) => {
  try {
    const { name } = req.body

    const newClass = await Class.create({ name })

    res.json({
      success: true,
      message: 'Class created',
      data: newClass
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

/* ===== UPDATE ===== */
export const update = async (req, res) => {
  try {
    const { id } = req.params
    const { name } = req.body

    const classItem = await Class.findByPk(id)

    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' })
    }

    classItem.name = name
    await classItem.save()

    res.json({ success: true, message: 'Class updated' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}

/* ===== DELETE ===== */
export const destroy = async (req, res) => {
  try {
    const { id } = req.params

    const classItem = await Class.findByPk(id)

    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' })
    }

    await classItem.destroy()

    res.json({ success: true, message: 'Class deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
}
