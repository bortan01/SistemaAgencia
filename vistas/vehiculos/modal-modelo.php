<form id="form-modelo" name="form-modelo" onsubmit="return false">
    <div class="modal fade" id="modal-modelo">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                <h4 class="modal-title">Registrar Modelo de Vehículo</h4>


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
                                <!-- INICIO de primera fila -->
                                <div class="row">
                                    <div class="col-sm-12">
                                        <!-- text input -->
                                        <div class="form-group">
                                            <label>Seleccione Marca</label>
                                            <select name="id_marca" id="id_marca" class="form-control">
                                                <option disabled="" selected="">Seleccione</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label>Nombre de Modelo</label>
                                            <input type="text" class="form-control" name="modeloCarro" id="modeloCarro"
                                                placeholder="Digite nombre de modelo" autocomplete="off">
                                        </div>
                                    </div>
                                </div>

                                <div class="timeline-footer" style="text-align: right;">
                                    <a class="btn btn-info btn-sm" style="color: white" type="button"
                                        id="btnModelo">Guardar</a>
                                    <a class="btn btn-danger btn-sm" style="color: white">Cancelar</a>
                                </div>
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
</form>
<script type="text/javascript" src="<?= $base_url?>js/controladores/vehiculos/comboMarca.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/vehiculos/modelo-app.js"></script>