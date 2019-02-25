function status(response) {
    if (response.status !==200) {
        console.log("Error : " + response.status);
        //Metod reject() akan membuat catch terpanggil
        return Promise.reject(new Error(response.statusText));
    }else {
        // mengubah suatu objek menjadi Promise agar bisa di "Then-kan"
        return Promise.resolve(response)
    }
}

// Blok kode untuk memparse json ke array
function json(data) {
    return data.json();
}

// Blok kode untuk menghandle catch
function error(error) {
    // parameter error dari Promise.reject()
    console.log("error : " + error);
}

function topscore() {

    //get data from api football with fetch + option header

    var url = "https://api.football-data.org/v2/competitions/SA/scorers";
   
 if ('caches' in window) {
        console.log(url);
        caches.match(url).then(function (response) {
            if (response) {
                response.json().then((datas) => {
                    var listscore = "";
                    console.log("ceh"+datas);
                    for (i in datas.scorers) {

                        //Set all data from caches to the card and Insert into variabel listscore
                        listscore += `<tr>
                                        <td>${datas.scorers[i].player.name}</td>
                                        <td>${datas.scorers[i].team.name}</td>
                                        <td>${datas.scorers[i].numberOfGoals}</td>
                                    </tr>`;
                    }
                    document.getElementById("topscore").innerHTML = listscore;
                });
               
               
                //Set listscore to the Id "bdteam" on the team.html
               
            }else {
                document.getElementById("topscore").innerHTML = "Data Kosong";
            }
        });
    }

        fetch(url, {
            method: "GET",
            headers: {
                "X-Auth-Token": "68810a325d6a40379e199cd63bc2ae6c"
            }
            //promise for status fetch, convert request to json and implement data to interace{card interface}
        }).then(status).then(json).then(function (datas) {
           
            var listscore = "";
            console.log(datas);
            
            if (datas) {
                for (i in datas.scorers) {
 
                    //Set all data from API to the card and Insert into variabel listscore
                    listscore += `<tr>
                                        <td>${datas.scorers[i].player.name}</td>
                                        <td>${datas.scorers[i].team.name}</td>
                                        <td>${datas.scorers[i].numberOfGoals}</td>
                                    </tr>`;
                //Set listscore to the Id "bdteam" on the team.html
                console.log("fetc");
                
                document.getElementById("topscore").innerHTML = listscore;
            }
        }
        });
}

