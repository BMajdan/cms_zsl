    /* Import modules */
    const express = require('express');
    const bodyParser = require('body-parser')
    const path = require('path');
    const app = express();
    const mongoose = require('mongoose');

    const crypto = require('crypto');
    const hash = crypto.createHash('sha256');

    var publicPath = path.resolve(__dirname, 'dist');
    app.use(express.static(publicPath));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    /* Connect to Database */
    mongoose.connect('mongodb://localhost:27017/zsl_cms_database_mdb');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('Połaczono z baza danych')
    });

    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });

    /* Create Database */
    var usersSchema = mongoose.Schema({
        login: String,
        password: String,
        name: String,
        surname: String,
        email: String,
        isLogin: Boolean,
        permission: Number
    });

    var newsSchema = mongoose.Schema({
        postIdent : String,
        title : String,
        data : String,
        tags : Array,
        shortText : String,
        longText: String,
        miniature : String,
        userParent : String
    })

    var Users = mongoose.model('Users', usersSchema);
    var News = mongoose.model('News', usersSchema);

    app.post('/api/getUserToLogin', function (req, res) {
        var hashPassword = crypto.createHash('sha256').update(req.body.userPassword).digest('hex');
        Users.findOne({login: req.body.userName, password: hashPassword}, function(err,obj) {
            if(obj == null){
                var resendObject = {
                    loginStatus: false,
                    loginMessage: 'Podaj poprawny login lub hasło!'
                }
                res.json(resendObject);
            }else{
                if(obj.isLogin == true){
                    var resendObject = {
                        loginStatus: false,
                        loginMessage: 'Użytkownik jest już zalogowany!'
                    }
                    res.json(resendObject); 
                }else{

                    var query = {login: req.body.userName}

                    Users.findOneAndUpdate({login: req.body.userName}, {isLogin: true}, function(err){
                        if(!err){
                            var resendObject = {
                                loginStatus: true,
                                userPermission: obj.permission,
                                loginMessage: 'Poprawnie zalogowano!'
                            }
                            res.json(resendObject); 
                        }else{
                            var resendObject = {
                                loginStatus: false,
                                loginMessage: 'Błąd bazy danych!'
                            }
                            res.json(resendObject);
                        }
                    })

                    
                }
            }
        });
    });

    app.post('/api/logOut', function(req, res){
        Users.findOneAndUpdate({login: req.body.userName}, {isLogin: false}, function(err){
            if(!err){
                var resendObject = {
                    logoutStatus: true,
                    logoutMessage: 'Poprawnie wylogowano użytkownika!'
                }
                res.json(resendObject);
            }else{
                var resendObject = {
                    logoutStatus: false,
                    logoutMessage: 'Błąd bazy danych!'
                }
                res.json(resendObject);
            }
        })
    });

    app.get('/api/loadAllNews', function(req, res){
        News.find({}, function(err, obj){
            if(obj == null){
                var resendObject = {
                    loadNewsStatus: false,
                    loadNewsMessage: 'Brak istniejących postów'
                }
                res.json(resendObject)
            }else{
                var resendObject = {
                    loadNewsStatus: true,
                    loadNewsData: obj
                }
                res.json(resendObject)
            }
        })
    })

    app.get('/api/loadOneNews', function(req, res){
        News.find({postIdent: req.query.postIdent}, function(err, obj){
            if(obj == null){
                var resendObject = {
                    loadNewsStatus: false,
                    loadNewsMessage: 'Brak istniejących postów'
                }
                res.json(resendObject)
            }else{
                var resendObject = {
                    loadNewsStatus: true,
                    loadNewsData: obj
                }
                res.json(resendObject)
            }
        })
    })

    app.delete('/api/deleteNews', function(req, res){
        News.remove({postIdent: req.query.postIdent}, function(err){
            if(err){
                var resendObject = {
                    deleteNewsStatus: false,
                    deleteNewsMessage: 'Brak istniejących postów do usunięcia'
                }
                res.json(resendObject)
            }else{
                var resendObject = {
                    deleteNewsStatus: true,
                    deleteNewsMessage: 'Post został usunięty'
                }
                res.json(resendObject)
            }
        })
    })


app.listen(4000, () => console.log('Example app listening on port 4000!'))