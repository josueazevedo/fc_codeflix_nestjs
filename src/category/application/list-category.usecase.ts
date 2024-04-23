import {
  PaginationOutput,
  PaginationOutputMapper,
} from "../../shared/application/pagination-output";
import { IUseCase } from "../../shared/application/use-case.interface";
import { SortDirection } from "../../shared/domain/repository/search-params";
import {
  CategoryFilter,
  CategorySearchParams,
  CategorySearchResult,
  ICategoryRepository,
} from "../domain/category.repository";
import { GetCategoryOutput } from "./get-category.usecase";

export class ListCategoriesUseCase
  implements IUseCase<ListCategoriesInput, ListCategoriesOutput>
{
  constructor(private categoryRepo: ICategoryRepository) {}

  async execute(input: ListCategoriesInput): Promise<ListCategoriesOutput> {
    const params = new CategorySearchParams(input);
    const searchResult = await this.categoryRepo.search(params);
    return this.toOutput(searchResult);
  }

  private toOutput(searchResult: CategorySearchResult): ListCategoriesOutput {
    const { items: _items } = searchResult;
    const items = _items.map((i) => {
      return {
        id: i.category_id.id,
        name: i.name,
        description: i.description,
        is_active: i.is_active,
        created_at: i.created_at,
      };
    });
    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}

export type ListCategoriesInput = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: CategoryFilter | null;
};

export type ListCategoriesOutput = PaginationOutput<GetCategoryOutput>;
