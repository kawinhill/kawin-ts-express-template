import Enviroments from './Enviroments';
import Prisma from './Prisma';
import Express from './Express';
import Logger, { LogLevel } from '../libs/Logger';
import cron from 'node-cron';

class App {
    public loadENV(): void {
        Logger.log(LogLevel.INFO, 'Loading environment');
        Enviroments.init();
    }

    public loadPrisma(): void {
        Logger.log(LogLevel.INFO, 'Loading Prisma');
        Prisma.init();
    }
    
    public loadExpress(): void {
        if (!Enviroments.get().WEB_HOST || !Enviroments.get().WEB_PORT) {
            Logger.log(LogLevel.INFO, 'WEB_HOST or WEB_PORT is not defined in .env, not starting web server');
            return;
        }
        Logger.log(LogLevel.INFO, 'Loading Express');
        Express.init();
    }

    public loadCron(): void {
        Logger.log(LogLevel.INFO, 'Loading Cron');
        // cron.schedule('* * * * *', () => {
        //     console.log('Cron is running');
        // });
    }

    public endExpress(): void {
        Logger.log(LogLevel.INFO, 'Ending Express');
        Express.end();
    }
}

export default new App();
