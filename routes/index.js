var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/AWM');
var collection = db.get('proctors');
var collection1 = db.get('workers');
var collection2 = db.get('admin');
var moment = require('moment');
// var nodemailer = require('nodemailer');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
 
var upload = multer({ storage: storage })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//home page
router.get('/homepage',function(req, res, next){
	res.render('homepage',{title: 'Express'});
});

//proctor page
router.get('/proctor',function(req, res, next){
	res.render('proctor');
});

//proctor login 
router.post('/loginuser' ,function(req, res){
collection.findOne({"email":req.body.email,"password":req.body.password},function(error,docs)
{
	if (error || (docs == null)) {
		res.sendStatus(500)
	} else {
		req.session.user = docs
		res.sendStatus(200)
		console.log(docs)
	}
})
});

//proctor panel
router.get('/proctorpanel',function(req, res, next){
	if (req.session && req.session.user) {
		res.localsuser = req.session.user
		res.render('proctorpanel')
	} else {
		req.session.reset()
		res.redirect('/proctordashboard')
	}
	// res.render('proctorpanel',{title: 'Express'});
});

//proctor dashboard
router.get('/proctordashboard',function(req, res, next){
	if (req.session && req.session.user) {
		console.log(req.session.user)
		res.locals.user = req.session.user
		res.render('proctordashboard')
	} else {
		req.session.reset()
		res.redirect('/proctor')
	}
	 // res.render('proctordashboard',{title: 'Express'});
});

//today workers in proctor dashboard
router.get('/todayworkersin',function(req, res, next){
	if (req.session && req.session.user) {
		console.log(req.session.user)
		res.locals.user = req.session.user
		res.render('todayworkersin')
	} else {
		req.session.reset()
		res.redirect('/proctor')
	}
});

//today workers out proctor dashboard
router.get('/todayworkersout',function(req, res, next){
	if (req.session && req.session.user) {
		console.log(req.session.user)
		res.locals.user = req.session.user
		res.render('todayworkersout')
	} else {
		req.session.reset()
		res.redirect('/proctor')
	}
});

//total workers out proctor dashboard
router.get('/totalworkers',function(req, res, next){
	if (req.session && req.session.user) {
		console.log(req.session.user)
		res.locals.user = req.session.user
		res.render('totalworkers')
	} else {
		req.session.reset()
		res.redirect('/proctor')
	}
});

//logout for proctor
router.get('/logoutproctor', function(req, res)
{
	req.session.reset()
	res.redirect('/proctor')
});

//workers registration
router.post('/loginworker', upload.single('fileupload'), function (req, res) {
	/*console.log(req.body)
	console.log(req.file)*/
	var data = {
		name:req.body.name,
		mobilenumber:req.body.mobilenumber,
		aadhaarnumber:req.body.aadhaarnumber,
		date:moment(req.body.date).format("DD-MM-YYYY"),
		gender:req.body.gender,
		//time:req.body.time,
		transport:req.body.transport,
		role:req.body.role,
		address:req.body.address,
		fileupload:req.file.originalname
	}
collection1.findOne({$or:[{"name":req.body.name}, {"aadhaarnumber":req.body.aadhaarnumber}]}, function (err, docs1) {
    if(err || (docs1 == null)){
      collection1.insert(data,function (error, docs) {
        if(error){
          res.sendStatus(500)
        }else{
          res.sendStatus(200)
        }
      })
    }
    else{
      res.sendStatus(500)
    }
  })

});

//workers data in proctordashboard
router.get('/getdata', function(req, res){
console.log(req.body)
collection1.find({}, function(error, docs){
	if (error) {
		res.sendStatus(500)
	} else {
		res.send(docs)
	}
})
});


//admin page
router.get('/admin',function(req, res, next){
	res.render('admin',{title: 'Express'});
});

//admin dashboard
router.get('/admindashboard',function(req, res, next){
	if (req.session && req.session.user) {
		console.log(req.session.user)
		res.locals.user = req.session.user
		res.render('admindashboard')
	} else {
		req.session.reset()
		res.redirect('/admin')
	}
	// res.render('admindashboard',{title: 'Express'});
});

//admin login 
router.post('/loginadmin' ,function(req, res){
collection2.findOne({"email":req.body.email,"password":req.body.password},function(error,docs)
{
	if (error || (docs == null)) {
		res.sendStatus(500)
	} else {
		req.session.user = docs
		res.sendStatus(200)
		console.log(docs)
	}
})
});

//workers data in admindashboard
router.get('/getdata', function(req, res){
console.log(req.body)
collection1.find({}, function(error, docs){
	if (error) {
		res.sendStatus(500)
	} else {
		res.send(docs)
	}
})
});

//today workers in admin dashboard
router.get('/todayworkersin1',function(req, res, next){
	if (req.session && req.session.user) {
		console.log(req.session.user)
		res.locals.user = req.session.user
		res.render('todayworkersin1')
	} else {
		req.session.reset()
		res.redirect('/admin')
	}
});

//today workers out admin dashboard
router.get('/todayworkersout1',function(req, res, next){
	if (req.session && req.session.user) {
		console.log(req.session.user)
		res.locals.user = req.session.user
		res.render('todayworkersout1')
	} else {
		req.session.reset()
		res.redirect('/admin')
	}
});

//total workers out admin dashboard
router.get('/totalworkers1',function(req, res, next){
	if (req.session && req.session.user) {
		console.log(req.session.user)
		res.locals.user = req.session.user
		res.render('totalworkers1')
	} else {
		req.session.reset()
		res.redirect('/admin')
	}
});

//logout for admin
router.get('/logoutadmin', function(req, res)
{
	req.session.reset()
	res.redirect('/admin')
});





module.exports = router;
