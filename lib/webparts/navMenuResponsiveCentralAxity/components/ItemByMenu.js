import * as React from "react";
import { mergeStyles } from "office-ui-fabric-react";
import { FontIcon } from "@fluentui/react/lib/Icon";
import styles from "./NavMenuResponsiveCentralAxity.module.scss";
var ItemByMenu = function (props) {
    var _a = React.useState(false), subMenu = _a[0], setSubMenu = _a[1];
    var Title = props.Title, childrenList = props.childrenList, abrirPagNueva = props.abrirPagNueva, Link = props.Link;
    var iconCLose = mergeStyles({
        fontSize: 10,
        height: 10,
        width: 10,
        color: "white",
    });
    var handleSubMenu = function () {
        setSubMenu(!subMenu);
    };
    var handleRedirect = function (url, typeOpen) {
        var type = typeOpen ? "_blank" : "_self";
        window.open(url, type);
    };
    return (React.createElement("li", null,
        React.createElement("div", { className: styles.itemIcon },
            React.createElement("p", { onClick: function () { return handleRedirect(Link, abrirPagNueva); } }, Title),
            childrenList.length !== 0 ? (React.createElement("div", { onClick: function () { return handleSubMenu(); } },
                React.createElement(FontIcon, { "aria-label": "Compass", iconName: subMenu ? "FlickDown" : "CaretSolidDown", className: iconCLose }))) : ("")),
        subMenu ? (React.createElement("ul", { className: styles.submenu }, childrenList.map(function (item, index) { return (React.createElement("li", { key: index, onClick: function () { return handleRedirect(item.Link, item.AbrirPagNueva); } }, item.Title)); }))) : ("")));
};
export default ItemByMenu;
//# sourceMappingURL=ItemByMenu.js.map