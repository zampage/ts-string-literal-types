type PathParams<P> = P extends `${infer Start}(/:${infer ID})${infer End}`
  ? { [K in ID]?: string } & PathParams<`${Start}${End}`>
  : P extends `${string}:${infer ID}/${infer End}`
  ? { [K in ID]: string } & PathParams<End>
  : P extends `${string}:${infer ID}`
  ? { [K in ID]: string }
  : {};

const navigate = <T extends string, C extends PathParams<T>>(
  path: T,
  ...[config]: keyof C extends never ? [undefined?] : [PathParams<T>]
) => config;

const ok_a_1 = navigate("user");
const ok_a_2 = navigate("/user");
const ok_a_3 = navigate("user/");
const ok_a_4 = navigate("/user/");
const ok_a_5 = navigate(":userId", { userId: "1" });
const ok_a_6 = navigate("/:userid", { userid: "1" });
const ok_a_7 = navigate("/:userId/", { userId: "1" });

const ok_b_1 = navigate("user/:userId", { userId: "1" });
const ok_b_2 = navigate("user/:userId/", { userId: "1" });

const ok_c_1 = navigate("user/:userId/parent", { userId: "1" });
const ok_c_2 = navigate("user/:userId/parent/", { userId: "1" });
const ok_c_3 = navigate("user/:userId/:parentId", {
  userId: "1",
  parentId: "2",
});
const ok_c_4 = navigate("user/:userId/:parentId/", {
  userId: "1",
  parentId: "2",
});

const ok_d_1 = navigate("user/:userId/parent(/:parentId)", {
  userId: "1",
  parentId: "2",
});
const ok_d_2 = navigate("user/:userId/parent(/:parentId)", { userId: "1" });

const fail_a_1 = navigate(":userId");
const fail_a_2 = navigate("/:userId");
const fail_a_3 = navigate(":userId/");
const fail_a_4 = navigate("/:userId/");
const fail_a_5 = navigate(":userId", { foo: "1" });

const fail_b_1 = navigate("user/:userId");
const fail_b_2 = navigate("user/:userId/");
const fail_b_3 = navigate("user/:userId", { foo: "1" });

const fail_c_1 = navigate("user/:userId/parent", {
  userId: "1",
  parentId: "2",
});
const fail_c_2 = navigate("user/:userId/:parentId", { userId: "1" });
const fail_c_3 = navigate("user/:userId/:parentId", {
  userId: "1",
  parentId: "2",
  foo: "3",
});

const fail_d_1 = navigate("user/:userId/parent(/:parentId)");
const fail_d_2 = navigate("user/:userId/parent(/:parentId)", { parentId: "1" });
