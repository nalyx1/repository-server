import mongoose, { ConnectOptions } from 'mongoose';
import config from '../config/database';

class Database {
    private connection: Promise<typeof mongoose>;
    constructor() {
        this.connection = mongoose.connect(config.url!, {
            useUnifiedTopology: true,
        } as ConnectOptions);
    }
}

export default new Database();
