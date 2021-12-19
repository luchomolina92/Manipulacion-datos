const db = require('../database/models');

const moviesController = {
    'list': async (req, res) => {
        const locals = {
            movies: await db.Movie.findAll()
        }
        res.render('moviesList', locals)
    },
    'detail': async (req, res) => {
        const locals = {
            movie: await db.Movie.findByPk(req.params.id)
        }
        res.render('moviesDetail', locals)
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        res.render('moviesAdd')   
    },
    create: function (req, res) {
        // Esta información que recibo no esta validada
        db.Movie.create({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
        })
        res.redirect('/movies/add');
    },
    edit: async function(req, res) {
        const locals = {
            Movie: await db.Movie.findByPk(req.params.id)
        }
        res.render('moviesEdit', locals)
    },
    update: function (req,res) {
        // Esta información que recibo no esta validada
        db.Movie.update({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
        },
        {
            where: {id: req.params.id}
        })
        res.redirect(`/movies/detail/${req.params.id}`);
    },
    delete: async function (req, res) {
        const locals = {
            Movie: await db.Movie.findByPk(req.params.id)
        }
        res.render('moviesDelete', locals)
    },
    destroy: function (req, res) {
        db.Movie.destroy({where: {id: req.params.id}})
        res.redirect('/movies');
    }

}

module.exports = moviesController;