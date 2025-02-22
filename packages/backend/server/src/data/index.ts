import '../prelude';

import { Logger } from '@nestjs/common';
import { CommandFactory } from 'nest-commander';

import { registerInstrumentations } from '../fundamentals/metrics';

async function bootstrap() {
  AFFiNE.metrics.enabled = false;
  AFFiNE.doc.manager.enableUpdateAutoMerging = false;

  registerInstrumentations();
  const { CliAppModule } = await import('./app');
  await CommandFactory.run(CliAppModule, new Logger()).catch(e => {
    console.error(e);
    process.exit(1);
  });
  process.exit(0);
}

await bootstrap();
