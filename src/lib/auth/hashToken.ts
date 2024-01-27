import { createHash } from "crypto"

export default function hashToken(token: string, secret?: string) {
    const combinedString = token + (secret || process.env.NEXTAUTH_SECRET);
    const hash = createHash('sha256');
    hash.update(combinedString, 'utf-8');
    return hash.digest("hex");
};
