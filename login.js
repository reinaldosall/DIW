$(document).ready(() => {
  var user = '';

  const login = () => {
    if ($("#gitUrl").val() == '') {

      $("#gitUrl").attr("placeholder", "Digite um Nome de Usuario")
      $("#nome").text("Digite um Nome de Usuario")
      $("#gitUrl").css("border-bottom", "1px solid #f00")

    } else {

      $("#gitUrl").css("border-bottom", "1px solid #337")

      user = $("#gitUrl").val();
      $.get("https://api.github.com/users/" + user, (data) => {
        console.log(data)

        $("#avatar").attr("src", data.avatar_url);
        $("#gitUrl").attr("href", data.html_url);
        $("#nome").text(data.login)
      })
        .fail(function () {
          $("#avatar").attr("src", "https://media.istockphoto.com/vectors/profile-picture-vector-illustration-vector-id587805156?k=20&m=587805156&s=612x612&w=0&h=Ok_jDFC5J1NgH20plEgbQZ46XheiAF8sVUKPvocne6Y=");
          $("#nome").text("Usuário Nao Encontrado")
          $("#acess").remove()

        })
        .done(function () {
          $("#acess").remove()
          $(".login").append("<a id='acess' href='index.html?user=" + user + "'>Continuar <i class='fas fa-angle-right'></i></a>")
        })
    }
  }

  $("#login").on('click', () => {
    login()
  })

  $("#gitUrl").on('keypress', () => {
    if (event.which == 13) {
      login()
    }
  })
})



