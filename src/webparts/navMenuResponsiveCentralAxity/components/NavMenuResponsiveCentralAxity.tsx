import * as React from "react";
import styles from "./NavMenuResponsiveCentralAxity.module.scss";
import {
  INavMenuResponsiveCentralAxityProps,
  ItemMenu,
} from "./INavMenuResponsiveCentralAxityProps";
import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/lists";

import { mergeStyles } from "office-ui-fabric-react";
import { FontIcon } from "@fluentui/react/lib/Icon";
import ItemsMenu from "./ItemsMenu";

const NavMenuResponsiveCentralAxity: React.FC<INavMenuResponsiveCentralAxityProps> = (props) => {
  const [listItems, setListItems] = React.useState<ItemMenu[]>([]);
  const [width, setWidth] = React.useState(window.innerWidth);
  const [viewMenuResponse, setViewMenuResponse] = React.useState(0);

  const iconClass = mergeStyles({
    fontSize: 50,
    height: 50,
    width: 50,
    margin: "0 25px",
    color: "white",
  });

  const iconCLose = mergeStyles({
    fontSize: 22,
    height: 22,
    width: 22,
    padding: "15px 35px 25px 0px",
    color: "white",
  });

  const handleCloseMenu = (): void => {
    setViewMenuResponse(0);
  };

  const handleResize = (): void => {
    setWidth(window.innerWidth);
  };
  const changeViewMenuResponse = (): void => {
    setViewMenuResponse(1);
  };

  React.useEffect(() => {
    window.removeEventListener("resize", handleResize);
  }, [window.addEventListener("resize", handleResize)]);

  React.useEffect(() => {
    sp.setup({
      sp: {
        baseUrl: "https://intellego365.sharepoint.com/sites/CentralAxity/México/Consultoria2",
      },
    });

    sp.web.lists
      .getByTitle("NavMenu")
      .items.get()
      .then((items: ItemMenu[]) => {
        setListItems(items);
      })
      .catch((error) => {
        console.error("Error al obtener elementos de la lista:", error);
      });
  }, []);

  const getListMenuOrder = (dataResponse: ItemMenu[]): ItemMenu[] => {
    return dataResponse.length > 0 ? dataResponse.sort((a, b) => a.Orden - b.Orden) : [];
  };

  const getChildrenMenyById = (itemFather: ItemMenu, dataResponse: ItemMenu[]): ItemMenu[] => {
    const itemData = dataResponse.filter((item: ItemMenu) => {
      return item.CategoriaPadreId === itemFather.ID;
    });
    return getListMenuOrder([...itemData]);
  };

  const getItemFatherMenu = (dataResponse: ItemMenu[]): ItemMenu[] => {
    const itemData = dataResponse.filter((item: ItemMenu) => {
      return item.CategoriaPadreId === null;
    });
    return itemData;
  };

  const generateListMenu = (dataFather: ItemMenu[], dataResponse: ItemMenu[]): ItemMenu[] => {
    return dataFather.map((item: ItemMenu) => ({
      ...item,
      children: getChildrenMenyById({ ...item }, [...dataResponse]),
    }));
  };

  const itemsMenuFather = getItemFatherMenu([...listItems]);

  const listMenu = generateListMenu([...itemsMenuFather], [...listItems]);

  const listMenuOrder = getListMenuOrder([...listMenu]);

  return (
    <>
      {width > 820 ? (
        <div className={styles.displayNone}>Display none</div>
      ) : viewMenuResponse === 0 ? (
        <div className={styles.contentMenuResponse} onClick={() => changeViewMenuResponse()}>
          <FontIcon aria-label="Compass" iconName="BulletedListText" className={iconClass} />
        </div>
      ) : (
        <div className={styles.contentIndexMenu}>
          <div className={styles.navResponsive}>
            <div className={styles.iconClose} onClick={() => handleCloseMenu()}>
              <FontIcon aria-label="Compass" iconName="ErrorBadge12" className={iconCLose} />
            </div>

            <ItemsMenu itemsMenu={listMenuOrder} />
          </div>
        </div>
      )}
    </>
  );
};

export default NavMenuResponsiveCentralAxity;
