function fav(Vid, Vthnlg, Vnama, Valamat, Vtelp, Vweb, Vemail, Vdidirikan,url) {

    dbPromise.then(function (db) {
        var tx = db.transaction('teamfav', 'readwrite');
        var store = tx.objectStore('teamfav');
        var item = {
            idteam: Vid,
            tahun: Vthnlg,
            nama: Vnama,
            alamat: Valamat,
            telephone: Vtelp,
            website: Vweb,
            email: Vemail,
            didirikan: Vdidirikan,
            urlpp : url,
            created: new Date().getTime()
        };
        store.add(item); //menambahkan key "teamfav"
        return tx.complete;
    }).then(function () {
        console.log('Team Favorit Berhasil disimpan.');
    }).catch(function () {
        console.log('Team Favorit gagal disimpan.')
    })

}



function showTeamFav(params) {

    dbPromise.then(function (db) {
        var tx = db.transaction('teamfav', 'readonly');
        var store = tx.objectStore('teamfav');

        // mengambil primary key berdasarkan isbn
        return store.getAll();
    }).then(function (vals) {
        var listTeam = '';
        for (var i in vals) {
            var url = vals[i].urlpp;
            //check link logo is null or not. if null it will get img notfound.jpg    
            if (url == null) { url = "/Img/notfound.png"; }
            //Set all data from API to the card and Insert into variabel ListTeam
            listTeam += `<div class="col s12 m3" id="card${vals[i].idteam}">
                                <div class="card">
                                    <div class="card-image">
                                        <img id="logoclub" src="${url}" alt="Logo Team">
                                        <a class="btn-floating halfway-fab waves-effect waves-light red"
                                        onclick="deletefav('${vals[i].idteam}')"><i class="material-icons" style="font-size:12px;">-Del</i></a>
                                    </div>
                                    <div class="card-content">
                                    <table border="0">
                                    
                                        <tr>
                                            <td>Nama</td>
                                            <td>:</td>
                                            <td>${vals[i].nama}</td>
                                        </tr>
                                        <tr>
                                            <td>Alamat</td>
                                            <td>:</td>
                                            <td>${vals[i].alamat}</td>
                                        </tr>
                                        <tr>
                                            <td>Telphone</td>
                                            <td>:</td>
                                            <td>${vals[i].telephone}</td>
                                        </tr>
                                        <tr>
                                            <td>Website</td>
                                            <td>:</td>
                                            <td>${vals[i].website}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>:</td>
                                            <td>${vals[i].email}</td>
                                        </tr>
                                        <tr>
                                            <td>Didirikan</td>
                                            <td>:</td>
                                            <td>${vals[i].didirikan}</td>
                                        </tr>
                                        
                                        </table>
                                    </div>
                                </div>
                            </div>`;
        }
        //Set listTeam to the Id "bdteam" on the team.html
        document.getElementById("favteam").innerHTML = listTeam;

    });
}

function deletefav(id) {
    dbPromise.then(function (db) {
        var tx = db.transaction('teamfav', 'readwrite');
        var store = tx.objectStore('teamfav');

        store.delete(id);
        return tx.complete;
    }).then(function () {
        console.log('Item deleted:'+id);
        var hide = "card"+id;
        document.getElementById(hide).style.display = "none";

    });
}