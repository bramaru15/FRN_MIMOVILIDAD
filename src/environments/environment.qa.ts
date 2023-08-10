const ip = "apim-mimov-sdm-qa.movilidadbogota.gov.co";
const urlSeguridad = "https://" + ip + "/";
const urlRedirect = "https://valvusaz.circulemosdigital.com/#/public/integracion";

export const environment = {
  version: "1.5.3",
  keyApiManager: "3ee7f90bd02e45549de608304368f94a",
  urlRedirect:urlRedirect,
  catalogo: urlSeguridad + "int-vus/catalogo/gestionar-personas/",
  catalogoRh: urlSeguridad + "int-vus/catalogo/gestionar-personas/rh",
  resetPassword: urlSeguridad + "int-vus/seguridad/resetPassword/",
  login: urlSeguridad + "int-vus/seguridad/login",
  loginCmovil:urlSeguridad+"int-cmovil/login",
  autorizacion: urlSeguridad + "int-vus/seguridad/auth",
  registro: urlSeguridad + "int-vus/seguridad/seguridad/registrarUsuarioEnrolamiento",
  keyRecaptcha: "6LdY_MsaAAAAAH87fn2VQcAT_HHNuP0lGj0UZk1r",
  keyFenix: "d54b1dc10963433f996aac38983a5678",
  recaptcha: {
    v3: {
      siteVerify: urlSeguridad + 'seguridad/seguridad/seguridad/recaptcha/v3/siteverify',
    },
  },
  recaptchaV3: {
    siteKey: '6LchwzgnAAAAAMeGqiIv7lrqMA8AU-KaYZwDhBhp',
    keySecre: '6LchwzgnAAAAAFeOYw64sY_QaCum4y5NclO22Oiy'
  },
  persona: {
    consultarPersonaByIdV2: urlSeguridad + "int-vus/seguridad/seguridad/findPerson",
    actualizarPersona:urlSeguridad +"int-vus/seguridad/seguridad/actualizarPersona"
  },
  tableros: {
    registro: urlSeguridad + "fx-qa-api-registro-sdm/registroReporte",
    graficasHome: urlSeguridad + "fx-qa-api-cantidades-sdm/cantidades",
    catalogo: urlSeguridad + "fx-qa-api-catalogo-sdm/catalogos",
    reporteGrafica: urlSeguridad + "fx-qa-api-graficas-sdm/graficas",
    archivo: urlSeguridad + "fx-qa-api-archivo-sdm/archivo",
  },

  consultas: {
    tipoIdentificacion: urlSeguridad + "int-vus/catalogo/tipoIdentificacion/consultarTipoIdentificacion",
    findByUsuario: urlSeguridad + "opconcierge/organismoUsuario/findByUsuario/",
    findByUsuarioConcesionario: urlSeguridad + "opconcierge/concesionario/",
    generos: urlSeguridad + "int-vus/catalogo/gestionar-personas/genero",
    rh: urlSeguridad + "int-vus/catalogo/gestionar-personas/rh",
    grupoSanguineo: urlSeguridad + "int-vus/catalogo/gestionar-personas/grupoSanguineo",
  },

  firmaElectronica: {
    consultarfirma: urlSeguridad+"int-firma/signatures/v1/users/",
    crearFirma:urlSeguridad+"int-firma/enrolling/v1/users/"
  },

  confirmSede: urlSeguridad + "seguridad/seguridad/confirmSede",
  
  numeroTramites: urlSeguridad + "int-vus/procesos/opconcierge/workflow/process/instances/get",
  consultaCitas: urlSeguridad + "int-vus/agenda/appointments",
  puntosAtencion: urlSeguridad + "int-vus/agenda/locations",
  comparendos: urlSeguridad + "int-fenix/fx-cmpdovigentes-sdm-qa/V1.0/ComparendosVigentes",
  consultarTaxisPlaca: urlSeguridad + "int-sirc/consulta-conductores-placa/",
  consultarTaxisTarjeta: urlSeguridad + "int-sirc/consulta-conductores-tarjeta",
  consultarExceptuado: urlSeguridad+"fx-qa-api-exceptuados-sdm/exceptuados",
  consultaParametro: urlSeguridad+"fx-qa-api-parametros/parametro",
  authSicon: urlSeguridad + "int-sicon/authenticate",
  direccionamiento: {
    comparendos: {
      ver_mas: "https://sasdmfrontfenixqa.z13.web.core.windows.net/consulta-pagos",
      pagar_comparendo: "https://sasdmfrontfenixqa.z13.web.core.windows.net/consulta-pagos",
      multa: "https://sasdmfrontfenixqa.z13.web.core.windows.net/consulta-pagos",
      acuerdo_pago: ""
    },
    tramite: {
      ver_mas: urlRedirect + "/solicitudes",
      consultar_tramite: urlRedirect + "/detalle-solicitud?solicitud=",
      vehiculo: {
        traspaso_propiedad: {
          ver_requisitos: "https://www.ventanillamovilidad.com.co/tramites/traspaso-propiedad",
          traspaso_propiedad: urlRedirect + "/tramites?idCategoria=1&idRecurso=4&idSubRecurso=86&token="
        },
        matricula: {
          ver_requisitos: "https://www.ventanillamovilidad.com.co/tramites/matricula",
          matricula: urlRedirect + "/tramites/?idCategoria=1&idRecurso=3&idSubRecurso=74&token="
        },
        inscripcion_levantamiento_pre: {
          ver_requisitos: "https://www.ventanillamovilidad.com.co/tramites/inscripcion-levantamiento-o-modificacion-de-prenda",
          prenda: urlRedirect +"/tramites/?idCategoria=1&idRecurso=34&idSubRecurso=55&token=",
          prenda2: urlRedirect +"/tramites/?idCategoria=1&idRecurso=34&idSubRecurso=56&token="
        }
      },

      actores_viales: {
        expedicion_licencia_conduccion: {
          ver_requisitos: "https://www.ventanillamovilidad.com.co/tramites/expedicion-licencia-conduccion",
          expedir_licencia_conduccion: urlRedirect + "/tramites/?idCategoria=2&idRecurso=35&idSubRecurso=16&token="
        },
        renovacion_licencia_conduccion: {
          ver_requisitos: "https://www.ventanillamovilidad.com.co/tramites/renovacion-licencia-conduccion",
          renovar_licencia_conduccion: urlRedirect + "/tramites/?idCategoria=2&idRecurso=35&idSubRecurso=15&token="
        },
        recategorizacion_licencia_conducción: {
          ver_requisitos: "https://www.ventanillamovilidad.com.co/tramites/recategorizacion-licencia-conduccion",
          recategorizacion_licencia_conduccion_arriba: urlRedirect + "/tramites/?idCategoria=2&idRecurso=35&idSubRecurso=57&token=",
          recategorizacion_licencia_conduccion_abajo: urlRedirect + "/tramites/?idCategoria=2&idRecurso=35&idSubRecurso=24&token="
        },
        duplicado_licencia_conduccion: {
          ver_requisitos: "https://www.ventanillamovilidad.com.co/tramites/duplicado-licencia-conduccion",
          duplicado_licencia_conduccion: urlRedirect + "/tramites/?idCategoria=2&idRecurso=35&idSubRecurso=5&token="
        }
      },

      
      servicio_publico: {
        tarjeta_operacion_expedicion: {
          ver_requisitos: "https://www.ventanillamovilidad.com.co/tramites/expedicion-tarjeta-de-operacion",
          expedir: urlRedirect +"/tramites/?idCategoria=3&idRecurso=38&idSubRecurso=21&token="
        },
        tarjeta_operacion_renovacion: {
          ver_requisitos: "https://www.ventanillamovilidad.com.co/tramites/expedicion-tarjeta-de-operacion",
          renovar: urlRedirect +"/tramites/?idCategoria=3&idRecurso=38&idSubRecurso=19&token="
        },
        tarjeta_operacion_cancelacion: {
          ver_requisitos: "https://www.ventanillamovilidad.com.co/tramites/cancelacion-de-tarjeta-de-operacion",
          cancelar: urlRedirect +"/tramites/?idCategoria=3&idRecurso=38&idSubRecurso=40&token="
        },
        tarjeta_operacion_duplicado: {
          ver_requisitos: "https://www.ventanillamovilidad.com.co/tramites/expedicion-tarjeta-de-operacion",
          duplicado: urlRedirect +"/tramites/?idCategoria=3&idRecurso=38&idSubRecurso=20&token="
        }
      }
    },
    citas:{
      ver_mas: urlRedirect + "/mis-citas",
      consultar_tramite: urlRedirect + "/agendamiento?idCita=",
      nueva_cita: urlRedirect + "/tramites?token=",
      mis_citas: urlRedirect + "/mis-citas?token=",
      como_agendar_cita:"https://www.ventanillamovilidad.com.co/paso-a-pasos/aprende-agendar-cita"
    },
    apprecomendadas: {
      planifica_tu_viaje: {
        android: "https://play.google.com/store/apps/details?id=com.nexura.transmilenio&hl=es_CO&gl=US",
        iOS: "https://apps.apple.com/co/app/transmi-app/id1195720094"
      },
      temBici_Alquila_Bicicleta: {
        android: "https://play.google.com/store/apps/details?id=pbsc.cyclefinder.tembicinosponsor&hl=es_CO&gl=US",
        iOS: "https://apps.apple.com/co/app/tembici/id1298652619"
      }
    },
    inmovilizaciones: {
      consultaVehiculos: urlSeguridad + "int-cmovil/vehiculoinmovilizado",
      ver_mas: "",
      salida_patios: urlRedirect + "/tramites?idCategoria=1&idRecurso=14&token=",
      detalles_tramite: "https://www.ventanillamovilidad.com.co/tramites/orden-de-entrega-de-vehiculos-inmovilizados",
      solicitar_salida_patios: ""
    },
    serviciosyconsulta: {
      orvi: "https://www.movilidadbogota.gov.co/web/ORVI",
      taxi: {
        calificar_experiencia: "",
        ver_mas: "https://www.movilidadbogota.gov.co/web/taxis"
      },
      exceptuados: {
        pagar_picoyplacaJudicial: "https://picoyplacasolidario.movilidadbogota.gov.co/PortalCiudadano/#/registro/personaJuridica",
        pagar_picoyplacaNatural: "https://picoyplacasolidario.movilidadbogota.gov.co/PortalCiudadano/#/registro/personaNatural",
        pagar_picoyplaca_anonimo: "https://picoyplacasolidario.movilidadbogota.gov.co/PortalCiudadano/#/registro/seleccionarPersona",
        ver_mas: "https://www.movilidadbogota.gov.co/web/abece_del_pico_y_placa",
        por_discapacidad:"https://www.movilidadbogota.gov.co/web/SIMUR/excepciones/login/"
      }
    },
    centroAyuda:{
      orvi:"https://wa.link/iq4xn4",
      lucia:"https://www.movilidadbogota.gov.co/web/noticia/chatea_con_lucia_la_asesora_virtual_de_servicios_a_la_ciudadania_de_la_secretaria_de",
      tel: "6012916999",
      telText: "(601) 291-6999 opción 2",
      correo: "contactanos@mimovilidad.com.co"
    },
    notificacionElectronica: {
      comohacerlanotificacion: ""
    },
    firmaElectronica: {
      comoactivarFirma: ""
    }
  }

}