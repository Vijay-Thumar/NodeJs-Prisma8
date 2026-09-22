#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/81ef371a790820c852b372332129cff76e1c5b6a9f6742e6c9181dc56096c4c7/contract';
import startContract from '../../snapshots/81ef371a790820c852b372332129cff76e1c5b6a9f6742e6c9181dc56096c4c7/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/840202719090148e07f2603ef51b90d50182cd5a88eaa5276a606f8875d44cb4/contract';
import endContract from '../../snapshots/840202719090148e07f2603ef51b90d50182cd5a88eaa5276a606f8875d44cb4/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addUnique({
        schema: 'public',
        table: 'watchlistItem',
        constraint: 'watchlistItem_userId_movieId_key',
        columns: ['userId', 'movieId'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
