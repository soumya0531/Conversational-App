import React, { useMemo, Fragment } from "react";
import PropTypes from "prop-types";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationTotalStandalone,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import "./table.css";

import Search from "./Search";

const IntentTable = ({ data, perPage = 5 }) => {
  let whitespaceRows = [];

  let rows = useMemo(() => {
    let tableData = [];
    data.data.map((x) => {
      let tempObj = {};
      // Data manipulation using type of
      for (let y in x) {
        // Simple String
        if (typeof x[y] === "string") {
          tempObj[y] = x[y];
        }
        // Can be array
        if (Array.isArray(x[y])) {
          // Array of strings?
          if (typeof x[y][0] === "string") {
            whitespaceRows.push(y);
            tempObj[y] = x[y].join("\n");
          }
          // Array of objects
          else if (typeof x[y][0] === "object") {
            whitespaceRows.push(y);
            let temp = [];
            // Iterate over the array of objects
            x[y].map((i) => {
              for (let j in i) {
                // Return `key - value` pair
                temp.push(`${j} - ${i[j]}\n`);
              }
              temp.push("\n");
            });
            tempObj[y] = temp.slice(0, -1).join("");
          }
        }
      }
      tableData.push(tempObj);
    });
    return tableData;
  });

  let columns = useMemo(() => {
    let header = [];
    data.columns.map((x) => {
      header.push({
        text: x.title,
        dataField: x.id,
        sort: x.id === "col1" ? true : false,
        style: whitespaceRows.includes(x.id)
          ? {
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              width: "25%",
            }
          : "",
        sortFunc: (a, b, order) => (order === "asc" ? a - b : b - a),
      });
    });
    return header;
  });

  const defaultSorted = [
    {
      dataField: "col1",
      order: "asc",
    },
  ];

  const paginationOptions = {
    custom: true,
    sizePerPage: perPage,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    showTotal: true,
    totalSize: rows.length,
  };

  return (
    <Fragment>
      <div className="table-responsive">
        <PaginationProvider pagination={paginationFactory(paginationOptions)}>
          {({ paginationProps, paginationTableProps }) => (
            <ToolkitProvider
              keyField="No."
              data={rows}
              columns={columns}
              search
            >
              {(props) => {
                return (
                  <Fragment>
                    <Search {...props.searchProps} />
                    <PaginationTotalStandalone {...paginationProps} />
                    <PaginationListStandalone {...paginationProps} />
                    <BootstrapTable
                      {...props.baseProps}
                      {...paginationTableProps}
                      bordered={false}
                      bootstrap4
                      defaultSorted={defaultSorted}
                      headerWrapperClasses="thead-style"
                      bodyClasses="tbody-style"
                    />
                  </Fragment>
                );
              }}
            </ToolkitProvider>
          )}
        </PaginationProvider>
      </div>
    </Fragment>
  );
};

IntentTable.propTypes = {
  data: PropTypes.object.isRequired,
  perPage: PropTypes.number,
};

export default React.memo(IntentTable);
