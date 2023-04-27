/* The avatar style Thumbs is based on: Thumbs by Florian Körner, licensed under CC0 1.0 . / Remix of the original. */
export function fallbackAvatar(nameOrEmail: string) {
  return `https://api.dicebear.com/6.x/thumbs/svg?seed=${nameOrEmail}`;
}
