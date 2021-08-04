"
<div style="border:1px solid #990000;padding-left:20px;margin:0 0 10px 0;">

   <h4>A PHP Error was encountered</h4>

   <p>Severity: Warning</p>
   <p>Message: pg_query(): Query failed: ERROR: lastval no está definido en esta sesión</p>
   <p>Filename: postgre/postgre_driver.php</p>
   <p>Line Number: 242</p>


   <p>Backtrace:</p>
















   <p style="margin-left:10px">
      File: C:\wamp64\www\API-REST-PHP\application\models\Itinerario_model.php<br />
      Line: 62<br />
      Function: insert_id </p>




   <p style="margin-left:10px">
      File: C:\wamp64\www\API-REST-PHP\application\models\Itinerario_model.php<br />
      Line: 74<br />
      Function: guardar </p>




   <p style="margin-left:10px">
      File: C:\wamp64\www\API-REST-PHP\application\controllers\Itinerario.php<br />
      Line: 40<br />
      Function: editar </p>




   <p style="margin-left:10px">
      File: C:\wamp64\www\API-REST-PHP\application\libraries\REST_Controller.php<br />
      Line: 688<br />
      Function: calendarSave_post </p>






   <p style="margin-left:10px">
      File: C:\wamp64\www\API-REST-PHP\index.php<br />
      Line: 290<br />
      Function: require_once </p>




</div>
<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="utf-8">
   <title>Database Error</title>
   <style type="text/css">
   ::selection {
      background-color: #E13300;
      color: white;
   }

   ::-moz-selection {
      background-color: #E13300;
      color: white;
   }

   body {
      background-color: #fff;
      margin: 40px;
      font: 13px/20px normal Helvetica, Arial, sans-serif;
      color: #4F5155;
   }

   a {
      color: #003399;
      background-color: transparent;
      font-weight: normal;
   }

   h1 {
      color: #444;
      background-color: transparent;
      border-bottom: 1px solid #D0D0D0;
      font-size: 19px;
      font-weight: normal;
      margin: 0 0 14px 0;
      padding: 14px 15px 10px 15px;
   }

   code {
      font-family: Consolas, Monaco, Courier New, Courier, monospace;
      font-size: 12px;
      background-color: #f9f9f9;
      border: 1px solid #D0D0D0;
      color: #002166;
      display: block;
      margin: 14px 0 14px 0;
      padding: 12px 10px 12px 10px;
   }

   #container {
      margin: 10px;
      border: 1px solid #D0D0D0;
      box-shadow: 0 0 8px #D0D0D0;
   }

   p {
      margin: 12px 15px 12px 15px;
   }
   </style>
</head>

<body>
   <div id="container">
      <h1>Se produjo un error en la base de datos</h1>
      <p>Error Number: </p>
      <p>ERROR: lastval no está definido en esta sesión</p>
      <p>SELECT LASTVAL() AS ins_id</p>
      <p>Filename: C:/wamp64/www/API-REST-PHP/system/database/DB_driver.php</p>
      <p>Line Number: 691</p>
   </div>
</body>

</html>"