import {
  //   BasePageParams,
  ResponseWithStatus,
  //   WithResultPagination,
} from "@/shared/api/index.types";
import { CategoryEntity } from "../model/types";

export type CategoryApiResponse = ResponseWithStatus<CategoryEntity[]>;
