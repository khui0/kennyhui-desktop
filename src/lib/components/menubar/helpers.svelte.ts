import { applications, MenubarItem, MenuItem, MenuSeparator } from "$lib/applications.svelte";
import { menubar } from "$lib/meta.svelte";

export function deactivateMenubar(): void {
  document.querySelector("[data-menubar-active]")?.removeAttribute("data-menubar-active");
  menubar.active = false;
  menubar.activeId = "";
}

export function activateMenubar(id: string): void {
  document.querySelector("[data-menubar]")?.setAttribute("data-menubar-active", "");
  menubar.active = true;
  menubar.activeId = id;
}

export const systemMenu = new MenubarItem("system", "", [
  new MenuItem("About This System", () => {}),
  new MenuSeparator(),
  new MenuItem("System Settings...", () => {
    applications.find((app) => app.id === "dev.kennyhui.settings")?.open();
  }),
]);

export const systemActiveMenu = new MenubarItem("active-app", "Kenny Hui", [
  new MenuItem("About This System", () => {
    console.log("hi");
  }),
]);
