import { ListCategoriesInput } from 'src/core/category/application/list-category.usecase';
import { SortDirection } from 'src/core/shared/domain/repository/search-params';

export class SearchCategoriesDto implements ListCategoriesInput {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  filter?: string;
}
