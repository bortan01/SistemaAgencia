<div class="modal fade" id="modal-tipoClase">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h4 class="modal-title">Registrar Tipo de Clase</h4>

                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form id="register-clase" name="register-form" onsubmit="return false">
                <div class="modal-body">
                    <p>
                        <!-- Main content -->
                    <section class="content">
                        <div class="row">
                            <div class="col-md-12">

                                <!-- INICIO de primera fila -->
                                <div class="row">
                                    <div class="col-sm-12">
                                        <!-- text input -->
                                        <div class="form-group">
                                            <label>Nombre de Tipo de Clase</label>
                                            <input type="text" name="nombre_clases" id="nombre_clases"
                                                class="form-control" placeholder="Digite nombre de clase" autocomplete="off">
                                        </div>
                                    </div>

                                    <div class="col-sm-12">
                                        <!-- text input -->
                                        <div class="form-group">
                                            <label>Descripción</label>
                                            <textarea class="form-control" rows="3" name="descripcion_clases" id="descripcion_clases"
                                                placeholder="Describir.." autocomplete="off"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <!-- text input -->
                                    <div class="hidden">
                                        <label name="detalle" id="detalle">Ingresó nuevo Tipo de Clase</label>
                                    </div>
                                </div>
                                <div class="timeline-footer" style="text-align: right;">
                                    <a class="btn btn-info btn-sm" style="color: white" type="button"
                                        id="btnAgregarClase">Guardar</a>
                                    <a class="btn btn-danger btn-sm" style="color: white">Cancelar</a>
                                </div>

                            </div>

                        </div>

                    </section>
                    <p>
                </div>
            </form>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>


<script src="<?= $base_url ?>js/controladores/bitacora/bitacora.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/vuelos/insertarClase.js"></script>