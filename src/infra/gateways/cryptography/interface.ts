export interface IHashComparer {
  compare: (plaintext: string, digest: string) => Promise<boolean>;
}

export interface IHasher {
  hash: (plaintext: string) => Promise<string>;
}
