interface Driver {
    getConnection(): any;
    loadConnection(): Promise<void>;
    connect(): Promise<void>;
}

export default Driver;
