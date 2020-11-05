import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./MobileNav.scss";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import PlayCircleOutline from "@material-ui/icons/PlayCircleOutline";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import ColorLens from "@material-ui/icons/ColorLens";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});


function MobileNav() {
  const classes = useStyles();

  const [isOpen, setIsOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpen(open);
  };
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button key={"s"}>
          <ListItemIcon>
            <PlayCircleOutline />
          </ListItemIcon>
          <ListItemText primary={"Courses"} />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <ColorLens />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ShoppingCart />
          </ListItemIcon>
          <ListItemText primary={"Cart"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary={"Contact Us"} />
        </ListItem>
      </List>
    </div>
  );
  return (
    <article class="nav-mobile">
      <nav>
        <MenuIcon
          onClick={toggleDrawer(true)}
          fontSize="large"
          style={{ color: "#fff", cursor: "pointer", fontSize: "4rem" }}
        />

        <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
          {list("left")}
        </Drawer>

        <div>
          <AccountCircle
            onClick={handleClick}
            style={{ color: "#fff", cursor: "pointer", fontSize: "4rem" }}
          />
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
        <Menu />
      </nav>
    </article>
  );
}

export default MobileNav;
