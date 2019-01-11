import { IAppStrings } from "../strings";

/**
 * App Strings for Spanish language
 */
export const spanish: IAppStrings = {
    appName: "Herramienta Visual de Etiquetado de Objetos",
    common: {
        displayName: "Nombre para Mostrar",
        description: "Descripción",
        submit: "Enviar",
        cancel: "Cancelar",
        provider: "Proveedor",
        homePage: "Página de Inicio",
    },
    homePage: {
        newProject: "Nuevo Proyecto",
        recentProjects: "Proyectos Recientes",
        openLocalProject: {
            title: "Abrir Proyecto Local",
        },
        openCloudProject: {
            title: "Abrir Proyecto de la Nube",
            selectConnection: "Select a Connection",
        },
        deleteProject: {
            title: "Borrar Proyecto",
            confirmation: "¿Está seguro que quiere borrar el proyecto",
        },
    },
    appSettings: {
        title: "Configuración de Aplicación",
        storageTitle: "Configuración de Almacenamiento",
        uiHelp: "Donde se guardan sus configuraciones",
        devTools: {
            description: "Abrir herramientas de desarrollo de aplicaciones para ayudar a diagnosticar problemas.",
            button: "Alternar Herramientas de Desarrollo",
        },
        reload: {
            description: "Recargar la aplicación descartando todos los cambios actuales",
            button: "Recargar la aplicación",
        },
    },
    projectSettings: {
        title: "Configuración de Proyecto",
        save: "Guardar el Proyecto",
        sourceConnection: {
            title: "Conexión de Origen",
            description: "De donde se gargan sus activos",
        },
        targetConnection: {
            title: "Conexión de Destino",
            description: "Donde se guarda su proyecto y sus datos exportados",
        },
        addConnection: "Agregar Conexión",
    },
    tags: {
        title: "Etiquetas",
        placeholder: "Agregar nuevo etiqueta",
        editor: "Editor de Etiquetas",
        modal: {
            name: "Nombre de Etiqueta",
            color: "Color de Etiqueta",
        },
        colors: {
            white: "Blanco",
            gray: "Gris",
            red: "Rojo",
            maroon: "Granate",
            yellow: "Amarillo",
            olive: "Olivo",
            lime: "Lima",
            green: "Verde",
            aqua: "Aqua",
            teal: "Trullo",
            blue: "Azul",
            navy: "Azul Marino",
            fuschia: "Fuschia",
            purple: "Púrpura",
        },
    },
    connections: {
        title: "Conexiones",
        save: "Guardar Conexión",
        details: "Detalles de Conexión",
        settings: "Configuración de Conexión",
        instructions: "Por favor seleccione una conexión para editar",
        providers: {
            azureBlob: {
                title: "Almacenamiento de Azure Blob",
            },
            bing: {
                title: "Búsqueda de Imágenes Bing",
                options: "Opciones de Búsqueda de Imágenes Bing",
                apiKey: "Clave API",
                query: "Consulta",
                aspectRatio: {
                    title: "Relación de Aspecto",
                    all: "Todos",
                    square: "Cuadrado",
                    wide: "Ancho",
                    tall: "Alto",
                },
            },
            local: {
                title: "Sistema de Archivos Local",
                folderPath: "Ruta de la carpeta",
                selectFolder: "Seleccionar la carpeta",
                chooseFolder: "Elijir la carpeta",
            },
        },
    },
    editorPage: {
        width: "Anchura",
        height: "Altura",
        toolbar: {
            select: "Seleccionar",
            pan: "Pan",
            drawRectangle: "Dibujar Rectángulo",
            drawPolygon: "Dibujar Polígono",
            saveProject: "Guardar Proyecto",
            exportProject: "Exprtar Proyecto",
        },
        assetError: "No se puede mostrar el activo",
    },
    export: {
        title: "Exportar",
        settings: "Configuración de Exportación",
        saveSettings: "Guardar Configuración de Exportación",
        providers: {
            vottJson: "VoTT JSON",
            azureCV: "Servicio de Visión Personalizada Azure",
            tfRecords: "Registros de Tensorflow",
            tfPascalVoc: "Tensorflow Pascal VOC",
        },
    },
    activeLearning: {
        title: "Aprendizaje Activo",
    },
    profile: {
        settings: "Configuración de Perfíl",
    },
};
