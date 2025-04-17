import { applications, MenuBarItem, MenuItem, MenuSeparator } from "$lib/applications.svelte";
import { menuBar } from "$lib/meta.svelte";

export function deactivateMenuBar(): void {
  document.querySelector("[data-menu-bar-active]")?.removeAttribute("data-menu-bar-active");
  menuBar.active = false;
  menuBar.activeId = "";
}

export function activateMenuBar(id: string): void {
  document.querySelector("[data-menu-bar]")?.setAttribute("data-menu-bar-active", "");
  menuBar.active = true;
  menuBar.activeId = id;
}

export const systemMenu = new MenuBarItem("system", "", [
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

export const systemActiveMenu = new MenuBarItem("system-active", "Kenny Hui", [
  new MenuItem("Visit kennyhui.dev...", () => {
    window.open("https://kennyhui.dev/", "_blank");
  }),
]);

export const systemMenuBarItems = [];
