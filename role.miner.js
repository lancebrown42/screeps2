var roleMiner = {
    run: function(creep){
        var source = creep.room.find(FIND_SOURCES)
        if(creep.harvest(source[0])==ERR_NOT_IN_RANGE){
            creep.moveTo(source[0])
        }
        
        
    }
}
module.exports = roleMiner