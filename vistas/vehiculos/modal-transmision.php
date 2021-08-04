<div class="modal fade" id="modal-transmision">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h4 class="modal-title">Registrar Transmisión de Vehículo</h4>

                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>
                    <!-- Main content -->
                <section class="content">
                    <div class="row">
                        <div class="col-md-12">

                            <form id="register-transmision" name="register-form" onsubmit="return false">

                                <!-- INICIO de primera fila -->
                                <div class="row">
                                    <div class="col-sm-12">
                                        <!-- text input -->
                                        <div class="form-group">
                                            <label>Nombre de Transmisión</label>
                                            <input type="text" class="form-control" name="transmision" autocomplete="off"
                                                id="transmision" placeholder="Digite nombre de la transmisión">
                                        </div>
                                    </div>

                                </div>
                                <div class="timeline-footer" style="text-align: right;">
                                    <a class="btn btn-info btn-sm" style="color: white" type="button"
                                        id="btnGuardar">Guardar</a>
                                    <a class="btn btn-danger btn-sm" style="color: white">Cancelar</a>
                                </div>

                            </form>
                        </div>
                    </div>
                </section>
                <p>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>


<script type="text/javascript" src="<?= $base_url?>js/controladores/vehiculos/transmision-app.js"></script>