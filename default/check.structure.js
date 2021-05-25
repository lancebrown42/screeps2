var structureCheck = {
    check: function(struc){
        return struc.hits <= struc.hitsMax * 0.8
    }
}