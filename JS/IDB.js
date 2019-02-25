var dbPromise = idb.openDb("database1", 1, function(upgradeDb) {
   if (!upgradeDb.objectStoreNames.contains("teamfav")) {
       var tfav = upgradeDb.createObjectStore("teamfav",{keyPath: "idteam"});
       
    } 
});


