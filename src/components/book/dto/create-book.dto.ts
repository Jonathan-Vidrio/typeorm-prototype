export class CreateBookDto {
  readonly Id?: number;
  readonly ISBN: string;
  readonly Title: string;
  readonly Subtitle: string;
  readonly PublishDate: Date;
  readonly Pages: number;
  readonly Description: string;
  readonly AuthorId: number;
  readonly EditorialId: number;
  readonly CategoryId: number;
  readonly LanguageId: number;
  readonly StatusId?: number;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
