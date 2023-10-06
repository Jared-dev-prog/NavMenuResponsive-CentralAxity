import * as React from "react";
import { ItemMenuView } from "./INavMenuResponsiveCentralAxityProps";

import { mergeStyles } from "office-ui-fabric-react";
import { FontIcon } from "@fluentui/react/lib/Icon";
import styles from "./NavMenuResponsiveCentralAxity.module.scss";

const ItemByMenu: React.FC<ItemMenuView> = (props) => {
  const [subMenu, setSubMenu] = React.useState(false);
  const { Title, childrenList, abrirPagNueva, Link } = props;

  const iconCLose = mergeStyles({
    fontSize: 10,
    height: 10,
    width: 10,
    color: "white",
  });

  const handleSubMenu = (): void => {
    setSubMenu(!subMenu);
  };

  const handleRedirect = (url: string, typeOpen: boolean): void => {
    const type = typeOpen ? "_blank" : "_self";
    window.open(url, type);
  };
  return (
    <li>
      <div className={styles.itemIcon}>
        <p onClick={() => handleRedirect(Link, abrirPagNueva)}>{Title}</p>
        {childrenList.length !== 0 ? (
          <div onClick={() => handleSubMenu()}>
            <FontIcon
              aria-label="Compass"
              iconName={subMenu ? "FlickDown" : "CaretSolidDown"}
              className={iconCLose}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      {subMenu ? (
        <ul className={styles.submenu}>
          {childrenList.map((item, index) => (
            <li key={index} onClick={() => handleRedirect(item.Link, item.AbrirPagNueva)}>
              {item.Title}
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </li>
  );
};

export default ItemByMenu;
