import { AssetState, AssetType, IApplicationState, IAppSettings, IAsset, IAssetMetadata,
    IConnection, IExportFormat, IProject, ITag, StorageType } from "../models/applicationState";
import { ExportAssetState } from "../providers/export/exportProvider";
import { IAssetProvider, IAssetProviderRegistrationOptions } from "../providers/storage/assetProviderFactory";
import { IAzureCloudStorageOptions } from "../providers/storage/azureBlobStorage";
import { IStorageProvider, IStorageProviderRegistrationOptions } from "../providers/storage/storageProviderFactory";
import { ExportProviderFactory, IExportProviderRegistrationOptions } from "../providers/export/exportProviderFactory";
import { IProjectSettingsPageProps } from "../react/components/pages/projectSettings/projectSettingsPage";
import IConnectionActions from "../redux/actions/connectionActions";
import IProjectActions, * as projectActions from "../redux/actions/projectActions";
import { IProjectService } from "../services/projectService";
import { IBingImageSearchOptions, BingImageSearchAspectRatio } from "../providers/storage/bingImageSearch";
import { IEditorPageProps } from "../react/components/pages/editorPage/editorPage";

export default class MockFactory {

    /**
     * Creates fake IAsset
     * @param name Name of asset
     * @param assetState State of asset
     */
    public static createTestAsset(name: string, assetState: AssetState = AssetState.NotVisited): IAsset {
        return {
            id: `asset-${name}`,
            format: "jpg",
            name: `Asset ${name}`,
            path: `C:\\Desktop\\asset${name}.jpg`,
            state: assetState,
            type: AssetType.Image,
            size: {
                width: 800,
                height: 600,
            },
        };
    }

    /**
     * Creates array of fake IAsset
     * @param count Number of assets to create
     */
    public static createTestAssets(count: number = 10): IAsset[] {
        const assets: IAsset[] = [];
        for (let i = 1; i <= count; i++) {
            assets.push(MockFactory.createTestAsset(i.toString()));
        }

        return assets;
    }

    /**
     * Creates fake IAssetMetadata
     * @param asset Test asset
     */
    public static createTestAssetMetadata(asset: IAsset): IAssetMetadata {
        return {
            asset,
            regions: [],
            timestamp: null,
        };
    }

    /**
     * Creates array of fake IProject
     * @param count Number of projects
     */
    public static createTestProjects(count: number = 10): IProject[] {
        const projects: IProject[] = [];
        for (let i = 1; i <= count; i++) {
            projects.push(MockFactory.createTestProject(i.toString()));
        }

        return projects;
    }

    /**
     * Creates fake IProject
     * @param name Name of project. project.id = `project-${name}` and project.name = `Project ${name}`
     */
    public static createTestProject(name: string = "test"): IProject {
        const connection = MockFactory.createTestConnection(name);

        return {
            id: `project-${name}`,
            name: `Project ${name}`,
            assets: {},
            exportFormat: MockFactory.exportFormat(),
            sourceConnection: connection,
            targetConnection: connection,
            tags: MockFactory.createTestTags(),
            autoSave: true,
        };
    }

    /**
     * Creates fake IAzureCloudStorageOptions
     */
    public static createAzureOptions(): IAzureCloudStorageOptions {
        return {
            accountName: "myaccount",
            containerName: "container0",
            sas: "sas",
            createContainer: undefined,
        };
    }

    /**
     * Creates fake response for Azure Blob Storage `listContainers` function
     */
    public static createAzureStorageListContainersResponse() {
        return {
            containerItems: MockFactory.createAzureContainers(),
            nextMarker: null,
        };
    }

    /**
     * Creates fake Azure containers
     * @param count Number of containers
     */
    public static createAzureContainers(count: number = 3) {
        const result = [];
        for (let i = 0; i < count; i++) {
            result.push({
                name: `container${i}`,
                blobs: MockFactory.createAzureBlobs(i),
            });
        }
        return { containerItems: result };
    }

    /**
     * Creates fake data for testing Azure Cloud Storage
     */
    public static createAzureData() {
        const options = this.createAzureOptions();
        return {
            blobName: "file1.jpg",
            blobText: "This is the content",
            fileType: "image/jpg",
            containerName: options.containerName,
            containers: this.createAzureContainers(),
            blobs: this.createAzureBlobs(),
            options,
        };
    }

