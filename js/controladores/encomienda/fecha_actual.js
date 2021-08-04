window.onload = function(){
  let fecha = new Date(); //Fecha actual
  let mes     = fecha.getMonth()+1; //obteniendo mes
  let dia     = fecha.getDate(); //obteniendo dia
  let ano     = fecha.getFullYear(); //obteniendo año
  let hora    = fecha.getHours();
  let minutos = fecha.getMinutes();
  if(dia<10)
    dia='0'+dia; //agrega cero si el menor de 10
  if(mes<10)
    mes='0'+mes //agrega cero si el menor de 10
  document.getElementById('fecha').value=ano+"-"+mes+"-"+dia;

}