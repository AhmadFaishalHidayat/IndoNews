const { News } = require('../models');

module.exports = async function authorization(req, res, next) {
    try {

        console.log("Sedang di Authorization", req.params);
        console.log(req.user);

        let news = await News.findByPk(req.params.id);
        console.log(news);

        if (!news) {
            throw { name: "NotFound" }
        }

        if (req.user.id !== news.UserId) {
            throw { name: "Forbidden" };
        }

        next();
    } catch (error) {
        console.log(error);
        next(error)
    };
};