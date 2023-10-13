export interface INavMenuResponsiveCentralAxityProps {
    description: string;
    isDarkTheme: boolean;
    environmentMessage: string;
    hasTeamsContext: boolean;
    userDisplayName: string;
    urlAbsolute: string;
}
export interface ItemMenu extends ItemMenuView {
    ID: number;
    Orden: number;
    CategoriaPadreId: number;
    children: ItemMenu[];
    AbrirPagNueva: boolean;
}
export interface ItemMenuView {
    Title: string;
    Link: string;
    childrenList: ItemMenu[];
    abrirPagNueva: boolean;
}
export interface ItemsMenuProps {
    itemsMenu: ItemMenu[];
    urlAbsolute: string;
}
//# sourceMappingURL=INavMenuResponsiveCentralAxityProps.d.ts.map