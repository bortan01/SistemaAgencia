<div class="modal fade" id="modal-tipoViaje">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Registrar Tipo de Viaje</h4>

                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form id="register-viaje" name="register-form" onsubmit="return false">
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
                                            <label>Nombre de Tipo de Viaje</label>
                                            <input type="text" name="nombre_tipoviajes" id="nombre_tipoviajes"
                                                class="form-control" placeholder="Digite nombre de tipo de viaje"
                                                autocomplete="off">
                                        </div>
                                    </div>

                                    <div class="col-sm-12">
                                        <!-- text input -->
                                        <div class="form-group">
                                            <label>Descripción</label>
                                            <textarea class="form-control" rows="3" name="descripcion_tipoViaje"
                                                id="descripcion_tipoViaje" placeholder="Describir.."
                                                autocomplete="off"></textarea>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                        <div class="timeline-footer" style="text-align: right;">
                            <a class="btn btn-info btn-sm" style="color: white" type="button"
                                id="btnAgregarViaje">Guardar</a>
                            <a class="btn btn-danger btn-sm" style="color: white">Cancelar</a>
                        </div>
                    </section>
                </div>
            </form>
        </div>

    </div>
    <!-- /.modal-content -->
</div>



<script type="text/javascript" src="<?= $base_url?>js/controladores/vuelos/insertarTipoViaje.js"></script>