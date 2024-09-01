import React from "react";
import {
  Pagination,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import classnames from "classnames";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

import "./index.scss";

const getFromPath = (row, accessor = "") => {
  const pathArr = accessor?.split(".");
  let clone = { ...row };

  let current = 0;
  while (pathArr[current] && current < pathArr.length - 1) {
    clone = clone[pathArr[current++]];
  }
  return clone?.[pathArr?.[current]] ?? "";
};

const NoDataTypography = styled(Typography)({
  fontWeight: "500",
  padding: "5px",
  background: "white",
});

const emptyRow = [];

export default function TableMui(props) {
  const {
    data,
    columns,
    alignCells = "left",
    minRow = 1,
    pageSize,
    page,
    getTrProps,
    showPagination,
    paginationProps,
    tableContainerClassName,
    tableHeadClassName,
    showHeader,
  } = props;

  emptyRow.length =
    data.length > minRow
      ? 0
      : !data.length
      ? minRow > 0
        ? minRow
        : 3
      : minRow - data.length;

  const showingNoDataComp =
    (props.noDataText || props.NoDataComponent) && !data.length;

  return (
    <Stack direction={"column"} className="table_mui">
      <TableContainer className={tableContainerClassName}>
        <Table sx={{ borderCollapse: "separate" }}>
          <TableHead
            className={classnames({
              tableHeadClassName: !!tableHeadClassName,
              "d-none": !showHeader,
            })}
          >
            <TableRow className="head-row">
              {columns
                .filter(({ show = true }) => show)
                .map(
                  ({ Header, align, headerStyle, headerClassName }, index) => (
                    <TableCell
                      key={index}
                      align={align || alignCells}
                      className={classnames(`head-cell`, {
                        [headerClassName]: headerClassName && data.length,
                      })}
                      style={headerStyle}
                    >
                      {Header}
                    </TableCell>
                  )
                )}
            </TableRow>
          </TableHead>
          <TableBody className={classnames("table-body")}>
            {!data.length && !props.loading && (
              <Stack
                className="table_body_overlay"
                justifyContent="center"
                alignItems="center"
              >
                {props.noDataText && (
                  <NoDataTypography>{props.noDataText}</NoDataTypography>
                )}
                {props.NoDataComponent}
              </Stack>
            )}

            {data.map((row, index) => {
              const rowNo = index + 1 + pageSize * (page - 1);
              const { SubHeader, subHeaderClassName, colspan } = row;
              const { className, ...trProps } =
                getTrProps?.({ row, rowNo }) || {};
              const fixedCellsCount = columns.filter(
                (item) => item.isFixed
              ).length;

              return (
                <TableRow
                  key={rowNo}
                  {...trProps}
                  className={classnames(`body-row`, {
                    [className]: className,
                  })}
                >
                  {!!SubHeader ? (
                    <>
                      <TableCell
                        colspan={colspan ?? columns.length - fixedCellsCount}
                        className={classnames("body-cell", subHeaderClassName)}
                      >
                        {SubHeader}
                      </TableCell>
                      {columns
                        .filter((item) => item.isFixed)
                        .map(
                          (
                            { Cell, accessor, align, style, className },
                            index
                          ) => (
                            <TableCell
                              key={index}
                              align={align || alignCells}
                              className={classnames(`body-cell`, {
                                [className]: className,
                                [subHeaderClassName]: subHeaderClassName,
                              })}
                              style={style}
                            ></TableCell>
                          )
                        )}
                    </>
                  ) : (
                    columns
                      .filter(({ show = true }) => show)
                      .map(
                        (
                          { Cell, accessor, align, style, className },
                          index
                        ) => (
                          <TableCell
                            key={index}
                            align={align || alignCells}
                            className={classnames(`body-cell`, {
                              [className]: className,
                            })}
                            sx={style}
                          >
                            {props.loading ? (
                              <Skeleton animation="wave" />
                            ) : Cell ? (
                              <Cell {...{ row, rowNo }} />
                            ) : (
                              getFromPath(row, accessor)
                            )}
                          </TableCell>
                        )
                      )
                  )}
                </TableRow>
              );
            })}
            {emptyRow.fill("").map((_, index) => (
              <TableRow key={index}>
                {columns
                  .filter(({ show = true }) => show)
                  .map(({ align, style, className }, index) => (
                    <TableCell
                      key={index}
                      align={align || alignCells}
                      className={classnames(`body-cell`, {
                        [className]: !showingNoDataComp,
                        "border-less-cell":
                          props.NoDataComponent && !data.length,
                      })}
                      style={style}
                    >
                      {props.loading ? <Skeleton animation="wave" /> : <br />}
                    </TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {showPagination && (
        <Stack
          direction="row"
          justifyContent="flex-end"
          padding="8px"
          sx={{ borderTop: "1px solid rgba(0, 0, 0, 0.12)" }}
          className={classnames({ "d-none": !data.length })}
        >
          <Pagination
            {...paginationProps}
            count={props.pages}
            page={props.page}
            onChange={(e, page) => props.onPageChange?.(page)}
            showLastButton={props.showLastButton}
            disabled={props.disablePagination}
            showFirstButton={props.showFirstButton}
          />
        </Stack>
      )}
    </Stack>
  );
}

TableMui.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  getTrProps: PropTypes.func,
  pages: PropTypes.number,
  page: PropTypes.number,
  minRow: PropTypes.number,
  showPagination: PropTypes.bool,
  paginationProps: PropTypes.object,
  tableContainerClassName: PropTypes.string,
  showHeader: PropTypes.bool,
  loading: PropTypes.bool,
  onPageChange: PropTypes.func,
  NoDataComponent: PropTypes.element,
  disablePagination: PropTypes.bool,
};

TableMui.defaultProps = {
  data: [],
  columns: [],
  pages: 1,
  page: 1,
  minRow: 1,
  minCellWidth: 100,
  getTrProps: () => {},
  showPagination: true,
  paginationProps: {},
  pageSize: 10,
  showHeader: true,
  loading: false,
};
