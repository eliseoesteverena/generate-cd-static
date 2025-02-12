const $btnEnviar = document.querySelector("#send_data");
const $res_margin = document.querySelector("#res_margin");
//------------------------------------------------------//

// Restablecer valor predeterminados de los margénes:
$res_margin.addEventListener("click", function() {
    $marginTop.value = "2.56";
    $marginLeft.value = "0.60";
});

// Enviar datos ingresados:
$btnEnviar.onclick = async () => {
    let datos = obtenerDatos();
    
    const iframe = document.getElementById('iFrame');

    // Espera a que el iframe se cargue completamente
    iframe.onload = function() {
        // Accede al contenido del iframe
        let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    
        // Escritura del contenido del body dentro del iframe
        let bodyIframe = iframeDocument.body;
        
        let contenidoHTML = `
            <div class="page">
                <div class="container" style="margin-left: ${datos.margenes.m_left}cm; margin-top: ${datos.margenes.m_top}cm;">
                    
                    <div class="datos">
                        <div class="cabecera">
                            <div class="n">${datos.remitente.name}</div>
                            <div class="n">${datos.destinatario.name}</div>
                        </div>
                        <div class="address-c">
                            <div class="a">${datos.remitente.adress}</div>
                            <div class="a">${datos.destinatario.adress}</div>
                        </div>
                        <div class="zip-city-state">
                            <div class="zip-city-state-int">
                                <div class="zip">${datos.remitente.cp}</div>
                                <div class="city">${datos.remitente.city}</div>
                                <div class="state">${datos.remitente.state}</div>
                            </div>
                            <div class="zip-city-state-int">
                                <div class="zip">${datos.destinatario.cp}</div>
                                <div class="city">${datos.destinatario.city}</div>
                                <div class="state">${datos.destinatario.state}</div>
                            </div>
                        </div>
                    </div>
    
                    <div class="l-enty">&nbsp;</div>
    
                    <div class="datos">
                        <div class="cabecera">
                            <div class="n">${datos.remitente.name}</div>
                            <div class="n">${datos.destinatario.name}</div>
                        </div>
                        <div class="address-c">
                            <div class="a">${datos.remitente.adress}</div>
                            <div class="a">${datos.destinatario.adress}</div>
                        </div>
                        <div class="zip-city-state">
                            <div class="zip-city-state-int">
                                <div class="zip">${datos.remitente.cp}</div>
                                <div class="city">${datos.remitente.city}</div>
                                <div class="state">${datos.remitente.state}</div>
                            </div>
                            <div class="zip-city-state-int">
                                <div class="zip">${datos.destinatario.cp}</div>
                                <div class="city">${datos.destinatario.city}</div>
                                <div class="state">${datos.destinatario.state}</div>
                            </div>
                        </div>
                    </div>
                    <div class="contenido-carta">
                        ${datos.cuerpo.body_cd}
                        <br>
                    </div>
    
                    <div class="content-firma">
                        <div class="c-firma">
                            <div class="e-firma">&nbsp;</div>
                            <div class="firmante">${datos.firma.name}</div>
                            <div class="dni">${datos.firma.dni}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    
        bodyIframe.innerHTML = contenidoHTML;
    };
    
};


// Función para obtener los valores de los inputs y del editor Quill
function obtenerDatos() {
    return {
        remitente: {
            name: document.querySelector("#name_rt").value.trim(),
            adress: document.querySelector("#address_rt").value.trim(),
            cp: document.querySelector("#cp_rt").value.trim(),
            city: document.querySelector("#city_rt").value.trim(),
            state: document.querySelector("#state_rt").value.trim()
        },
        destinatario: {
            name: document.querySelector("#name_dt").value.trim(),
            adress: document.querySelector("#address_dt").value.trim(),
            cp: document.querySelector("#cp_dt").value.trim(),
            city: document.querySelector("#city_dt").value.trim(),
            state: document.querySelector("#state_dt").value.trim()
        },
        cuerpo: {
            body_cd: document.querySelector(".ql-editor").innerHTML.trim()
        },
        firma: {
            name: document.querySelector("#sing_name").value.trim(),
            dni: document.querySelector("#sing_dni").value.trim()
        },
        margenes: {
            m_top: document.querySelector("#margin_top").value.trim(),
            m_left: document.querySelector("#margin_left").value.trim()
        }
    };
}
