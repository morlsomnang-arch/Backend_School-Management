import { StudentService } from '../../model/Element/StudentService.js'
import { Student } from '../../model/Element/Student.js'
import { ClassClasstype } from '../../model/Element/ClassClasstype.js'
import { Class } from '../../model/Element/Class.js'
import { ClassType } from '../../model/Element/ClassType.js'
import { AcademyYear } from '../../model/Element/Academy_years.js'

/**
 * GET ALL SERVICES
 */
export const getServices = async (req, res) => {
  try {
    const services = await StudentService.findAll({
      include: [
        { model: Student, attributes: ['id', 'name_kh'] },
        {
          model: ClassClasstype,
          include: [
            { model: Class, attributes: ['id', 'name'] },
            { model: ClassType, attributes: ['id', 'name'] }
          ]
        },
        { model: AcademyYear, attributes: ['id', 'name'] }
      ],
      order: [['id', 'DESC']]
    })
    res.json(services)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

/**
 * CREATE SERVICE
 */
export const createService = async (req, res) => {
  try {
    const { student_id, class_id, classType_id, academyYear_id, remark } = req.body

    // Find ClassClasstype mapping
    const classClastype = await ClassClasstype.findOne({
      where: { class_id, classtype_id: classType_id }
    })
    if (!classClastype)
      return res.status(400).json({ message: 'Class + ClassType combination not found' })

    const service = await StudentService.create({
      student_id,
      class_classtype_id: classClastype.id,
      academy_year_id: academyYear_id,
      remark: remark || null
    })

    const result = await StudentService.findByPk(service.id, {
      include: [
        { model: Student, attributes: ['id', 'name_kh'] },
        {
          model: ClassClasstype,
          include: [
            { model: Class, attributes: ['id', 'name'] },
            { model: ClassType, attributes: ['id', 'name'] }
          ]
        },
        { model: AcademyYear, attributes: ['id', 'name'] }
      ]
    })

    res.status(201).json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

/**
 * UPDATE SERVICE
 */
export const updateService = async (req, res) => {
  try {
    const { id } = req.params
    const { student_id, class_id, classType_id, academyYear_id, remark } = req.body

    const service = await StudentService.findByPk(id)
    if (!service) return res.status(404).json({ message: 'Service not found' })

    const classClastype = await ClassClasstype.findOne({
      where: { class_id, classtype_id: classType_id }
    })
    if (!classClastype)
      return res.status(400).json({ message: 'Class + ClassType combination not found' })

    await service.update({
      student_id,
      class_classtype_id: classClastype.id,
      academy_year_id: academyYear_id,
      remark: remark || null
    })

    const result = await StudentService.findByPk(id, {
      include: [
        { model: Student, attributes: ['id', 'name_kh'] },
        {
          model: ClassClasstype,
          include: [
            { model: Class, attributes: ['id', 'name'] },
            { model: ClassType, attributes: ['id', 'name'] }
          ]
        },
        { model: AcademyYear, attributes: ['id', 'name'] }
      ]
    })

    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

/**
 * DELETE SERVICE
 */
export const deleteService = async (req, res) => {
  try {
    const service = await StudentService.findByPk(req.params.id)
    if (!service) return res.status(404).json({ message: 'Service not found' })

    await service.destroy()
    res.json({ message: 'Service deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}
