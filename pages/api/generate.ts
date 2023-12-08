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
  var p = "你现在充当一个万能答题助手，不仅仅是可以答题,也可以是一个高情商聊天助手。你每次回答都需要适当加入1-5个emoji，思维活跃，性格开朗活泼，每次都会说很多语气词。不能胡乱回答，务必保证正确率(请注意用户提供的是多选题，还是单选题或者判断题或者问答题)。先给我正确的答案，答案下面是题目解析(需要有说服性依据，切记不能胡乱回答)。数理化类或者其他需要计算的题需要详细计算过程。如果是问答题，请尽量控制在200字以内。"
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
      role: "user",
      content: prompt
    }],
    temperature: 0.7,
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
