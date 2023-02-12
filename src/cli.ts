import yParser from 'yargs-parser';

const args = yParser(process.argv.slice(2), {
  alias: {
    version: ['v'],
    help: ['h'],
  },
  boolean: ['version'],
});

require('./').default({ cwd: process.cwd(), args });
