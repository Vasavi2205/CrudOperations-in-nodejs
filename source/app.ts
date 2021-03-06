import express, { Application } from 'express';
import morgan from 'morgan';

function main() {
    const app = express();
    app.listen(3000);
}

// Routes
import indexRoutes from './routes/indexing';
import postRoutes from './routes/post';

export class App {
    private app: Application;

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    middlewares() {
        this.app.use(morgan('dev'));
        // this.app.use(express.urlencoded({extended:false}));
        this.app.use(express.json());
    }

    routes() {
        this.app.use(indexRoutes);
        this.app.use('/posts', postRoutes);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log(`server started at http://localhost:${this.app.get('port')}`);
    }
}
