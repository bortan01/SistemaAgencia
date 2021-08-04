// CUANDO LA PAGINA YA ESTA LISTA
$(document).ready(function () {
   const valores = window.location.search;
   const urlParams = new URLSearchParams(valores);
   let ID_TUR = urlParams.get('tur');

   setDatos();
   inicializarValidaciones();
   inicializarComboTuristico();
   inicializarComboServicio();
   inicializarGaleria();

   let DATA_TUR;
   let DATA_SERVICIO;
   let contadorTabla = 0.0;
   let totalGastos = 0.0;
   let totalIngresos = 0.0;
   let ganancias = 0.0;
   let fechasalida ;
   let cantidad = document.getElementById("cantidad");
   const htmlOtrasOpciones = $('#otras_opciones').clone();
   const htmlPromociones = $('#promocione_especiales').clone();
   const $grupoLugar = $("[name='grupo_lugar']").clone();
   const $grupo_incluye = $("[name='grupo_incluye']").clone();
   const $grupo_noIncluye = $("[name='grupo_noIncluye']").clone();
   const $grupo_requisitos = $("[name='grupo_requisitos']").clone();
   const $grupo_promociones = $('#promocione_especiales').clone();


   let tabla = $('#TablaCostos').DataTable({
      "paging": true,
      "lengthChange": false,
      "searching": false,
      "ordering": true,
      "info": true,
      "autoWidth": false,
      "pageLength": 3,
      "responsive": true,

      "columnDefs": [
         { "className": "dt-center", "targets": "_all" },
         { "targets": [6], "visible": false },
         { "targets": [7], "visible": false },
         { "targets": [8], "visible": false },
      ]
   });
   //CUANDO HAY CAMBIOS EN EL COMBO TUR
   $('#ComboTur').on('select2:select', function (e) {
      let DATA_SELECCIONADA;
      let id = e.params.data.id;
      DATA_SELECCIONADA = DATA_TUR.find(myTur => myTur.id_sitio_turistico === id);
      ///ENCONTRO EL TUR
      if (DATA_SELECCIONADA) {
         document.getElementById("precio_sitio").value = DATA_SELECCIONADA.precio_sitio;
         document.getElementById("nameContactoTur").innerHTML = `<b>Nombre de Contacto:</b> ${DATA_SELECCIONADA.contactoN}`;
         document.getElementById("namePreviewTur").innerHTML = DATA_SELECCIONADA.contactoN;
         document.getElementById("mailContactoTur").innerHTML = DATA_SELECCIONADA.correo;
         document.getElementById("phoneContactoTur").innerHTML = DATA_SELECCIONADA.telefono;
         document.getElementById("imgContactoTur").src = DATA_SELECCIONADA.url;;
         ;
      }
   });
   //CUANDO HAY CAMBIOS EN EL COMBO SERVICIO
   $('#ComboServicio').on('select2:select', function (e) {
      let DATA_SELECCIONADA;
      let id = e.params.data.id;
      DATA_SELECCIONADA = DATA_SERVICIO.find(myServicio => myServicio.id_servicios === id);
      ///ENCONTRO EL TUR
      if (DATA_SELECCIONADA) {
         document.getElementById("precio_servicio").value = DATA_SELECCIONADA.costos_defecto;
         document.getElementById("nameContactoServicio").innerHTML = `<b>Nombre de Contacto:</b> ${DATA_SELECCIONADA.nombre_contacto}`;
         document.getElementById("namePreviewServicio").innerHTML = DATA_SELECCIONADA.nombre_contacto;
         document.getElementById("mailContactoServicio").innerHTML = DATA_SELECCIONADA.correo;
         document.getElementById("phoneContactoServicio").innerHTML = DATA_SELECCIONADA.telefono;
         document.getElementById("imgContactoServicio").src = DATA_SELECCIONADA.url;;
         ;
      }
   });
   //AGREGANDO LA INFORMACION DE UN TUR A LA TABLA
   $(document).on('click', '#btnAgregarTur', function (evento) {

      evento.preventDefault();
      //verifiacando que existe un precio
      let precio_sitio = $('#precio_sitio').val();
      if (!precio_sitio) {
         errors = { precio_sitio: "Digite precio" };
         $("#miFormulario").validate().showErrors(errors);
      } else {
         let PorPasajero = $("input[name='radioTur']:checked").val();
         let mytur = $('#ComboTur').select2('data');
         let nombre = mytur[0].text;
         let id = mytur[0].id;

         ///si ha seleccionado el radio Button seleccionando que el costo sera por pasajerro
         //obteneros la cantidad de pasajero, de lo contrio la cantidad sera 1
         let cantidad = PorPasajero == "si" ? $("#cantidad").val() : 1;
         let precio = $("#precio_sitio").val();
         let tipo = "tur"
         if (!ExisteFila(id, cantidad, precio, tipo, PorPasajero)) {
            agregarFila(nombre, precio, cantidad, PorPasajero, tipo, id);
         }
         modificarIngresos();
         modificarTabla();
         modificarGanancias();
      }
   });
   //AGREGANDO LA INFORMACION DE UN SITIO TURISTICO A LA TABLA
   $(document).on('click', '#btnAgregarSitio', function (evento) {
      evento.preventDefault();
      //verifiacando que existe un precio
      let precio_servicio = $('#precio_servicio').val();
      if (!precio_servicio) {
         errors = { precio_servicio: "Digite precio" };
         $("#miFormulario").validate().showErrors(errors);
      } else {
         let PorPasajero = $("input[name='servicioCheck']:checked").val();
         let myServicio = $('#ComboServicio').select2('data');
         let nombre = myServicio[0].text;
         let id = myServicio[0].id;
         contadorTabla++;
         ///si ha seleccionado el radio Button seleccionando que el costo sera por pasajerro
         //obteneros la cantidad de pasajero, de lo contrio la cantidad sera 1
         let cantidad = PorPasajero == "si" ? $("#cantidad").val() : 1;
         let precio = $("#precio_servicio").val();
         let tipo = "servicio"
         if (!ExisteFila(id, cantidad, precio, tipo, PorPasajero)) {
            agregarFila(nombre, precio, cantidad, PorPasajero, tipo, id);
         }
         modificarIngresos();
         modificarTabla();
         modificarGanancias();
      }
   });
   //CUANDO HAY CAMBIOS EN EL INPUT DE NUMERO DE PASAJEROS
   $(document).on('keyup mouseup', '#cantidad', function () {
      modificarTabla();
      modificarIngresos();
      modificarGanancias();
   });
   //CUANDO HAY CAMBIOS EN EL INPUT DE NUMERO DE COSTO DE PASAJE
   $(document).on('keyup mouseup', '#CostoPasaje', function () {
      modificarIngresos();
      modificarGanancias();
   });
   //BOTON DE ELIMINAR
   $(document).on('click', '.btn-group .btn-danger', function (evento) {
      let fila = tabla.row($(this).parents('tr')).data();
      totalGastos -= parseFloat(fila[4]);
      $('#totalGastos').text("$" + totalGastos);
      modificarGanancias();
      tabla.row($(this).parents('tr')).remove().draw();


   });
   //BOTON DE GUARDAR 
   $(document).on('click', '#btnguardar', function (evento) {
      evento.preventDefault();//para evitar que la pagina se recargue
      let form = $("#miFormulario");
      form.validate();
      if (form.valid()) {
         guardar();
      } else {
         const Toast = Swal.mixin();
         Toast.fire({
            title: 'Exito...',
            icon: 'error',
            text: "Complete los campos",
            showConfirmButton: true,
         });
      }
   });
   //BOTON DE AGREGAR INPUT
   $(document).on('click', '.btn-add', addFormGroup);
   //BOTON DE ELIMINAR INPUT
   $(document).on('click', '.btn-remove', removeFormGroup);
   //BOTON DE AGREGAR FILA
   $(document).on('click', '.btn-addRow', addRow);
   //BOTON DE ELIMINAR FILA
   $(document).on('click', '.btn-removeRow', removeRow);

   //INICIALIZANDO EL CALENDARIO
   function inicializarCalendario(start, end) {
      $('#fecha_salida').daterangepicker({
         locale: {
            format: 'DD/MM/YYYY',
            "separator": " - ",
            "applyLabel": "Aplicar",
            "cancelLabel": "Cancelar",
            "fromLabel": "De",
            "toLabel": "A",
            "customRangeLabel": "Custom",
            "daysOfWeek": [
               "Dom",
               "Lun",
               "Mar",
               "Mie",
               "Jue",
               "Vie",
               "Sab"
            ],
            "monthNames": [
               "Enero",
               "Febrero",
               "Marzo",
               "Abril",
               "Mayo",
               "Junio",
               "Julio",
               "Agosto",
               "Septiembre",
               "Octubre",
               "Noviembre",
               "Diciembre"
            ],
            "firstDay": 0
         },
         startDate :  moment (start),
         endDate : moment (end)
      });

   }
   function inicializarComboTuristico() {
      //COMBO DE TIPOS 
      $('#ComboTur').select2();
      //COMBO DE CONTACTOS
      $.ajax({
         url: URL_SERVIDOR + "SitioTuristico/show",
         method: "GET"
      }).done(function (response) {
         //REST_Controller::HTTP_OK
         let myData = [];
         if (response.sitios) {
            DATA_TUR = response.sitios;
            for (let index = 0; index < DATA_TUR.length; index++) {
               myData.push({
                  id: DATA_TUR[index].id_sitio_turistico,
                  text: `${DATA_TUR[index].nombre_sitio} (${DATA_TUR[index].tipo_sitio})`
               });
            }
            ///LE CARGAMOS LA DATA 
            $('#ComboTur').select2({ data: myData });
            //CARGAMOS EL COSTO AL INPUT
            document.getElementById("precio_sitio").value = DATA_TUR[0].precio_sitio;
            document.getElementById("nameContactoTur").innerHTML = `<b>Nombre de Contacto:</b> ${DATA_TUR[0].contactoN}`;
            document.getElementById("namePreviewTur").innerHTML = DATA_TUR[0].contactoN;
            document.getElementById("mailContactoTur").innerHTML = DATA_TUR[0].correo;
            document.getElementById("phoneContactoTur").innerHTML = DATA_TUR[0].telefono;
            document.getElementById("imgContactoTur").src = DATA_TUR[0].url
         } else {
            $('#ComboTur').select2();
         }
      }).fail(function (response) {
         $('#ComboTur').select2();

      }).always(function (xhr, opts) {
         // $('#loading').hide();
      });
   }
   function inicializarComboServicio() {
      //COMBO DE TIPOS 
      $('#ComboSitio').select2();
      //COMBO DE CONTACTOS
      $.ajax({
         url: URL_SERVIDOR + "ServiciosAdicionales/obtenerServicio",
         method: "GET"
      }).done(function (response) {
         //REST_Controller::HTTP_OK
         let myData = [];
         if (response.servicio) {
            DATA_SERVICIO = response.servicio;
            for (let index = 0; index < DATA_SERVICIO.length; index++) {
               if (DATA_SERVICIO[index].tipo_servicio === "Transporte") {
                  myData.push({
                     id: DATA_SERVICIO[index].id_servicios,
                     text: `${DATA_SERVICIO[index].nombre_servicio} (${DATA_SERVICIO[index].tipo_servicio}, ${DATA_SERVICIO[index].asientos_dispobibles} Asientos)`
                  });
               } else {

                  myData.push({
                     id: DATA_SERVICIO[index].id_servicios,
                     text: `${DATA_SERVICIO[index].nombre_servicio} (${DATA_SERVICIO[index].tipo_servicio})`
                  });
               }

            }
            ///LE CARGAMOS LA DATA 
            $('#ComboServicio').select2({ data: myData });
            //CARGAMOS EL COSTO AL INPUT
            document.getElementById("precio_servicio").value = DATA_SERVICIO[0].costos_defecto;
            document.getElementById("nameContactoServicio").innerHTML = `<b>Nombre de Contacto:</b> ${DATA_SERVICIO[0].nombre_contacto}`;
            document.getElementById("namePreviewServicio").innerHTML = DATA_SERVICIO[0].nombre_contacto;
            document.getElementById("mailContactoServicio").innerHTML = DATA_SERVICIO[0].correo;
            document.getElementById("phoneContactoServicio").innerHTML = DATA_SERVICIO[0].telefono;
            document.getElementById("imgContactoServicio").src = DATA_SERVICIO[0].url;
         } else {
            $('#ComboServicio').select2();
         }
      }).fail(function (response) {
         $('#ComboServicio').select2();

      }).always(function (xhr, opts) {
         $('#loading').hide();
      });
   }
   function agregarFila(nombre, precio, cantidad, PorPasajero, tipo, id) {
      contadorTabla++;
      let subTotoal = (precio * cantidad).toFixed(2);
      let html = "";
      html += '<td>';
      html += '    <div class="btn-group">';
      html += '        <button type="button" name="" class="btn btn-danger" data-toggle="modal"';
      html += '            data-target="#modal-eliminar">';
      html += '            <i class="fas fa-trash" style="color: white"></i>';
      html += '        </button>';
      html += '    </div>';
      html += '</td>';
      tabla.row.add([nombre, precio, cantidad, PorPasajero, subTotoal, html, tipo, id, contadorTabla]).draw(false);
      //PARA ORDENAR LA TABLA
      tabla.order([8, 'desc']).draw();
      subTotoal = (parseFloat(subTotoal));
      totalGastos += subTotoal
      $('#totalGastos').text("$" + totalGastos);

   }
   function modificarTabla() {
      totalGastos = 0;
      tabla.rows().every(function (value, index) {
         let data = this.data();
         let porPasajero = data[3];
         if (porPasajero == "si") {
            data[2] = cantidad.value; //le asignamos un nuevoo valor a la columna cantidad
            data[4] = (data[1] * data[2]).toFixed(2); // modificamos el sub total
         }
         totalGastos += parseFloat(data[4]);
         this.data(data).draw(false);
      });
      $('#totalGastos').text("$" + totalGastos);
   }
   function modificarIngresos() {
      totalIngresos = parseFloat($("#cantidad").val() * $("#CostoPasaje").val());
      $('#totalIngresos').text("$" + totalIngresos);
   }
   function modificarGanancias() {
      ganancias = parseFloat(totalIngresos - totalGastos);
      if (ganancias > 0) {
         $("#labelGanancias").removeClass("text-warning");
         $("#labelGanancias").addClass("text-success");

         $("#ganancias").removeClass("text-warning");
         $("#ganancias").addClass("text-success");
      } else {
         $("#labelGanancias").addClass("text-warning");
         $("#labelGanancias").removeClass("text-success");

         $("#ganancias").addClass("text-warning");
         $("#ganancias").removeClass("text-success");
      }
      $('#ganancias').text("$" + ganancias.toFixed(2));
   }
   function inicializarGaleria() {
      // ESTO ES PARA INICIALIZAR EL ELEMENTO DE SUBIDA DE FOTOS (EN ESTE CASO UNA GALERIA )
      $('#fotos').fileinput({
         theme: 'fas',
         language: 'es',
         //uploadUrl: '#',
         showUpload: false,
         //showCaption: false,
         maxFileSize: 2000,
         maxFilesNum: 10,
         allowedFileExtensions: ['jpg', 'png', 'gif'],
         required: true,
         uploadAsync: false,
         showClose: false,
      });
   }
   //EN REALIDAD ES EL ACTUALIZAR
   function guardar() {
      $('#loading').show();
      let form = obtenerData();

      //OCUPAR ESTA CONFIGURACION CUANDO SE ENVIAEN ARCHIVOS(FOTOS-IMAGENES)
      $.ajax({
         url: URL_SERVIDOR + "TurPaquete/update",
         method: "POST",
         mimeType: "multipart/form-data",
         data: form,
         timeout: 0,
         processData: false,
         contentType: false,
      }).done(function (response) {
         // console.log(response);
         let respuestaDecodificada = JSON.parse(response);
         const Toast = Swal.mixin();
         Toast.fire({
            title: 'Exito...',
            icon: 'success',
            text: "Viaje Actualizado Exitosamente",
            showConfirmButton: true,
         }).then((result) => {
            //TODO BIEN Y RECARGAMOS LA PAGINA              
            Toast.fire({
               title: '¿Desea Editar el itinerario ahora?',
               text: "Puedes Editarlo más tarde si quieres",
               icon: 'question',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Sí, Quiero editarlo ahora!',
               cancelButtonText: "No, en otro momento",

            }).then((result) => {
               if (result.value) {
                  window.location = `${URL_SISTEMA}vistas/tours/itinerario.php?tur=${respuestaDecodificada.viaje.id_tours}`;
               }
            });

         });
      }).fail(function (response) {
         //SI HUBO UN ERROR EN LA RESPUETA REST_Controller::HTTP_BAD_REQUEST
         console.log(response);

         const Toast = Swal.mixin();
         Toast.fire({
            title: 'Oops...',
            icon: 'error',
            text: "ERROR EN EL ENVIO DE INFORMACIÓN",
            showConfirmButton: true,
         });

      }).always(function (xhr, opts) {
         $('#loading').hide();
      });
   }
   function inicializarValidaciones() {
      $('#miFormulario').validate({
         rules: {
            nombreTours: {
               required: true,
               minlength: 3,
               maxlength: 150
            },
            fecha_salida: {
               required: true,
            },
            cantidad: {
               required: true,
               digits: true,
               min: 1
            },
            CostoPasaje: {
               required: true,
               number: true,
               min: 0
            },
            precio_sitio: {
               required: true,
               number: true,
               min: 0
            },
            precio_servicio: {
               required: true,
               number: true,
               min: 0
            },
            descripcion_tur: {
               required: true,
               minlength: 5
            },
            "requisitos[]": {
               required: true,
               minlength: 5,

            },
            "no_incluye[]": {
               required: true,
               minlength: 5
            },
            "incluye[]": {
               required: true,
               minlength: 5
            },
            "lugar_salida[]": {
               required: true,
               minlength: 3
            },

         },
         messages: {
            nombreTours: {
               required: "Digite titulo",
               minlength: "Longitud debe ser mayor a 3",
               maxlength: "Longitud debe ser menor a 150"
            },
            fecha_salida: {
               required: "Es necesaria la fecha de salida",
            },
            cantidad: {
               required: "Digite el numero de pasajeros",
               digits: "Solo numeros enteros",
               min: "Debe de ser mayor a 0"
            },
            CostoPasaje: {
               required: "Digite costo del pasaje",
               number: "Solo numero",
               min: "Debe ser mayor o igual a 0"
            },
            precio_sitio: {
               required: "Digite precio",
               number: "Solo numero",
               min: "Debe ser mayor o igual a 0"
            },
            precio_servicio: {
               required: "Digite precio",
               number: "Solo numero",
               min: "Debe ser mayor o igual a 0"
            },
            descripcion_tur: {
               required: "Este campo es requierido",
               minlength: "debe de tener una longitud mayor a 4 "
            },
            "lugar_salida[]": {
               required: "Digite el luegar de salida",
               minlength: "Longitud debe ser mayor a 3",
            },
            "incluye[]": {
               required: "Este campo es requierido",
               minlength: "debe de tener una longitud mayor a 4 "
            },
            "no_incluye[]": {
               required: "Este campo es requierido",
               minlength: "debe de tener una longitud mayor a 4 "
            },

            "requisitos[]": {
               required: "Este campo es requierido",
               minlength: "debe de tener una longitud mayor a 4 "
            },
         },
         errorElement: 'span',
         errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
         },
         highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
         },
         unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');

         }
      });
   }
   function addFormGroup(event) {
      event.preventDefault();
      let $formGroup = $(this).closest('.form-group');
      let $formGroupClone = $formGroup.clone();

      if (!$formGroupClone.find('input').val() == "") {
         $formGroupClone.find('input').val('');
         $(this).toggleClass('btn-success btn-add btn-danger btn-remove').html('–');
         $formGroupClone.insertAfter($formGroup);
      }
   };
   function removeFormGroup(event) {
      event.preventDefault();
      let $formGroup = $(this).closest('.form-group');
      $formGroup.remove();
   };
   function addRow(event) {
      event.preventDefault();
      let $formGroup = $(this).closest('.row');
      let $formGroupClone = $formGroup.clone();

      if (!$formGroupClone.find('input').val() == "") {
         $formGroupClone.find('input').val('');
         $(this).toggleClass('btn-success btn-addRow btn-danger btn-removeRow').html('–');
         $formGroupClone.insertAfter($formGroup);
      }
   };
   function removeRow(event) {
      event.preventDefault();
      let $formGroup = $(this).closest('.row');
      $formGroup.remove();
   };
   function obtenerData() {
      let form = new FormData();
      let serviciosAdicionales = [];
      let sistiosTuristicos = [];
      let promocion = [];

      tabla.rows().every(function (value, index) {
         let data = this.data();
         let title = data[0];
         let costo = data[1];
         let tipo = data[6];
         let id = data[7];
         if (tipo == "servicio") {
            serviciosAdicionales.push({
               "id_servicios": id,
               "costo": costo,
               "por_usuario": true,
               "nuemo_veces": "1"
            });
         } else {
            sistiosTuristicos.push({
               "id_sitio_turistico": id,
               "title": title,
               "costo": costo,
               "por_usuario": true,
               "backgroundColor": "#28a745",
               "borderColor": "#28a745",
               "textColor": "#fff"
            });
         }
      });

      let salida = $("input[name='lugar_salida[]']").map(function () { return $(this).val(); }).get();
      let incluye = $("input[name='incluye[]']").map(function () { return $(this).val(); }).get();
      let no_incluye = $("input[name='no_incluye[]']").map(function () { return $(this).val(); }).get();
      let requisitos = $("input[name='requisitos[]']").map(function () { return $(this).val(); }).get();

      let pasajes = $("input[name='pasajes[]']").map(function () { return $(this).val(); }).get();
      let asientos = $("input[name='asientos[]']").map(function () { return $(this).val(); }).get();
      let titulos = $("input[name='titulos[]']").map(function () { return $(this).val(); }).get();

      for (let index = 0; index < titulos.length; index++) {
         if (titulos[index] != "" && asientos[index] != "" && pasajes[index] != "") {
            promocion.push({ 'titulo': titulos[index], 'asiento': asientos[index], "pasaje": pasajes[index] });
         }

      }
      let valor = document.getElementById("fecha_salida").value;
      let fecha = valor.split(" - ");
      let start = fecha[0]
      let end = fecha[1]

      form.append("id_tours", ID_TUR);
      form.append("sitios", JSON.stringify(sistiosTuristicos));
      form.append("servicios", JSON.stringify(serviciosAdicionales));
      form.append("promociones", JSON.stringify(promocion));
      form.append("no_incluye", JSON.stringify(no_incluye));
      form.append("requisitos", JSON.stringify(requisitos));
      form.append("incluye", JSON.stringify(incluye));
      form.append("lugar_salida", JSON.stringify(salida));
      form.append("nombreTours", document.getElementById("nombreTours").value);
      form.append("precio", document.getElementById("CostoPasaje").value);
      form.append("descripcion_tur", document.getElementById("descripcion_tur").value);
      form.append("cupos_disponibles", document.getElementById("cantidad").value);
      form.append("start", start);
      form.append("end", end);
      form.append("estado", 1);
      form.append("aprobado", 1);
      form.append("tipo", "TUR");

      return form;

   }
   function setDatos() {
      $.ajax({
         url: URL_SERVIDOR + "TurPaquete/showEdit?id_tours=" + ID_TUR,
         method: "GET"
      }).done(function (response) {
         // //CARGAMOS EL COSTO AL INPUT
         console.log(response);
         document.getElementById("nombreTours").value = response.nombre;
         document.getElementById("descripcion_tur").value = response.descripcion_tur;
         document.getElementById("CostoPasaje").value = response.precio;
         document.getElementById("cantidad").value = response.cupos;
         inicializarCalendario(response.start, response.end);
      

         AgregarItems(response.lugar_salidas, $('#labelLugar'), $("[name='grupo_lugar']"), $grupoLugar);
         AgregarItems(response.incluye, $('#labelIncluye'), $("[name='grupo_incluye']"), $grupo_incluye);
         AgregarItems(response.no_incluye, $('#labelNoIncluye'), $("[name='grupo_noIncluye']"), $grupo_noIncluye);
         AgregarItems(response.requisitos, $('#labelRequisito'), $("[name='grupo_requisitos']"), $grupo_requisitos);
         AgregarItemPromociones(response.promociones, $('#labelPromociones'), $('#promocione_especiales'), $grupo_promociones);
         AgregarFilaServicio(response.servicios, response.cupos);
         AgregarFilaSitios(response.turs, response.cupos);

      }).fail(function (response) {
         console.log(response);

      });
   }
   function AgregarItems(arreglo, label, $original, $grupo) {
      for (let index = 0; index < arreglo.length; index++) {
         if (index == 0) {
            $original.find('input').val(arreglo[index]);
            //verificamos si no hay mas elementos 
         } else {
            let $copia = $grupo.clone();
            $copia.find('button').toggleClass('btn-success btn-add btn-danger btn-remove').html('–');
            $copia.find('input').val(arreglo[index]);
            $copia.insertAfter(label);
         }
      }
   }
   function AgregarItemPromociones(arreglo, label, $original, $grupo) {
      for (let index = 0; index < arreglo.length; index++) {

         if (index == 0) {
            $original.find('[name ="titulos[]"]').val(arreglo[index].titulo);
            $original.find('[name ="asientos[]"]').val(arreglo[index].asiento);
            $original.find('[name ="pasajes[]"]').val(arreglo[index].pasaje);
         } else {

            let $copia = $grupo.clone();
            $copia.find('button').toggleClass('btn-success btn-addRow btn-danger btn-removeRow').html('–');
            $copia.find('[name ="titulos[]"]').val(arreglo[index].titulo);
            $copia.find('[name ="asientos[]"]').val(arreglo[index].asiento);
            $copia.find('[name ="pasajes[]"]').val(arreglo[index].pasaje);
            $copia.insertAfter(label);
         }

      }
   }
   function AgregarFilaServicio(arreglo, cantidad) {
      arreglo.forEach(element => {
         let porPasajero = 'si';
         if (element.por_usuario == '0') {
            porPasajero = 'no';
            cantidad = 1;
         }
         agregarFila(element.nombre_servicio, element.costo, cantidad, porPasajero, 'servicio', element.id_servicios);

      });
      modificarIngresos();
      modificarGanancias();
   }
   function AgregarFilaSitios(arreglo, cantidad) {
      arreglo.forEach(element => {
         let porPasajero = 'si';
         if (element.por_usuario == '0') {
            porPasajero = 'no';
            cantidad = 1;
         }
         agregarFila(element.nombre_sitio, element.costo, cantidad, porPasajero, 'tur', element.id_sitio_turistico);

      });
      modificarIngresos();
      modificarGanancias();
   }
   function ExisteFila(id, cantidad, costo, tipo, PorPasajero) {
      let encontrado = false;
      tabla.rows().every(function (value, index) {
         let data = this.data();
         if (id == data[7] && tipo == data[6]) {
            let subTotoal = (costo * cantidad).toFixed(2);
            data[2] = cantidad;
            data[3] = PorPasajero;
            data[4] = subTotoal;
            encontrado = true;
            this.data(data).draw(false);
         }
      });

      return encontrado;
   }



});

function modificarIngresos() {
   totalIngresos = parseFloat(cantidadByTransporte * $("#CostoPasaje").val());
   $('#totalIngresos').text("$" + totalIngresos);
}
