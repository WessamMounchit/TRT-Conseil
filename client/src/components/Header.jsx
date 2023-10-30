import { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import secureLocalStorage from "react-secure-storage";
import { Link } from "react-router-dom";
import { unauthenticateUser } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const email = secureLocalStorage.getItem("email");
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async (e) => {
    try {
      e.preventDefault();

      secureLocalStorage.clear();
      dispatch(unauthenticateUser());

      toast.success("Déconnexion réalisée avec succès");
    } catch (error) {
      console.error(error.message);
    }
  };

  const role = secureLocalStorage.getItem("role");
  let roleText;
  let avatarColor;

  switch (role) {
    case 1:
      roleText = "Admin";
      avatarColor = "green";
      break;
    case 2:
      roleText = "Consultant";
      avatarColor = "blue";
      break;
    case 3:
      roleText = "Recruteur";
      avatarColor = "purple";
      break;
    case 4:
      roleText = "Candidat";
      avatarColor = "brown";
      break;
  }

  const firstLetter = roleText.charAt(0);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "end",
        }}
      >
        <Typography sx={{ minWidth: 100 }}>Role : {roleText}</Typography>
        <Typography sx={{ minWidth: 100, ml: "1rem" }}>Email : {email}</Typography>
        <Tooltip title="Ouvrir le menu">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32, backgroundColor: avatarColor }}>
              {firstLetter}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {role === 1 && (
          <Link to="/admin/add-consultant">
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Ajouter un consultant
            </MenuItem>
          </Link>
        )}
        <MenuItem onClick={(e) => logout(e)}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
