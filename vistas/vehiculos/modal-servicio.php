<div class="modal fade" id="modal-servicio">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Registrar Servicio Adicional</h4>

                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form id="register-servicio" name="register-form" onsubmit="return false">
                <div class="modal-body">
                    <p>
                        <!-- Main content -->
                    <section class="content">
                        <div class="row">
                            <div class="col-md-12">

                                <!-- INICIO de primera fila -->
                                <div class="row">
                                    <div class="col-sm-8">
                                        <!-- text input -->
                                        <div class="form-group">
                                            <label>Nombre de Servicio</label>
                                            <input type="text" name="nombre_servicio" id="nombre_servicio"
                                                class="form-control" placeholder="Digite nombre de servicio"
                                                autocomplete="off">
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <!-- text input -->
                                        <div class="form-group">
                                            <label>Precio</label>
                                            <input type="number" min="1" name="precio" id="precio" class="form-control"
                                                placeholder="Digite precio" autocomplete="off">
                                        </div>
                                    </div>
                                    <div class="col-sm-12">
                                        <!-- text input -->
                                        <div class="form-group">
                                            <label>Descripción</label>
                                            <textarea class="form-control" rows="3" name="descripcion" id="descripcion"
                                                placeholder="Describir.." autocomplete="off"></textarea>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <!-- text input -->
                                        <div class="hidden">
                                            <label name="detalle" id="detalle">Registro nuevo Servicio Adicional</label>
                                        </div>
                                    </div>

                                </div>
                                <div class="timeline-footer" style="text-align: right;">
                                    <a class="btn btn-info btn-sm" style="color: white" type="button"
                                        id="btnAgregar">Guardar</a>
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

<script type="text/javascript" src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>

<script src="<?= $base_url ?>js/controladores/bitacora/bitacora.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/vehiculos/insertarServicios.js"></script>