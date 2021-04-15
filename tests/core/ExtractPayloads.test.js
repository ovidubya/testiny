const { getCombinations } = require("../../libs/core");

describe("Extract Payload ", () => {
  test("should return empty array when empty object is given", () => {
    const res = getCombinations({});
    expect(res).toEqual([{}]);
  });
  test("when 1 value is provided", () => {
    const res = getCombinations({
      metric1: ["cool"],
    });
    expect(res).toEqual([{ metric1: "cool" }]);
  });
  test("when 3 values is provided", () => {
    const res = getCombinations({
      metric1: ["cool", "is", "nice"],
    });
    expect(res).toEqual([
      { metric1: "cool" },
      { metric1: "is" },
      { metric1: "nice" },
    ]);
  });
  test("when multiple values are provided", () => {
    const res = getCombinations({
      element: ["Water", "Fire", "Earth", "Air"],
      avatar: ["Roku", "Aang"],
    });
    expect(res).toEqual([
      { avatar: "Roku", element: "Water" },
      { avatar: "Aang", element: "Water" },
      { avatar: "Roku", element: "Fire" },
      { avatar: "Aang", element: "Fire" },
      { avatar: "Roku", element: "Earth" },
      { avatar: "Aang", element: "Earth" },
      { avatar: "Roku", element: "Air" },
      { avatar: "Aang", element: "Air" },
    ]);
  });
});
