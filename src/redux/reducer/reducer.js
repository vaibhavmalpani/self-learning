import apiResponse from '../../response.json';

const INIT_STATE = {
  tableData: [],
};

export const tablereducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "SEARCH":
      const response = apiResponse.result;
      console.log(response);
      return {
        ...state,
        tableData: [...state.tableData, response]
      }
    default:
      return state;
  }
};
