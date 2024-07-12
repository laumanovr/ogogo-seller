import * as _ from "lodash";

interface ObjectWithChildren {
  [key: string]: any;
  childMarketplaceCategoryIdList?: ObjectWithChildren[];
}

export function findObjectInMultidimensionalArray<T extends ObjectWithChildren>(
  array: T[],
  propName: string,
  propValue: boolean
): T {
  let result = null;

  _.some(array, (obj) => {
    if (obj[propName] === propValue) {
      result = obj;
      return true;
    }

    if (_.isArray(obj.childMarketplaceCategoryIdList)) {
      result = findObjectInMultidimensionalArray(
        obj.childMarketplaceCategoryIdList,
        propName,
        propValue
      );
      return !!result;
    }

    return false;
  });

  return result;
}
