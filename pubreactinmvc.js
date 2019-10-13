const fsSync = require('fs-sync');
var fs = require('fs');



function amigrar(pathBuild,pathDestino,urlBaseDestino) {





//buscar los CSS ********************************************************************
  let listaFilesCSS = fs.readdirSync(pathBuild + '/static/css');

  listaFilesCSS = listaFilesCSS.filter(x => {
    return x.includes('.css');
  });

  let seccionHead = listaFilesCSS
      .filter(item => {
        return item.endsWith('.css');
      })
      .reduce((html, css) => {
        html += html === '' ? '' : "\n";
        html += `<link href="${urlBaseDestino}/${css}" rel="stylesheet">`;
        return html;
      }, '');


//buscar los JS ********************************************************************
  let listaFilesJS = fs.readdirSync(pathBuild + '/static/js');

  listaFilesJS = listaFilesJS.filter(x => {
    return x.includes('.js');
  });

  let seccionScript = listaFilesJS
      .filter(item => {
        return item.endsWith('.js');
      })
      .reduce((html, js) => {
        html += html === '' ? '' : "\n";
        html += `<script src="${urlBaseDestino}/${js}"></script>`;
        return html;
      }, '')
  ;


//leer el scrpit header
  let htmlBuild = fsSync.read(`${pathBuild}/index.html`);
  let index1 = htmlBuild.indexOf('<div id="root"></div>');
  index1 = index1 + '<div id="root"></div>'.length;
  let index2 = htmlBuild.indexOf('</script>', index1);
  let code = htmlBuild.substring(index1, index2 - index1) + '</script>';

  /* ******************************************************************************* */
  let htmlIndex = `
Contenido de la aplicacion


<!- metasHead ---------------------------------------------- ->
${seccionHead}

<!- script ------------------------------------------------- ->
${code}
${seccionScript}

`;


  /* borrar y copiar *************************************************************** */
  fsSync.remove(pathDestino);
  fsSync.mkdir(pathDestino);

  listaFilesCSS.forEach(item => {
    const origen = `${pathBuild}/static/css/${item}`;
    const dest = `${pathDestino}/${item}`;
    fsSync.copy(origen, dest);
  });

  listaFilesJS.forEach(item => {
    const origen = `${pathBuild}/static/js/${item}`;
    const dest = `${pathDestino}/${item}`;
    fsSync.copy(origen, dest);
  });


//crear el index con instrucciones
  const pathIndex = `${pathDestino}/instrucciones.html`;
  fsSync.write(pathIndex, htmlIndex);


  console.log("Terminado");
}

module.exports = amigrar;
