var mongoose = require('mongoose');
var Player = mongoose.model('Player');
module.exports = function(app) {
  app.get('/players/list', function(req, res){
    console.log("got to routes playerlist");
    Player.find({}, function(err, players) {
      if(err){
        console.log("wrong in find");
      }else{
        console.log("got the players!");
        res.status(200).json(players);
      }
    })
  })//same for post/put/delete
  app.post('/adding', function(req, res, next){
    console.log("got to the routes.js add player");
    var player = new Player({});
    player.name = req.body.name;
    player.position = req.body.position;
    player.game1 = 0;
    player.game2 = 0;
    player.game3 = 0;
    player.save(function(err) {
      if(err){
        console.log("something went wrong");
      } else {
        console.log("saved a player!");
        Player.find({}, function(err, players) {
          if(err){
            console.log("wrong in find");
          }else{
            res.status(200).json(players);
          }
        })
      }
    })
  })

  app.post('/update/:id/', function(req, res, next){
    var userid = req.params.id;
    console.log("got to update section");
    Player.findOne({_id : userid}, function(err, player){
      console.log(req.body);
      console.log(req.body.data);
      if (req.body.gamenum == 1){
        player.game1 = req.body.gamestat;
      }else if (req.body.gamenum == 2){
        player.game2 = req.body.gamestat;
      }else if (req.body.gamenum == 3){
        player.game3 = req.body.gamestat;
      }
      player.save(function(err){
        Player.find({}, function(err, players) {
          if(err){
            console.log("wrong in find");
          }else{
            console.log("got the players!");
            res.status(200).json(players);
          }
        })
      })

    })
  })
  app.delete('/delete/:id', function(req, res, next){
    console.log("got into delete");
    Player.remove({_id:req.params.id}, function(err){
      console.log("before redirect");
      Player.find({}, function(err, players) {
        if(err){
          console.log("wrong in find");
        }else{
          console.log("got the players!");
          res.status(200).json(players);
        }
      })
    })
  })
  app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./notesapp/dist/index.html"))
    });
}
