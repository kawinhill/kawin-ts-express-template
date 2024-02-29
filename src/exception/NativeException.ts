import Logger, { LogLevel } from '../libs/Logger';

class NativeException {
    public process(): void {
        process.on('uncaughtException', (exception) => {
            Logger.log(LogLevel.ERROR, 'Critical error, cleaning up and exiting');
            Logger.log(LogLevel.ERROR, exception.stack ?? '');

            Logger.log(LogLevel.ERROR, 'Clean up completed, exiting...');
            process.exit(1);
        });

        process.on('unhandledRejection', (exception) => {
            throw exception;
        });
    }
}


export default new NativeException();
