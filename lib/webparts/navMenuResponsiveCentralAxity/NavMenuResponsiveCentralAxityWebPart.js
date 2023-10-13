var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { PropertyPaneTextField } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import * as strings from "NavMenuResponsiveCentralAxityWebPartStrings";
import NavMenuResponsiveCentralAxity from "./components/NavMenuResponsiveCentralAxity";
import { NAMEROUTES } from "../../constants/routes";
var NavMenuResponsiveCentralAxityWebPart = /** @class */ (function (_super) {
    __extends(NavMenuResponsiveCentralAxityWebPart, _super);
    function NavMenuResponsiveCentralAxityWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isDarkTheme = false;
        _this._environmentMessage = "";
        return _this;
    }
    NavMenuResponsiveCentralAxityWebPart.prototype.render = function () {
        var element = React.createElement(NavMenuResponsiveCentralAxity, {
            description: this.properties.description,
            isDarkTheme: this._isDarkTheme,
            environmentMessage: this._environmentMessage,
            hasTeamsContext: !!this.context.sdks.microsoftTeams,
            userDisplayName: this.context.pageContext.user.displayName,
            urlAbsolute: this._getUrlAbsolute(),
        });
        ReactDom.render(element, this.domElement);
    };
    NavMenuResponsiveCentralAxityWebPart.prototype.onInit = function () {
        var _this = this;
        return this._getEnvironmentMessage().then(function (message) {
            _this._environmentMessage = message;
        });
    };
    NavMenuResponsiveCentralAxityWebPart.prototype._getUrlAbsolute = function () {
        var urlAbsolute = this.context.pageContext.web.absoluteUrl;
        var indexAlias = urlAbsolute.indexOf(NAMEROUTES.consultancyAlias);
        var index = urlAbsolute.indexOf(NAMEROUTES.consultancy);
        return indexAlias !== -1
            ? "".concat(urlAbsolute.substring(0, indexAlias)).concat(NAMEROUTES.consultancyAlias)
            : "".concat(urlAbsolute.substring(0, index)).concat(NAMEROUTES.consultancy);
    };
    NavMenuResponsiveCentralAxityWebPart.prototype._getEnvironmentMessage = function () {
        var _this = this;
        if (!!this.context.sdks.microsoftTeams) {
            // running in Teams, office.com or Outlook
            return this.context.sdks.microsoftTeams.teamsJs.app.getContext().then(function (context) {
                var environmentMessage = "";
                switch (context.app.host.name) {
                    case "Office": // running in Office
                        environmentMessage = _this.context.isServedFromLocalhost
                            ? strings.AppLocalEnvironmentOffice
                            : strings.AppOfficeEnvironment;
                        break;
                    case "Outlook": // running in Outlook
                        environmentMessage = _this.context.isServedFromLocalhost
                            ? strings.AppLocalEnvironmentOutlook
                            : strings.AppOutlookEnvironment;
                        break;
                    case "Teams": // running in Teams
                        environmentMessage = _this.context.isServedFromLocalhost
                            ? strings.AppLocalEnvironmentTeams
                            : strings.AppTeamsTabEnvironment;
                        break;
                    default:
                        throw new Error("Unknown host");
                }
                return environmentMessage;
            });
        }
        return Promise.resolve(this.context.isServedFromLocalhost
            ? strings.AppLocalEnvironmentSharePoint
            : strings.AppSharePointEnvironment);
    };
    NavMenuResponsiveCentralAxityWebPart.prototype.onThemeChanged = function (currentTheme) {
        if (!currentTheme) {
            return;
        }
        this._isDarkTheme = !!currentTheme.isInverted;
        var semanticColors = currentTheme.semanticColors;
        if (semanticColors) {
            this.domElement.style.setProperty("--bodyText", semanticColors.bodyText || null);
            this.domElement.style.setProperty("--link", semanticColors.link || null);
            this.domElement.style.setProperty("--linkHovered", semanticColors.linkHovered || null);
        }
    };
    NavMenuResponsiveCentralAxityWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(NavMenuResponsiveCentralAxityWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse("1.0");
        },
        enumerable: false,
        configurable: true
    });
    NavMenuResponsiveCentralAxityWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription,
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField("description", {
                                    label: strings.DescriptionFieldLabel,
                                }),
                            ],
                        },
                    ],
                },
            ],
        };
    };
    return NavMenuResponsiveCentralAxityWebPart;
}(BaseClientSideWebPart));
export default NavMenuResponsiveCentralAxityWebPart;
//# sourceMappingURL=NavMenuResponsiveCentralAxityWebPart.js.map