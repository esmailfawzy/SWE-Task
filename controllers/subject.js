import subject from "../models/subject.js"

export const index = async (req, res) => {
    const subjects = await subject.find({}, { name: 1 }).lean()

    res.render("subjects/index", { subjects })
}

export const create = (req, res) => {
    res.render('subjects/create')
}

export const edit = async (req, res) => {
    const { id } = req.params
    const editFormSubject = await subject.findById(id).lean()
    res.render('subjects/edit', { subject: editFormSubject })
}

export const update = async (req, res) => {
    const { name, code, dep, pre_req } = req.body

    const {id} = req.params

    await subject.findByIdAndUpdate(id, { $set: { name,  code, dep, pre_req} })

    res.redirect('/subjects')
}

export const store = async (req, res) => {
    const { name, code, dep, pre_req } = req.body

    await subject.create({
        name,
        code,
        dep,
        pre_req
    })

    res.redirect('/subjects')

}

export const show = async (req, res) => {
    const {id } = req.params
    const singleSubject = await subject.findById(id).lean()
    res.render('subjects/show', { subject: singleSubject })

}

export const deleteOne = async (req, res) => {
    const{id} = req.params

    await subject.findByIdAndDelete(id)
    return res.redirect('/subjects')
}

