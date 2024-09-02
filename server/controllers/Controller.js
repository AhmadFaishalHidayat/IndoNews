
const { where } = require('sequelize')
const { User, News } = require('../models')
const openAI = require('../helpers/openai')

module.exports = class Controller {

    static async addNews(req, res, next) {
        try {
            const { title, url } = req.body

            let data = await News.create({ title, url, UserId: req.user.id })

            res.status(201).json({
                data,
                message: 'Created Successfully'
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAllNews(req, res, next) {
        try {
            let data = await News.findAll({

                include: [
                    {
                        model: User,
                        attributes: {
                            exclude: ["password"]
                        }
                    }
                ],
            });

            res.status(200).json({
                message: 'All data News',
                data
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAllNewsByUser(req, res, next) {
        try {
            console.log(req.user.id);
            let data = await News.findAll({

                include: [
                    {
                        model: User,
                        attributes: {
                            exclude: ["password"]
                        }
                    }
                ],

                where: {
                    UserId: req.user.id
                }

            });

            res.status(200).json({
                message: 'All data News',
                data
            })
        } catch (error) {
            next(error)
        }
    }

    static async getNewsById(req, res, next) {
        try {
            const { id } = req.params

            let data = await News.findByPk(id)

            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async editNews(req, res, next) {
        try {

            const { title, url } = req.body
            const { id } = req.params

            let news = await News.findByPk(id)
            console.log(news);
            if (!news) {
                throw { name: 'NotFound' }
            };

            let [rowCount, newDataNews] = await News.update(
                { title, url, UserId: req.user.id },
                {
                    where: {
                        id: id,
                    },
                    returning: true
                }
            )
            console.log(newDataNews[0]);
            res.status(200).json({
                message: "Update Successfully"
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async delNews(req, res, next) {
        try {
            const { id } = req.params

            let data = await News.findByPk(id)

            if (!data) {
                throw { name: 'NotFound' }
            }

            await News.destroy({
                where: {
                    id: id
                }
            })
            res.status(200).json({
                message: `${data.title} has been deleted`
            });
        } catch (error) {
            next(error)
        }
    }

    static async searchAi(req, res, next) {
        try {
            let { search } = req.body
            // console.log(req.body);

            let responsAI = await openAI(search)
            console.log(search)
            res.send(responsAI)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}