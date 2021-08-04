<?php
include_once '../../config/parametros.php';
include_once '../../plantillas/cabecera.php';
include_once  '../../plantillas/navbar.php';
include_once '../../plantillas/barra_lateral.php';
?>


<link rel="stylesheet" href="<?= $base_url ?>dist/css/disponibilidad.css">
<style>
.container {
    width: 1170px;
    margin: 0 auto;
}

#gallery {
    border: 0px solid #efefef;
    padding: 0px 0 0 0;
}

#gallery img {
    margin: 8px;
    width: 283px;
    cursor: pointer;
    border-radius: 7px;
}

#gallery img:hover {
    margin: 8px;
    opacity: .8;
}

header h1 {
    font-weight: 700;
    margin-left: 8px;
}

#buttons button {
    border: 1px solid #efefef;
    margin-right: 8px;
    border: 0;
    padding: 8px;
    border-radius: 3px;
}

#buttons button.active {
    background-color: #bbb;
    color: #111;
}

#buttons {
    margin: 8px;
    padding-bottom: 8px;
}

button:hover {
    background-color: #111;
    color: #fff;
}

#ocultar-card {
    display: none;
}

#mostrar-card {
    display: none;
}
</style>




<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Galería</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                        <li class="breadcrumb-item active">Sitios Turisticos Registrados</li>
                    </ol>
                </div>
            </div>
        </div>
        <!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
        <div class="container-fluid ">
            <div class="row" style="margin-left: 10px;">
                <div class="col-12">
                    <a class="btn ">
                        <i class="fas fa-plus" s></i> Agregar toto
                    </a>

                </div>
            </div>

            <div class="row">

                <div class="col-12">
                    <div id="gallery">
                        <!-- left column -->
                        <div class="cardsX">
                            <div class="card Playa">
                                <div class="card__image-holder">
                                    <img class="card__image" data-tags="Playa" src="<?= $base_url ?>img/beach.jpg.jpg"
                                        alt="" />
                                </div>
                                <div class="card-title">
                                    <a href="#" class="toggle-info btn-danger">
                                        <span class="left"></span>
                                        <span class="right"></span>
                                    </a>
                                    <h2>
                                        Elimina Foto
                                        <small></small>
                                    </h2>
                                </div>
                                <div class="card-flap flap1">

                                    <div class="card-flap flap2">
                                        <div class="card-actions">
                                            <a onclick="redireccionar('http://localhost/Plantillas/SistemaAgencia/vistas/sitios/editar_sitio.php')"
                                                class="btn btn-primary"> <i class="fas fa-edit"
                                                    style="color: white;"></i></a>
                                            <a onclick="redireccionar('http://localhost/Plantillas/SistemaAgencia/vistas/sitios/galeria.php')"
                                                class="btn btn-success"> <i class="fas fa-image"
                                                    style="color: white"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card Playa">
                                <div class="card__image-holder">
                                    <img class="card__image" data-tags="Playa" src="<?= $base_url ?>img/1.jpg.jpg"
                                        alt="" />
                                </div>
                                <div class="card-title">
                                    <a href="#" class="toggle-info btn-danger">
                                        <span class="left"></span>
                                        <span class="right"></span>
                                    </a>
                                    <h2>
                                        Elimina Foto
                                        <small></small>
                                    </h2>
                                </div>
                                <div class="card-flap flap1">
                                    <div class="card-flap flap2">
                                        <div class="card-actions">
                                            <a onclick="redireccionar('http://localhost/Plantillas/SistemaAgencia/vistas/sitios/editar_sitio.php')"
                                                class="btn btn-primary"> <i class="fas fa-edit"
                                                    style="color: white;"></i></a>
                                            <a onclick="redireccionar('http://localhost/Plantillas/SistemaAgencia/vistas/sitios/galeria.php')"
                                                class="btn btn-success"> <i class="fas fa-image"
                                                    style="color: white"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card Turisentro">
                                <div class="card__image-holder">
                                    <img class="card__image" data-tags="Turisentro" src="<?= $base_url ?>img/2.jpg.jpg"
                                        alt="" />
                                </div>
                                <div class="card-title">
                                    <a href="#" class="toggle-info btn-danger">
                                        <span class="left"></span>
                                        <span class="right"></span>
                                    </a>
                                    <h2>
                                        Elimina Foto
                                        <small></small>
                                    </h2>
                                </div>
                                <div class="card-flap flap1">
                                    <div class="card-flap flap2">
                                        <div class="card-actions">
                                            <a onclick="cargar_contenido('contenido_principal', 'http://localhost/Plantillas/SistemaAgencia/vistas/sitios/editar_sitio.php')"
                                                class="btn btn-primary"> <i class="fas fa-edit"
                                                    style="color: white;"></i></a>
                                            <a onclick="cargar_contenido('contenido_principal', 'http://localhost/Plantillas/SistemaAgencia/vistas/sitios/galeria.php')"
                                                class="btn btn-success"> <i class="fas fa-image"
                                                    style="color: white"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card Montallas">
                                <div class="card__image-holder">
                                    <img class="card__image" data-tags="Montallas" src="<?= $base_url ?>img/3.jpg.jpg"
                                        alt="" />
                                </div>
                                <div class="card-title">
                                    <a href="#" class="toggle-info btn-danger">
                                        <span class="left"></span>
                                        <span class="right"></span>
                                    </a>
                                    <h2>
                                        Elimina Foto
                                        <small></small>
                                    </h2>
                                </div>
                                <div class="card-flap flap1">
                                    <div class="card-description">
                                    </div>
                                    <div class="card-flap flap2">
                                        <div class="card-actions">
                                            <a onclick="cargar_contenido('contenido_principal', 'http://localhost/Plantillas/SistemaAgencia/vistas/sitios/editar_sitio.php')"
                                                class="btn btn-primary"> <i class="fas fa-edit"
                                                    style="color: white;"></i></a>
                                            <a onclick="cargar_contenido('contenido_principal', 'http://localhost/Plantillas/SistemaAgencia/vistas/sitios/galeria.php')"
                                                class="btn btn-success"> <i class="fas fa-image"
                                                    style="color: white"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card Montallas">
                                <div class="card__image-holder">
                                    <img class="card__image" data-tags="Montallas" src="<?= $base_url ?>img/4.jpg.jpg"
                                        alt="" />
                                </div>
                                <div class="card-title">
                                    <a href="#" class="toggle-info btn-danger">
                                        <span class="left"></span>
                                        <span class="right"></span>
                                    </a>
                                    <h2>
                                        Elimina Foto
                                        <small></small>
                                    </h2>
                                </div>
                                <div class="card-flap flap1">
                                    <div class="card-description">
                                    </div>
                                    <div class="card-flap flap2">
                                        <div class="card-actions">
                                            <a onclick="cargar_contenido('contenido_principal', 'http://localhost/Plantillas/SistemaAgencia/vistas/sitios/editar_sitio.php')"
                                                class="btn btn-primary"> <i class="fas fa-edit"
                                                    style="color: white;"></i></a>
                                            <a onclick="cargar_contenido('contenido_principal', 'http://localhost/Plantillas/SistemaAgencia/vistas/sitios/galeria.php')"
                                                class="btn btn-success"> <i class="fas fa-image"
                                                    style="color: white"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card Montallas">
                                <div class="card__image-holder">
                                    <img class="card__image" data-tags="Montallas" src="<?= $base_url ?>img/8.jpg"
                                        alt="" />
                                </div>
                                <div class="card-title">
                                    <a href="#" class="toggle-info btn-danger">
                                        <span class="left"></span>
                                        <span class="right"></span>
                                    </a>
                                    <h2>
                                        Elimina Foto
                                        <small></small>
                                    </h2>
                                </div>
                                <div class="card-flap flap1">
                                    <div class="card-description">
                                    </div>
                                    <div class="card-flap flap2">
                                        <div class="card-actions">
                                            <a onclick="cargar_contenido('contenido_principal', 'http://localhost/Plantillas/SistemaAgencia/vistas/sitios/editar_sitio.php')"
                                                class="btn btn-primary"> <i class="fas fa-edit"
                                                    style="color: white;"></i></a>
                                            <a onclick="cargar_contenido('contenido_principal', 'http://localhost/Plantillas/SistemaAgencia/vistas/sitios/galeria.php')"
                                                class="btn btn-success"> <i class="fas fa-image"
                                                    style="color: white"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card Comedor">
                                <div class="card__image-holder">
                                    <img class="card__image" data-tags="Comedor" src="<?= $base_url ?>img/beach.jpg"
                                        alt="" />
                                </div>
                                <div class="card-title">
                                    <a href="#" class="toggle-info btn-danger">
                                        <span class="left"></span>
                                        <span class="right"></span>
                                    </a>
                                    <h2>
                                        Elimina Foto
                                        <small></small>
                                    </h2>
                                </div>
                                <div class="card-flap flap1">
                                    <div class="card-description">
                                    </div>
                                    <div class="card-flap flap2">
                                        <div class="card-actions">
                                            <a onclick="cargar_contenido('contenido_principal', 'http://localhost/Plantillas/SistemaAgencia/vistas/sitios/editar_sitio.php')"
                                                class="btn btn-primary"> <i class="fas fa-edit"
                                                    style="color: white;"></i></a>
                                            <a onclick="cargar_contenido('contenido_principal', 'http://localhost/Plantillas/SistemaAgencia/vistas/sitios/galeria.php')"
                                                class="btn btn-success"> <i class="fas fa-image"
                                                    style="color: white"></i></a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="card Turisentro">
                                <div class="card__image-holder">
                                    <img class="card__image" data-tags="Turisentro" src="<?= $base_url ?>img/7.jpg"
                                        alt="" />
                                </div>
                                <div class="card-title">
                                    <a href="#" class="toggle-info btn-danger">
                                        <span class="left"></span>
                                        <span class="right"></span>
                                    </a>
                                    <h2>
                                        Elimina Foto
                                        <small></small>
                                    </h2>
                                </div>
                                <div class="card-flap flap1">
                                    <div class="card-description">
                                    </div>
                                    <div class="card-flap flap2">
                                        <div class="card-actions">
                                            <a onclick="cargar_contenido('contenido_principal', 'http://localhost/Plantillas/SistemaAgencia/vistas/sitios/editar_sitio.php')"
                                                class="btn btn-primary"> <i class="fas fa-edit"
                                                    style="color: white;"></i></a>
                                            <a onclick="cargar_contenido('contenido_principal', 'http://localhost/Plantillas/SistemaAgencia/vistas/sitios/galeria.php')"
                                                class="btn btn-success"> <i class="fas fa-image"
                                                    style="color: white"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>

</div>
<?php
  include_once '../../plantillas/footer.php';
?>