    /**
     * Creates fake Blob object
     * @param name Name of blob
     * @param content Content of blob
     * @param fileType File type of blob
     */
    public static blob(name: string, content: string | Buffer, fileType: string): Blob {
        const blob = new Blob([content], { type: fileType });
        blob["name"] = name;
        return blob;
    }

    /**
     * Creates fake Azure Blobs
     * @param id ID of blob
     * @param count Number of blobs
     */
    public static createAzureBlobs(id: number = 1, count: number = 10) {
        const result = [];
        for (let i = 0; i < count; i++) {
            result.push({
                name: `blob-${id}-${i}.jpg`,
            });
        }
        return { segment: { blobItems: result } };
    }

    /**
     * Create array of fake ITag
     * @param count Number of tags
     */
    public static createTestTags(count: number = 5): ITag[] {
        const tags: ITag[] = [];
        for (let i = 0; i < count; i++) {
            tags.push(MockFactory.createTestTag(i.toString()));
        }
        return tags;
    }

    /**
     * Create fake ITag with random color
     * @param name Name of tag
     */
    public static createTestTag(name: string = "Test Tag"): ITag {
        return {
            name: `Tag ${name}`,
            color: MockFactory.randomColor(),
        };
    }

    /**
     * Create array of IConnection, half Azure Blob connections, half Local File Storage connections
     * @param count Number of connections
     */
    public static createTestConnections(count: number = 10): IConnection[] {
        const connections: IConnection[] = [];
        for (let i = 1; i <= (count / 2); i++) {
            connections.push(MockFactory.createTestCloudConnection(i.toString()));
        }
        for (let i = (count / 2) + 1; i <= count; i++) {
            connections.push(MockFactory.createTestConnection(i.toString()));
        }
        return connections;
    }

    /**
     * 
     * @param name Name of connection
     */
    public static createTestCloudConnection(name: string = "test"): IConnection {
        return this.createTestConnection(name, "azureBlobStorage");
    }

    /**
     * Create array of IConnection of type Bing Image Search
     * @param count Number of connections
     */
    public static createTestBingConnections(count: number = 10): IConnection[] {
        const connections: IConnection[] = [];
        for (let i = 1; i <= count; i++) {
            connections.push(MockFactory.createTestConnection(i.toString(), "bingImageSearch"));
        }
        return connections;
    }

    /**
     * Create fake IConnection
     * @param name Name of connection - default test
     * @param providerType Type of Connection - default local file system
     */
    public static createTestConnection(
        name: string = "test", providerType: string = "localFileSystemProxy"): IConnection {
        return {
            id: `connection-${name}`,
            name: `Connection ${name}`,
            description: `Description for Connection ${name}`,
            providerType,
            providerOptions: this.getProviderOptions(providerType),
        };
    }

    /**
     * Create fake IBingImageSearchOptions
     */
    public static createBingOptions(): IBingImageSearchOptions {
        return {
            apiKey: "key",
            aspectRatio: BingImageSearchAspectRatio.All,
            query: "test",
        };
    }

    /**
     * Get options for asset provider
     * @param providerType asset provider type
     */
    public static getProviderOptions(providerType) {
        switch (providerType) {
            case "azureBlobStorage":
                return this.createAzureOptions();
            case "bingImageSearch":
                return this.createBingOptions();
            default:
                return {};
        }
    }

    /**
     * Create array of filename strings
     */
    public static createFileList(): string[] {
        return ["file1.jpg", "file2.jpg", "file3.jpg"];
    }

    /**
     * Create fake Storage Provider of storage type Cloud
     * All functions are jest.fn to test for being called
     * readText resolves to "Fake text"
     * listFiles resolves with list of fake files
     */
    public static createStorageProvider(): IStorageProvider {
        return {
            storageType: StorageType.Cloud,

            initialize: jest.fn(() => Promise.resolve()),
            readText: jest.fn(() => Promise.resolve("Fake text")),
            readBinary: jest.fn(),
            deleteFile: jest.fn(),
            writeText: jest.fn(),
            writeBinary: jest.fn(),
            listFiles: jest.fn(() => Promise.resolve(this.createFileList())),
            listContainers: jest.fn(),
            createContainer: jest.fn(),
            deleteContainer: jest.fn(),
            getAssets: jest.fn(),
        };
    }

