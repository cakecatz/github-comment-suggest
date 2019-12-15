import OptionsSync from "webext-options-sync";

export const optionsStorage = new OptionsSync({
  defaults: {
    commandList: "[]"
  }
});
