import { NextRequest } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: process.env.UPSTASH_URL!,
    token: process.env.UPSTASH_KEY!,
  })

export async function GET(request: NextRequest) {
    const jwtToken = request.headers.get("token")
    console.log("Logout request: " + jwtToken?.substring(0, 6))

    redis.set(`bl_${jwtToken}`, jwtToken, { exat: Number(request.headers.get("exp")) })
}