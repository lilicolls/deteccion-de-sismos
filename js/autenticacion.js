$(document).ready(initializar);
var formAutenticacion;
var database = firebase.database();
var aceRef = database.ref().child("lecturas_sensor"); //Referencia hacia el nodo donde estan almacenados los datos del acelerometro
var menu = $("#sidebar");  
      var div1 = $("#one");
      var div2 = $("#two");
      var div3 = $("#three"); 

function initializar(){

      
  formAutenticacion = $("#form-autenticacion");
  $('#submit').on("click",function(){
    var user = $("#email").val();
    var pass = $("#password").val();
    

    autentificar(user,pass);

    });



  $('#salir').on("click",function(){

         firebase.auth().signOut().then(function() {
          menu.css('display', 'none');
          div1.css('display', 'none');
          div2.css('display', 'none');
          div3.css('display', 'none');
        alert("bien");
      }, function(error) {
        // An error happened.
      });

          });
  }

function autentificar(user,pass){
  event.preventDefault();
  firebase.auth().signInWithEmailAndPassword(user, pass)     
    .then(function(result) {                            //Si el usuario existe en el registro se loggea y entra aqui
      user = firebase.auth().currentUser;
      idUsuario = user.uid;
      
    
                   
      menu.css('display', 'block');
      div1.css('display', 'block');
      div2.css('display', 'block');
      div3.css('display', 'block');

      var username = database.ref().child('users').child(idUsuario).child('rango');      //Obtener el rango en la bdd para saber 
      username.on('value',function(datasnapshot){                                        // si el usuario esta registrado como administrador         
      username.innerText = datasnapshot.val();
            //Validar el rango del usuario que ingreso para determinar sus permisos en la pagina

      
      if (username.innerText == "admin") {
        alert("usuario tiene permisos de admini");


      }   

      else {
        alert("no tiene permisos de admin");

           $( 'input[type ="checkbox"]' ).attr("disabled", true);
      }
    
    


  //    alert(username.innerText);
  //  location.href="html/consola.html";  
  });
  


    
    })
    .catch(function(error) {
        alert("no se puede ingresar");
      //$("#myModalerror").modal();
      //var errorMessage = error.message;
      //alert(errorMessage);
    });
}
