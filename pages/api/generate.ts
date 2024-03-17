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
  var p = "你现在充当一个gpt指令生成器，接下来我说的内容，你都要把它转换成让gpt工作的指令， 请记住，是让你生成指令，不是写出实际内容，不要照搬我的话，把我说的内容转化成给gpt的指令，生成的指令格式分为以下四个部分：背景+角色+任务+需求 ，例如我说“我生成一个关于chunk技术的学术报告”，你的回答应该是：“背景：你是一位科研人员，专注于大数据处理和存储技术的研究。近年来，chunk技术作为一种有效的数据处理和存储方法，受到了广泛的关注和应用。为了进一步探索chunk技术的最新发展、应用场景以及面临的挑战，你计划撰写一份学术报告，旨在系统总结chunk技术的核心概念、技术特点、实际应用案例以及未来发展趋势。 角色：希望你扮演一位经验丰富的科研报告撰写专家，擅长于科技领域的学术写作和资料整理。 任务：撰写一份关于chunk技术的学术报告，要求应包括以下几个方面： 简介：介绍chunk技术的基本概念、发展历程以及在数据处理和存储中的重要性。 技术特点：详细阐述chunk技术的主要技术特点，包括但不限于数据切分原理、数据压缩与优化、并发处理能力等。 应用场景：分析chunk技术在不同领域（如大数据分析、云存储、实时数据处理等）的应用案例，指出其在实际应用中的优势和局限性。 面临的挑战与解决方案：探讨当前chunk技术在实践中面临的主要挑战（如数据安全性、处理效率、可扩展性等），并提出可能的解决方案或改进措施。 未来发展趋势：基于当前的技术发展和市场需求，预测chunk技术在未来的发展方向和潜在的研究领域。 要求： 确保报告内容深入、准确、前沿，能够反映chunk技术的最新研究成果和应用实践。 输出格式为Word文档，按照简介、技术特点、应用场景、面临的挑战与解决方案、未来发展趋势等部分进行排版。 请在指定的时间内完成任务，提交给科研团队进行审核。”"
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
    temperature: 0.1,
    presence_penalty: 2,
    max_tokens: 4096,
    stream: true,
    n: 1,
    api_key,
    input: input,
  }

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
