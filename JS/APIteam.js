function status(response) {
    if (response.status !==200) {
        console.log("Error : " + response.status);
        //Metod reject() akan membuat catch terpanggil
        document.getElementById("bdteam").innerHTML = "<center><b>Tidak Ada Data di Tahun ini";
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

function team(stop) {
    console.log("Fetch");
    
    var thnlg = document.getElementById("thnliga").value; 
    
    //set if search is null
    if (!thnlg || thnlg == null) {
        thnlg = "2015";
    }

    //get data from api football with fetch + option header
    var base = "https://api.football-data.org";
    var atribut = "/v2/competitions/" + thnlg + "/teams";
    var url = base + atribut;
   
 if ('caches' in window) {
        console.log(url);
        caches.match(url).then(function (response) {
            if (response) {
                
                
                response.json().then((datas) => {
                    var listTeam = "";
                    console.log(datas);
                    var tahun = datas.competition.id;
                    for (i in datas.teams) {
                        var url = datas.teams[i].crestUrl;
                        //check link logo is null or not. if null it will get img notfound.jpg    
                        if (url == null) { url = "/Img/notfound.png"; }
                        url = url.replace(/^http:\/\//i, 'https://');
                        //Set all data from API to the card and Insert into variabel ListTeam
                        listTeam += `<div class="col s12 m3">
                                <div class="card">
                                    <div class="card-image">
                                        <img id="logoclub" src="${url}" alt="Logo Team">
                                        <a class="btn-floating halfway-fab waves-effect waves-light red" 
                                        onclick="fav('${datas.teams[i].id}'
                                                    ,'${tahun}'
                                                    ,'${datas.teams[i].name}'
                                                    ,'${datas.teams[i].address}'
                                                    ,'${datas.teams[i].phone}'
                                                    ,'${datas.teams[i].website}'
                                                    ,'${datas.teams[i].email}'
                                                    ,'${datas.teams[i].founded}','${url}')"><i class="material-icons" style="font-size:12px;">+Fav</i></a>
                                    </div>
                                    <div class="card-content">
                                    <table border="0">
                                    
                                        <tr>
                                            <td>Nama</td>
                                            <td>:</td>
                                            <td>${datas.teams[i].name}</td>
                                        </tr>
                                        <tr>
                                            <td>Alamat</td>
                                            <td>:</td>
                                            <td>${datas.teams[i].address}</td>
                                        </tr>
                                        <tr>
                                            <td>Telphone</td>
                                            <td>:</td>
                                            <td>${datas.teams[i].phone}</td>
                                        </tr>
                                        <tr>
                                            <td>Website</td>
                                            <td>:</td>
                                            <td>${datas.teams[i].website}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>:</td>
                                            <td>${datas.teams[i].email}</td>
                                        </tr>
                                        <tr>
                                            <td>Didirikan</td>
                                            <td>:</td>
                                            <td>${datas.teams[i].founded}</td>
                                        </tr>
                                        
                                        </table>
                                    </div>
                                </div>
                            </div>`;
                    }
                    document.getElementById("bdteam").innerHTML = listTeam;
                });
               
               
                //Set listTeam to the Id "bdteam" on the team.html
               
            }else {
                document.getElementById("bdteam").innerHTML = "Data Kosong";
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
            var listTeam = "";
        
            console.log(url);
            
            if (datas) {
                for (i in datas.teams) {
                    var url = datas.teams[i].crestUrl;
                    var tahun = datas.competition.id;
                    //check link logo is null or not. if null it will get img notfound.jpg    
                    if (url==null) {url = "/Img/notfound.png";}
                    url = url.replace(/^http:\/\//i, 'https://');
                    //Set all data from API to the card and Insert into variabel ListTeam
                    listTeam += `<div class="col s12 m3">
                                <div class="card">
                                    <div class="card-image">
                                        <img id="logoclub" src="${url}" alt="Logo Team">
                                        <a class="btn-floating halfway-fab waves-effect waves-light red"
                                        onclick="fav('${datas.teams[i].id}'
                                                    ,'${tahun}'
                                                    ,'${datas.teams[i].name}'
                                                    ,'${datas.teams[i].address}'
                                                    ,'${datas.teams[i].phone}'
                                                    ,'${datas.teams[i].website}'
                                                    ,'${datas.teams[i].email}'
                                                    ,'${datas.teams[i].founded}','${url}')"><i class="material-icons" style="font-size:12px;">+Fav</i></a>
                                    </div>
                                    <div class="card-content">
                                    <table border="0">
                                    
                                        <tr>
                                            <td>Nama</td>
                                            <td>:</td>
                                            <td>${datas.teams[i].name}</td>
                                        </tr>
                                        <tr>
                                            <td>Alamat</td>
                                            <td>:</td>
                                            <td>${datas.teams[i].address}</td>
                                        </tr>
                                        <tr>
                                            <td>Telphone</td>
                                            <td>:</td>
                                            <td>${datas.teams[i].phone}</td>
                                        </tr>
                                        <tr>
                                            <td>Website</td>
                                            <td>:</td>
                                            <td>${datas.teams[i].website}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>:</td>
                                            <td>${datas.teams[i].email}</td>
                                        </tr>
                                        <tr>
                                            <td>Didirikan</td>
                                            <td>:</td>
                                            <td>${datas.teams[i].founded}</td>
                                        </tr>
                                        
                                        </table>
                                    </div>
                                </div>
                            </div>`;
                }
                //Set listTeam to the Id "bdteam" on the team.html
                console.log("fetc");
                
                document.getElementById("bdteam").innerHTML = listTeam;
            }
        });
}

