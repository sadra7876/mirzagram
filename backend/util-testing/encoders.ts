function encodeKey(keyType: "access" | "refresh") {
  const key: string =
    keyType === "access"
      ? "ACCESS_TOKEN_PRIVATE_KEY"
      : "REFRESH_TOKEN_PRIVATE_KEY";
  return Buffer.from(key, "base64").toString("ascii");
}


console.log(encodeKey("access")); // Expected output
