var roleInvade = {
    run: function(creep){
        if(creep.room != Game.rooms['E2S13']){
            var exit = creep.room.findExitTo('E2S13');
            creep.moveTo(creep.pos.findClosestByPath(exit))
            
        }
        else{
            // console.log('im in the room')
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: function(structure){
                    return structure.structureType == 'controller'
                }
            })
            // console.log(creep.claimController(cont))
            // creep.reserveController(cont)
            if(creep.claimController(cont) == ERR_NOT_IN_RANGE){
                creep.moveTo(cont)
                creep.say('Im trying')
            }
        }
    }
            
}

module.exports = roleInvade;