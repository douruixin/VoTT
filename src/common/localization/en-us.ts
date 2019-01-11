import { IAppStrings } from "../strings";

/**
 * App Strings for English language
 */
export const english: IAppStrings = {
    appName: "Visual Object Tagging Tool",
    common: {
        displayName: "Display Name",
        description: "Description",
        submit: "Submit",
        cancel: "Cancel",
        provider: "Provider",
        homePage: "Home Page",
    },
    homePage: {
        newProject: "New Project",
        openLocalProject: {
            title: "Open Local Project",
        },
        openCloudProject: {
            title: "Open Cloud Project",
            selectConnection: "Select a Connection",
        },
        recentProjects: "Recent Projects",
        deleteProject: {
            title: "Delete Project",
            confirmation: "Are you sure you want to delete project",
        },
    },
    appSettings: {
        title: "Application Settings",
        storageTitle: "Storage Settings",
        uiHelp: "Where your settings are stored",
        devTools: {
            description: "Open application developer tools to help diagnose issues",
            button: "Toggle Developer Tools",
        },
        reload: {
            description: "Reload the app discarding all current changes",
            button: "Refresh Application",
        },
    },
    projectSettings: {
        title: "Project Settings",
        save: "Save Project",
        sourceConnection: {
            title: "Source Connection",
            description: "Where to load assets from",
        },
        targetConnection: {
            title: "Target Connection",
            description: "Where to save the project and exported data",
        },
        addConnection: "Add Connection",
    },
    tags: {
        title: "Tags",
        placeholder: "Add new tag",
        editor: "Tags Editor",
        modal: {
            name: "Tag Name",
            color: "Tag Color",
        },
        colors: {
            white: "White",
            gray: "Gray",
            red: "Red",
            maroon: "Maroon",
            yellow: "Yellow",
            olive: "Olive",
            lime: "Lime",
            green: "Green",
            aqua: "Aqua",
            teal: "Teal",
            blue: "Blue",
            navy: "Navy",
            fuschia: "Fuschia",
            purple: "Purple",
        },
    },
    connections: {
        title: "Connections",
        details: "Connection Details",
        settings: "Connection Settings",
        instructions: "Please select a connection to edit",
        save: "Save Connection",
        providers: {
            azureBlob: {
                title: "Azure Blob Storage",
            },
            bing: {
                title: "Bing Image Search",
                options: "Bing Image Search Options",
                apiKey: "API Key",
                query: "Query",
                aspectRatio: {
                    title: "Aspect Ratio",
                    all: "All",
                    square: "Square",
                    wide: "Wide",
                    tall: "Tall",
                },
            },
            local: {
                title: "Local File System",
                folderPath: "Folder Path",
                selectFolder: "Select Folder",
                chooseFolder: "Choose Folder",
            },
        },
    },
    editorPage: {
        width: "Width",
        height: "Height",
        toolbar: {
            select: "Select",
            pan: "Pan",
            drawRectangle: "Draw Rectangle",
            drawPolygon: "Draw Polygon",
            saveProject: "Save Project",
            exportProject: "Export Project",
        },
        assetError: "Unable to display asset",
    },
    export: {
        title: "Export",
        settings: "Export Settings",
        saveSettings: "Save Export Settings",
        providers: {
            vottJson: "VoTT JSON",
            azureCV: "Azure Custom Vision Service",
            tfRecords: "Tensorflow Records",
            tfPascalVoc: "Tensorflow Pascal VOC",
        },
    },
    activeLearning: {
        title: "Active Learning",
    },
    profile: {
        settings: "Profile Settings",
    },
};
