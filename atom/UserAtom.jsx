const { atom } = require("recoil");

export const userState = atom({
    key: "userState",
    default: null,
});
