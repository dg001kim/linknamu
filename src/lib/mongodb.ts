import { MongoClient, type Collection } from "mongodb";

type ClickDoc = {
  _id: string;
  count: number;
};

const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

// 개발 모드의 핫 리로드나 서버리스 재호출 때마다 연결이 새로 생기지 않도록 전역에 보관한다
function getClient(): Promise<MongoClient> {
  if (!globalForMongo._mongoClientPromise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다.");
    }
    const promise = new MongoClient(uri).connect();
    // 연결에 실패하면 다음 요청에서 다시 시도할 수 있게 비운다
    promise.catch(() => {
      globalForMongo._mongoClientPromise = undefined;
    });
    globalForMongo._mongoClientPromise = promise;
  }
  return globalForMongo._mongoClientPromise;
}

export async function getClicksCollection(): Promise<Collection<ClickDoc>> {
  const client = await getClient();
  return client.db("linknamu").collection<ClickDoc>("clicks");
}
