$(document).ready(initializar);
var formAutenticacion;
var database = firebase.database();
var aceRef = database.ref().child("lecturas_sensor"); //Referencia hacia el nodo donde estan almacenados los datos del acelerometro
var menu = $("#sidebar");  
      var div1 = $("#one");
      var div2 = $("#two");
      var div3 = $("#three"); 
      var div0 = $("#intro");
var username;
 var user ;
var pass;

function initializar(){

      
  formAutenticacion = $("#form-autenticacion");

  $('#olvido_contraseña').on("click", function(){
    var auth = firebase.auth();
    var emailAddress = $("#email").val();

    auth.sendPasswordResetEmail(emailAddress)
      .then (function(){
        modal(`Se ha enviado un correo a ${emailAddress}. Por favor siga las instrucciones para recuperar su contraseña`);
      }, function(error) {
        modal(error)

      })


  });


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
          div0.css('display', 'block');
        modal("Su sesión ha sido cerrada ¡Hasta pronto!");
      }, function(error) {
        modal(errorMessage);
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
   
   div0.css('display', 'none');

     var nombreUser = database.ref().child('users').child(idUsuario)
      var username = database.ref().child('users').child(idUsuario).child('rango');      //Obtener el rango en la bdd para saber 
      username.on('value',function(datasnapshot){                                        // si el usuario esta registrado como administrador         
      username.innerText = datasnapshot.val();
            //Validar el rango del usuario que ingreso para determinar sus permisos en la pagina

            console.log(nombreUser);
 
    $("#email").val('');
    $("#password").val('');   
      
      if (username.innerText == "admin") {

        
       modal('Bienvenido administrador');


      }   

      else {
     
        modal(`Bienvenido `);

           $( 'input[type ="checkbox"]' ).attr("disabled", true);
      }
    
    
  });
  


    
    })
    .catch(function(error) {
        modal("no se puede ingresar");
      //$("#myModalerror").modal();
      //var errorMessage = error.message;
      //alert(errorMessage); 
    });
}
