import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import {
  createOffer,
  getErrorMessage,
  getMongoURI,
} from '../../shared/helpers/index.js';
import {
  DatabaseClient,
  MongoDatabaseClient,
} from '../../shared/libs/database-client/index.js';
import { ConsoleLogger, Logger } from '../../shared/libs/logger/index.js';
import { UserService } from '../../shared/modules/user/user-service.interface.js';
import { OfferService } from '../../shared/modules/offer/offer-service.interface.js';
import { CommentService } from '../../shared/modules/comment/comment-service.interface.js';
import { DefaultUserService } from '../../shared/modules/user/default-user.service.js';
import { UserModel } from '../../shared/modules/user/user.entity.js';
import {
  DefaultOfferService,
  OfferModel,
} from '../../shared/modules/offer/index.js';
import {
  CommentModel,
  DefaultCommentService,
} from '../../shared/modules/comment/index.js';
import { Offer } from '../../shared/types/index.js';

export const DEFAULT_DB_PORT = '27017';

export class ImportCommand implements Command {
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;
  private userService: UserService;
  private offerService: OfferService;
  private commentService: CommentService;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.commentService = new DefaultCommentService(this.logger, CommentModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return '--import';
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);

    await this.saveOffer(offer);
    resolve();
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate(
      {
        ...offer.author,
        password: '12345',
      },
      this.salt
    );

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      publishDate: offer.publishDate,
      city: offer.city,
      imagePreview: offer.imagePreview,
      photos: offer.photos,
      isPremium: offer.isPremium,
      isFavorite: offer.isFavorite,
      rating: offer.rating,
      type: offer.type,
      roomCount: offer.roomCount,
      guestCount: offer.guestCount,
      rentPrice: offer.rentPrice,
      amenities: offer.amenities,
      author: user,
      commentsCount: offer.commentsCount,
      coordinates: offer.coordinates,
    });
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  public async execute(
    filename: string,
    host: string,
    dbname: string,
    salt: string
  ): Promise<void> {
    const uri = getMongoURI(host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
