const router = require('express').Router();

// want to use Post.findAll() in other parts of this app
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// get all posts
router.get('/', (req, res) => {
    console.log(req.session);
    Post.findAll({
      // which columns we would like
        attributes: [
            'id', 
            'blog_contents', 
            'title', 
            'created_at'
    ],
      // join to the User table, notice it is an array of objects
      // if you were joining to another table, that would be another object in the array
        include: [
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
        ]
    })
    .then(dbPostData => {
        // pass a single post object into the homepage template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get a single post and go to the single post page
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id', 
            'blog_contents', 
            'title', 
            'created_at'
        ],
        include: [
            {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
            },
            {
            model: User,
            attributes: ['username']
            }
        ]
        })
        .then(dbPostData => {
            if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
            }
    
            // serialize the data
            const post = dbPostData.get({ plain: true });
    
            // pass data to handlebars template
            res.render('single-post', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// route for login page
router.get('/login', (req, res) => {
    // if user is logged in, redirect to the main page
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;