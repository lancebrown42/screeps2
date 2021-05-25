var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');
module.exports.loop = function(){
    
    for(var name in Memory.creeps){
        if(!Game.creeps[name]){
            delete Memory.creeps[name];
            console.log('Clearing dead creep from memory: ', name)
        }
    }
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester')
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader')
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder')
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer')
    if(upgraders.length < 1){
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'})
        if(newName <0){
            // console.log('Not enough energy stored to spawn upgrader!')
                
        }
        else{
            
            console.log('Spawning new upgrader: ' + newName)
        }
    }
    else if(harvesters.length < 8){
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'harvester'})
        if(newName <0){
            // console.log('Not enough energy stored to spawn harvester!')
                
        }
        else{
           
            console.log('Spawning new harvester: ' + newName)
        }
    }
    else if(upgraders.length < 8){
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'})
        if(newName <0){
            // console.log('Not enough energy stored to spawn upgrader!')
                
        }
        else{
            
            console.log('Spawning new upgrader: ' + newName)
        }
    }else if(builders.length < 6){
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'builder'})
        if(newName <0){
            // console.log('Not enough energy stored to spawn builder!')
                
        }
        else{
            
            console.log('Spawning new builder: ' + newName)
        }
        
    }else if(repairers.length < 1){
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'repairer'})
        if(newName <0){
            // console.log('Not enough energy stored to spawn builder!')
                
        }
        else{
            
            console.log('Spawning new repairer: ' + newName)
        }
        
    }

    for(var name in Game.creeps){
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester'){
            roleHarvester.run(creep);
        }
        if(creep.memory.role== 'upgrader'){
            roleUpgrader.run(creep)
        }
        if(creep.memory.role == 'builder'){
            roleBuilder.run(creep)
        }
        if(creep.memory.role == 'repairer'){
            roleRepair.run(creep)
        }
    
        
       
    }
    
    Game.spawns['Spawn1'].room.find(FIND_DROPPED_RESOURCES).forEach(function(res) {
        var creep = res.pos.findClosestByPath(FIND_CREEPS,{
            filter: function(creep){
                return (creep.carry.energy+res.amount < creep.carryCapacity)
            }
        });
        creep.moveTo(res);
        console.log(creep.name+" is claiming " + res.amount + " " + res.resourceType + " at location " + res.pos)
        creep.pickup(res)
    });
}
