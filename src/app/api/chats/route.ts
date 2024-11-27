import { listChats, startChat } from "@/entities/chat/server";
import { formatSse } from "@/shared/lib/format-sse";

export const GET = async () => {
  return Response.json(await listChats());
};

export const POST = async (request: Request) => {
  const result = await startChat(await request.json());

  const stream = new ReadableStream({
    async start(controller) {
      for await (const message of result) {
        const sse = formatSse({
          event: message.type,
          data: JSON.stringify(message),
        });
        controller.enqueue(sse);
      }
      controller.close();
    },
  });

  return new Response(stream, {
    status: 201,
    headers: {
      ["Content-Type"]: "text/event-stream",
      ["Cache-Control"]: "no-cache, no-transform",
      ["Connection"]: "keep-alive",
    },
  });
};
