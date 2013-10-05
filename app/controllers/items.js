var express = require('express');
var db = require('../../config/db');
var sequelize = db.sequelize;

var Item = db.Item;
var Tag = db.Tag;
var Vote = db.Vote;

exports.getAllTagsForItem = function(req, res){
  Item.find({where: {id: 1}}).success(function(item){
    item.getTags().success(function(tags){console.log('ALL TAGS FOR ITEM 1', tags);});
  });
};

exports.create = function(req, res){
  Item.create({ title: req.body.title, link: req.body.link }).success(function(item) {
    var tags = Object.keys(req.body.tags);
    for(var i = 0; i < tags.length; i++){
      Tag.findOrCreate({ name: tags[i] }).success(function(tag, created) {
        item.addTag(tag).success(function(tag){console.log('SET TAG', tag);});
      });
    }
  });
  res.end();
};

exports.get = function(req,res) {
  Item.findAll({include: [Tag]}).success(function(items){
    res.send(items);
  });
};

exports.getOne = function(req, res){
  Item.find({include: [Tag], where: {id: req.params.id}}).success(function(item){
    res.send(item);
  });
};



