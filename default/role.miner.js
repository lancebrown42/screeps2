var roleMiner = {
    run: function(creep){
        var source = creep.room.find(FIND_SOURCES)
        creep.moveTo(source[0])
        var cont = creep.room.lookForAt('structure', creep.pos)[0]
        if(1){
            // if(cont.structureType == 'container' && cont.store.energy < cont.storeCapacity){
                creep.harvest(source[0])
            // }else{
                // creep.say("strike")
            // }
        }else{
            // creep.say('shits fucked')
        }
        
        // creep.harvest(source[0])
    }
}
module.exports = roleMiner