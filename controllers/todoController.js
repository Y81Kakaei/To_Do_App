
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to DB
mongoose.connect('mongodb://Yazdan:ya9525ka@ds235711.mlab.com:35711/todo',{useNewUrlParser: true}   );


//create a schema- this is like a blue print
var todoSchema = new mongoose.Schema({

    item: String

});



var Todo = mongoose.model('Todo', todoSchema);

/*
var itemOne = Todo({item: 'buy flowers'}).save(function(err){

    if(err) throw err;
    console.log('item saved');
});

*/

//var data =[{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app) {

    app.get('/todo', function(req, res){

        //get data from mongod and pss it to the view
        Todo.find({}, function(err, data){
            
            if(err) throw err;
            res.render('todo', {todos: data});
        });


    });



    app.post('/todo', urlencodedParser, function(req, res){

        //get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data){

            if(err) throw err;
            res.json(data);

        });

        /*
        data.push();
        res.json(data);

        */

    });


    app.delete('/todo/:item', function(req, res){

        // delete the requested item from mongoDB 
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function (err, data) {

            if(err) throw err;
            res.json(data);
            
        });
        

    });
    
};
