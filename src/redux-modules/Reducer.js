const TYPE_TITLE = 'title';
const TYPE_TYPE = 'type';
const TYPE_YEAR = 'year';
const TYPE_PAGE = 'page';

export const title = (value) => ({
  type: TYPE_TITLE,
  value,
});
export const type = (value) => ({
  type: TYPE_TYPE,
  value,
});
export const year = (value) => ({
  type: TYPE_YEAR,
  value,
});
export const page = (value) => ({
  type: TYPE_PAGE,
  value,
});

export const reducer = (state, action) => {
  let result;

  switch (action.type) {
    case TYPE_TITLE:
      result = {
        ...state,
        title: action.value.title,
      };
      break;

    case TYPE_TYPE:
      result = {
        ...state,
        type: action.value.type,
      };
      break;

    case TYPE_YEAR:
      result = {
        ...state,
        year: action.value.year,
      };
      break;

    case TYPE_PAGE:
      result = {
        ...state,
        page: action.value.page,
      };
      break;

    default:
      result = {
        ...state,
      };
      break;
  }

  return result;
};
