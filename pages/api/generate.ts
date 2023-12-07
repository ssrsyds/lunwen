import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";

if (process.env.NEXT_PUBLIC_USE_USER_KEY !== "true") {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing env var from OpenAI");
  }
}

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  var { prompt, api_key } = (await req.json()) as {
    prompt?: string;
    api_key?: string
  };
  //todo make this variable into messages
  var p = "你现在需要充当一个答题助手。不能胡乱回答，务必保证正确率。先给我正确的答案，答案下面是题目解析。数理化类或者其他需要计算的题需要详细计算过程。如果是问答题，请尽量控制在200字以内。"
  const input = prompt;
  prompt = p + prompt
  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  if (!process.env.OPENAI_MODEL) {
    throw new Error("Missing env var from OpenAI")
  }

  const payload: OpenAIStreamPayload = {
    model: process.env.OPENAI_MODEL,
    messages: [{
      role: "system",
      content: prompt
    }],
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1536,
    stream: true,
    n: 1,
    api_key,
    input: input,
  }

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
