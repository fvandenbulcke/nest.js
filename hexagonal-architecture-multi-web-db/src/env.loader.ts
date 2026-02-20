import { config } from 'dotenv';
import { resolve } from 'path';

// Charger les variables d'environnement avant l'initialisation des modules
config({ path: resolve(process.cwd(), '.env') });
