import Loader from './loader';
import { Baseloader } from '../../utils/index';

class AppLoader extends Loader implements Baseloader {
    constructor() {
        super(process.env.API_URL!, {
            apiKey: process.env.API_KEY,
        });
    }
}

export default AppLoader;
