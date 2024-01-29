export { default } from "next-auth/middleware";

export const config = {
    matcher: ['/', '/new-story', '/abc', '/new-user']
}