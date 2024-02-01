

document.addEventListener("DOMContentLoaded", () => {
    const $btnEnviar = document.querySelector("#send_data"),
          $inputNameRt = document.querySelector("#name_rt"),
          $inputAddressRt = document.querySelector("#address_rt"),
          $inputCpRt = document.querySelector("#cp_rt"),
          $inputCityRt = document.querySelector("#city_rt"),
          $inputStateRt = document.querySelector("#state_rt"),
          $inputNameDt = document.querySelector("#name_dt"),
          $inputAddressDt = document.querySelector("#address_dt"),
          $inputCpDt = document.querySelector("#cp_dt"),
          $inputCityDt = document.querySelector("#city_dt"),
          $inputStateDt = document.querySelector("#state_dt"),
          $inputDateCd = document.querySelector("#date_cd"),
          $textBodyCd = document.querySelector("#body_cd"),
          $sizeText = document.querySelector("#size_text"),
          $singName = document.querySelector("#sing_name"),
          $singDni = document.querySelector("#sing_dni"),
          $marginLeft = document.querySelector("#margin_left"),
          $marginTop = document.querySelector("#margin_top"),
          $res_margin = document.querySelector("#res_margin");
    //------------------------------------------------------//

    // Restablecer valor predeterminados de los margénes:
    $res_margin.addEventListener("click", function() {
        $marginTop.value = "2.56";
        $marginLeft.value = "0.60";
    });

    // Enviar datos ingresados:
    $btnEnviar.onclick = async () => {
        const nameRt = $inputNameRt.value;
        const addressRt = $inputAddressRt.value;
        const cpRt = $inputCpRt.value;
        const cityRt = $inputCityRt.value;
        const stateRt = $inputStateRt.value;
        const nameDt = $inputNameDt.value;
        const addressDt = $inputAddressDt.value;
        const cpDt = $inputCpDt.value;
        const cityDt = $inputCityDt.value;
        const stateDt = $inputStateDt.value;
        const dateCd = $inputDateCd.value;
        const bodyCd = $textBodyCd.value;
        const sizeText = $sizeText.value;
        const singName = $singName.value;
        const singDni = $singDni.value;
        const marginTop = $marginTop.value;
        const marginLeft = $marginLeft.value;
        const iframe = document.getElementById('iFrame');
        
        var datos = {
            remitente: {
                name: nameRt,
                adress: addressRt,
                cp: cpRt,
                city:  cityRt,
                state: stateRt
            },
            destinatario: {
                name: nameDt,
                adress: addressDt,
                cp: cpDt,
                city:  cityDt,
                state: stateDt
            },
            cuerpo: {
                date_cd: dateCd,
                body_cd: bodyCd,
                size_text: sizeText
            },
            firma: {
                name: singName,
                dni: singDni
            },
            margenes: {
                m_top: marginTop,
                m_left: marginLeft
            }
        }

        // Tratamiento de saltos de linea
            var cuerpo_arr = datos.cuerpo.body_cd.split('\n');

            // Arreglo que tendrá el contenido del cuerpo
            var text_format = "";
        
            for(let i = 0; i < cuerpo_arr.length; i++){
                text_format +=cuerpo_arr[i]+'<br>';
            }
        // --------------------------------

        // Espera a que el iframe se cargue completamente
        iframe.onload = function() {
            // Accede al contenido del iframe
            var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    
            // Escritura del contenido del body dentro del iframe
            var bodyIframe = iframeDocument.body;
            var contsTemplate = '<div class=\"page\"> <div class=\"container\" style=\"margin-left:' + datos.margenes.m_left + 'cm;margin-top: ' + datos.margenes.m_top + 'cm;"> ';
            var datosTemplate = '<div class=\"datos\"> <div class=\"cabecera\"> <div class=\"n\"> ' + datos.remitente.name + ' <\/div> <div class=\"n\"> <!-- destinatario Eliseo Esteverena --> ' + datos.destinatario.name + '<\/div> <\/div> <div class=\"address-c\"> <div class=\"a\"> <!-- Monroe 4622 6to A -->' + datos.remitente.adress + ' <\/div> <div class=\"a\"> <!-- Monroe 4622 6to A -->' + datos.destinatario.adress + ' <\/div> <\/div> <div class=\"zip-city-state\"><div class=\"zip-city-state-int\"> <div class=\"zip\"> <!-- CP 1100 --> ' + datos.remitente.cp + '<\/div> <div class=\"city\"> <!-- Localidad Buenos Aires -->' + datos.remitente.city + ' <\/div> <div class=\"state\"> <!-- Provincia Buenos Aires -->' + datos.remitente.state + ' <\/div><\/div> <div class=\"zip-city-state-int\"><div class=\"zip\"> <!-- CP 1100 -->' + datos.destinatario.cp + ' <\/div> <div class=\"city\"> <!-- Localidad Buenos Aires -->' + datos.destinatario.city + ' <\/div> <div class=\"state\"> <!-- Provincia Buenos Aires -->' + datos.destinatario.state + ' <\/div> <\/div> <\/div><\/div> ';
            var entyTeplate = '<div class=\"l-enty\">&nbsp;<\/div> ';
            var contenidoCDTemplate = '<div class=\"contenido-carta\" style=\"font-size: ' + datos.cuerpo.size_text +'pt;\"><div class=\"fecha-carta\"> <!-- -->' + datos.cuerpo.date_cd + '<\/div><br>' + text_format + '<br><\/div>';
            var firmaTemplate = '<div class=\"content-firma\"> <div class=\"c-firma\"> <div class=\"e-firma\"> &nbsp; <\/div> <div class=\"firmante\">' + datos.firma.name + ' <\/div> <div class=\"dni\"> ' + datos.firma.dni + '<\/div> <\/div> <\/div> ';
            var endsContsTemplate = '<\/div> <\/div>';
            bodyIframe.innerHTML = contsTemplate + datosTemplate + entyTeplate + datosTemplate + contenidoCDTemplate + firmaTemplate + endsContsTemplate;
            
        };
    };
});
