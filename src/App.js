import {
  TextInput,
  Button,
  Box,
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
  Text,
} from "grommet";
import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { SEARCH } from "./redux/actions/action";
import { useReducer } from "react";
import apiResponse from "./response.json";

function reducer(state, action) {
  if (action.type === "SEARCH") {
    const resp = apiResponse.result;
    return {
      ...state,
      tableData: resp,
    };
  }
}

function flattenTableDataAndHeaders(resp) {
  let flattenTableData = [];
  let flattenTableHeaders = [];
  let respObj, propObj, propLength, propHeader, propValues;

  if (resp.length) {
    respObj =
      resp[0].object.materialDefinition || resp[0].object.changeDefinition;
    flattenTableHeaders = Object.keys(respObj);
    const indexProperties = flattenTableHeaders.indexOf("properties");
    if (indexProperties > -1) {
      flattenTableHeaders.splice(indexProperties, 1);
    }
  }

  for (var i = 0; i < resp.length; i++) {
    respObj =
      resp[i].object.materialDefinition || resp[i].object.changeDefinition;
    propObj = respObj.properties;
    propLength = propObj.length;
    for (var j = 0; j < propLength; j++) {
      propHeader = propObj[j].name;
      !flattenTableHeaders.includes(propHeader) &&
        flattenTableHeaders.push(propHeader);
      propValues = propObj[j].values;
      for (var k = 0; k < propValues.length; k++) {
        let obj = {
          [propHeader]: propValues[k],
        };
        for (const header of flattenTableHeaders) {
          if (header === propHeader) {
            continue;
          } else if (header === "createdBy" || header === "lastUpdatedBy") {
            obj[header] = respObj[header].alias;
          } else {
            obj[header] = respObj[header];
          }
        }
        flattenTableData.push(obj);
      }
    }
  }

  return {
    headers: flattenTableHeaders,
    data: flattenTableData,
  };
}

function App() {
  const [state, dispatch] = useReducer(reducer, { tableData: [] });

  const [value, setValue] = useState("");
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const resp = state.tableData;
    const { headers, data } = flattenTableDataAndHeaders(resp);
    setHeaders(headers);
    setData(data);
  }, [state]);

  const search = (searchText) => {
    dispatch({
      type: "SEARCH",
      payload: searchText,
    });
    console.log(state);
  };

  return (
    <>
      <TextInput
        style={{ width: 350 }}
        placeholder="Enter your search query"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <Box direction="row">
        <Button
          primary
          label="Submit"
          style={{ margin: 10 }}
          onClick={() => {
            search(value);
          }}
        />
        <Button
          secondary
          label="Clear"
          style={{ margin: 10, marginLeft: 0 }}
          onClick={(e) => {
            setValue("");
          }}
        />
      </Box>
      {headers.length || data.length ? (
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((h) => (
                <TableCell scope="col" border>
                  <strong>
                    <Text>{h}</Text>
                  </strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((d) => (
              <TableRow>
                {headers.map((h) => (
                  <TableCell scope="col" border>
                    <Text>{d[h]}</Text>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}
    </>
  );
}

export default App;
