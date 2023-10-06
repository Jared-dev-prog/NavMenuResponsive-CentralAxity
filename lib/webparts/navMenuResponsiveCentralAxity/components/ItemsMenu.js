import * as React from "react";
import ItemByMenu from "./ItemByMenu";
import styles from "./NavMenuResponsiveCentralAxity.module.scss";
var handleRedirect = function (url, typeOpen) {
    var type = typeOpen ? "_blank" : "_self";
    window.open(url, type);
};
var ItemsMenu = function (props) {
    var itemsMenu = props.itemsMenu;
    return (React.createElement("nav", { className: styles.containerNav },
        React.createElement("ul", null,
            React.createElement("div", { className: styles.consultoria, onClick: function () {
                    return handleRedirect("https://intellego365.sharepoint.com/sites/CentralAxity/M%C3%A9xico/Consultoria2", false);
                } }, "Consultor\u00EDa"),
            itemsMenu !== undefined
                ? itemsMenu.map(function (item, index) { return (React.createElement(ItemByMenu, { key: index, Title: item.Title, Link: item.Link, abrirPagNueva: item.AbrirPagNueva, childrenList: item.children })); })
                : "")));
};
export default ItemsMenu;
//# sourceMappingURL=ItemsMenu.js.map