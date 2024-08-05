export async function generatePasswordHash(
  password: string,
  hash: string
): Promise<string> {}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {}
