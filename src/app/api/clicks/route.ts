import { NextResponse } from "next/server";
import { links } from "@/lib/links";
import { getClicksCollection } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

// 모든 링크의 클릭 수를 { [id]: count } 형태로 한 번에 돌려준다
export async function GET() {
  try {
    const collection = await getClicksCollection();
    const docs = await collection
      .find({ _id: { $in: links.map((link) => link.id) } })
      .toArray();

    const counts: Record<string, number> = {};
    for (const link of links) counts[link.id] = 0;
    for (const doc of docs) counts[doc._id] = doc.count;

    return NextResponse.json(counts);
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
    return NextResponse.json({ error: "클릭 수를 가져오지 못했습니다." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  // 등록된 링크만 집계해 임의의 문서가 쌓이지 않게 한다
  if (typeof id !== "string" || !links.some((link) => link.id === id)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  try {
    const collection = await getClicksCollection();
    const doc = await collection.findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );
    return NextResponse.json({ id, count: doc?.count ?? 0 });
  } catch (error) {
    console.error("클릭 수 저장 실패:", error);
    return NextResponse.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}
