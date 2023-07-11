const prisma = require("../prisma/index");
exports.createPost = async (req, res, next) => {
try {
    const { slug, title, body, authorId } = req.body
    const result=await prisma.post.create({
        data: {
            slug: slug,
            title: title,
            body: body,
            author:{connect:{id:authorId}}
        }
    })
    res.json(result)
} catch (error) {
    throw new Error(error)
}
}
exports.updatePost = async (req, res, next) => {
    const { id } = req.params
    const { title, body } = req.body
    try {
        const result = await prisma.post.update({
            where: {
              id:id
            },
            data: {
                title: title,
                body:body
            }
        })
        res.json({result})
    } catch (error) {
        res.json({error:`Post with ${id} doesnt exist`})
    }
}
exports.deletePost = async (req, res, next) => {
    const { id } = req.params
    try {
        const result = await prisma.post.delete({
            where: {
            id:id
            }
        })
        res.json(`Post with id ${id} deleted`)
    } catch (error) {
        res.json({error:`Post with ${id} doesn't exist`})
    }
}
exports.getPost = async (req, res, next) => {
try {
    const posts = await prisma.post.findMany()
    res.json(posts)
} catch (error) {
    res.json({error:`No post was found`})
}
}