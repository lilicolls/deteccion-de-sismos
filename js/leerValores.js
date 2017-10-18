$(document).ready(tomarValores);
var database = firebase.database();
var aceleracionLeida = [];
var count = {};
var valFiltro;
var boolpaso;

function tomarValores() {


var dataPoints =  [ { x: new Date(2017,09,02), y: 1 }  ];

var dataPoints2 =[{ x: 0,	y: 0}, ];
		var chart = new CanvasJS.Chart("chartHistoricoSismos", {
		//	zoomEnabled: true,

			title: {
				text: "Historial de sismos"
			},

			axisY: {
				suffix: "G",
				interval: 1,
				title: "aceleracion"
			},
			axisX: {
				title: "fecha"

			},

			data: [{
				type: "line",
				dataPoints:  dataPoints
         
       
			}]
		});
		chart.render();

		//////************************** GRAFICA 2 *****************************



		var prueba = new CanvasJS.Chart("chartCantSismos", {

			title: {
				text: "Cantidad de sismos detectados"
			},
			axisY: {
				title: "Cantidad"
			},
			axisX: {
				suffix: "g",
				maximum: 10,
				title: "aceleracion"

			},
			data: [ //array of dataSeries
				{ //dataSeries object

					//Change type "column" to "bar", "area", "line" or "pie"***/
					type: "column",
					dataPoints: dataPoints2

				}
			]
		});

		prueba.render();


	$('#boton_filtrar_tabla').on("click",function(){

		$('#calendario').attr('disabled', false);
		$('#boton_aceptar_tabla').attr('disabled',false);
	});


	$('#boton_aceptar_tabla').on("click", function(){
		fechaFiltro = $('#calendario').val();
		alert(fechaFiltro);
	

		$('#tabla tbody > tr').remove(); //Limpiar tabla para cada nueva consulta

		boolpaso = false;
		var filtro = aceRef.orderByChild("fecha").equalTo(fechaFiltro);
		console.log(filtro);

      	filtro.on('child_added',function(datasnapshot){
 			
			valFiltro = datasnapshot.val();
			console.log (valFiltro);
			boolpaso = true;
		    console.log (valFiltro.aceleracion);
		    llenarTabla(valFiltro.numero, valFiltro.fecha, valFiltro.aceleracion, valFiltro.percepcion);
		});

		if (boolpaso){
		}else {
			modal("No hay evento registrado para ese dia");
		}

	});


	$('#boton_tabla').on("click", function() {



		$('#tabla tbody > tr').remove(); //Limpiar tabla para cada nueva consulta
		
		aceRef.on("child_added", function(snapshot, prevChildKey) {
			//recuperamos una captura del objeto leido
			var valorSensado = snapshot.val(); //valorSensado corresponderá a cada elemento dentro del nodo lecturas_sensor
			
			

		llenarTabla(valorSensado.numero, valorSensado.fecha, valorSensado.aceleracion, valorSensado.percepcion);



			var yAceleracion = valorSensado.aceleracion;
			var xFecha = valorSensado.fecha.split("-").join(",");
			var fechafecha = new Date(xFecha);

			aceleracionLeida.push(yAceleracion);
			//console.log(aceleracionLeida);
			console.log(xFecha);

			dataPoints.push({

				x: fechafecha,
				y: yAceleracion
			});

			
			chart.render();


			// ****************** Actualizar datos segunda grafica

						var map = aceleracionLeida.reduce(function(prev, cur) {
						prev[cur] = (prev[cur] || 0) + 1;
						return prev;
					}, {});
					//	console.log (map);

										$.each(map, function(key, value) {
						//	console.log("The key is '" + key + "' and the value is '" + value + "'");

										dataPoints2.push({

												x: key,
												y: value
											});

											prueba.render();
		
						});
								



		

		});
		



	});


		function llenarTabla(numero,fecha,aceleracion,percepcion){

		


			$('#tabla').append('<tr><td>' + numero + '</td><td>' + fecha + '</td><td>' + aceleracion + 'g' + '</td><td>' + percepcion + '</td></tr>');
			$('#tabla').scrollTableBody();




		}

		

}
