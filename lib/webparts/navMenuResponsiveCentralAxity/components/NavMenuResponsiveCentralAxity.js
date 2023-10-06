var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as React from "react";
import styles from "./NavMenuResponsiveCentralAxity.module.scss";
import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import { mergeStyles } from "office-ui-fabric-react";
import { FontIcon } from "@fluentui/react/lib/Icon";
import ItemsMenu from "./ItemsMenu";
var NavMenuResponsiveCentralAxity = function (props) {
    var _a = React.useState([]), listItems = _a[0], setListItems = _a[1];
    var _b = React.useState(window.innerWidth), width = _b[0], setWidth = _b[1];
    var _c = React.useState(0), viewMenuResponse = _c[0], setViewMenuResponse = _c[1];
    var iconClass = mergeStyles({
        fontSize: 50,
        height: 50,
        width: 50,
        margin: "0 25px",
        color: "white",
    });
    var iconCLose = mergeStyles({
        fontSize: 22,
        height: 22,
        width: 22,
        padding: "15px 35px 25px 0px",
        color: "white",
    });
    var handleCloseMenu = function () {
        setViewMenuResponse(0);
    };
    var handleResize = function () {
        setWidth(window.innerWidth);
    };
    var changeViewMenuResponse = function () {
        setViewMenuResponse(1);
    };
    React.useEffect(function () {
        window.removeEventListener("resize", handleResize);
    }, [window.addEventListener("resize", handleResize)]);
    React.useEffect(function () {
        sp.setup({
            sp: {
                baseUrl: "https://intellego365.sharepoint.com/sites/CentralAxity/México/Consultoria2",
            },
        });
        sp.web.lists
            .getByTitle("NavMenu")
            .items.get()
            .then(function (items) {
            setListItems(items);
        })
            .catch(function (error) {
            console.error("Error al obtener elementos de la lista:", error);
        });
    }, []);
    var getListMenuOrder = function (dataResponse) {
        return dataResponse.length > 0 ? dataResponse.sort(function (a, b) { return a.Orden - b.Orden; }) : [];
    };
    var getChildrenMenyById = function (itemFather, dataResponse) {
        var itemData = dataResponse.filter(function (item) {
            return item.CategoriaPadreId === itemFather.ID;
        });
        return getListMenuOrder(__spreadArray([], itemData, true));
    };
    var getItemFatherMenu = function (dataResponse) {
        var itemData = dataResponse.filter(function (item) {
            return item.CategoriaPadreId === null;
        });
        return itemData;
    };
    var generateListMenu = function (dataFather, dataResponse) {
        return dataFather.map(function (item) { return (__assign(__assign({}, item), { children: getChildrenMenyById(__assign({}, item), __spreadArray([], dataResponse, true)) })); });
    };
    var itemsMenuFather = getItemFatherMenu(__spreadArray([], listItems, true));
    var listMenu = generateListMenu(__spreadArray([], itemsMenuFather, true), __spreadArray([], listItems, true));
    var listMenuOrder = getListMenuOrder(__spreadArray([], listMenu, true));
    return (React.createElement(React.Fragment, null, width > 820 ? (React.createElement("div", { className: styles.displayNone }, "Display none")) : viewMenuResponse === 0 ? (React.createElement("div", { className: styles.contentMenuResponse, onClick: function () { return changeViewMenuResponse(); } },
        React.createElement(FontIcon, { "aria-label": "Compass", iconName: "BulletedListText", className: iconClass }))) : (React.createElement("div", { className: styles.contentIndexMenu },
        React.createElement("div", { className: styles.navResponsive },
            React.createElement("div", { className: styles.iconClose, onClick: function () { return handleCloseMenu(); } },
                React.createElement(FontIcon, { "aria-label": "Compass", iconName: "ErrorBadge12", className: iconCLose })),
            React.createElement(ItemsMenu, { itemsMenu: listMenuOrder }))))));
};
export default NavMenuResponsiveCentralAxity;
//# sourceMappingURL=NavMenuResponsiveCentralAxity.js.map