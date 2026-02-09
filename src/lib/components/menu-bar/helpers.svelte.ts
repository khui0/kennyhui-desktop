import { applications } from "$lib/applications.svelte";
import { MenuBarItem, MenuItem, MenuSeparator } from "$lib/core";

export const menuBarState: {
  active: boolean;
  activeId: string;
} = $state({
  active: false,
  activeId: "",
});

export function deactivateMenuBar(): void {
  document.querySelector("[data-menu-bar-active]")?.removeAttribute("data-menu-bar-active");
  menuBarState.active = false;
  menuBarState.activeId = "";
}

export function activateMenuBar(id: string): void {
  document.querySelector("[data-menu-bar]")?.setAttribute("data-menu-bar-active", "");
  menuBarState.active = true;
  menuBarState.activeId = id;
}

export let disableTimeout: NodeJS.Timeout;

export const menuBarStatePrivate: {
  visitCount: number;
  skipPointerUp: boolean;
} = $state({
  visitCount: 0,
  skipPointerUp: false,
});

export function startDisableTimeout(): void {
  cancelDisableTimeout();

  disableTimeout = setTimeout(() => {
    menuBarStatePrivate.skipPointerUp = true;
  }, 500);
}

export function cancelDisableTimeout(): void {
  menuBarStatePrivate.skipPointerUp = false;
  clearTimeout(disableTimeout);
}

export const systemMenu: MenuBarItem = new MenuBarItem("system", "", [
  new MenuItem("About This System", () => {
    applications.find((app) => app.id === "dev.kennyhui.about")?.open();
  }),
  new MenuSeparator(),
  new MenuItem("System Settings...", () => {
    applications.find((app) => app.id === "dev.kennyhui.settings")?.open();
  }),
  new MenuItem("Debug", () => {
    applications.find((app) => app.id === "dev.kennyhui.debug")?.open();
  }),
]);

export const systemActiveMenu: MenuBarItem = new MenuBarItem("system-active", "Kenny Hui", [
  new MenuItem("LinkedIn", () => {
    window.open("https://www.linkedin.com/in/k-hui/", "_blank");
  }),
  new MenuItem("GitHub", () => {
    window.open("https://github.com/khui0", "_blank");
  }),
]);

export const systemMenuBarItems: MenuBarItem[] = [];
