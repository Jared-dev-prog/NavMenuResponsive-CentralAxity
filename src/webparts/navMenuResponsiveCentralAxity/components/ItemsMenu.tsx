import * as React from "react";
import { ItemsMenuProps } from "./INavMenuResponsiveCentralAxityProps";
import ItemByMenu from "./ItemByMenu";
import styles from "./NavMenuResponsiveCentralAxity.module.scss";

const handleRedirect = (url: string, typeOpen: boolean): void => {
  const type = typeOpen ? "_blank" : "_self";
  window.open(url, type);
};

const ItemsMenu: React.FC<ItemsMenuProps> = (props) => {
  const { itemsMenu, urlAbsolute } = props;
  return (
    <nav className={styles.containerNav}>
      <ul>
        <div className={styles.consultoria} onClick={() => handleRedirect(urlAbsolute, false)}>
          Consultoría
        </div>
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
