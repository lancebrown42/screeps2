var roleFarBuilder = {
    run: function(creep){
        if(creep.room == Game.spawns['Spawn1'].room){
            var exit = creep.room.findExitTo('E1N65');
            creep.moveTo(creep.pos.findClosestByPath(exit))
            
        }
        else{
        
            if(creep.memory.building && creep.carry.energy == 0 ){
                creep.memory.building = false;
                creep.say('harvesting')
                
            }
            if(!creep.memory.building && creep.carry.energy == creep.carryCapacity){
                creep.memory.building = true;
                creep.say('building')
            }
            
            if(creep.memory.building){
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets.length){
                    if (creep.build(targets[0]) == ERR_NOT_IN_RANGE){
                        creep.moveTo(targets[0])
                    }
                }
            
            else {
                // console.log('i dont know wehat to do')
                var wallFix = creep.pos.findClosestByPath(FIND_STRUCTURES,{
                filter: function(object){
                    return(object.hits < object.hitsMax / 2)
                }
            })
                creep.moveTo(wallFix)
                creep.repair(wallFix)
            }
        }
            if(!creep.memory.building && creep.carry.energy < creep.carryCapacity){
                var sources = creep.pos.findClosestByPath(FIND_SOURCES);
                if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources);
                
            }
            
            
            }
        }
    }
}
module.exports = roleFarBuilder