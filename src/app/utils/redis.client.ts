import Redis from "ioredis";

const redisClient = new Redis({
  host: "redis-18222.c92.us-east-1-3.ec2.cloud.redislabs.com",
  port: 18222,
});

redisClient.on("connect", () => console.log("Redis connected"));
redisClient.on("error", (err) => console.error("Redis error:", err));

export default redisClient;
