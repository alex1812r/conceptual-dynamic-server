import 'dotenv/config';
import { app } from './app';
import { AppDataSource } from './shared/database';

async function main() {
  try {
    await AppDataSource.initialize();
    console.log('📚 [Database]: database initialized');
    app.listen(app.get('PORT'), () => {
      console.log('⚡️ [Server]: server is running on port: ', app.get('PORT'));
    })
  } catch(err) {
    console.error('ERROR: ', err);
  }
}

main();