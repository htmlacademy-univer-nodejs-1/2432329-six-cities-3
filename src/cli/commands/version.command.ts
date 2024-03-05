import { Command } from './command.interface.ts';
import { version } from '../../../package.json';

export class VersionCommand implements Command {
  constructor(private readonly filePath: string = './package.json') {}

  public getName(): string {
    return '--version';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try {
      console.info(version);
    } catch (error: unknown) {
      console.error(`Failed to read version from ${this.filePath}`);

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
