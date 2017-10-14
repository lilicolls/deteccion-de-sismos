$(document).ready(tomarValores);
var database = firebase.database();
var aceleracionLeida = [];
var count = {};



function tomarValores() {

	$('#boton_filtrar_tabla').on("click",function(){
		
		$('#calendario').attr('disabled', false);
		$('#boton_aceptar_tabla').attr('disabled',false);
	});


	  /* $('#demo2').datetimepicker({
                date: new Date(),
                viewMode: 'YMD',
                onDateChange: function(){
                    $('#date-text2').text(this.getText());
                    $('#date-text-ymd2').text(this.getText('yyyy-MM-dd'));
                    $('#date-value2').text(this.getValue());
                    $('#text_calendario').val(this.getText('yyyy-MM-dd'));
                    fechaFiltro = this.getText('yyyy-MM-dd');

                   	


					fechaFiltroTemp=fechaFiltro.split("-");
					var x =fechaFiltroTemp[0]+"/"+fechaFiltroTemp[1]+"/"+fechaFiltroTemp[2];
					fechaFiltroTimeStamp = (new Date(x).getTime()); //will alert 1330210800000


                }
            }); */

	$('#boton_aceptar_tabla').on("click", function(){
			fechaFiltro = $('#calendario').val();



		fechaFiltroTemp=fechaFiltro.split("-");
		var x =fechaFiltroTemp[0]+"/"+fechaFiltroTemp[1]+"/"+fechaFiltroTemp[2];
		fechaFiltroTimeStamp = (new Date(x).getTime()); //will alert 1330210800000

			
		$('#tabla tbody > tr').remove(); //Limpiar tabla para cada nueva consulta
		var filtro = aceRef.orderByChild("fecha").equalTo(fechaFiltroTimeStamp);    
		

      	filtro.on('child_added',function(datasnapshot){  
 
				      	valFiltro = datasnapshot.val();
				      	console.log (valFiltro);
		      	

		      
		      			console.log (valFiltro.aceleracion);
		      			llenarTabla(valFiltro.numero, valFiltro.fecha, valFiltro.aceleracion, valFiltro.percepcion);

			}, function(){
				alert("fdsfsd");
		      	

			});
	
		alert("a la mierda el error yo hago lo que quiera");

		

	});


	$('#boton_tabla').on("click", function() {

		$('#tabla tbody > tr').remove(); //Limpiar tabla para cada nueva consulta
		aceRef.on("child_added", function(snapshot, prevChildKey) {
			//recuperamos una captura del objeto leido
			var valorSensado = snapshot.val(); //valorSensado corresponderá a cada elemento dentro del nodo lecturas_sensor
			console.log(valorSensado);

			llenarTabla(valorSensado.numero, valorSensado.fecha, valorSensado.aceleracion, valorSensado.percepcion);



			var yAceleracion = valorSensado.aceleracion;
			var xFecha = valorSensado.fecha;

			aceleracionLeida.push(yAceleracion);
			//console.log(aceleracionLeida);
			dataPoints.push({

				x: xFecha,
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

			var converfecha = new Date(fecha * 1000);
			dateString = converfecha.toGMTString();
			
			formatDate(converfecha);

						function formatDate(nowDate) {
						fechaNueva = nowDate.getDate() +"/"+ nowDate.getMonth() + '/'+ nowDate.getFullYear();
						return fechaNueva;
					}	
				

			$('#tabla').append('<tr><td>' + numero + '</td><td>' + fechaNueva + '</td><td>' + aceleracion + 'g' + '</td><td>' + percepcion + '</td></tr>');
			$('#tabla').scrollTableBody();




}

		var dataPoints =
			[{
				x: 1088620200000,
				y: 0
			}, ];

		var dataPoints2 =
			[{
				x: 0,
				y: 0
			}, ];	

		var chart = new CanvasJS.Chart("chartHistoricoSismos", {
			zoomEnabled: true,

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
				type: "spline",
				xValueType: "dateTime",
				dataPoints: dataPoints
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





}