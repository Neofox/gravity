import * as yargs from 'yargs';

import '../bootstrap';

yargs.usage('Usage: $0 <command> [arguments]');

([] as yargs.CommandModule[])
    .concat([ /* command modules, to come */ ])
    .forEach(command => yargs.command(command));

yargs.help().argv;