    /**
     * Creates a storage provider from IConnection
     * @param connection Connection with which to create Storage Provider
     */
    public static createStorageProviderFromConnection(connection: IConnection): IStorageProvider {
        return {
            ...this.createStorageProvider(),
            storageType: this.getStorageType(connection.providerType),
        };
    }

    /**
     * Create fake asset provider
     */
    public static createAssetProvider(): IAssetProvider {
        return {
            initialize: jest.fn(() => Promise.resolve()),
            getAssets(containerName?: string): Promise<IAsset[]> {
                throw new Error("Method not implemented.");
            },
        };
    }

    /**
     * Create fake IExportFormat of provider type vottJson
     */
    public static exportFormat(): IExportFormat {
        return {
            providerType: "vottJson",
            providerOptions: {
                assetState: ExportAssetState.Tagged,
            },
        };
    }

    /**
     * Creates array of IExportProviderRegistrationOptions for the different providers
     * vottJson, tensorFlowPascalVOC, azureCustomVision
     */
    public static createExportProviderRegistrations(): IExportProviderRegistrationOptions[] {
        const registrations: IExportProviderRegistrationOptions[] = [];
        registrations.push(MockFactory.createExportProviderRegistration("vottJson"));
        registrations.push(MockFactory.createExportProviderRegistration("tensorFlowPascalVOC"));
        registrations.push(MockFactory.createExportProviderRegistration("azureCustomVision"));

        return registrations;
    }

    /**
     * Create array of IStorageProviderRegistrationOptions
     * @param count Number of storage provider registrations to create
     */
    public static createStorageProviderRegistrations(count: number = 10): IStorageProviderRegistrationOptions[] {
        const registrations: IStorageProviderRegistrationOptions[] = [];
        for (let i = 1; i <= count; i++) {
            registrations.push(MockFactory.createStorageProviderRegistration(i.toString()));
        }

        return registrations;
    }

    /**
     * Create array of IAssetProviderRegistrationOptions
     * @param count Number of Asset Provider Registrations to create
     */
    public static createAssetProviderRegistrations(count: number = 10): IAssetProviderRegistrationOptions[] {
        const registrations: IAssetProviderRegistrationOptions[] = [];
        for (let i = 1; i <= count; i++) {
            registrations.push(MockFactory.createAssetProviderRegistration(i.toString()));
        }

        return registrations;
    }

    /**
     * 
     * @param name 
     */
    public static createExportProviderRegistration(name: string) {
        const registration: IExportProviderRegistrationOptions = {
            name,
            displayName: `${name} display name`,
            description: `${name} short description`,
            factory: () => null,
        };

        return registration;
    }

    /**
     * Creates fake IStorageProviderRegistrationOptions
     * @param name Name of Storage Provider
     */
    public static createStorageProviderRegistration(name: string) {
        const registration: IStorageProviderRegistrationOptions = {
            name,
            displayName: `${name} display name`,
            description: `${name} short description`,
            factory: () => null,
        };

        return registration;
    }

    /**
     * Creates fake IAssetProviderRegistrationOptions
     * @param name Name of asset provider
     */
    public static createAssetProviderRegistration(name: string) {
        const registration: IAssetProviderRegistrationOptions = {
            name,
            displayName: `${name} display name`,
            description: `${name} short description`,
            factory: () => null,
        };

        return registration;
    }

    /**
     * Creates fake IProjectService
     */
    public static projectService(): IProjectService {
        return {
            save: jest.fn((project: IProject) => Promise.resolve()),
            delete: jest.fn((project: IProject) => Promise.resolve()),
        };
    }

