import * as React from "react";
import { ItemsMenuProps } from "./INavMenuResponsiveCentralAxityProps";
import ItemByMenu from "./ItemByMenu";
import styles from "./NavMenuResponsiveCentralAxity.module.scss";

const ItemsMenu: React.FC<ItemsMenuProps> = (props) => {
  const { itemsMenu } = props;
  return (
    <nav className={styles.containerNav}>
      <ul>
        {itemsMenu !== undefined
          ? itemsMenu.map((item, index) => (
              <ItemByMenu
                key={index}
                Title={item.Title}
                Link={item.Link}
                abrirPagNueva={item.AbrirPagNueva}
                childrenList={item.children}
              />
            ))
          : ""}
      </ul>
    </nav>
  );
};

export default ItemsMenu;
