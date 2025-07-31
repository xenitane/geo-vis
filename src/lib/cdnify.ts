import { CDN_URL } from "astro:env/client";
export default function (asset: [boolean, string]): string {
    return asset[0] ? `${CDN_URL}/geo-vis${asset[1]}` : `/geo-vis${asset[1]}`;
}
