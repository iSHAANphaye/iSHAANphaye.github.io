import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
}

const memoryStore = new Map<string, { count: number; resetAt: number }>();

function memoryRateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const entry = memoryStore.get(key);
  if (!entry || now > entry.resetAt) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, limit, remaining: limit - 1 };
  }
  if (entry.count >= limit) {
    return { success: false, limit, remaining: 0 };
  }
  entry.count += 1;
  return { success: true, limit, remaining: limit - entry.count };
}

const hasUpstash =
  Boolean(process.env.UPSTASH_REDIS_REST_URL) &&
  Boolean(process.env.UPSTASH_REDIS_REST_TOKEN);

const redis = hasUpstash ? Redis.fromEnv() : null;

const chatLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "24 h"),
      prefix: "portfolio:chat",
    })
  : null;

const contactLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "1 h"),
      prefix: "portfolio:contact",
    })
  : null;

export async function limitChat(ip: string): Promise<RateLimitResult> {
  if (chatLimiter) {
    const res = await chatLimiter.limit(ip);
    return { success: res.success, limit: res.limit, remaining: res.remaining };
  }
  return memoryRateLimit(`chat:${ip}`, 10, 24 * 60 * 60 * 1000);
}

export async function limitContact(ip: string): Promise<RateLimitResult> {
  if (contactLimiter) {
    const res = await contactLimiter.limit(ip);
    return { success: res.success, limit: res.limit, remaining: res.remaining };
  }
  return memoryRateLimit(`contact:${ip}`, 3, 60 * 60 * 1000);
}