    /**
     * Creates fake IProjectActions with jest functions for each action
     */
    public static projectActions(): IProjectActions {
        return {
            loadProject: jest.fn((project: IProject) => Promise.resolve()),
            saveProject: jest.fn((project: IProject) => Promise.resolve()),
            deleteProject: jest.fn((project: IProject) => Promise.resolve()),
            closeProject: jest.fn(() => Promise.resolve()),
            loadAssets: jest.fn((project: IProject) => Promise.resolve()),
            exportProject: jest.fn((project: IProject) => Promise.resolve()),
            loadAssetMetadata: jest.fn((project: IProject, asset: IAsset) => Promise.resolve()),
            saveAssetMetadata: jest.fn((project: IProject, assetMetadata: IAssetMetadata) => Promise.resolve()),
        };
    }

    /**
     * Creates fake IConnectionActions with jest functions for each action
     */
    public static connectionActions(): IConnectionActions {
        return {
            loadConnection: jest.fn((connection: IConnection) => Promise.resolve()),
            saveConnection: jest.fn((connection: IConnection) => Promise.resolve()),
            deleteConnection: jest.fn((connection: IConnection) => Promise.resolve()),
        };
    }

    /**
     * Creates fake IAppSettings
     */
    public static appSettings(): IAppSettings {
        const testConnection = MockFactory.createTestConnection("Test");

        return {
            devToolsEnabled: false,
            connection: testConnection,
            connectionId: testConnection.id,
        };
    }


    private static pageProps(projectId: string, method: string) {
        return {
            project: null,
            recentProjects: MockFactory.createTestProjects(),
            actions: (projectActions as any) as IProjectActions,
            history: this.history(),
            location: this.location(),
            match: this.match(projectId, method),
        };
    }

    /**
     * Creates fake IProjectSettingsPageProps
     * @param projectId Current project ID
     */
    public static projectSettingsProps(projectId?: string): IProjectSettingsPageProps {
        return {
            ...this.pageProps(projectId, "settings"),
            connections: this.createTestConnections(),
        };
    }

    /**
     * Creates fake IEditorPageProps
     * @param projectId Current project ID
     */
    public static editorPageProps(projectId?: string): IEditorPageProps {
        return this.pageProps(projectId, "edit");
    }

    /**
     * Creates fake IApplicationState
     */
    public static initialState(): IApplicationState {
        const testProjects = MockFactory.createTestProjects();
        const testConnections = MockFactory.createTestConnections();

        return {
            appSettings: MockFactory.appSettings(),
            connections: testConnections,
            recentProjects: testProjects,
            currentProject: testProjects[0],
        };
    }

    /**
     * Creates fake match for page properties
     * @param projectId Current project id
     * @param method URL method for project (export, edit, settings)
     */
    private static match(projectId: string, method: string) {
        return {
            params: {
                projectId,
            },
            isExact: true,
            path: `https://localhost:3000/projects/${projectId}/${method}`,
            url: `https://localhost:3000/projects/${projectId}/${method}`,
        };
    }

    /**
     * Creates fake history for page properties
     */
    private static history() {
        return {
            length: 0,
            action: null,
            location: null,
            push: jest.fn(),
            replace: jest.fn(),
            go: jest.fn(),
            goBack: jest.fn(),
            goForward: jest.fn(),
            block: jest.fn(),
            listen: jest.fn(),
            createHref: jest.fn(),
        };
    }

    /**
     * Creates fake location for page properties
     */
    private static location() {
        return {
            hash: null,
            pathname: null,
            search: null,
            state: null,
        };
    }

    /**
     * Runs function that updates the UI, and flushes call stack
     * @param func - The function that updates the UI
     */
    public static flushUi(func: () => void): Promise<void> {
        return new Promise<void>((resolve) => {
            func();
            setImmediate(resolve);
        });
    }

    /**
     * Generates a random color string
     */
    private static randomColor(): string {
        return [
            "#",
            MockFactory.randomColorSegment(),
            MockFactory.randomColorSegment(),
            MockFactory.randomColorSegment(),
        ].join("");
    }

    /**
     * Generates random color segment
     */
    private static randomColorSegment(): string {
        const num = Math.floor(Math.random() * 255);
        return num.toString(16);
    }

    /**
     * Gets StorageType for asset providers
     * @param providerType Asset Providet type
     */
    private static getStorageType(providerType: string): StorageType {
        switch (providerType) {
            case "azureBlobStorage":
                return StorageType.Cloud;
            case "localFileSystemProxy":
                return StorageType.Local;
            default:
                return StorageType.Other;
        }
    }
}
