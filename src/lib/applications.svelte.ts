import About from "./apps/about/about.svelte";
import Browser from "./apps/browser/browser.svelte";
import Debug from "./apps/debug/debug.svelte";
import Iframe from "./apps/iframe/iframe.svelte";
import Monaco from "./apps/monaco/monaco.svelte";
import Onboarding from "./apps/onboarding/onboarding.svelte";
import Projects from "./apps/projects/projects.svelte";
import Settings from "./apps/settings/settings.svelte";
import { App, MenuBarItem, MenuItem, Shortcut } from "./core";
import { query } from "./images";
import { launchpad } from "./meta.svelte";

export const applications: App[] = $state([
  new App("dev.kennyhui.resume", "Resume", query("icons/file.png")).setCallback(() => {
    window.open("/resume.pdf", "_blank");
  }),
  new App("dev.kennyhui.projects", "Projects", query("icons/projects.png"))
    .setBody(Projects)
    .setDefaultSize({
      x: 500,
      y: 600,
    }),
  new App("dev.kennyhui.launchpad", "Launchpad", query("icons/launchpad.png"))
    .setCallback(() => {
      launchpad.current?.show();
    })
    .hideFromLaunchpad(),
  new App("dev.kennyhui.about", "About", query("icons/about.png"))
    .setBody(About)
    .disableTitlebar()
    .setDefaultSize({ x: 280, y: 500 })
    .setMinSize({ x: 280, y: 500 })
    .setMenuBarItems(
      new MenuBarItem("file", "File", [
        new MenuItem("Open LinkedIn", () => {
          window.open("https://www.linkedin.com/in/k-hui/", "_blank");
        }),
        new MenuItem("Open GitHub", () => {
          window.open("https://github.com/khui0", "_blank");
        }),
        new MenuItem("Open Bluesky", () => {
          window.open("https://bsky.app/profile/kennyhui.dev", "_blank");
        }),
      ]),
      new MenuBarItem("edit", "Edit", [
        new MenuItem(
          "Copy Email",
          () => {
            navigator.clipboard.writeText("hello@kennyhui.dev");
          },
          [new Shortcut("command-key"), new Shortcut("c")],
        ),
      ]),
    )
    .hideFromDock(),
  new App("dev.kennyhui.settings", "System Settings", query("icons/settings.png"))
    .setBody(Settings)
    .disableTitlebar()
    .setDefaultSize({
      x: 600,
      y: 500,
    })
    .setControlsSize("standard"),
  new App("dev.kennyhui.browser", "Browser", query("icons/browser.png"))
    .setBody(Browser)
    .setDefaultSize({
      x: 600,
      y: 500,
    })
    .setMinSize({
      x: 300,
      y: 52,
    })
    .disableTitlebar()
    .setControlsSize("standard")
    .allowMultipleWindows(),
  new App("dev.kennyhui.debug", "Debug", query("icons/debug.png"))
    .setBody(Debug)
    .disableTitlebar()
    .setDefaultSize({ x: 280, y: 400 })
    .setMinSize({ x: 280, y: 400 })
    .setDefaultPosition({ x: 40, y: 40 })
    .hideFromDock(),
  new App("dev.kennyhui.flaggle", "Flaggle", query("icons/flaggle.png"))
    .setBody(Iframe)
    .setProps({ src: "https://flaggle.kennyhui.dev/", title: "Flaggle" })
    .setDefaultSize({
      x: 600,
      y: 500,
    })
    .setMinSize({
      x: 300,
      y: 58,
    })
    .hideFromDock(),
  new App("dev.kennyhui.videopoker", "Video Poker", query("icons/video-poker.png"))
    .setBody(Iframe)
    .setProps({ src: "https://poker.kennyhui.dev/", title: "Video Poker" })
    .setDefaultSize({
      x: 600,
      y: 500,
    })
    .setMinSize({
      x: 300,
      y: 58,
    })
    .hideFromDock(),
  new App("dev.kennyhui.monaco", "Monaco Editor", query("icons/monaco.png"))
    .setBody(Monaco)
    .setDefaultSize({
      x: 600,
      y: 500,
    })
    .disableTitlebar()
    .setControlsSize("standard")
    .setMinSize({
      x: 300,
      y: 52,
    }),
  new App("dev.kennyhui.onboarding", "Welcome Message", query("icons/document.png"))
    .setBody(Onboarding)
    .disableTitlebar()
    .setDefaultSize({ x: 400, y: 182 })
    .setMinSize({ x: 400, y: 182 })
    .setDefaultPosition({ x: 40, y: 40 })
    .hideFromDock(),
]);
