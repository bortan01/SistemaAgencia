(function ($) {
    $(function () {

        var addFormGroup = function (event) {
            event.preventDefault();

            var $formGroup = $(this).closest('.form-group');
            var $multipleFormGroup = $formGroup.closest('.multiple-form-group');
            var $formGroupClone = $formGroup.clone();

            $(this)
                .toggleClass('btn-success btn-add btn-danger btn-remove')
                .html('–');

            $formGroupClone.find('input').val('');
            $formGroupClone.find('.concept').text('Phone');
            $formGroupClone.insertAfter($formGroup);

            var $lastFormGroupLast = $multipleFormGroup.find('.form-group:last');
            if ($multipleFormGroup.data('max') <= countFormGroup($multipleFormGroup)) {
                $lastFormGroupLast.find('.btn-add').attr('disabled', true);
            }
        };

        var removeFormGroup = function (event) {
            event.preventDefault();

            var $formGroup = $(this).closest('.form-group');
            var $multipleFormGroup = $formGroup.closest('.multiple-form-group');

            var $lastFormGroupLast = $multipleFormGroup.find('.form-group:last');
            if ($multipleFormGroup.data('max') >= countFormGroup($multipleFormGroup)) {
                $lastFormGroupLast.find('.btn-add').attr('disabled', false);
            }

            $formGroup.remove();
        };

        var selectFormGroup = function (event) {
            event.preventDefault();

            var $selectGroup = $(this).closest('.input-group-select');
            var param = $(this).attr("href").replace("#", "");
            var concept = $(this).text();

            $selectGroup.find('.concept').text(concept);
            $selectGroup.find('.input-group-select-val').val(param);

        }

        var countFormGroup = function ($form) {
            return $form.find('.form-group').length;
        };

        // $(document).on('click', '.btn-add', addFormGroup);
        $(document).on('click', '.btn-remove', removeFormGroup);
        $(document).on('click', '.dropdown-menu a', selectFormGroup);

        // BOTON DE AGREGAR EL INPUT DE PASAPORTES
        $(document).on('click', '.btn-pasaporte', function (event) {
            event.preventDefault();
            // obtenemos el div con clase caja multiple mas cercano al boton
            let $cajaMultiple = $(this).closest('.col-md-6');
            // obtenemos el input
            $(this).toggleClass('btn-success btn-add btn-danger btn-remove').html('–');
            // agregamos un input generado a la caja multiple
            $cajaMultiple.append(crearOtherMultiple('pasaporte'));
            let inputSinMascara = $cajaMultiple.find('input').last();
            // agregamos la mascara a nuestro input
            inputSinMascara.inputmask("A99999999"); //static mask
            inputSinMascara.inputmask({ "mask": "A99999999" }); //specifying options

        });

        // BOTON DE AGREGAR EL INPUT DE NOMBRES
        $(document).on('click', '.btn-nombres', function (event) {
            event.preventDefault();
            // obtenemos el div con clase caja multiple mas cercano al boton
            let $cajaMultiple = $(this).closest('.col-md-6');
            // obtenemos el input
            $(this).toggleClass('btn-success btn-add btn-danger btn-remove').html('–');
            // agregamos un input generado a la caja multiple
            $cajaMultiple.append(crearOtherMultiple('nombre'));
        });
        function crearOtherMultiple(tipo) {
            let boton = crearBoton(tipo);
            let input = crearInput(tipo);
            let grupo = document.createElement('div');
            grupo.classList.add("form-group");
            grupo.classList.add("multiple-form-group");
            grupo.classList.add("input-group");
            grupo.setAttribute('name', 'grupo_pasaporte');

            grupo.append(input);
            grupo.append(boton);

            return grupo;
        }
        function crearBoton(tipo) {
            let span = document.createElement("span");
            span.classList.add('input-group-btn');

            let button = document.createElement("button");
            button.classList.add('btn');
            button.classList.add('btn-success');
            button.classList.add('btn-add');

            if (tipo == 'nombre') {
                button.classList.add('btn-nombres');
            } else {
                button.classList.add('btn-pasaporte');
            }

            button.setAttribute("type", "button");
            button.style.marginTop = '0px';
            let t = document.createTextNode("+");
            button.appendChild(t);
            span.append(button);
            return span;
        }
        function crearInput(tipo) {
            let input = document.createElement("INPUT");
            input.setAttribute("type", 'text');

            if (tipo == 'nombre') {
                input.setAttribute("name", 'asistiran[]');
                input.classList.add('form-control');
                input.setAttribute("placeholder", 'Digite Nombre');
            } else {
                input.setAttribute("name", 'pasaporte_personas[]');
                input.classList.add('form-control');
                input.setAttribute("placeholder", 'Digite Pasaporte');
            }
            return input
        }

    });
})(jQuery);