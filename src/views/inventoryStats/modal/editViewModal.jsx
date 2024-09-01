import React, {
  memo,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Modal,
  Box,
  Grid,
  Stack,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { modalFieldList } from "../constant";

import toast from "react-toast";
import "./style.scss";

const EditViewModal = forwardRef(
  (
    { openModal, isViewMode, toggleModal, setIsViewMode, row, onSaveModalData },
    ref
  ) => {
    const [rowData, setRowData] = useState({});

    useEffect(() => {
      setRow();
    }, [row]);

    useImperativeHandle(ref, () => ({
      getModalData() {
        return { ...rowData };
      },
    }));

    const setRow = () => {
      for (let key in row) {
        row[key] = row[key].toString();
      }
      setRowData(row);
    };

    const onChangeModalFields = ({ target: { name, value } }) => {
      if (["price", "value", "quantity"].includes(name) && isNaN(value)) {
        return (
          toast.dismiss(),
          toast.error("Invalid value as only number can be filled.")
        );
      }

      setRowData((prev) => ({
        ...prev,
        [name]: ["price", "value"].includes(name) ? `$${value}` : value,
      }));
    };

    return (
      <Modal open={openModal} className="edit_product_modal">
        <Box className="box_container">
          <Stack
            p="4px 16px"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography lineHeight="38px" fontSize="20px">
                {`${isViewMode ? "View" : "Edit"} Product`}
              </Typography>
              <Typography fontSize="12px">{rowData?.["name"]}</Typography>
            </Box>
            <IconButton
              onClick={() => {
                toggleModal();
                setIsViewMode(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>

          <Grid container p="16px" spacing="16px">
            {modalFieldList.map(({ label, value }, index) => (
              <Grid item key={index} xs={6}>
                <TextField
                  fullWidth
                  size="small"
                  label={label}
                  id={value}
                  name={value}
                  disabled={isViewMode}
                  onChange={onChangeModalFields}
                  value={
                    typeof rowData?.[value] === "string"
                      ? rowData[value].replaceAll("$", "")
                      : rowData?.[value] || ""
                  }
                />
              </Grid>
            ))}
          </Grid>

          {!isViewMode && (
            <Stack
              p="16px"
              spacing="8px"
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Button onClick={toggleModal}>Cancel</Button>
              <Button
                variant="contained"
                onClick={onSaveModalData}
                disabled={
                  JSON.stringify(row || {}) === JSON.stringify(rowData || {}) ||
                  Object.values(rowData).some((val) => !val.replaceAll("$", ""))
                }
              >
                Save
              </Button>
            </Stack>
          )}
        </Box>
      </Modal>
    );
  }
);

export default memo(EditViewModal);
