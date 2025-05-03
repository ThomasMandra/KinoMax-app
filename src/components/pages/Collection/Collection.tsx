import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Link,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { TOP_LIST_MOBILE } from "../../../constant";

import style from "./Collection.module.scss";

const colorItems = [
  "linear-gradient(315deg, #003366 0%, #242124 74%)",
  "linear-gradient(315deg, #003153 0%, #0abab5 74%)",
  "linear-gradient(315deg, #ca7968 0%, #0c0c0c 74%)",
  "linear-gradient(315deg, #d2a813 0%,rgb(66, 58, 58) 74%)",
  "linear-gradient(315deg, #f5f5f5 0%, #e34234 74%)",
  "linear-gradient(315deg, #0cbaba 0%, #380036 74%)",
];

export default function Collection() {
  return (
    <List
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      {TOP_LIST_MOBILE.map((item, index) => {
        console.log(index);
        return (
          <Link
            key={item.title}
            component={RouterLink}
            to={item.url}
            className={style.buttonCollectionLink}
            underline="none"
          >
            <ListItem
              disablePadding
              className={style.buttonCollectionBox}
              sx={{ background: `${colorItems[index]}` }}
            >
              <ListItemButton
                className={style.buttonCollection}
                sx={{
                  height: "256px",
                  width: "256px",
                  background: `url("/public/images/icons/collection${
                    index + 1
                  }.svg") no-repeat center center`,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ListItemText
                  sx={{
                    textDecoration: "none",
                    marginTop: "auto",
                    textAlign: "center",
                    borderRadius: "20px",
                    color: "white",
                    background:
                      "linear-gradient(90deg,rgba(0, 0, 0, 0.79) 0%, rgba(0, 0, 0, 0.86) 100%);",
                  }}
                >
                  <Typography variant="h6">{item.title}</Typography>{" "}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
        );
      })}
    </List>
  );
}
