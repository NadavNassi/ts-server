import { buildDevLogger } from "./dev-logger";
import { buildProdLogger } from "./prod-logger";


export const logger = (process.env.NODE_ENV === 'production') ? buildProdLogger() : buildDevLogger()

