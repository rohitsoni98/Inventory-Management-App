import React from "react";

// mui components
import {
  IconButton,
  Stack,
  Switch,
  Divider,
  Typography,
  Tooltip,
} from "@mui/material";

// react redux
import { useDispatch, useSelector } from "react-redux";

// set user detail func
import { setUserDetails } from "../../redux/actions";

// mui icons
import LogoutIcon from "@mui/icons-material/Logout";

// css file
import "./index.scss";

const TopNav = () => {
  const userState = useSelector((state) => state?.user);

  const dispatch = useDispatch();

  return (
    <Stack className="top_nav">
      <Stack className="content_container">
        <Typography fontSize="14px">admin</Typography>
        <Switch
          checked={!!userState?.["isUser"]}
          onChange={({ target: { checked } }) =>
            dispatch(
              setUserDetails({ user: { ...userState, isUser: checked } })
            )
          }
        />
        <Typography fontSize="14px">user</Typography>
      </Stack>

      <Divider flexItem className="divider" orientation="vertical" />

      <Tooltip arrow placement="bottom" title="Logout">
        <IconButton className="logout_btn">
          <LogoutIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default TopNav;
