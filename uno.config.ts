import { defineConfig } from "unocss";
import { ogogoPreset } from "@tumarsoft/ogogo-ui";
import presetUno from "@unocss/preset-uno";

export default defineConfig({
  // TODO: remove presetUno
  presets: [presetUno(), ogogoPreset()],
  rules: [
    [/^gap-([\.\d]+)$/, ([_, num]) => ({ gap: `${num}px` })],
    [/^font-size-(\d+)$/, ([_, size]) => ({ "font-size": `${size}px` })],
  ],
});
