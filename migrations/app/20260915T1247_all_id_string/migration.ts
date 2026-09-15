#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/81ef371a790820c852b372332129cff76e1c5b6a9f6742e6c9181dc56096c4c7/contract';
import endContract from '../../snapshots/81ef371a790820c852b372332129cff76e1c5b6a9f6742e6c9181dc56096c4c7/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/bafb93e6d82cfa8bc69b86dc27c272748cc828bb5c8fa089574096a3eeca1f10/contract';
import startContract from '../../snapshots/bafb93e6d82cfa8bc69b86dc27c272748cc828bb5c8fa089574096a3eeca1f10/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, placeholder } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropDefault({ schema: 'public', table: 'user', column: 'id' }),
      this.dataTransform(endContract, 'typechange-user-id', {
        check: () => placeholder('typechange-user-id:check'),
        run: () => placeholder('typechange-user-id:run'),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'user',
        column: 'id',
        options: {
          qualifiedTargetType: 'text',
          formatTypeExpected: 'text',
          rawTargetTypeForLabel: 'text',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
