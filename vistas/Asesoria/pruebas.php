<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />


    <button type="button" id="Crear" class="btn btn-primary">
        <span class="fa fa-plus"></span> Agregar
    </button>

    <div id="ModalCrear" class="modal fade" role="dialog" style="overflow-y: scroll;"> 
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header"> 
                    <h4 class="modal-tittle">Crear</h4> 
                </div> 
                <form class="form-horizontal" role="form" id="form-crear">
                    <div class="modal-body"> 
                         
                        
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">
                            <span class="glyphicon glyphicon-remove"></span>
                            <span class="hidden-xs"> Cerrar</span> 
                        </button>
                        <button type="button" id="Guardar" name="Guardar" class="btn btn-primary">
                            <span class="fa fa-save"></span>
                            <span class="hidden-xs"> Guardar</span> 
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div id="ModalAgregarNombre" class="modal fade" role="dialog"> 
        <div class="modal-dialog">
            <div class="modal-content">
                
            </div>
        </div>
    </div>

    <script type="text/javascript">
        $(document).on('click', '#Crear', function() {
        $('#ModalCrear').modal('show');
    });

    $(document).on('click', '#agregar_nombres', function() {
        $('#ModalAgregarNombre').modal('show');
    });
    </script>