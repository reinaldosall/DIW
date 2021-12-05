var user;
$(document).ready(() => {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var user = url.searchParams.get("user");
    if (!user) {
        window.location.replace("login.html");
    }

    getAllRepos(user);

    var show = 0;

    $("#change").on('click', function () {
        if ($(document).width() <= 650) {

            $("#change").toggleClass("fa-arrow-right");
            $("#change").toggleClass("fa-arrow-left");

            $(".user").css("display", show == 0 ? "none" : "flex");
            $(".repos").css("display", show == 1 ? "none" : "flex");
            show = (show == 1 ? 0 : 1);
        }
    })

    $(window).resize(() => {
        if ($(document).width() > 650) {
            $(".user").css("display", "flex");
            $(".repos").css("display", "flex");
        }
    })

    $("#goSearch").on('click', () => {
        search(user);
    })


    var typingTimer; //timer identifier
    var doneTypingInterval = 400; //time in ms, 1 second for example

    //on keyup, start the countdown
    $('#searchText').keyup(function () {
        clearTimeout(typingTimer);
        if ($('#searchText').val) {
            typingTimer = setTimeout(done, doneTypingInterval);
        }
    });

    function done(){
        search(user);
    }
})


function getAllRepos(user) {
    $.get("https://api.github.com/users/" + user, (data) => {
        $("#repContent").text('');
        //console.log(data)
        $("#avatar").attr("src", data.avatar_url);
        $("#gitUrl").attr("href", data.html_url);
        $("#nome").text(data.login)
        $("#followers").text(data.followers)
        $("#following").text(data.following)
        var bio = data.bio == null ? "Usuário Sem Bio" : data.bio;
        $("#bio").text(bio)

        $.get("https://api.github.com/users/" + user + "/repos", (data) => {
            //console.log(data)
            data.forEach(x => {
                const description = x.description || ''
                let item = "<div class='item'>"
                    + "<span class='repName'>" + x.name + "</span>"
                    + "<p class='repDesc'>" + description + "</p>"
                    + "<a target='_blank' href='" + x.html_url + "'> Go to <i class='fas fa-external-link-alt'></i> </a>"
                    + "</div>";


                $("#repContent").append(item)
                //console.log(x)
            });
        })
    })
        .fail(function () {
            alert("Usuário Não Encontrado");
            window.location.replace("login.html");

        })

}


function search(user){
    $("#repContent").text('');
    $("#searchResp").text('');
    
    var searchText = $("#searchText").val();
    var query = searchText + " user:" + user;
    var queryString = 'q=' + encodeURIComponent(query);


    $.get("https://api.github.com/search/repositories", queryString, (data) => {
        //console.log(queryString)
        //console.log(data)
        //console.log(typeof(data))

        var StringData = Object.values(data);

        //console.log(StringData[2])
        //console.log(Object.values(data))
        $("#repContent").text('');
        StringData[2].forEach(s => {
            console.log(s)
            $("#searchResp").append("<a href='" + s.html_url + "'>" + s.name + "</a>")




            let item = "<div class='item'>"
                + "<span class='repName'>" + s.name + "</span>"
                + "<p class='repDesc'>" + s.description + "</p>"
                + "<a target='_blank' href='" + s.html_url + "'> Go to <i class='fas fa-external-link-alt'></i> </a>"
                + "</div>";


            $("#repContent").append(item)
            //console.log(x)

        });
    })
    .fail( () =>{
        getAllRepos(user)
    })
}