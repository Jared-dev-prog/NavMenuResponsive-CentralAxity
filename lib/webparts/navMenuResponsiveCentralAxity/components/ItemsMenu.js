import * as React from "react";
import ItemByMenu from "./ItemByMenu";
import styles from "./NavMenuResponsiveCentralAxity.module.scss";
var ItemsMenu = function (props) {
    var itemsMenu = props.itemsMenu;
    return (React.createElement("nav", { className: styles.containerNav },
        React.createElement("ul", null, itemsMenu !== undefined
            ? itemsMenu.map(function (item, index) { return (React.createElement(ItemByMenu, { key: index, Title: item.Title, Link: item.Link, abrirPagNueva: item.AbrirPagNueva, childrenList: item.children })); })
            : "")));
};
export default ItemsMenu;
//# sourceMappingURL=ItemsMenu.js.map