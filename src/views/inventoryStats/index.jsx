import React, { useEffect, useRef, useState } from "react";

// mui component
import {
  Grid,
  Box,
  Typography,
  Card,
  Stack,
  IconButton,
  Chip,
  Tooltip,
} from "@mui/material";

// table component
import TableMui from "../../components/tableMui";
import EditViewModal from "./modal/editViewModal";

import { useSelector } from "react-redux";
import { actionButtonList, cardItemList, colorList } from "./constant";
import { getStatsData } from "../../service/service";

import toast from "react-toast";

// css file
import "./index.scss";

const chipStyle = { color: "yellow", marginLeft: "-12px" };

const ActionCompo = ({ disableBtn }) => {
  return (
    <React.Fragment>
      {actionButtonList.map(({ name, icon }, index) => (
        <Tooltip arrow key={index} title={name?.toUpperCase()} placement="top">
          <IconButton
            id={name}
            className="icon_btn"
            color={colorList[name]}
            disabled={disableBtn}
          >
            {icon}
          </IconButton>
        </Tooltip>
      ))}
    </React.Fragment>
  );
};

const InventoryStats = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [isViewMode, setIsViewMode] = useState(false);
  const [tableData, setTableData] = useState([]);

  const modalRef = useRef(null);

  const { isUser } = useSelector((state) => state?.user);

  useEffect(() => {
    fetchStatDetails();
  }, []);

  const fetchStatDetails = async () => {
    setIsLoading(true);
    const response = await getStatsData();
    setIsLoading(false);
    setTableData(response?.length ? response : []);
  };

  const toggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const actionHandler = ({ target }, rowData, rowNo) => {
    const actionType = target.closest(".icon_btn")?.id;
    // for edit action

    if (actionType === "edit") {
      toggleModal();
      setRowData({ ...rowData, rowNo });
    }
    // for view action
    if (actionType === "view") {
      toggleModal();
      setIsViewMode(true);
      setRowData(rowData);
    }

    // for delete action
    if (actionType === "delete") {
      setTableData((prev) => prev.filter((_, index) => index + 1 !== rowNo));
      toast.dismiss();
      toast.success("Deleted Successfully.");
    }
  };

  const getColumns = () => {
    return [
      {
        Header: <Chip sx={{ ...chipStyle }} label="Name" />,
        accessor: "name",
      },
      {
        Header: <Chip sx={{ ...chipStyle }} label="Category" />,
        accessor: "category",
      },
      {
        Header: <Chip sx={{ ...chipStyle }} label="Price" />,
        accessor: "price",
      },
      {
        Header: <Chip sx={{ ...chipStyle }} label="Quantity" />,
        accessor: "quantity",
      },
      {
        Header: <Chip sx={{ ...chipStyle }} label="Value" />,
        accessor: "value",
      },
      {
        Header: <Chip sx={{ ...chipStyle }} label="Actions" />,
        align: "center",
        headerClassName: "action_header",
        Cell: ({ row, rowNo }) => (
          <Stack
            spacing="4px"
            direction="row"
            alignItems="center"
            justifyContent="center"
            onClick={(e) => actionHandler(e, row, rowNo)}
          >
            <ActionCompo disableBtn={isUser} />
          </Stack>
        ),
      },
    ];
  };

  const onSaveModalData = () => {
    const modalData = modalRef.current?.getModalData();

    const rowNo = modalData?.["rowNo"] - 1;
    delete modalData["rowNo"];

    setTableData((prev) =>
      prev.map((item, index) =>
        index === rowNo ? { ...modalData } : { ...item }
      )
    );

    toast.success("Save data successfully.");
    toggleModal();
  };

  return (
    <>
      <Box p="16px" className="stats_container">
        <Typography mb="16px" fontSize="24px">
          Inventory Stats
        </Typography>

        <Grid container spacing="24px" className="card_container">
          {cardItemList.map((item, index) => {
            const { count, icon, heading } = item;
            return (
              <Grid item key={index} md={3} sm={6} xs={6}>
                <Card className="item">
                  <Stack direction="row" spacing="16px">
                    <Box>{icon}</Box>
                    <Box flexGrow={1}>
                      <Typography fontSize="1em">{heading}</Typography>
                      <Typography fontSize="2em">{count}</Typography>
                    </Box>
                  </Stack>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Box className="table_container" border="1px solid grey">
          <TableMui
            columns={getColumns()}
            loading={isLoading}
            pageSize={10}
            minRow={5}
            data={tableData}
            showPagination={false}
            NoDataComponent={<Typography>No Data Found !</Typography>}
          />
        </Box>
      </Box>

      {/* edit fields modal */}
      {openModal && (
        <EditViewModal
          row={rowData}
          ref={modalRef}
          openModal={!!openModal}
          isViewMode={isViewMode}
          toggleModal={toggleModal}
          setIsViewMode={setIsViewMode}
          onSaveModalData={onSaveModalData}
        />
      )}
    </>
  );
};

export default InventoryStats;
