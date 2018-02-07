/* Import modules */
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const jimp = require("jimp");

const crypto = require('crypto');
const hash = crypto.createHash('sha256');

app.use('/gallery', express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Connect to Database */
mongoose.connect('mongodb://localhost:27017/zsl_cms_database_mdb');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Połaczono z baza danych')
    logOutAllUsers();
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(fileUpload());

/* Create Database */
let usersSchema = mongoose.Schema({
    login: String,
    password: String,
    name: String,
    surname: String,
    email: String,
    isLogin: Boolean,
    permission: Number
});

let teachersSchema = mongoose.Schema({
    name: String,
    surname: String,
    avatar: String,
    description: String
})

let newsSchema = mongoose.Schema({
    postTitle: String,
    postIdent: String,
    postData: String,
    postShort: String,
    postMiniature: String,
    postMiniatureSmall: String,
    postTags: Array,
    postText: String,
    postAuthor: String,
    postTeacher: String,
    postPublished: Boolean,
    widgets: Array
}, { strict: false })

let eventsSchema = mongoose.Schema({
    eventTitle: String,
    eventIdent: String,
    eventData: String,
    eventShort: String,
    eventMiniature: String,
    eventMiniatureSmall: String,
    eventTags: Array,
    eventText: String,
    eventAuthor: String,
    eventTeacher: String,
    eventPublished: Boolean,
    widgets: Array
}, { strict: false })

let Users = mongoose.model('Users', usersSchema, 'Users');
let News = mongoose.model('News', newsSchema, 'News');
let Events = mongoose.model('Events', eventsSchema, 'Events');
let Teachers = mongoose.model('Teachers', teachersSchema, 'Teachers');

function logOutAllUsers(){
    Users.update({}, {isLogin: false}, {multi: true}, function(err){
         console.log("LogOut All Users!")
    })
}
app.post('/api/getUserToLogin', function (req, res) {
    if(req.body.PkRTvG % 2 == 0 && req.body.PkRTvG >= 111 && req.body.PkRTvG <= 200){
        let hashPassword = crypto.createHash('sha256').update(req.body.userPassword).digest('hex');
        Users.findOne({login: req.body.userName, password: hashPassword}, function(err,obj) {
            if(obj == null){
                let resendObject = {
                    loginStatus: false,
                    loginMessage: 'Podaj poprawny login lub hasło!'
                }
                res.json(resendObject);
            }else{
                if(obj.isLogin == true){
                    let resendObject = {
                        loginStatus: false,
                        loginMessage: 'Użytkownik jest już zalogowany!'
                    }
                    res.json(resendObject); 
                }else{
                    Users.findOneAndUpdate({login: req.body.userName}, {isLogin: true}, function(err){
                        if(!err){
                            let resendObject = {
                                loginStatus: true,
                                userPermission: obj.permission,
                                loginMessage: 'Poprawnie zalogowano!'
                            }
                            res.json(resendObject); 
                        }else{
                            let resendObject = {
                                loginStatus: false,
                                loginMessage: 'Błąd bazy danych!'
                            }
                            res.json(resendObject);
                        }
                    })
                }
            }
        });
    }else
        res.status(501).send("Error 501")
});

app.put('/api/logOut', function(req, res){
    if(req.body.xPosKw % 2 == 0 && req.body.xPosKw >= 321 && req.body.xPosKw <= 400){
        Users.findOneAndUpdate({login: req.body.userName}, {isLogin: false}, function(err){
            if(!err){
                let resendObject = {
                    logoutStatus: true,
                    logoutMessage: 'Poprawnie wylogowano użytkownika!'
                }
                res.json(resendObject);
            }else{
                let resendObject = {
                    logoutStatus: false,
                    logoutMessage: 'Błąd bazy danych!'
                }
                res.json(resendObject);
            }
        })
    }else
        res.status(501).send("Error 501")
});

app.put('/api/userLogin', function(req, res){
    if(req.body.CwQssA % 2 == 0 && req.body.CwQssA >= 51 && req.body.CwQssA <= 100){
        Users.findOneAndUpdate({login: req.body.userName}, {isLogin: true}, function(err){
            if(!err){
                let resendObject = {
                    logoutStatus: true,
                    logoutMessage: 'Poprawnie zalogowano użytkownika!'
                }
                res.json(resendObject);
            }else{
                let resendObject = {
                    logoutStatus: false,
                    logoutMessage: 'Błąd bazy danych!'
                }
                res.json(resendObject);
            }
        })
     }else
        res.status(501).send("Error 501")
 });

app.get('/api/loadAllNews', function(req, res){
    News.find({}, null, {sort: {postData: -1}}, function(err, obj){
        if(obj == null){
            let resendObject = {
                loadNewsStatus: false,
                loadNewsMessage: 'Brak istniejących postów'
            }
            res.json(resendObject)
        }else{
            let resendObject = {
                loadNewsStatus: true,
                loadNewsData: obj
            }
            res.json(resendObject)
        }
    })
})

app.get('/api/loadAllEvents', function(req, res){
    Events.find({}, null, {sort: {eventData: -1}}, function(err, obj){
        if(obj == null){
            let resendObject = {
                loadEventsStatus: false,
                loadEventsMessage: 'Brak istniejących wydarzeń'
            }
            res.json(resendObject)
        }else{
            let resendObject = {
                loadEventsStatus: true,
                loadEventsData: obj
            }
            res.json(resendObject)
        }
    })
})

app.get('/api/loadAllTeachers', function(req, res){
    Teachers.find({}, function(err, obj){
        if(obj == null){
            let resendObject = {
                loadTeachersStatus: false,
                loadTeachersMessage: 'Brak istniejących nauczycieli'
            }
            res.json(resendObject)
        }else{
            let resendObject = {
                loadTeachersStatus: true,
                loadTeachersData: obj
            }
            res.json(resendObject)
        }
    })
})

app.get('/api/loadOneNews', function(req, res){
    News.find({postIdent: req.query.postIdent}, function(err, obj){
        if(obj == null){
            let resendObject = {
                loadNewsStatus: false,
                loadNewsMessage: 'Brak istniejących postów'
            }
            res.json(resendObject)
        }else{
            let resendObject = {
                loadNewsStatus: true,
                loadNewsData: obj
            }
            res.json(resendObject)
        }
    })
})

app.get('/api/loadOneEvent', function(req, res){
    Events.find({eventIdent: req.query.eventIdent}, function(err, obj){
        if(obj == null){
            let resendObject = {
                loadEventsStatus: false,
                loadEventsMessage: 'Brak istniejących wydarzeń'
            }
            res.json(resendObject)
        }else{
            let resendObject = {
                loadEventsStatus: true,
                loadEventsData: obj
            }
            res.json(resendObject)
        }
    })
})

app.delete('/api/deleteNews', function(req, res){
    if(req.query.pHYcSW % 2 == 0 && req.query.pHYcSW >= 541 && req.query.pHYcSW <= 600){
        News.remove({postIdent: req.query.postIdent}, function(err){
            if(err){
                let resendObject = {
                    deleteNewsStatus: false,
                    deleteNewsMessage: 'Brak istniejących postów do usunięcia'
                }
                res.json(resendObject)
            }else{
                let resendObject = {
                    deleteNewsStatus: true,
                    deleteNewsMessage: 'Post został usunięty'
                }
                rimraf('./gallery/newsGallery/' + req.query.postIdent, function () { });
                res.json(resendObject)
            }
        })
    }else
    res.status(501).send("Error 501")
})

app.delete('/api/deleteEvent', function(req, res){
    if(req.query.pHYcSW % 2 == 0 && req.query.pHYcSW >= 541 && req.query.pHYcSW <= 600){
        Events.remove({eventIdent: req.query.eventIdent}, function(err){
            if(err){
                let resendObject = {
                    deleteEventsStatus: false,
                    deleteEventsMessage: 'Brak istniejących wydarzeń do usunięcia'
                }
                res.json(resendObject)
            }else{
                let resendObject = {
                    deleteEventsStatus: true,
                    deleteEventsMessage: 'Wydarzenie zostało usunięte'
                }
                rimraf('./gallery/eventsGallery/' + req.query.eventIdent, function () { });
                res.json(resendObject)
            }
        })
    }else
    res.status(501).send("Error 501")
})

app.put('/api/editNews', function(req, res){
    if(req.body.sncKox % 2 == 0 && req.body.sncKox >= 675 && req.body.sncKox <= 987){
        News.findOne({postIdent: req.body.data.postIdent}, function(err, doc){
            if(err) return res.status(500).send(err)
            if(!doc){
                let resendObject = {
                    editNewsStatus: false,
                    editNewsMessage: 'Brak istniejących postów do edytowania'
                }
                res.json(resendObject)
            }else{
                for (let id in req.body.data ){
                    doc[id]= req.body.data[id];
                }
                doc.save( function(err){
                    if(err) return res.status(500).send(err)

                    let resendObject = {
                        editNewsStatus: true,
                        editNewsMessage: 'Post został edytowany'
                    }
                    res.json(resendObject)
                })
            }
        })
     }else
        res.status(501).send("Error 501")
 });

app.put('/api/editEvent', function(req, res){
    if(req.body.sncKox % 2 == 0 && req.body.sncKox >= 675 && req.body.sncKox <= 987){
        Events.findOne({eventIdent: req.body.data.eventIdent}, function(err, doc){
            if(err) return res.status(500).send(err)
            if(!doc){
                let resendObject = {
                    editEventsStatus: false,
                    editEventsMessage: 'Brak istniejących wydarzeń do edytowania'
                }
                res.json(resendObject)
            }else{
                for (let id in req.body.data ){
                    doc[id]= req.body.data[id];
                }
                doc.save( function(err){
                    if(err) return res.status(500).send(err)

                    let resendObject = {
                        editEventsStatus: true,
                        editEventsMessage: 'Wydarzenie zostało edytowane'
                    }
                    res.json(resendObject)
                })
            }
        })
     }else
        res.status(501).send("Error 501")
 });

app.post('/api/addNews', function(req, res){
    if(req.body.aYtCpO % 2 == 0 && req.body.aYtCpO >= 431 && req.body.aYtCpO <= 500){

        News.create(req.body.data, function(err){
            if(!err){
                let resendObject = {
                    addNewsStatus: true,
                    addNewsMessage: 'Post został dodany'
                }
                res.json(resendObject)
            }else{
                let resendObject = {
                    addNewsStatus: false,
                    addNewsMessage: 'Błąd podczas dodawania posta'
                }
                res.json(resendObject)
            }
        })
    }else
    res.status(501).send("Error 501")
})

app.post('/api/addEvent', function(req, res){
    if(req.body.aYtCpO % 2 == 0 && req.body.aYtCpO >= 431 && req.body.aYtCpO <= 500){

        Events.create(req.body.data, function(err){
            if(!err){
                let resendObject = {
                    addEventsStatus: true,
                    addEventsMessage: 'Wydarzenie zostało dodane'
                }
                res.json(resendObject)
            }else{
                let resendObject = {
                    addEventsStatus: false,
                    addEventsMessage: 'Błąd podczas dodawania wydarzenia'
                }
                res.json(resendObject)
            }
        })
    }else
    res.status(501).send("Error 501")
})

app.get('/gallery/:imageType/:typeTitle/:name', function(req, res){
    let img = fs.readFileSync('./gallery/' + req.params.imageType + '/' + req.params.typeTitle + '/' + req.params.name)
    res.end(img, 'binary');
})

app.get('/gallery/:imageType/:typeTitle/:folder/:name', function(req, res){
    let img = fs.readFileSync('./gallery/' + req.params.imageType + '/' + req.params.typeTitle + '/' + req.params.folder + '/' + req.params.name)
    res.end(img, 'binary');
})

 
app.post('/api/uploadImage', function(req, res) {
    if(req.body.nTySQf % 2 == 0 && req.body.nTySQf >= 791 && req.body.nTySQf <= 860){
     
        let file = req.files.file;
     
        mkdirp(req.body.path, function(err) { 
            file.mv(req.body.path + '/' + req.files.file.name, function(err) {
                if (err)
                    return res.status(500).send(err);

                if(req.body.type == 'miniature'){
                    jimp.read(req.body.path + '/' + req.files.file.name, function (err, image) {
                        if (err){
                            console.log(err);
                        } else{
                            image.resize(200, jimp.AUTO).quality(60).write(req.body.path + '/min_' + req.files.file.name)
                            let resendObject = {
                                addImagesStatus: true,
                                addImagesMessage: 'Zdjęcia zostały dodane'
                            }
                            res.json(resendObject)
                        }
                    });
                }else if(req.body.type == 'fullImage'){
                    jimp.read(req.body.path + '/' + req.files.file.name, function (err, image) {
                        if (err){
                            console.log(err);
                        } else{
                            rimraf(req.body.path + '/' + req.files.file.name, function () { 
                                image.quality(60).write(req.body.path + '/' + req.files.file.name)
                                let resendObject = {
                                    addImagesStatus: true,
                                    addImagesMessage: 'Zdjęcia zostały dodane'
                                }
                                res.json(resendObject)
                            });
                        }
                    });
                }
            });
        });
    }
});

app.listen(4000, () => console.log('Example app listening on port 4000!'))