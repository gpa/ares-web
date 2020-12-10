import { environment } from '@/environment/environment';

class Logger {
  public log: (message: string) => void;
  public debug: (message: string) => void;
  public info: (message: string) => void;
  public warn: (message: string) => void;
  public error: (message: string) => void;
  public logToServer: (message: string) => void;

  constructor() {
    if (environment !== 'production') {
      this.log = console.log.bind(console);
      this.debug = console.debug.bind(console);
      this.info = console.info.bind(console);
      this.warn = console.warn.bind(console);
      this.error = console.error.bind(console);
      this.logToServer = this.error;
    } else {
      this.log = this.debug = this.info = this.warn = this.error = () => {};
      this.logToServer = err => {
        console.error(err);
      };
    }
  }
}

const logger = new Logger();
export { logger };
