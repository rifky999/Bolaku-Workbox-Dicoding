document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});


function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange  = function () {
        if (this.readyState == 4) {
            var content = document.getElementById("body-content");
            
            if (this.status == 200) {
                content.innerHTML = xhttp.responseText;
                runscript(page);
              
            }else if (this.status == 404) {
                content.innerHTML = "<b>Halaman Tidak Ada</b>"    
            } else {
                content.innerHTML = "<b>Halaman Tidak Dapat diAkses</b>"    
            }

        }
    };
    
    xhttp.open("GET","pages/"+page+".html",true);
    xhttp.send();
}


switching();
function switching() {

    var page = window.location.hash.substr(1);

    if (page == "") { page = "team";}

    loadPage(page);


}

function runscript(page){
    switch (page) {
        case "team":
        //JS/APIteam.js
            team();
            break;
        case "teamfav":
        //JS/TeamFavIDB
        showTeamFav();
            break;
        case "topscore":
            //JS/TeamFavIDB
            topscore();
            break;        

        default:
            break;
    }
}


