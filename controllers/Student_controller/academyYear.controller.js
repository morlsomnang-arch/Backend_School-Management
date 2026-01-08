import { AcademyYear } from '../../model/Element/Academy_years.js'

export const getAcademyYears = async (req, res) => {
  try {
    const rows = await AcademyYear.findAll({
      order: [['id', 'DESC']]
    })
    res.json(rows)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const getAcademyYearById = async (req, res) => {
  const row = await AcademyYear.findByPk(req.params.id)
  if (!row) return res.status(404).json({ message: 'Not found' })
  res.json(row)
}

export const createAcademyYear = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ message: 'Name required' })
  }
  const row = await AcademyYear.create({ name: req.body.name })
  res.status(201).json(row)
}

export const updateAcademyYear = async (req, res) => {
  const row = await AcademyYear.findByPk(req.params.id)
  if (!row) return res.status(404).json({ message: 'Not found' })

  await row.update({ name: req.body.name })
  res.json({ message: 'Updated successfully' })
}

export const deleteAcademyYear = async (req, res) => {
  const row = await AcademyYear.findByPk(req.params.id)
  if (!row) return res.status(404).json({ message: 'Not found' })

  await row.destroy()
  res.json({ message: 'Deleted successfully' })
}
