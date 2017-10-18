$(document).ready(manipularCargas);
var database = firebase.database();



function manipularCargas(){

	


			var gas = database.ref().child('estado_cargas').child('gas').child('estado');
			gas.on('value',function(datasnapshot){  
		                                 
		      gas.innerText = datasnapshot.val();
	
		      $('#check_gas').prop('checked', gas.innerText);
		    
		   
		  });


			var alarma = database.ref().child('estado_cargas').child('alarma').child('estado');
			alarma.on('value',function(datasnapshot){                                            
		      alarma.innerText = datasnapshot.val();
	

		      $('#check_alarma').prop('checked', alarma.innerText);
		    
		   
		  });


			var ascensor = database.ref().child('estado_cargas').child('ascensor').child('estado');
			ascensor.on('value',function(datasnapshot){                                            
		      ascensor.innerText = datasnapshot.val();
		 

		      $('#check_ascensor').prop('checked', ascensor.innerText);
		    
		   
		  });


			var electricidad = database.ref().child('estado_cargas').child('electricidad').child('estado');
			electricidad.on('value',function(datasnapshot){                                            
		      electricidad.innerText = datasnapshot.val();
		    

		      $('#check_electricidad').prop('checked', electricidad.innerText);
		    
		   
		  });


			var salidaEmergencia = database.ref().child('estado_cargas').child('salida_emergencia').child('estado');
			salidaEmergencia.on('value',function(datasnapshot){                                            
		      salidaEmergencia.innerText = datasnapshot.val();
	

		      $('#check_salida_emergencia').prop('checked', salidaEmergencia.innerText);
		    
		   
		  });


			var agua = database.ref().child('estado_cargas').child('agua').child('estado');
			agua.on('value',function(datasnapshot){                                            
		      agua.innerText = datasnapshot.val();
		      

		      $('#check_agua').prop('checked', agua.innerText);
		    
		   
		  });

			$('#boton_cargas').on("click",function(){
				      $( 'input[type ="checkbox"]' ).attr("disabled", false);

				console.log("prubea");
				$( 'input[type ="checkbox"]' )
					  .change(function() {
					    var $input = $( this );
					    var estado = $input.prop( "checked" );
					    var ruta = $input.prop('value');
					   
					     database.ref(ruta).update({ estado: estado });
					  })
					  .change();

			});

			/*	 */

}